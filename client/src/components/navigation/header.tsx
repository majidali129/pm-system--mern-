import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "./sidebar/sidebar-slice";
import { AccountDropdown } from "./account-dropdown";

export const Header = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();
  return (
    <nav className=" px-4 flex-between md:!justify-end bg-sidebar items-center text-foreground min-h-14 border-b border-b-input ">
      <Button
        asChild
        size="icon"
        variant="ghost"
        className=" !size-10 p-1.5 md:hidden"
        onClick={() => dispatch(toggleSidebar())}
      >
        {isOpen ? (
          <PanelRightClose className=" w-6 h-6 stroke-1 " />
        ) : (
          <PanelLeftClose className=" w-6 h-6 stroke-1 " />
        )}
      </Button>

      <AccountDropdown />
    </nav>
  );
};
