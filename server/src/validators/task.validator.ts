import { TaskStatus } from "@/types";
import { body, param } from "express-validator";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["high", "medium", "low", "urgent"])
    .withMessage("Priority must be one of: high, medium, low, urgent"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["bug", "feature", "improvement"])
    .withMessage("Type must be one of: bug, feature, improvement"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate(),

  body("estimatedTime")
    .notEmpty()
    .withMessage("Estimated time is required")
    .matches(/^\d+[hm]$/)
    .withMessage("Estimated time must be like '3h' or '45m'"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags: string[]) => {
      const isValid = tags.every(
        (tag) => typeof tag === "string" && tag.trim().length > 0
      );
      if (!isValid) throw new Error("Each tag must be a non-empty string");
      return true;
    }),
];

export const updateTaskStatusValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task id is required in params")
    .isMongoId()
    .withMessage("Invalid task id"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(TaskStatus))
    .withMessage(
      `Status could be either ${Object.values(TaskStatus).join(", ")}}`
    ),
];
export const updateTaskDuedateValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task id is required in params")
    .isMongoId()
    .withMessage("Invalid task id"),
  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate(),
];

export const assignTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("assignee")
    .notEmpty()
    .withMessage("Assignee id is required")
    .isMongoId()
    .withMessage("Invalid id for assignee"),

  body("project")
    .notEmpty()
    .withMessage("Project selection is must to assign task")
    .isMongoId()
    .withMessage("Invalid project id"),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["high", "medium", "low", "urgent"])
    .withMessage("Priority must be one of: high, medium, low, urgent"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["bug", "feature", "improvement"])
    .withMessage("Type must be one of: bug, feature, improvement"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate(),

  body("estimatedTime")
    .notEmpty()
    .withMessage("Estimated time is required")
    .matches(/^\d+[hm]$/)
    .withMessage(
      "Estimated time must be in the format like '2h' (hours) or '30m' (minutes)'"
    ),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => {
      if (!Array.isArray(tags)) throw new Error("Tags must be an array");
      const isValid = tags.every(
        (tag) => typeof tag === "string" && tag.trim().length > 0
      );
      if (!isValid) throw new Error("Each tag must be a non-empty string");
      return true;
    }),
];

export const deleteTaskValidator = param("taskId")
  .notEmpty()
  .withMessage("Task id is missing in params")
  .isMongoId()
  .withMessage("Invalid task id.");

export const getTaskInfoValidator = param("taskId")
  .notEmpty()
  .withMessage("Task id is missing in params")
  .isMongoId()
  .withMessage("Invalid task id.");
