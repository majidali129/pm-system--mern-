import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI!,
  NODE_ENV: process.env.NODE_ENV!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_ACCESS_TOKEN_EXPIRY: process.env
    .JWT_ACCESS_TOKEN_EXPIRY! as ms.StringValue,
  JWT_REFRESH_TOKEN_EXPIRY: process.env
    .JWT_REFRESH_TOKEN_EXPIRY! as ms.StringValue,
  DEFAULT_RESPONSE_LIMIT: process.env.DEFAULT_RESPONSE_LIMIT!,
  DEFAULT_RESPONSE_OFFSET: process.env.DEFAULT_RESPONSE_OFFSET!,
};
