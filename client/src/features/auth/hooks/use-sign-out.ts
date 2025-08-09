import { logout } from "@/api/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      localStorage.removeItem("accessToken");
      localStorage.setItem("isManual", "true");
      navigate("/auth/sign-in", { replace: true });
    },
  });

  return { signOut, isPending };
};
