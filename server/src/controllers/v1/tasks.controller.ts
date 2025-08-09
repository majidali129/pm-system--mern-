import { Project } from "@/models/project.model";
import { ITask, Task } from "@/models/task.model";
import { User } from "@/models/user.model";
import { Role, TaskStatus } from "@/types";
import { apiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { isOwner } from "@/utils/is-owner";

type NewTaskData = Pick<
  ITask,
  | "title"
  | "description"
  | "priority"
  | "type"
  | "dueDate"
  | "estimatedTime"
  | "tags"
>;
type AssignTaskData = NewTaskData & Pick<ITask, "assignee" | "project">;

export const createTask = asyncHandler(async (req, res, next) => {
  const taskData = req.body as NewTaskData;
  const userId = req.userId!;

  const task = await Task.create({ ...taskData, createdBy: userId });
  if (!task) return next(new apiError(404, "Task creation error"));

  return apiResponse(res, 201, { task }, "Task created successfully");
});

export const updateTaskStatus = asyncHandler(async (req, res, next) => {
  const taskId = req.params.taskId!;
  const { status } = req.body as { status: TaskStatus };

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: { status },
    },
    { new: true }
  );

  if (!updatedTask)
    return next(new apiError(404, "Error occured while updating task status"));

  return apiResponse(res, 200, { updatedTask }, `Status updated to ${status}`);
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId!);
  if (!task) return next(new apiError(404, "Task no longer exits"));
  console.log(task.createdBy.toString(), req.userId?.toString()!);

  if (!isOwner(task.createdBy.toString(), req.userId?.toString()!))
    return next(new apiError(403, "Only the task owner can delete this task."));

  const deletedTask = await Task.findByIdAndDelete(task._id);
  if (!deletedTask)
    return next(new apiError(500, "Error occurred while deleting the task"));

  return apiResponse(res, 200, null, "Task deleted successfully");
});

export const assignTask = asyncHandler(async (req, res, next) => {
  const assignedTaskData = req.body as AssignTaskData;
  const userId = req.userId!;
  const assigneeId = assignedTaskData.assignee!;

  const assignee = await User.findById(assigneeId).lean().exec();
  const project = await Project.findById(assignedTaskData.project!);
  if (!assignee) return next(new apiError(404, "Assignee no longer exists"));
  if (!project) return next(new apiError(404, "project no longer exists"));

  if (!isOwner(project.createdBy.toString(), userId.toString()))
    return next(new apiError(403, "Only the project owner can assign tasks"));

  const assignedTask = await Task.create({
    ...assignedTaskData,
    createdBy: userId,
    isPersonal: false,
  });
  if (!assignedTask) return next(new apiError(404, "Task in task assignment"));

  return apiResponse(res, 201, { assignedTask }, "Task assigned successfully");
});

export const getAllTasks = asyncHandler(async (req, res, _next) => {
  const query: any = {};
  const userId = req.userId;
  const user = await User.findById(userId)!;
  if (!user) {
    return apiResponse(res, 404, {
      message: "User not found. Account needed to get access.",
    });
  }
  const userRole = user.role as Role;
  if (userRole === Role.user) {
    query.$or = [{ createdBy: userId, isPersonal: true }, { assignee: userId }];
  } else if (userRole === Role.project_manager) {
    query.createdBy = userId;
  }

  // if()
  const tasks = await Task.find(query)
    .populate({ path: "assignee", select: "_id name avatar" })
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "project", select: "_id name status endDate" })
    .lean()
    .exec();

  return apiResponse(res, 200, tasks);
});

export const getTaskInfo = asyncHandler(async (req, res, next) => {
  const taskId = req.params.taskId;
  const task = await Task.findById(taskId)
    .populate({ path: "assignee", select: "_id name avatar" })
    .populate({ path: "createdBy", select: "_id name avatar role" })
    .populate({ path: "project", select: "_id name status endDate" })
    .lean()
    .exec();

  if (!task) return next(new apiError(404, "Task not found"));

  return apiResponse(res, 200, { task });
});
