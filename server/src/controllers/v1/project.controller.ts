import { IProject, Project } from "@/models/project.model";
import { Task } from "@/models/task.model";
import { User } from "@/models/user.model";
import { ProjectStatus, Role } from "@/types";
import { apiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { isOwner } from "@/utils/is-owner";

type CreateProjectData = Pick<
  IProject,
  "name" | "description" | "budget" | "spent" | "startDate" | "endDate" | "tags"
>;
export const createProject = asyncHandler(async (req, res, next) => {
  const projectData = req.body as CreateProjectData;
  const userId = req.userId;

  const project = await Project.create({
    ...projectData,
    progress: 0,
    createdBy: userId,
  });

  if (!project) return next(new apiError(404, "Project creation error"));

  return apiResponse(res, 201, project, "Project created successfully");
});

export const deleteProject = asyncHandler(async (req, res, next) => {
  const userId = req.userId!;
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);

  if (!project) return next(new apiError(404, "Project no longer exists"));
  if (!isOwner(project.createdBy.toString(), userId.toString())) {
    return next(
      new apiError(
        403,
        "Access denied. Only the project owner can delete this project."
      )
    );
  }

  await Project.findByIdAndDelete(projectId);

  return apiResponse(res, 204, null, "Project deleted successfully");
});

export const getAllProjects = asyncHandler(async (req, res, next) => {
  const query: any = {};
  const userId = req.userId;
  const user = await User.findById(userId)!;
  if (!user) {
    return apiResponse(res, 404, {
      message: "User not found. Account needed to get access.",
    });
  }
  const userRole = user.role as Role;
  if (userRole === Role.project_manager) {
    query.$or = [{ createdBy: userId }, { members: userId }];
  } else {
    if (userRole === Role.user) {
      query.members = userId;
    }
  }
  const projects = await Project.find(query)
    .select("-__v")
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "members", select: "_id name domain avatar" })
    .lean()
    .exec();

  return apiResponse(res, 200, projects);
});
export const getProjectInfo = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId!)
    .select("-__v")
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "members", select: "_id name domain avatar" })
    .lean()
    .exec();

  if (!project) return apiResponse(res, 404, null, "Project not found");

  return apiResponse(res, 200, project);
});

export const updateProjectStatus = asyncHandler(async (req, res, next) => {
  const projectId = req.params.projectId!;
  const userId = req.userId!;
  const { status } = req.body as { status: ProjectStatus };

  const project = await Project.findById(projectId);

  if (!project) return next(new apiError(404, "Project no longer exists"));
  if (!isOwner(project.createdBy.toString(), userId.toString())) {
    return next(
      new apiError(
        403,
        "Access denied. Only the project owner can update the project status."
      )
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: { status },
    },
    { new: true }
  )
    .select("-__v")
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "members", select: "_id name domain avatar" })
    .lean()
    .exec();

  if (!updatedProject)
    return next(
      new apiError(404, "Error occured while updating project status")
    );

  return apiResponse(
    res,
    200,
    { ...updatedProject },
    `Status updated to ${status}`
  );
});

export const updateProjectEndDate = asyncHandler(async (req, res, next) => {
  const projectId = req.params.projectId!;
  const userId = req.userId!;
  const { endDate } = req.body as { endDate: Date };

  const project = await Project.findById(projectId);

  if (!project) return next(new apiError(404, "Project no longer exists"));
  if (!isOwner(project.createdBy.toString(), userId.toString())) {
    return next(
      new apiError(
        403,
        "Access denied. Only the project owner can update the project endDate."
      )
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: { endDate },
    },
    { new: true }
  )
    .select("-__v")
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "members", select: "_id name domain avatar" })
    .lean()
    .exec();

  if (!updatedProject)
    return next(
      new apiError(404, "Error occured while updating project due date")
    );

  return apiResponse(
    res,
    200,
    { ...updatedProject },
    `End date updated to ${new Date(endDate).toDateString()}`
  );
});

export const allocateTeamToProject = asyncHandler(async (req, res, next) => {
  const { members: newMembers } = req.body as { members: string[] };
  const projectId = req.params.projectId;
  const userId = req.userId!;

  const project = await Project.findById(projectId);

  if (!project) return next(new apiError(404, "Project no longer exists"));
  if (!isOwner(project.createdBy.toString(), userId.toString())) {
    return next(
      new apiError(
        403,
        "Access denied. Only the project owner can allocate team or add member to project"
      )
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: { members: [...newMembers, ...project.members] },
    },
    { new: true }
  )
    .select("-__v")
    .populate({ path: "createdBy", select: "_id name avatar" })
    .populate({ path: "members", select: "_id name domain avatar" })
    .lean()
    .exec();

  if (!updatedProject)
    return next(new apiError(404, "Error occured while allocating team."));

  return apiResponse(
    res,
    200,
    { ...updatedProject },
    `Team allocated successfully`
  );
});

export const removeTeamMemberFromProject = asyncHandler(
  async (req, res, next) => {
    const { memberId } = req.body as { memberId: string };
    const projectId = req.params.projectId;
    const userId = req.userId!;

    const project = await Project.findById(projectId);

    if (!project) return next(new apiError(404, "Project no longer exists"));
    if (!isOwner(project.createdBy.toString(), userId.toString())) {
      return next(
        new apiError(
          403,
          "Access denied. Only the project owner can update the project status."
        )
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          members: project.members.filter(
            (member) => member.toString() !== memberId
          ),
        },
      },
      { new: true }
    )
      .select("-__v")
      .populate({ path: "createdBy", select: "_id name avatar" })
      .populate({ path: "members", select: "_id name domain avatar" })
      .lean()
      .exec();

    if (!updatedProject)
      return next(new apiError(404, "Error occured while removing the member"));

    return apiResponse(
      res,
      200,
      { ...updatedProject },
      `Member removed successfully`
    );
  }
);
export const getProjectTasks = asyncHandler(async (req, res, next) => {
  const projectId = req.params.projectId!;
  const tasks = await Task.find({ project: projectId }).lean().exec();

  return apiResponse(res, 200, tasks);
});

export const getProjectStats = asyncHandler(async (req, res, next) => {});
