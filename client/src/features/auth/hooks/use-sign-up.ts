import { signUp as signUpApi, type SignUpPayload } from "@/api/auth-service";
import type { AuthApiError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: signUpLoading } = useMutation({
    mutationFn: (payload: SignUpPayload) => signUpApi(payload),
    onSuccess: () => {
      toast.success("Sign up successfully 🚀");
      navigate("/auth/sign-in");
    },
    onError: (error: AuthApiError) => {
      console.log("Register error:", error);
      toast.error(error.message);
    },
  });

  return { signUp, signUpLoading };
};
