"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderSearchField() {
  const sp = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  
  useEffect(() => {
    setSearch(sp.get("q") ?? "");
  }, [sp]);

  return (
    <div className="flex items-center bg-muted px-4 rounded-full h-10 lg:w-[280px]">
      <SearchIcon className="size-5 flex-shrink-0 text-gray-500" />
      <input
        className="border-none focus:ring-0 bg-transparent pl-2 pr-0 w-full focus:outline-none"
        type="search"
        placeholder="Search courses..."
        aria-label="Search"
        value={search ?? ""}
        onChange={(evt) => setSearch(evt.target.value)}
        onKeyUp={(evt) => {
          if (evt.key !== "Enter") {
            return;
          }

          if (search) {
            router.push(`/browse?q=${search}`);
          } else {
            router.push(`/browse`);
          }
        }}
      />
    </div>
  );
}
