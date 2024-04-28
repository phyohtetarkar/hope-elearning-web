import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  wrapperClass?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, wrapperClass, error, ...props }, ref) => {
    const isInvalid = !!error;

    return (
      <div className={cn(`flex flex-col`, wrapperClass)}>
        {label && (
          <label htmlFor={props.id} className="font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            `${isInvalid ? "invalid-input" : "default-input"} rounded-md`,
            className
          )}
          {...props}
        />
        {error && <div className="text-danger text-sm mt-1.5">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
