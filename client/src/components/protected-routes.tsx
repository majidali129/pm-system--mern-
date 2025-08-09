import { useUser } from "@/features/auth/hooks/use-user";
import { signInPath } from "@/paths";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "./spinner";

type ProtectedRoutesProps = {
  children: ReactNode;
};

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, loadingUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loadingUser) navigate(signInPath());
    // if (!isAuthenticated && !loadingUser) navigate(`/auth/sign-in`);
  }, [isAuthenticated, loadingUser, navigate]);

  if (loadingUser)
    return (
      <div className="h-screen w-full flex-center">
        <Spinner />
      </div>
    );
  return <>{children}</>;
};
