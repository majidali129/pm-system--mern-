import { SidebarItem } from "./sidebar-item";
import { FileText, Folder, Check, Clock, Target, LogOut } from "lucide-react";
import {
  dashboardPath,
  homePath,
  projectsPath,
  reportsPath,
  tasksPath,
} from "@/paths";
import { Link } from "react-router";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";
import { SpinnerMini } from "@/components/spinner-mini";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { close } from "./sidebar-slice";
import type { MouseEvent } from "react";

const navLinks = [
  { label: "Dashboard", href: dashboardPath(), icon: <Folder /> },
  { label: "Projects", href: projectsPath(), icon: <FileText /> },
  { label: "Tasks", href: tasksPath(), icon: <Check /> },
  { label: "Reports", href: reportsPath(), icon: <Clock /> },
  // { label: "Teams", href: teamsPath(), icon: <Users /> },
  // { label: "Profile", href: profilePath(), icon: <User /> },
  // { label: "Settings", href: settingsPath(), icon: <Settings /> },
];

export const Sidebar = () => {
  const { isPending, signOut } = useSignOut();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  const handleCloseSidebar = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) return;
    setTimeout(() => dispatch(close()), 300);
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 bg-zinc-800/20 backdrop-blur-sm md:hidden"
          onClick={() => dispatch(close())}
        />
      )}
      <aside
        className={`min-h-screen fixed md:relative max-h-screen transition-transform duration-300 ease-in-out  z-50 max-md:z-30 px-2.5 md:px-4 bg-sidebar  flex flex-col justify-between w-48 md:w-44 ${
          isOpen ? "translate-x-0" : "max-md:-translate-x-full"
        }  `}
      >
        <div>
          <div className="min-h-14  ">
            <Link
              onClick={handleCloseSidebar}
              to={homePath()}
              className="w-full flex items-center gap-1.5 justify-start py-3"
            >
              <Target className="size-6 md:size-8 text-primary/80" />
              <h4 className={`text-center text-foreground `}>ProjectFlow</h4>
            </Link>
          </div>
          <ul className="flex flex-col gap-y-2.5 py-4 md:py-7">
            {navLinks.map((link) => (
              <SidebarItem
                key={link.href}
                link={link}
                close={handleCloseSidebar}
              />
            ))}
          </ul>
        </div>

        <button
          onClick={() => signOut()}
          className=" flex items-center gap-2 hover:border-t-transparent border-t text-foreground hover:bg-primary/10 py-3 px-2.5 cursor-pointer transition-all duration-200"
        >
          <LogOut className="size-5" />
          {isPending ? (
            <SpinnerMini />
          ) : (
            <span className="text-[.9rem] ">Log out</span>
          )}
        </button>
      </aside>
    </>
  );
};
