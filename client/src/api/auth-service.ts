import type { ApiResponse, User, Role } from "@/types";
import { api } from "./axios";
import { ENDPOINTS } from "@/lib/endpoints";

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  domain: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthenticatedUser = Pick<User, "_id" | "name" | "role" | "avatar">;

type LoginResponse = {
  accessToken: string;
  user: AuthenticatedUser;
  authenticated: boolean;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  console.log(payload);
  const { data } = await api.post<ApiResponse<LoginResponse>>(
    ENDPOINTS.auth.login,
    payload
  );

  return data!; // contains { status, message, data }
};

export const signUp = async (
  payload: SignUpPayload
): Promise<ApiResponse<User>> => {
  const { data } = await api.post<ApiResponse<User>>(
    ENDPOINTS.auth.register,
    payload
  );

  return data;
};

export const logout = async () => {
  await api.post(ENDPOINTS.auth.logout);
};
