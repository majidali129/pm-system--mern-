import { getAllTasks } from "@/api/task-service";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  const { data, isLoading: loadingTasks } = useQuery({
    queryFn: getAllTasks,
    queryKey: ["tasks"],
  });

  return { tasks: data?.data, loadingTasks };
};
