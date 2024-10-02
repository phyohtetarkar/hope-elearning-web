"use client";

import { LucideIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface ThemeToggleButtonProps {
  theme?: string;
  setTheme?: (theme: string) => void;
}

export function ThemeToggleButton({ theme, setTheme }: ThemeToggleButtonProps) {
  const [Icon, setIcon] = useState<LucideIcon>(SunIcon);

  useEffect(() => {
    setIcon(theme === "dark" ? MoonIcon : SunIcon);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme?.(theme === "dark" ? "light" : "dark");
      }}
    >
      <Icon className="size-5" />
    </Button>
  );

  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" size="icon">
  //         {theme === "dark" ? (
  //           <Moon className="size-5" />
  //         ) : (
  //           <Sun className="size-5" />
  //         )}
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent align="end" className="shadow-xl">
  //       <DropdownMenuItem
  //         onClick={() => {
  //           setTheme?.("light");
  //         }}
  //       >
  //         Light
  //       </DropdownMenuItem>
  //       <DropdownMenuItem
  //         onClick={async () => {
  //           setTheme?.("dark");
  //         }}
  //       >
  //         Dark
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
