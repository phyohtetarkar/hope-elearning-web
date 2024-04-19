"use client";

import { Select } from "@/components/forms";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import NProgress from "nprogress";

export default function PostFilter() {
  const router = useRouter();
  const sp = useSearchParams();

  const [status, setStatus] = useState<string>(sp.get("status") ?? "");
  const [access, setAccess] = useState<string>(sp.get("access") ?? "");

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Select
        value={status}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("status", evt.target.value);
          } else {
            params.delete("status");
          }
          setStatus(evt.target.value);
          NProgress.start();
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All posts</option>
        <option value="draft">Draft posts</option>
        <option value="published">Published posts</option>
      </Select>
      <Select
        value={access}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("access", evt.target.value);
          } else {
            params.delete("access");
          }
          setAccess(evt.target.value);
          NProgress.start();
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All access</option>
        <option value="public">Public</option>
        <option value="member">Member only</option>
        <option value="paid_member">Paid member only</option>
      </Select>
    </div>
  );
}
