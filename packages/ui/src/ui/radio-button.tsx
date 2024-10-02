import { cn } from "@elearning/lib/utils";
import { Circle } from "lucide-react";
import { forwardRef } from "react";

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  checked: boolean;
}

export const RadioButton = forwardRef<HTMLDivElement, RadioButtonProps>(
  ({ checked, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "size-4 rounded-full border border-primary text-primary flex items-center justify-center",
          className
        )}
        {...props}
      >
        <Circle
          className={cn("h-2.5 w-2.5 fill-current text-current", {
            invisible: !checked,
          })}
        />
      </div>
    );
  }
);

RadioButton.displayName = "RadioButton";
