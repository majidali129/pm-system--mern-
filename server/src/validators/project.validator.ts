import { body } from "express-validator";

export const createProjectValidator = [
  body("name").trim().notEmpty().withMessage("Please provide a project name."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Please provide a brief description of the project."),

  body("budget")
    .notEmpty()
    .withMessage("Budget is required.")
    .isInt({ min: 0 })
    .withMessage("Budget must be a non-negative integer."),

  body("spent")
    .notEmpty()
    .withMessage("Spent amount is required.")
    .isInt({ min: 0 })
    .withMessage("Spent amount must be a non-negative integer."),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date in ISO8601 format (e.g., 2025-08-06)."
    )
    .toDate(),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required.")
    .isISO8601()
    .withMessage(
      "End date must be a valid date in ISO8601 format (e.g., 2025-08-06)."
    )
    .toDate()
    .custom((value, { req }) => {
      if (value < req.body.startDate) {
        throw new Error("End date cannot be earlier than start date.");
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings.")
    .custom((tags) => {
      if (!tags.every((tag: string) => typeof tag === "string")) {
        throw new Error("Each tag must be a string.");
      }
      return true;
    }),
];
