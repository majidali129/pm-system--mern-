import type { Role } from "@/services/user-service";

export const isPmOrAdmin = (role: Role) => {
  if (!role) return false;

  return role === "project-manager" || role === "admin";
};
