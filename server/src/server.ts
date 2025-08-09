import express, { Request, Response } from "express";
import { config } from "@/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import { connectDB, disconnectFromDB } from "./lib/connect-db";

import v1Routes from "@/routes";
import { globalErrorController } from "./controllers/global-error-controller";

const app = express();
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) {
      return callback(null, true);
    }

    // Add allowed origins here
    const allowedOrigins = ["http://localhost:5173"];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error(`CORS ERROR: ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

(async () => {
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // DB connection
  await connectDB();

  // ROUTES Instantions
  app.use("/api/v1", v1Routes);

  // API HEALTH
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, environment: config.NODE_ENV });
  });

  app.listen(config.PORT, () => {
    console.log(`App is running at port ${config.PORT}`);
  });

  // GLOBAL ERROR HANDLER
  app.use(globalErrorController);
})();

const shutdownServer = async () => {
  try {
    await disconnectFromDB();
    console.log("Shutting down server...");
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown:", error);
  }
};

process.on("SIGTERM", shutdownServer);
process.on("SIGINT", shutdownServer);
