import { updateTaskStatus } from "@/api/task-service";
import type { TaskStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useStatusUpdate = (taskId: string) => {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: updatingStatus } = useMutation({
    mutationFn: (status: TaskStatus) => updateTaskStatus(status, taskId),

    onSuccess: (resData) => {
      toast.success(resData.message || "Task status successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        exact: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateStatus, updatingStatus };
};
