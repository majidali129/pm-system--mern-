import {
  getAllUsers,
  getCurrentUser,
  getUserInfo,
  removeUser,
} from "@/controllers/v1/user.controller";
import { authorize } from "@/middlewares/authorize";
import { validationError } from "@/middlewares/validation-error";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { Role } from "@/types";
import { Router } from "express";
import { param } from "express-validator";

const router = Router();

router.get(
  "/",
  verifyJWT,
  // authorize([Role.admin, Role.project_manager]),
  getAllUsers
);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get(
  "/:userId",
  verifyJWT,
  authorize([Role.admin]),
  param("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid id provided"),
  validationError,
  getUserInfo
);

router.delete(
  "/:userId",
  verifyJWT,
  authorize([Role.admin]),
  param("userId")
    .notEmpty()
    .withMessage("User is is missing in params")
    .isMongoId()
    .withMessage("Invali user Id"),
  validationError,
  removeUser
);

export default router;
