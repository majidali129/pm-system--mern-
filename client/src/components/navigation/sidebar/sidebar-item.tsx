import { cloneElement, type MouseEvent, type ReactElement } from "react";
import { NavLink } from "react-router";

type SidebarItemProps = {
  link: {
    label: string;
    href: string;
    icon: ReactElement<{ className: string }>;
  };
  close: (e: MouseEvent) => void;
};

export const SidebarItem = ({ link, close }: SidebarItemProps) => {
  return (
    <NavLink
      onClick={close}
      className={({ isActive }) =>
        `bg-transparent text-foreground  hover:bg-primary/10 py-1.5 text-[.87rem] px-2.5 rounded flex items-center  gap-1.5  not(.isActive):hover:text-zinc-800 ${
          isActive
            ? "!bg-primary  text-white dark:text-foreground "
            : "text-foreground/80 hover:text-foreground"
        } `
      }
      to={link.href}
    >
      {cloneElement(link.icon, { className: "w-[19px] h-[19px]" })}
      <span className="">{link.label}</span>
    </NavLink>
  );
};
