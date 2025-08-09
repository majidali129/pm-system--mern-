import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { projectStatusColor } from "@/utils/constants";
import type { Project } from "@/types/index";
import { ProjectMoreMenu } from "./project-more-menu";
import { statusIcons } from "@/utils/constants";
import { Target } from "lucide-react";
import { Link } from "react-router";

type ProjectItemProps = {
  project: Project;
};

export const ProjectItem = ({ project }: ProjectItemProps) => {
  const StatusIcon = statusIcons[project.status];

  return (
    <Link to={`${project._id}`}>
      <Card
        key={project._id}
        className="hover:shadow-card transition-shadow duration-300 hover:-translate-y-1 gap-0 py-6 *:px-4"
      >
        {/* Same card content */}
        <CardHeader>
          <div className="flex flex-between ">
            <h5
              className={`text-[1rem] font-medium  text-foreground line-clamp-1`}
            >
              {project.name}
            </h5>
            {/* <TaskMoreMenu task={task} /> */}
            <ProjectMoreMenu project={project} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{/* {} */} web-dev</Badge>

              <Badge className={projectStatusColor[project.status]}>
                <StatusIcon /> {project.status}
              </Badge>
            </div>
            <CardDescription className="text-xs line-clamp-1">
              {project.description}
            </CardDescription>
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            {/* Tasks */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Target className="w-3 h-3" />
                <span>Tasks</span>
              </div>
              <span className="font-medium">
                {/* {project.tasksCompleted} / {project.tasksTotal} */}
                20/43
              </span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
