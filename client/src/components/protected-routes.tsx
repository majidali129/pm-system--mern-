import { useUser } from "@/features/auth/hooks/use-user";
import { signInPath } from "@/paths";
import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Spinner } from "./spinner";

type ProtectedRoutesProps = {
  children: ReactNode;
};

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, loadingUser, user } = useUser();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (!isAuthenticated && !loadingUser && !user) {
      navigate(signInPath());
      return;
    }
  }, [isAuthenticated, loadingUser, navigate, user, pathName]);
  if (!user && loadingUser)
    return (
      <div className="h-screen flex-1 w-full flex-center">
        <Spinner />
      </div>
    );

  return <>{children}</>;
};
