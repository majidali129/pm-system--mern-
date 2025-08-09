import { HydratedDocument, model, Query, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Role } from "@/types";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  domain: string;
  avatar?: string;
  refreshToken?: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Invalid role selection",
      },
      default: Role.user,
    },
    domain: {
      type: String,
      required: [true, "Domain is required. Please mention it."],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});
// responsible to return only active users
userSchema.pre<Query<any, HydratedDocument<IUser>>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

export const User = model<IUser>("User", userSchema);
