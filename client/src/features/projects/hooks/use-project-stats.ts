import { getProjectStats } from "@/api/project-service";
import { useQuery } from "@tanstack/react-query";

export const useProjectStats = () => {
  const { data, isLoading: loadingProjectStats } = useQuery({
    queryFn: getProjectStats,
    queryKey: ["project-stats"],
  });

  return { projectStats: data?.data, loadingProjectStats };
};
