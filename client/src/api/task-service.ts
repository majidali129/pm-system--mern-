import type { ApiResponse, Task, TaskStatus } from "@/types";
import { api } from "./axios";
import { ENDPOINTS } from "@/lib/endpoints";

export type NewTaskPayload = Pick<
  Task,
  | "title"
  | "description"
  | "priority"
  | "type"
  | "dueDate"
  | "estimatedTime"
  | "tags"
>;

export type AssignTaskPayload = NewTaskPayload & {
  assignee: string;
  project: string;
};

export const createTask = async (
  payload: NewTaskPayload
): Promise<ApiResponse<Task>> => {
  const { data } = await api.post<ApiResponse<Task>>(
    ENDPOINTS.tasks.create,
    payload
  );
  return data;
};
export const updateTaskStatus = async (
  payload: TaskStatus,
  taskId: string
): Promise<ApiResponse<Task>> => {
  console.log(payload);
  const { data } = await api.put<ApiResponse<Task>>(
    ENDPOINTS.tasks.updateTaskStatus(taskId),
    { status: payload }
  );
  return data;
};
export const deleteTask = async (
  taskId: string
): Promise<ApiResponse<Task>> => {
  const { data } = await api.delete<ApiResponse<Task>>(
    ENDPOINTS.tasks.deleteTask(taskId)
  );
  return data;
};

export const assignTask = async (
  payload: AssignTaskPayload
): Promise<ApiResponse<Task>> => {
  const { data } = await api.post<ApiResponse<Task>>(
    ENDPOINTS.tasks.assignTask(),
    payload
  );
  return data;
};

export const getAllTasks = async (): Promise<ApiResponse<Task[]>> => {
  const { data } = await api.get<ApiResponse<Task[]>>(
    ENDPOINTS.tasks.getAllTasks
  );
  return data;
};
export const getTaskInfo = async (
  taskId: string
): Promise<ApiResponse<Task>> => {
  const { data } = await api.get<ApiResponse<Task>>(
    ENDPOINTS.tasks.getTaskInfo(taskId)
  );
  return data;
};
