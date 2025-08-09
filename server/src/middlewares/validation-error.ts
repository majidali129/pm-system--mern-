import { apiError } from "@/utils/api-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatedErrors = errors.mapped();

    const message = Object.values(formatedErrors)
      .map((err) => err.msg)
      .join(". ");

    return next(new apiError(400, message));
  }

  next();
};
