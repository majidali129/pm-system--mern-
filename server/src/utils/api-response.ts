import { Response } from "express";

export const apiResponse = <T>(
  res: Response,
  status: number,
  data?: T,
  message?: string
) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};
