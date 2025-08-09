import { getAllProjects } from "@/api/project-service";
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  const { data, isLoading: loadingProjects } = useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
  });

  return { projects: data?.data, loadingProjects };
};
