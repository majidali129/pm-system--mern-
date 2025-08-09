import { updateProjectStatus } from "@/api/project-service";
import type { ProjectStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useStatusUpdate = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: updatingStatus } = useMutation({
    mutationFn: (status: ProjectStatus) =>
      updateProjectStatus({ projectId, status }),
    onSuccess: (resData) => {
      toast.success(resData.message || "Status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateStatus, updatingStatus };
};
