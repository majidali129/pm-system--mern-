import { getCurrentUser } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: user, isLoading: loadingUser } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    loadingUser,
  };
};
