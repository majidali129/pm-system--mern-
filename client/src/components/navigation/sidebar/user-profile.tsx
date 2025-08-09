import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type UserProfileProps = {
  open: boolean;
};
export const UserProfile = ({ open }: UserProfileProps) => {
  return (
    <div className="p-4 border-t border-border absolute bottom-0 w-full">
      <div
        className={cn(
          "flex items-center p-2 rounded-lg bg-accent/50",
          open ? "justify-center" : "space-x-3"
        )}
      >
        <div className="w-8 h-8  rounded-full flex items-center justify-center">
          <User className="h-4 w-4 foreground" />
        </div>
        {!open && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Alex Chen
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Product Manager
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
