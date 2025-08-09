import { signOutUser } from "@/services/user-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      navigate("/auth/sign-in", { replace: true });
    },
  });

  return { signOut, isPending };
};
