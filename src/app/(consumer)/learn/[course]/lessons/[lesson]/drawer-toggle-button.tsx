"use client";

import { DrawerContext } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useContext } from "react";

export default function DrawerToggleButton() {
    const { isMenuOpen, toggle } = useContext(DrawerContext);

    return (
      <div
        role="button"
        className="flex items-center gap-2 text-primary font-semibold"
        onClick={toggle}
      >
        <Menu />
        Menu
      </div>
    );
}