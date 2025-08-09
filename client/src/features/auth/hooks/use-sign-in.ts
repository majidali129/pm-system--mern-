import { loginUser, type LoginPayload } from "@/api/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: loginLoading } = useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.removeItem("isManual");
      toast.success(data.message || "Login successf");
      queryClient.setQueryData(["user"], data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { login, loginLoading };
};
