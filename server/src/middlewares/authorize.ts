import { User } from "@/models/user.model";
import { Role } from "@/types";
import { apiError } from "@/utils/api-error";
import { asyncHandler } from "@/utils/async-handler";

export const authorize = (
  roles: (Role.user | Role.project_manager | Role.admin)[]
) => {
  return asyncHandler(async (req, _res, next) => {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return next(new apiError(404, "User not found"));

    if (!roles.includes(user.role))
      return next(
        new apiError(
          403,
          "Access denied. You do not have permission to perform this action."
        )
      );
    next();
  });
};
