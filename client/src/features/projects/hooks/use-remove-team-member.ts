import { removeTeamMemberFromProject } from "@/api/project-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveTeamMember = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate: removeMember, isPending: removingMember } = useMutation({
    mutationFn: (memberId: string) =>
      removeTeamMemberFromProject(memberId, projectId),
    onSuccess: (resData) => {
      toast.success(resData.message || "Removed team member successfully");
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { removeMember, removingMember };
};
