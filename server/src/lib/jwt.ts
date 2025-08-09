import jwt, { TokenExpiredError } from "jsonwebtoken";
import { config } from "@/config";
import { Types } from "mongoose";
import { Role } from "@/types";

export const generateAccessToken = (
  userId: Types.ObjectId,
  role: Role
): string => {
  return jwt.sign({ userId, role }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY,
    subject: "accessToken",
  });
};

export const generateRefreshToken = (
  userId: Types.ObjectId,
  role: Role
): string => {
  return jwt.sign({ userId, role }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_TOKEN_EXPIRY,
    subject: "refreshApi",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_ACCESS_SECRET) as {
      userId: Types.ObjectId;
      role: Role;
    };
  } catch (error) {
    throw error;
  }
};
