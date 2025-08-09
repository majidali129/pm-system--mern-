import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { cloneElement, type ReactElement } from "react";
import { Label } from "./ui/label";

type SortFilterSelectProps = {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
  options: {
    label: string;
    value: string;
    icon?: ReactElement<{ className?: string }>;
  }[];
};

export const SortFilterSelect = ({
  placeholder,
  value,
  onValueChange,
  className,
  options,
  label,
}: SortFilterSelectProps) => {
  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn(`w-[180px]`, className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.icon && (
                <>{cloneElement(option.icon, { className: "w-4 h-4" })}</>
              )}

              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
