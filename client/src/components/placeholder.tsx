import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  trigger?: ReactNode;
}

export const Placeholder = ({
  title,
  description,
  icon,
  className = "",
  trigger,
}: EmptyStateProps) => {
  return (
    <Card className={`border-dashed border-2 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-16 h-16 bg-background/40 rounded-full flex items-center justify-center mb-4 text-gray-400">
          {icon}
        </div>
        <h4 className=" mb-2">{title}</h4>
        <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
          {description}
        </p>
        {trigger}
      </CardContent>
    </Card>
  );
};
