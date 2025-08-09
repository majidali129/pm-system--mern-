import { tasks } from "@/data/tasks";
import type { Priority, Task, TaskStatus, TaskType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FilterValue<T> = T | "all";

type TasksInitialState = {
  tasks: Task[];
  taskFilters: {
    status: FilterValue<TaskStatus>;
    priority: FilterValue<Priority>;
    type: FilterValue<TaskType>;
  };
  query: string;
};

const initialState = {
  tasks: tasks,
  taskFilters: {
    priority: "all",
    status: "all",
    type: "all",
  },
  query: "",
} satisfies TasksInitialState as TasksInitialState;

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      state.tasks.unshift(action.payload.task);
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; updatedTask: Task }>
    ) => {
      // PM ONLY
      const { taskId, updatedTask } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      );
    },

    applySearch: (state, action: PayloadAction<string>) => {
      if (action.payload) state.taskFilters.status = "all";
      if (action.payload) state.taskFilters.priority = "all";
      state.query = action.payload;
    },
    applyTaskFilters: (
      state,
      action: PayloadAction<{
        status?: TaskStatus;
        priority?: Priority;
        type?: TaskType;
      }>
    ) => {
      state.taskFilters = { ...state.taskFilters, ...action.payload };
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; status: TaskStatus }>
    ) => {
      const { status, taskId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = status;
      }
    },
    updatePriority: (
      state,
      action: PayloadAction<{ taskId: string; priority: Priority }>
    ) => {
      // PM ONL
      const { taskId, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) task.priority = priority;
    },

    assignTaskToMember: (state, action: PayloadAction<{ task: Task }>) => {
      state.tasks.unshift(action.payload.task);
    },
  },
});

export const {
  addTask,
  deleteTask,
  updatePriority,
  updateTask,
  updateTaskStatus,
  applySearch,
  applyTaskFilters,
  assignTaskToMember,
} = taskSlice.actions;

export default taskSlice.reducer;
