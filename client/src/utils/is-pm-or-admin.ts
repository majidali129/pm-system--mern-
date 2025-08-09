import type { Role } from "@/types";

export const isPmOrAdmin = (role: Role) => {
  if (!role) return false;

  return role === "project_manager" || role === "admin";
};
