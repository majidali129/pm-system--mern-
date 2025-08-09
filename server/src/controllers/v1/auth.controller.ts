import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { IUser, User } from "@/models/user.model";
import { apiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import { config } from "@/config";

type SignUpUserData = Pick<
  IUser,
  "name" | "email" | "password" | "domain" | "role"
>;
type LoginUserData = Pick<IUser, "email" | "password">;

export const registerUser = asyncHandler(async (req, res, next) => {
  const userData = req.body as SignUpUserData;

  const existingUser = await User.findOne({ email: userData.email })
    .lean()
    .exec();
  if (existingUser) return next(new apiError(400, "Email is already in use"));

  const user = await User.create(userData);

  if (!user) return next(new apiError(404, "User creation error"));

  return apiResponse(res, 201, user, "User registered successfully");
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as LoginUserData;
  console.log(email, password);

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new apiError(404, "Account not found"));
  console.log(user);

  const isPassworCorrect = await bcrypt.compare(password, user.password);

  if (!isPassworCorrect)
    return next(new apiError(400, "Invali email or password"));

  const accessToken = generateAccessToken(
    user._id as Types.ObjectId,
    user.role
  );

  const refreshToken = generateRefreshToken(
    user._id as Types.ObjectId,
    user.role
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV === "production",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV === "production",
  });

  user.refreshToken = refreshToken;
  user.isActive = true;

  await user.save();

  return apiResponse(res, 200, { accessToken }, "Login successfully");
});

export const logout = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV === "production",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: config.NODE_ENV === "production",
  });

  await User.findByIdAndUpdate(userId, {
    $unset: { refreshToken: "" },
    $set: { isActive: false },
  });

  return apiResponse(res, 204, null);
});

export const refreshToken = asyncHandler(async (req, res, next) => {});
