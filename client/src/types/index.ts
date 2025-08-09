export type TaskStatus = "todo" | "progress" | "review" | "done" | "overdue";
export type Priority = "high" | "medium" | "low" | "urgent";
export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";
export type TaskType = "bug" | "feature" | "improvement";

export type Project = {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  createdBy: Pick<User, "_id" | "name" | "avatar">;
  startDate: string;
  endDate: string;
  members: Pick<User, "_id" | "name" | "avatar" | "domain">[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export interface ProjectStat {
  total: number;
  active: number;
  completed: number;
  onHold: number;
  cancelled: number;
  totalBudget: number;
  totalSpent: number;
  averageProgress: number;
}

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  project: Pick<Project, "_id" | "name" | "status" | "endDate"> | null;
  type: TaskType;
  assignee: Pick<User, "_id" | "name" | "avatar"> | null; // will be target entity
  isPersonal: boolean;
  dueDate: string;
  estimatedTime: string;
  tags: string[];
  createdBy: Pick<User, "_id" | "name" | "avatar">;
  createdAt: string;
  updatedAt: string;
};

export type CustomError = Error & {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
};

export type ApiResponse<T> = {
  status: number;
  message?: string;
  data: T;
};

export type Role = "admin" | "project_manager" | "user";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  domain: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
