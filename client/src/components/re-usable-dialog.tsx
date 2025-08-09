import {
  cloneElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ReusableDialogProps = {
  title?: string;
  description?: string;
  trigger: ReactNode;
  children: ReactElement<{ onClose?: () => void }>;
  className?: string;
};

export const ReusableDialog = ({
  title,
  description,
  children,
  trigger,
  className,
}: ReusableDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}

      <DialogContent
        className={cn("sm:max-w-[30rem] p-0 border-none ", className)}
      >
        {title && description && (
          <DialogHeader className="p-6">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        {cloneElement(children, {
          onClose: () => setOpen(false),
        })}
      </DialogContent>
    </Dialog>
  );
};
