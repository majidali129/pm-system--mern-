import { getProjectTasks } from "@/api/project-service";
import { useQuery } from "@tanstack/react-query";

export const useProjectTasks = (projectId: string) => {
  const { data, isLoading: loadingTasks } = useQuery({
    queryFn: () => getProjectTasks(projectId),
    queryKey: ["project_tasks", projectId],
    enabled: !!projectId,
  });

  return { projectTasks: data?.data, loadingTasks };
};
