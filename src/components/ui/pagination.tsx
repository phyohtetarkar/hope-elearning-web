"use client";

import {
  Pagination as NextUIPagination,
  PaginationItem,
} from "@nextui-org/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  basePath?: string;
  totalPage: number;
  currentPage: number;
}

export default function Pagination({
  basePath = "",
  totalPage,
  currentPage,
}: PaginationProps) {

  const params = useSearchParams();

  if (totalPage <= 1) {
    return null;
  }

  return (
    <NextUIPagination
      showControls
      total={totalPage}
      initialPage={1}
      page={currentPage}
      disableAnimation
      renderItem={({ key, value, ...props }) => {
        return (
          <PaginationItem
            key={key}
            as={Link}
            href={`${basePath}?page=${value}`}
            {...props}
          />
        );
      }}
    />
  );
}
