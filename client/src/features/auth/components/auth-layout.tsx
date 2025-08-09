import { Outlet } from "react-router";
export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950 flex items-center justify-center ">
      <Outlet />
    </div>
  );
};
