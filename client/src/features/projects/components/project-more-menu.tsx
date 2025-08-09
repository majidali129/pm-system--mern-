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
import { SpinnerMini } from "@/components/spinner-mini";

type ProjectMoreMenuProps = {
  project: Project;
};

export const ProjectMoreMenu = ({ project }: ProjectMoreMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loadingUser } = useUser();

  if (!user || loadingUser) return <SpinnerMini />;

  const isManagerOrAdmin = isPmOrAdmin(user.role);
  const isOwner = user?.name === project.createdBy.name;

  const deleteButton =
    isManagerOrAdmin && isOwner ? (
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteProject({ id: project._id as string }));
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
              navigate(`${project._id}`);
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
