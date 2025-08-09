import { Priority, TaskStatus, TaskType } from "@/types";
import { Document, model, Schema, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  project?: Types.ObjectId;
  type: TaskType;
  assignee?: Types.ObjectId;
  isPersonal: boolean;
  dueDate: Date;
  estimatedTime: string;
  tags: string[];
  createdBy: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    priority: {
      type: String,
      enum: {
        values: ["high", "medium", "low", "urgent"],
        message: "Priority must be one of: high, medium, low, urgent",
      },
      required: [true, "Task priority is required"],
      default: Priority.medium,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
      default: null,
    },
    type: {
      type: String,
      enum: {
        values: ["bug", "feature", "improvement"],
        message: "Type must be one of: bug, feature, improvement",
      },
      required: [true, "Task type is required"],
      default: TaskType.feature,
    },
    status: {
      type: String,
      required: [true, "Task status is required"],
      default: TaskStatus.todo,
    },
    assignee: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    isPersonal: {
      type: Boolean,
      default: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    estimatedTime: {
      type: String,
      required: [true, "Estimated time is required"],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.every((tag) => typeof tag === "string" && tag.length > 0);
        },
        message: "Tags must be a list of non-empty strings",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task author is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>("Task", taskSchema);
