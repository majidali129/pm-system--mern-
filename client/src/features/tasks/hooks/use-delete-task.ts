import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "@/api/task-service";
import { toast } from "sonner";

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: deletingTask } = useMutation({
    mutationFn: () => deleteTaskApi(taskId),
    onSuccess: (resData) => {
      toast.success(resData.message || "Task deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        exact: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteTask, deletingTask };
};
