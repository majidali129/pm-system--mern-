import { config } from "@/config";
import mongoose, { ConnectOptions } from "mongoose";

const clientOptions: ConnectOptions = {
  dbName: "project-management-system",
  appName: "Project Management System",
  serverApi: {
    version: "1",
    deprecationErrors: true,
    strict: true,
  },
};

export const connectDB = async () => {
  if (!config.MONGODB_URI) {
    throw new Error("MongoDB URI not provided in the environment variables.");
  }

  try {
    await mongoose.connect(config.MONGODB_URI, clientOptions);
    console.log("Connect to DB 🚀", {
      uri: config.MONGODB_URI,
      options: clientOptions,
    });
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
};

export const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from DB", {
      uri: config.MONGODB_URI,
      options: clientOptions,
    });
  } catch (error) {
    console.log("Error while disconnecting from DB", error);
  }
};
