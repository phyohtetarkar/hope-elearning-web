"use client";

import {
  Pagination as NextUIPagination,
  PaginationItem,
} from "@nextui-org/pagination";
import Link from "next/link";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

export default function Pagination({
  totalPage,
  currentPage,
}: PaginationProps) {
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
            href={`/admin/posts?page=${value}`}
            {...props}
          />
        );
      }}
    />
  );
}
