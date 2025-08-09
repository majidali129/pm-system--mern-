import { Button } from "@/components/ui/button";
import { DashboardStats } from "./dashboard-stats";
import { Folder, FolderOpen, MoveRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";
import { Link } from "react-router";
import { projectDetailsPath, projectsPath } from "@/paths";
import { useUser } from "@/features/auth/hooks/use-user";
import { emptyActiveProjectMsg, projectStatusColor } from "@/utils/constants";
import type { Project, Role } from "@/types";
import { format } from "date-fns";
import { Placeholder } from "@/components/placeholder";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { Spinner } from "@/components/spinner";
import { useTasks } from "@/features/tasks/hooks/use-tasks";

export const Dashboard = () => {
  const { projects, loadingProjects } = useProjects();
  const { tasks, loadingTasks } = useTasks();
  const { user } = useUser();
  const currentUsername = user?.name;
  const role = user?.role as Role;

  if (loadingProjects || !projects) return <Spinner />;
  if (loadingTasks || !tasks) return <Spinner />;

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );

  const completedTasks = tasks.filter((task) => task.status === "done");

  const getTeamMembers = () => {
    const teamMemberSet = new Set<string>();

    projects.forEach((project) => {
      const isOwnedByPM =
        role === "project_manager" &&
        project.createdBy.name === currentUsername;
      const isUserTeamMember =
        role === "user" &&
        project.members.some((m) => m.name === currentUsername);

      if (role === "admin" || isOwnedByPM || isUserTeamMember) {
        project.members.forEach((member) => {
          if (member.name !== currentUsername) {
            teamMemberSet.add(member.name);
          }
        });
      }
    });
    return Array.from(teamMemberSet);
  };

  const teamMembers = getTeamMembers();

  const getComingDeadlines = () => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    return tasks.filter((task) => {
      const due = task.dueDate ? new Date(task.dueDate) : null;

      if (!due || task.status === "done") return false;

      const isInRange = due > now && due <= nextWeek;

      if (role === "admin") return isInRange;

      if (role === "project_manager") {
        return (
          isInRange &&
          (task.isPersonal || task.createdBy.name === currentUsername)
        );
      }

      // Normal user
      return (
        isInRange &&
        (task.isPersonal ||
          task.createdBy.name === currentUsername ||
          task.assignee?.name === currentUsername)
      );
    });
  };

  const filteredProjects = projects.filter(
    (project) => project.status === "active"
  );

  return (
    <section className="space-y-10 md:space-y-8 ">
      <div className="flex items-center justify-between">
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button asChild>
          <Link to={`/${projectsPath()}`}>
            <Folder className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>
      <DashboardStats
        activeProjects={activeProjects.length}
        completedTasks={completedTasks.length}
        teamMembers={teamMembers.length}
        upcomingDeadlines={getComingDeadlines().length}
      />
      <div className="space-y-7 md:space-y-5">
        <div className="flex-between">
          <h3>Active Projects ({filteredProjects.length})</h3>
          <Button
            asChild
            variant="outline"
            className="h-auto group hover:not(.dark):!text-primary hover:not(.dark):!bg-primary/5 transition-all duration-200"
          >
            <Link to={`/${projectsPath()}`}>
              View All Projects
              <span className="hidden group-hover:block transition-all duration-200">
                <MoveRight />
              </span>
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </ul>
        ) : (
          <Placeholder
            icon={<FolderOpen className="w-8 h-8" />}
            title={emptyActiveProjectMsg[role].title}
            description={emptyActiveProjectMsg[role].description}
          />
        )}
      </div>
    </section>
  );
};

function ProjectItem({ project }: { project: Project }) {
  return (
    <Card key={project._id} className="b group ">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link to={`/${projectDetailsPath(project._id)}`}>
              <CardTitle className=" group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
            </Link>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {project.progress}%
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Status and Due Date */}
        <div className="flex items-center justify-between">
          <Badge className={projectStatusColor[project.status]}>
            {project.status}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {format(new Date(project.endDate), "dd MM yyyy")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
