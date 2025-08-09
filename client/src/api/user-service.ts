import type { ApiResponse, User } from "@/types";
import { api } from "./axios";
import { ENDPOINTS } from "@/lib/endpoints";

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  const { data } = await api.get<ApiResponse<User>>(
    ENDPOINTS.users.currentUser
  );
  console.log(data);

  return data;
};

export const getAllUsers = async (
  query?: string
): Promise<ApiResponse<User[]>> => {
  const safeQuery = query?.trim();
  const url = safeQuery
    ? `${ENDPOINTS.users.getAllUsers}?${query}`
    : ENDPOINTS.users.getAllUsers;
  const { data } = await api.get<ApiResponse<User[]>>(url);
  return data;
};
