import {
  createTask as createTaskApi,
  type NewTaskPayload,
} from "@/api/task-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending: creatingTask } = useMutation({
    mutationFn: (data: NewTaskPayload) => createTaskApi(data),
    onSuccess: (data) => {
      toast.success(data.message || "Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createTask, creatingTask };
};
