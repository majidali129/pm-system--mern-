import {
  assignTask,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskInfo,
  updateTaskStatus,
} from "@/controllers/v1/tasks.controller";
import { authorize } from "@/middlewares/authorize";
import { validationError } from "@/middlewares/validation-error";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { Role } from "@/types";
import {
  assignTaskValidator,
  createTaskValidator,
  deleteTaskValidator,
  getTaskInfoValidator,
  updateTaskDuedateValidator,
  updateTaskStatusValidator,
} from "@/validators/task.validator";
import { Router } from "express";

const router = Router();

router.post("/", verifyJWT, createTaskValidator, validationError, createTask);
router.put(
  "/:taskId/status",
  verifyJWT,
  updateTaskStatusValidator,
  validationError,
  updateTaskStatus
);

router.post(
  "/assign",
  verifyJWT,
  authorize([Role.admin, Role.project_manager]),
  assignTaskValidator,
  validationError,
  assignTask
);

router.delete(
  "/:taskId",
  verifyJWT,
  deleteTaskValidator,
  validationError,
  deleteTask
);

router.get("/", verifyJWT, getAllTasks);
router.get(
  "/:taskId",
  verifyJWT,
  getTaskInfoValidator,
  validationError,
  getTaskInfo
);

export default router;
