"use client";

import { ChangeEvent, useEffect, useRef } from "react";

interface TitleInputProps {
  value?: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TitleInput(props: TitleInputProps) {
  const { value, className, maxLength, placeholder, onChange } = props;

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const ta = ref.current;
      if (ta) {
        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex">
      <textarea
        ref={ref}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={1}
        className={`focus:ring-transparent border-0 outline-0 font-semibold p-0 text-4xl lg:text-5xl placeholder:text-muted resize-none appearance-none h-auto scrollbar-hide w-full overflow-hidden ${
          className ?? ""
        }`}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
          }
        }}
        value={value}
        onChange={(evt) => {
          evt.target.style.height = "auto";
          evt.target.style.height = `${evt.target.scrollHeight}px`;
          onChange?.(evt);
        }}
      />
    </div>
  );
}

TitleInput.displayName = "Title Input";

export default TitleInput;
