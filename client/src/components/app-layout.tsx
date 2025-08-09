import { Outlet } from "react-router";
import { Sidebar } from "./navigation/sidebar/sidebar";
import { Header } from "./navigation/header";

export const AppLayout = () => {
  return (
    <section className="min-h-screen max-h-screen flex w-full overflow-y-hidden">
      <Sidebar />
      <section
        className={`grow flex flex-col bg-background overflow-y-auto transition-transform duration-300 ease-in-out `}
      >
        <Header />
        <main className="*:p-5 ">
          <Outlet />
        </main>
      </section>
    </section>
  );
};
