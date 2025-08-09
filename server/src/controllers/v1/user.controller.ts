import { User } from "@/models/user.model";
import { apiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";

type QueryType = {
  domain?: string;
  isActive?: Boolean;
};

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { domain, isActive } = req.query;
  const reqQuery: QueryType = {};
  if (typeof domain === "string") {
    reqQuery.domain = domain;
  }

  if (typeof isActive === "string") {
    reqQuery.isActive = isActive.toLowerCase() === "true";
  }

  const users = await User.find({
    ...reqQuery,
    _id: { $ne: req.userId! },
    role: "user",
  })
    .select("-refreshToken -__v ")
    .lean()
    .exec();
  const total = await User.countDocuments();

  return apiResponse(res, 200, users);
});

export const getUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId!)
    .select("-refreshToken -__v ")
    .lean()
    .exec();
  if (!user) return next(new apiError(404, "User not found"));

  return apiResponse(res, 200, { user });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId!)
    .select("-refreshToken -__v ")
    .lean()
    .exec();

  if (!user) return next(new apiError(404, "Account no longer exist"));

  return apiResponse(res, 200, { ...user, authenticated: true });
});

export const removeUser = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userId!);

  if (!deletedUser)
    return next(new apiError(404, "Error while removing the user"));

  return apiResponse(res, 204);
});
