import { getCurrentUser } from "@/api/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isPending: loadingUser } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  return {
    user: data?.data,
    isAuthenticated: data?.data.isActive === true,
    loadingUser,
  };
};
