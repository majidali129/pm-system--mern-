import { verifyToken } from "@/lib/jwt";
import { apiError } from "@/utils/api-error";
import { asyncHandler } from "@/utils/async-handler";
import { Types } from "mongoose";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromCookie = req.cookies?.accessToken;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new apiError(401, "Access denied, no token provided"));
  }

  const token = authHeader?.split(" ")[1] || tokenFromCookie;

  try {
    const jwtPayload = verifyToken(token) as { userId: Types.ObjectId };
    req.userId = jwtPayload.userId;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(
        new apiError(401, "Your token has expired! Please log in again.")
      );
    }
    if (error.name === "JsonWebTokenError") {
      return next(new apiError(401, "Invalid token. Please log in again!"));
    }
    next(error);
  }
});
