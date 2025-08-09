import { config } from "@/config";
import { CustomError } from "@/types";
import { apiError } from "@/utils/api-error";
import { NextFunction, Request, Response } from "express";
import { CastError } from "mongoose";
import { Error as MongooseError } from "mongoose";

const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: CustomError, res: Response) => {
  // operational error,:: trusted errors, send meaningful message to user
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });

    // programming error or other unknown:: don't leak error details;
  } else {
    // 1: Log Error
    console.log("Error 🎇", err);
    // 2: send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!!!",
    });
  }
};

const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new apiError(400, message);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;

  return new apiError(400, message);
};

const handleValidationError = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");

  const message = `Invalid input data. ${errors}`;
  return new apiError(400, message);
};

const handleJWTError = () =>
  new apiError(401, "Invalid token. Please log in again!");

const handleJWtExpiredError = () =>
  new apiError(401, "Your token has expired! Please log in again.");

export const globalErrorController = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";

  if (config.NODE_ENV.trim() === "development") {
    sendErrorDev(err, res);
  } else if (config.NODE_ENV.trim() === "production") {
    let error = { ...err, message: err.message, name: err.name } as any;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(err);
    if (error.name === "ValidationError")
      error = handleValidationError(
        err as unknown as MongooseError.ValidationError
      );

    console.log(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWtExpiredError();

    sendErrorProd(error as CustomError, res);
  }
};
