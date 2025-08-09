import {
  allocateTeamToProject,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectInfo,
  getProjectTasks,
  removeTeamMemberFromProject,
  updateProjectEndDate,
  updateProjectStatus,
} from "@/controllers/v1/project.controller";
import { authorize } from "@/middlewares/authorize";
import { validationError } from "@/middlewares/validation-error";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { Role } from "@/types";
import { createProjectValidator } from "@/validators/project.validator";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  verifyJWT,
  authorize([Role.project_manager, Role.admin]),
  createProjectValidator,
  validationError,
  createProject
);

router.delete(
  "/:projectId",
  verifyJWT,
  authorize([Role.project_manager, Role.admin]),
  deleteProject
);
router.get("/:projectId", verifyJWT, getProjectInfo);
router.get(
  "/:projectId/tasks",
  verifyJWT,
  // authorize([Role.project_manager, Role.admin]),
  getProjectTasks
);

router.put(
  "/:projectId/status",
  verifyJWT,
  authorize([Role.project_manager, Role.admin]),
  updateProjectStatus
);
router.put(
  "/:projectId/endDate",
  verifyJWT,
  authorize([Role.project_manager, Role.admin]),
  updateProjectEndDate
);

router.put(
  "/:projectId/allocate-team",
  verifyJWT,
  authorize([Role.admin, Role.project_manager]),
  allocateTeamToProject
);
router.put(
  "/:projectId/remove-team-member",
  verifyJWT,
  authorize([Role.admin, Role.project_manager]),
  removeTeamMemberFromProject
);

router.get("/", verifyJWT, getAllProjects);
// router.get("/stats", getProjectStats);

export default router;
