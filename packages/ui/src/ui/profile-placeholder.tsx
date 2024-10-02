import { cn } from "@elearning/lib/utils";
import { UserIcon } from "lucide-react";
import { forwardRef } from "react";

export interface ProfilePlaceholderProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
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
        "flex items-center justify-center size-[46px] bg-muted rounded-full",
        className
      )}
      {...props}
    >
      <UserIcon className={cn("size-7 text-muted-foreground", iconClass)} />
    </div>
  );
});

ProfilePlaceholder.displayName = "ProfilePlaceholder";
