import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { forwardRef } from "react";

export interface ProfilePlaceholderProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  className?: string;
  iconClass?: string;
}

export const ProfilePlaceholder = forwardRef<
  HTMLDivElement,
  ProfilePlaceholderProps
>(({ className, iconClass, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center size-[46px] bg-gray-200 rounded-full",
        className
      )}
      {...props}
    >
      <UserIcon className={cn("size-7 text-gray-600", iconClass)} />
    </div>
  );
});

ProfilePlaceholder.displayName = "ProfilePlaceholder";
