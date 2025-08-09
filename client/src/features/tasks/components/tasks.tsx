import { Button } from "@/components/ui/button";
import { TaskList } from "./task-list";
import { Plus } from "lucide-react";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { CreateTaskForm } from "./create-task-form";
import { DialogTrigger } from "@/components/ui/dialog";

export const Tasks = () => {
  return (
    <section className="space-y-10 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div>
          <h2>Tasks</h2>
          <p className="text-muted-foreground">Track and manage your tasks</p>
        </div>

        <ReusableDialog
          className="sm:!max-w-[35rem] max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
          trigger={
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
          }
          title=""
        >
          <CreateTaskForm />
        </ReusableDialog>
      </div>

      <TaskList />
    </section>
  );
};
