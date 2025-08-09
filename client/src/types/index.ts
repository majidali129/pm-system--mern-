export type TaskStatus = "todo" | "progress" | "review" | "done" | "overdue";
export type Priority = "high" | "medium" | "low" | "urgent";
export type ProjectStatus =
  | "planning"
  | "active"
  | "on-hold"
  | "completed"
  | "cancelled";
export type TaskType = "bug" | "feature" | "improvement";

export type Project = {
  id: string | number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  createdBy: string; // PROJECT-MANAGER | ADMIN
  startDate: string;
  endDate: string;
  team: {
    name: string;
    members: {
      id: string;
      userName: string;
      avatar?: string;
      email?: string;
      domain: string;
    }[];
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  project: string | null;
  type: TaskType;
  assignee: string | null; // will be target entity
  isPersonal: boolean;
  dueDate: string | null;
  estimatedTime: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
