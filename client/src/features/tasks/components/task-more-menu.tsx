import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import type { Task } from "@/types";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { deleteTask, updateTaskStatus } from "../task-slice";
import { useUser } from "@/features/auth/hooks/use-user";
import { isOwner as isOwnerApi } from "@/utils/is-owner";

type TaskMoreMenuProps = {
  task: Task;
};

export const TaskMoreMenu = ({ task }: TaskMoreMenuProps) => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const isOwner = isOwnerApi(user?.user_metadata.userName, task.createdBy);

  const editButton = isOwner ? (
    <DropdownMenuItem>
      <EditIcon className="text-primary/80" /> Edit
    </DropdownMenuItem>
  ) : null;
  const deleteButton = isOwner ? (
    <DropdownMenuItem onClick={() => dispatch(deleteTask({ taskId: task.id }))}>
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
          <DropdownMenuItem
            onClick={() =>
              dispatch(updateTaskStatus({ taskId: task.id, status: "done" }))
            }
          >
            Mark as Done
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              dispatch(
                updateTaskStatus({ taskId: task.id, status: "progress" })
              )
            }
          >
            Set to progress
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              dispatch(updateTaskStatus({ taskId: task.id, status: "review" }))
            }
          >
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
