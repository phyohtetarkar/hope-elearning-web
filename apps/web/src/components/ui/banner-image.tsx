"use client";

import TeachingImage from "@elearning/assets/images/undraw_teaching.svg";
import TeachingImageDark from "@elearning/assets/images/undraw_teaching_dark.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

function BannerImage() {
  const { theme } = useTheme();

  const [image, setImage] = useState(TeachingImage);

  useEffect(() => {
    setImage(theme === "dark" ? TeachingImageDark : TeachingImage);
  }, [theme]);

  return (
    <Image
      src={image}
      alt=""
      fill
      sizes="50vh"
      className="drop-shadow-xl object-contain"
      priority
    />
  );
}

export default BannerImage;
