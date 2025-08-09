import {
  assignTask as assignTaskApi,
  type AssignTaskPayload,
} from "@/api/task-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAssignTask = (projectId?: string) => {
  const queryClient = useQueryClient();
  const { mutate: assignTask, isPending: assigningTask } = useMutation({
    mutationFn: (data: AssignTaskPayload) => assignTaskApi(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
      toast.success(data.message || "Task assigned successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { assignTask, assigningTask };
};
