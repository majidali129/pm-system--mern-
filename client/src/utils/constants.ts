import { CheckCircle2, Clock, Pause, Play, Target } from "lucide-react";

export const statusIcons = {
  planning: Clock,
  active: Play,
  "on-hold": Pause,
  completed: CheckCircle2,
  cancelled: Target,
};

import type { Priority, ProjectStatus, TaskStatus } from "@/types/index";

export const getPriorityColors: Record<Priority, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export const taskStatusColors: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  progress: "bg-blue-100 text-blue-700",
  review: "bg-teal-100 text-teal-700",
  done: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export const projectStatusColor: Record<ProjectStatus, string> = {
  planning: "bg-purple-100 text-purple-800 border-purple-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  "on-hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export const teamDomainColors = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-green-100 text-green-800",
  Design: "bg-purple-100 text-purple-800",
  DevOps: "bg-orange-100 text-orange-800",
  QA: "bg-red-100 text-red-800",
  Mobile: "bg-indigo-100 text-indigo-800",
  Data: "bg-teal-100 text-teal-800",
};

export const taskTypeOptions = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Improvement", value: "improvement" },
];

export const taskPriorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "Urgent", value: "urgent" },
];

export const emptyProjectMsg = {
  admin: {
    title: "You haven't created any projects yet.",
    description:
      "Start by creating your first project to organize work and collaborate with your team.",
  },
  ["project-manager"]: {
    title: "You haven't created any projects yet.",
    description:
      "Start by creating your first project to organize work and collaborate with your team.",
  },
  user: {
    title: "You're not part of any projects yet.",
    description: "Once you're added to a team or project, it will appear here.",
  },
};

export const emptyTaskMsg = {
  admin: {
    title: "No tasks found.",
    description:
      "Create tasks under your projects to manage and track progress effectively.",
  },
  ["project-manager"]: {
    title: "No tasks found.",
    description:
      "Start by creating tasks to plan work and assign responsibilities to your team.",
  },
  user: {
    title: "No tasks assigned to you yet.",
    description:
      "Once you're assigned to tasks in a project, they will appear here.",
  },
};
export const emptyActiveProjectMsg = {
  admin: {
    title: "No active projects yet.",
    description:
      "Create a new project or activate an existing one to start tracking progress and assigning tasks.",
  },
  ["project-manager"]: {
    title: "No active projects yet.",
    description:
      "Start managing work by creating or joining an active project.",
  },
  user: {
    title: "You're not part of any active projects.",
    description:
      "Once you're added to an active project by your team, it will show up here.",
  },
};
