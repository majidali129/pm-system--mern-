import {
  createProject as createProjectApi,
  type NewProjectPayload,
} from "@/api/project-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending: creatingProject } = useMutation({
    mutationFn: (data: NewProjectPayload) => createProjectApi(data),
    onSuccess: (data) => {
      console.log(data.data);
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"], exact: true });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { createProject, creatingProject };
};
