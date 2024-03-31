"use client";

import { useContext } from "react";
import { DrawerContext } from ".";

export default function DrawerBackdrop() {
  const { isMenuOpen, toggle } = useContext(DrawerContext);
  if (!isMenuOpen) {
    return null;
  }
  return (
    <div
      onClick={toggle}
      className="bg-black/40 absolute start-0 top-0 right-0 bottom-0 z-40"
    ></div>
  );
}
