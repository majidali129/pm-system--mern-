import { signUpUser, type Role } from "@/services/user-service";
import type { AuthApiError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: signUpLoading } = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      role: Role;
      userName: string;
    }) => signUpUser(data.email, data.password, data.userName, data.role),
    onSuccess: () => {
      toast.success("Sign up successfully 🚀");
      navigate("/auth/sign-in");
    },
    onError: (error: AuthApiError) => {
      toast.error(error.message);
    },
  });

  return { signUp, signUpLoading };
};
