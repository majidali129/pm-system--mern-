import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "./projects-list";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { CreateProjectForm } from "./create-project-form";
import { DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/features/auth/hooks/use-user";
import { isPmOrAdmin } from "@/utils/is-pm-or-admin";
import { Spinner } from "@/components/spinner";

export const Projects = () => {
  const { user, loadingUser } = useUser();

  if (!user || loadingUser) return <Spinner />;

  const role = user.role;
  const isManagerOrAdmin = isPmOrAdmin(role);

  const createProjectButton = isManagerOrAdmin ? (
    <DialogTrigger asChild>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </DialogTrigger>
  ) : null;

  const renderDescription =
    role === "admin"
      ? "Manage and oversee all projects across the platform"
      : role === "project_manager"
      ? "Plan, manage, and track your assigned projects"
      : "View and work on projects you are part of";

  return (
    <section className="space-y-10 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Projects</h2>
          <p className="text-muted-foreground">{renderDescription}</p>
        </div>

        <ReusableDialog
          className="sm:!max-w-[35rem] max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
          trigger={createProjectButton}
        >
          <CreateProjectForm />
        </ReusableDialog>
      </div>
      <ProjectsList />
    </section>
  );
};
