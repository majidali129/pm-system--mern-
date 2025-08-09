import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import type { Project } from "@/types";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { deleteProject } from "../project-slice";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/auth/hooks/use-user";
import { isPmOrAdmin } from "@/utils/is-pm-or-admin";

type ProjectMoreMenuProps = {
  project: Project;
};

export const ProjectMoreMenu = ({ project }: ProjectMoreMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const isManagerOrAdmin = isPmOrAdmin(user?.user_metadata.role);
  const isOwner = user?.user_metadata.userName === project.createdBy;

  const deleteButton =
    isManagerOrAdmin && isOwner ? (
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteProject({ id: project.id as string }));
        }}
      >
        <TrashIcon className="size-4 text-destructive/80" /> Delete
      </DropdownMenuItem>
    ) : null;

  const updateButton =
    isManagerOrAdmin && isOwner ? (
      <DropdownMenuItem>
        <EditIcon className="size-4 text-primary/80" />
        Update
      </DropdownMenuItem>
    ) : null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost" className="">
          <MoreHorizontal className="size-5 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${project.id}`);
            }}
          >
            View Details
          </DropdownMenuItem>
          {updateButton}
          {deleteButton}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
