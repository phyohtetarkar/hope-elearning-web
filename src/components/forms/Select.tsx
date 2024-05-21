import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

export interface InputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  wrapperClass?: string;
  children?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ label, className, wrapperClass, error, children, ...props }, ref) => {
    const isInvalid = !!error;

    return (
      <div className={cn(`flex flex-col`, wrapperClass)}>
        {label && <label htmlFor={props.id} className="font-medium mb-1 text-foreground">{label}</label>}
        <select
          ref={ref}
          className={cn(
            `${isInvalid ? "invalid-input" : "default-input"} rounded-md`,
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <div className="text-danger text-sm mt-1.5">{error}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
