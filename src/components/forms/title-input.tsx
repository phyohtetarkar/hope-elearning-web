"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  wrapperClass?: string;
}

function TitleInput({
  className,
  wrapperClass,
  onChange,
  ...props
}: InputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const ta = ref.current;
      if (ta) {
        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cn("flex", wrapperClass)}>
      <textarea
        ref={ref}
        className={cn(
          `focus:ring-transparent border-0 outline-0 font-semibold p-0 text-4xl lg:text-5xl text-foreground placeholder:text-muted-foreground resize-none appearance-none h-auto scrollbar-hide w-full overflow-hidden`,
          className
        )}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
          }
        }}
        onChange={(evt) => {
          evt.target.style.height = "auto";
          evt.target.style.height = `${evt.target.scrollHeight}px`;
          onChange?.(evt);
        }}
        {...props}
        rows={1}
      />
    </div>
  );
}

TitleInput.displayName = "Title Input";

export default TitleInput;
