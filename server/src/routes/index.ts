import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import projectRoutes from "@/routes/project.routes";
import taskRoutes from "@/routes/task.routes";
import userRoutes from "@/routes/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

export default router;
