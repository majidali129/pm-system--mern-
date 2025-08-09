import { ProjectStatus } from "@/types";
import { Document, model, Schema, Types } from "mongoose";

// export interface IProject {}
export interface IProject extends Document {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  createdBy: Types.ObjectId; // PROJECT-MANAGER | ADMIN
  startDate: string;
  endDate: string;
  tags?: string[];
  members: Types.ObjectId[]; // will user ids
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(ProjectStatus),
        message: "Invalid status selection",
      },
      default: ProjectStatus.planning,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      default: 0,
    },
    spent: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: String,
      required: [true, "Project start date is required"],
    },
    endDate: {
      type: String,
      required: [true, "Project end date is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = model<IProject>("Project", projectSchema);
