import { getProjectInfo } from "@/api/project-service";
import { useQuery } from "@tanstack/react-query";

export const useProject = (projectId: string) => {
  const { data, isLoading: loadingProjectInfo } = useQuery({
    queryFn: () => getProjectInfo(projectId),
    queryKey: ["project", projectId],
    enabled: !!projectId,
  });

  return { project: data?.data, loadingProjectInfo };
};
