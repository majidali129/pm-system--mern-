import { Role } from "@/types";
import { body } from "express-validator";

export const signUpValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must be atleast 4 characters")
    .isLength({ max: 91 })
    .withMessage("Name must be within 91 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Passowrd is required")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long")
    .isLength({ max: 91 })
    .withMessage("Password must be within 91 characters"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(Role))
    .withMessage("Role can be either USER, PROJECT_MANAGER or ADMIN"),
  body("domain").notEmpty().withMessage("Domain is required"),
];

export const loginValiator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Passowrd is required")
    .isLength({ min: 8 }),
];
