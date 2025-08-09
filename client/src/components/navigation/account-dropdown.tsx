import { Avatar, AvatarFallback } from "../ui/avatar";
import { useUser } from "@/features/auth/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLogOut, LucideMoon, LucideSun } from "lucide-react";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";
import { useDarkMode } from "../theme/theme-context";

export const AccountDropdown = () => {
  const { user } = useUser();
  const { signOut } = useSignOut();
  const { toggleThemeToDark, toggleThemeToLight } = useDarkMode();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="size-10">
          <AvatarFallback>
            {user?.user_metadata.userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={''}>
              <LucideUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={''}>
              <LucideLock className="mr-2 h-4 w-4" />
              <span>Password</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <div role="button" onClick={toggleThemeToDark}>
            <LucideMoon />
            <span>Dark</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div role="button" onClick={toggleThemeToLight}>
            <LucideSun />
            <span>Light</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div onClick={() => signOut()}>
            <LucideLogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
