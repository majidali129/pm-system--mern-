import { projects } from "@/data/projects";
import { users } from "@/data/users";
import type { Project, ProjectStatus } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FilterValue<T> = T | "all";

type ProjectsInitialState = {
  projects: Project[];
  projectFilters: {
    status: FilterValue<ProjectStatus>;
  };
  query: string;
};

const initialState = {
  projects: projects,
  projectFilters: {
    status: "all",
  },
  query: "",
} satisfies ProjectsInitialState as ProjectsInitialState;

// TODO: authorization check for PM || ADMIN for actions

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    deleteProject: (state, action: PayloadAction<{ id: string }>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
    },
    updateProject: (
      state,
      action: PayloadAction<{ projectId: string; updatedProject: Project }>
    ) => {
      const { projectId, updatedProject } = action.payload;
      state.projects = state.projects.map((project) =>
        project.id === projectId ? updatedProject : project
      );
    },
    addNewMembers: (
      state,
      action: PayloadAction<{ projectId: string; selectedUsers: string[] }>
    ) => {
      const { projectId, selectedUsers } = action.payload;
      const newMembers = users.filter((user) =>
        selectedUsers.includes(user.id)
      );

      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.team?.members.push(...newMembers);
      }
    },

    removeMember: (
      state,
      action: PayloadAction<{ projectId: string; memberId: string }>
    ) => {
      const { projectId, memberId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        if (project.team) {
          project.team.members = project.team?.members.filter(
            (member) => member.id !== memberId
          );
        }
      }
    },

    applyProjectFilters: (
      state,
      action: PayloadAction<{ status: ProjectStatus }>
    ) => {
      state.projectFilters.status = action.payload.status;
    },

    applySearch: (state, action: PayloadAction<string>) => {
      if (action.payload) state.projectFilters.status = "all";
      state.query = action.payload;
    },

    updateProjectDeadline: (
      state,
      action: PayloadAction<{ endDate: string; projectId: string }>
    ) => {
      const { endDate, projectId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) project.endDate = endDate;
    },

    updateProjectStatus: (
      state,
      action: PayloadAction<{ projectId: string; status: ProjectStatus }>
    ) => {
      const { status, projectId } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.status = status;
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  addNewMembers,
  applyProjectFilters,
  removeMember,
  updateProject,
  applySearch,
  updateProjectDeadline,
  updateProjectStatus,
} = projectSlice.actions;

export default projectSlice.reducer;
