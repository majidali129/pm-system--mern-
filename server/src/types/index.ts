export type CustomError = Error & {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
};

export enum Role {
  user = "user",
  project_manager = "project_manager",
  admin = "admin",
}

export enum ProjectStatus {
  planning = "planning",
  active = "active",
  on_hold = "on_hold",
  completed = "completed",
  cancelled = "cancelled",
}

export enum TaskStatus {
  todo = "todo",
  progress = "progress",
  review = "review",
  done = "done",
  overdue = "overdue",
}

export enum Priority {
  high = "high",
  medium = "medium",
  low = "low",
  urgent = "urgent",
}

export enum TaskType {
  bug = "bug",
  feature = "feature",
  impro = "improvement",
}
