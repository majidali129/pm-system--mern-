import { getTaskInfo } from "@/api/task-service";
import { useQuery } from "@tanstack/react-query";

export const useTask = (taskId: string) => {
  const { data, isLoading: loadingTask } = useQuery({
    queryFn: () => getTaskInfo(taskId),
    queryKey: ["task", taskId],
    enabled: !!taskId,
  });

  return { task: data?.data, loadingTask };
};
