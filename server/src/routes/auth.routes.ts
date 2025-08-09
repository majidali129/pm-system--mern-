import { login, logout, registerUser } from "@/controllers/v1/auth.controller";
import { validationError } from "@/middlewares/validation-error";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { loginValiator, signUpValidator } from "@/validators/auth.validator";
import { Router } from "express";

const router = Router();

router.post("/register", signUpValidator, validationError, registerUser);
router.post("/login", loginValiator, validationError, login);
router.post("/logout", verifyJWT, logout);

export default router;
