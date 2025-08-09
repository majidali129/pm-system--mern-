import { updateProjectEndDate } from "@/api/project-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEndDataUpdate = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate: updateEndDate, isPending: updatingEndDate } = useMutation({
    mutationFn: (endDate: Date) => updateProjectEndDate({ projectId, endDate }),
    onSuccess: (resData) => {
      toast.success(resData.message || "End date updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
        exact: true,
      });
    },
  });

  return { updateEndDate, updatingEndDate };
};
