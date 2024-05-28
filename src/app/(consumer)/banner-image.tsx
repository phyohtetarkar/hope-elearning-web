"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function BannerImage() {
  const { theme } = useTheme();

  return (
    <Image
      src={
        theme === "dark"
          ? "/images/undraw_teaching_dark.svg"
          : "/images/undraw_teaching.svg"
      }
      alt=""
      fill
      sizes="50vh"
      className="drop-shadow-xl object-contain"
      priority
    />
  );
}
