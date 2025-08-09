import type { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormItemProps = {
  onKeyPress?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  textarea?: boolean;
};

export const FormItem = ({
  onKeyPress,
  name,
  type = "text",
  required = true,
  placeholder,
  label,
  onChange,
  value,
  textarea,
}: FormItemProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      {textarea ? (
        <Textarea
          placeholder={placeholder}
          name={name}
          onChange={(e) => onChange(e)}
          value={value}
          autoComplete="off"
          id={name}
          required
          className="!min-h-18"
        />
      ) : (
        <Input
          required={required}
          onChange={(e) => onChange(e)}
          value={value}
          autoComplete="off"
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyPress}
        />
      )}
    </div>
  );
};
