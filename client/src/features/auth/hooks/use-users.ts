import { getAllUsers } from "@/api/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (domain?: string) => {
  const query = domain && domain !== "all" ? domain : undefined;
  const { data, isPending: loadingUsers } = useQuery({
    queryFn: () => getAllUsers(query),
    queryKey: ["users", query],
  });
  return {
    users: data?.data,
    loadingUsers,
  };
};
