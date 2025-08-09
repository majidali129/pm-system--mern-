import { ProjectItem } from "./project-item";
import { Input } from "@/components/ui/input";
import { FolderOpen, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProjectStatusSelect } from "./project-status-select";
import { applySearch } from "../project-slice";
import { useUser } from "@/features/auth/hooks/use-user";
import type { Role } from "@/services/user-service";
import { Placeholder } from "@/components/placeholder";
import { emptyProjectMsg } from "@/utils/constants";

export const ProjectsList = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  const query = useAppSelector((state) => state.projects.query).toLowerCase();
  const { status } = useAppSelector((state) => state.projects.projectFilters);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const role = user?.user_metadata.role as Role;

  const rProjects =
    role === "admin"
      ? projects
      : role === "project-manager"
      ? projects.filter(
          (project) => project.createdBy === user?.user_metadata.userName
        )
      : projects.filter((project) =>
          project.team?.members.some((member) => member?.id === user?.id)
        );

  const filteredProjects = rProjects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    )
    .filter((project) => {
      const matchesSttus = status === "all" || project.status === status;
      return matchesSttus;
    });

  return (
    <div className="space-y-7 md:space-y-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => {
              console.log("Before:", e.target.value);
              const newValue = e.target.value.toLowerCase();
              console.log("After:", newValue);
              dispatch(applySearch(newValue));
            }}
            placeholder="Search tasks..."
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-52">
          <ProjectStatusSelect />
        </div>
      </div>
      {filteredProjects.length ? (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <Placeholder
          icon={<FolderOpen className="w-8 h-8" />}
          title={emptyProjectMsg[role].title}
          description={emptyProjectMsg[role].description}
        />
      )}
    </div>
  );
};
