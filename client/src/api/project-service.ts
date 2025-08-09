import type {
  ApiResponse,
  Project,
  ProjectStat,
  ProjectStatus,
  Task,
} from "@/types";
import { api } from "./axios";
import { ENDPOINTS } from "@/lib/endpoints";

export type NewProjectPayload = Pick<
  Project,
  "name" | "description" | "budget" | "spent" | "startDate" | "endDate" | "tags"
>;

export const createProject = async (
  payload: NewProjectPayload
): Promise<ApiResponse<Project>> => {
  const response = await api.post<ApiResponse<Project>>(
    ENDPOINTS.projects.create,
    payload
  );

  console.log(response);

  return response.data;
};

export const getAllProjects = async (): Promise<ApiResponse<Project[]>> => {
  const response = await api.get<ApiResponse<Project[]>>(
    ENDPOINTS.projects.getAllProjects
  );
  return response.data;
};

export const getProjectStats = async (): Promise<ApiResponse<ProjectStat>> => {
  const { data } = await api.get<ApiResponse<ProjectStat>>(
    ENDPOINTS.projects.getAllProjectStats
  );
  return data;
};

export const getProjectInfo = async (
  projectId: string
): Promise<ApiResponse<Project>> => {
  const { data } = await api.get<ApiResponse<Project>>(
    ENDPOINTS.projects.getProjectInfo(projectId)
  );

  return data;
};

export const getProjectTasks = async (
  projectId: string
): Promise<ApiResponse<Task[]>> => {
  const { data } = await api.get<ApiResponse<Task[]>>(
    ENDPOINTS.projects.getProjectTasks(projectId)
  );

  return data;
};

export type UpdateStatusPayload = {
  status: ProjectStatus;
  projectId: string;
};
export const updateProjectStatus = async (
  payload: UpdateStatusPayload
): Promise<ApiResponse<Project>> => {
  const { data } = await api.put<ApiResponse<Project>>(
    ENDPOINTS.projects.updateProjectStatus(payload.projectId),
    { status: payload.status }
  );
  return data;
};

export type UpdateEndDatePayload = {
  endDate: Date;
  projectId: string;
};
export const updateProjectEndDate = async (
  payload: UpdateEndDatePayload
): Promise<ApiResponse<Project>> => {
  const { data } = await api.put<ApiResponse<Project>>(
    ENDPOINTS.projects.updateProjectEndDate(payload.projectId),
    { endDate: payload.endDate }
  );
  return data;
};

export const allocateTeamToProject = async (
  payload: string[],
  projectId: string
): Promise<ApiResponse<Project>> => {
  const { data } = await api.put<ApiResponse<Project>>(
    ENDPOINTS.projects.allocateTeamToProject(projectId),
    { members: payload }
  );
  return data;
};

export const removeTeamMemberFromProject = async (
  payload: string,
  projectId: string
): Promise<ApiResponse<Project>> => {
  const { data } = await api.put<ApiResponse<Project>>(
    ENDPOINTS.projects.removeTeamMemberFromProject(projectId),
    { memberId: payload }
  );
  return data;
};
