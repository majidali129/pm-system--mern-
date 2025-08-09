import { Placeholder } from "@/components/placeholder";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/features/auth/hooks/use-user";
import { AssignTaskForm } from "@/features/tasks/components/assign-task-form";
import type { Project } from "@/types";
import { getPriorityColors, taskStatusColors } from "@/utils/constants";
import { isPmOrAdmin } from "@/utils/is-pm-or-admin";
import { format } from "date-fns";
import {
  Calendar,
  ClipboardList,
  File,
  Plus,
  User,
  UserPlus,
} from "lucide-react";
import { useProjectTasks } from "../hooks/use-project-tasks";
import { isOwner } from "@/utils/is-owner";

type ProjectTasksListProps = {
  project: Project;
};
export const ProjectTasksList = ({ project }: ProjectTasksListProps) => {
  const { user, loadingUser } = useUser();
  const { projectTasks, loadingTasks } = useProjectTasks(project._id);

  if (!user || loadingUser) return <Spinner />;
  if (loadingTasks || !projectTasks) return <Spinner />;

  const projectMembers = project.members.length || 0;
  const ismanagerOrAdmin = isPmOrAdmin(user.role);
  const assignTaskButton =
    ismanagerOrAdmin &&
    isOwner(user.name, project.createdBy.name) &&
    projectMembers > 0 ? (
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      </DialogTrigger>
    ) : null;

  if (projectTasks.length === 0)
    return (
      <Placeholder
        icon={<File />}
        title="No tasks assigned to anyone yet!"
        description="Assign task to project members to get it done"
        trigger={
          project.members.length > 0 ? (
            <ReusableDialog
              className="sm:!max-w-[35rem]  max-h-[50vh] md:max-h-[90vh] overflow-y-auto"
              children={<AssignTaskForm project={project} />}
              trigger={assignTaskButton}
            />
          ) : null
        }
      />
    );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Project Tasks ({projectTasks.length})
          </CardTitle>
          {ismanagerOrAdmin && project.members.length > 0 && (
            <ReusableDialog
              className="sm:!max-w-[35rem]  max-h-[50vh] md:max-h-[90vh] overflow-y-auto "
              children={<AssignTaskForm project={project} />}
              trigger={
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    <span className="hidden md:block"> Assign Task</span>
                  </Button>
                </DialogTrigger>
              }
            />
          )}
        </div>
        <CardDescription>Tasks assigned to team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 ">
          {projectTasks.map((task) => (
            <div key={task._id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{task.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={taskStatusColors[task.status]}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getPriorityColors[task.priority]}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="flex md:items-center justify-between gap-2.5 flex-col md:flex-row text-sm">
                <div className="flex items-center max-md:justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{task.assignee?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Due: {format(new Date(task.dueDate!), "MMM dd")}
                    </span>
                  </div>
                </div>

                {task.tags && task.tags.length > 0 && (
                  <div className="flex gap-1">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
