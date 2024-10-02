"use client";

import { ReactNode, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@elearning/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  wrapperClass?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, wrapperClass, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(true);

    const isInvalid = !!error;

    return (
      <div className={cn(`flex flex-col`, wrapperClass)}>
        {label && <label className="font-medium mb-1 text-foreground">{label}</label>}
        <div className={`flex rounded`}>
          <input
            ref={ref}
            type={isPassword ? "password" : "text"}
            className={cn(
              `flex-grow ${
                isInvalid ? "invalid-input" : "default-input"
              } rounded-l-md z-10`,
              className
            )}
            {...props}
          />
          <div
            className="border border-l-0 rounded-r-md px-3 flex items-center bg-muted"
            role="button"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        {error && <div className="text-destructive text-sm mt-1.5">{error}</div>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
