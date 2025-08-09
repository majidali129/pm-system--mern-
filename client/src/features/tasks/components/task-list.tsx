import { TaskItem } from "./task-item";
import { ClipboardList, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TaskStatusSelect } from "./task-status-select";
import { TaskPrioritySelect } from "./task-priority-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applySearch } from "../task-slice";
import { useUser } from "@/features/auth/hooks/use-user";
import type { Role } from "@/services/user-service";
import { Placeholder } from "@/components/placeholder";
import { emptyTaskMsg } from "@/utils/constants";

export const TaskList = () => {
  const { user } = useUser();
  const currentUsername = user?.user_metadata.userName;
  const role = user?.user_metadata.role as Role;
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  // for pm
  const createdProjects = projects
    .filter((project) => project.createdBy === user?.user_metadata.userName)
    .map((p) => p.id);
  const teamMembersUsernames = projects
    .filter((p) => p.createdBy === user?.user_metadata.userName)
    .flatMap((p) => p.team?.members ?? [])
    .map((member) => member.id);

  const query = useAppSelector((state) => state.tasks.query).toLowerCase();
  const { status, priority } = useAppSelector(
    (state) => state.tasks.taskFilters
  );

  const rTasks = tasks.filter((task) => {
    if (role === "admin") return true;
    if (role === "project-manager") {
      const isOwnedProject =
        task.project && createdProjects.includes(task.project);
      const isAssignedToTeam =
        task.assignee && teamMembersUsernames.includes(task.assignee);
      const isPersonalAndOwner =
        task.isPersonal && task.createdBy === currentUsername;
      return isOwnedProject || isAssignedToTeam || isPersonalAndOwner;
    }

    // for normal user

    return (
      task.assignee === currentUsername ||
      (task.isPersonal && task.createdBy === currentUsername) ||
      task.createdBy === currentUsername
    );
  });

  const filteredTasks = rTasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    )
    .filter((task) => {
      const matchesSttus = status === "all" || task.status === status;
      const matchesPriority = priority === "all" || task.priority === priority;
      return matchesSttus && matchesPriority;
    });

  // TODO: ADMIN Can filter by project, assignee as well
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
        <div className=" flex flex-col md:flex-row gap-4">
          <TaskStatusSelect />
          <TaskPrioritySelect />
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredTasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </ul>
      ) : (
        <Placeholder
          icon={<ClipboardList className="w-8 h-8" />}
          title={emptyTaskMsg[role].title}
          description={emptyTaskMsg[role].description}
        />
      )}
    </div>
  );
};
