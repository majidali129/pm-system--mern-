import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { useUser } from "@/features/auth/hooks/use-user";
import { isOwner as isOwnerApi } from "@/utils/is-owner";
import { Spinner } from "@/components/spinner";
import { useStatusUpdate } from "../hooks/use-status-update";
import { useDeleteTask } from "../hooks/use-delete-task";

type TaskMoreMenuProps = {
  task: Task;
};

export const TaskMoreMenu = ({ task }: TaskMoreMenuProps) => {
  const { user, loadingUser } = useUser();
  const { updateStatus } = useStatusUpdate(task._id);
  const { deleteTask } = useDeleteTask(task._id);

  if (!user || loadingUser) return <Spinner />;
  const isOwner = isOwnerApi(user?.name, task.createdBy.name);

  const editButton = isOwner ? (
    <DropdownMenuItem>
      <EditIcon className="text-primary/80" /> Edit
    </DropdownMenuItem>
  ) : null;
  const deleteButton = isOwner ? (
    <DropdownMenuItem onClick={() => deleteTask()}>
      <TrashIcon className="text-destructive/80" />
      Delete
    </DropdownMenuItem>
  ) : null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => updateStatus("done")}>
            Mark as Done
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateStatus("progress")}>
            Set to progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateStatus("review")}>
            Set to review
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {editButton}
          {deleteButton}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
