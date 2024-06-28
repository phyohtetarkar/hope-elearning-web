import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  wrapperClass?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, className, wrapperClass, error, children, ...props }, ref) => {
    const isInvalid = !!error;

    return (
      <div className={cn(`flex flex-col`, wrapperClass)}>
        {label && (
          <label htmlFor={props.id} className="font-medium mb-1 text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            `${isInvalid ? "invalid-input" : "default-input"} rounded-md`,
            className
          )}
          {...props}
        />
        {error && <div className="text-destructive text-sm mt-1.5">{error}</div>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
