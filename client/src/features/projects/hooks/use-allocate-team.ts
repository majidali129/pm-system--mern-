import { allocateTeamToProject } from "@/api/project-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAllocateTeam = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate: allocateTeam, isPending: allocatingTeam } = useMutation({
    mutationFn: (members: string[]) =>
      allocateTeamToProject(members, projectId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { allocateTeam, allocatingTeam };
};
