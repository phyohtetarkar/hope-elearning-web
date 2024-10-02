"use client";

import { Select } from "@elearning/ui/forms";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CoursesFilter() {
  const router = useRouter();
  const sp = useSearchParams();

  const [status, setStatus] = useState<string>(sp.get("status") ?? "");
  const [access, setAccess] = useState<string>(
    sp.get("access") ?? ""
  );
  const [level, setLevel] = useState<string>(
    sp.get("level") ?? ""
  );

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
          params.delete("page");
          setStatus(evt.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
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
          params.delete("page");
          setAccess(evt.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All access</option>
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Select>
      <Select
        value={level}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("level", evt.target.value);
          } else {
            params.delete("level");
          }
          params.delete("page");
          setLevel(evt.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </Select>
    </div>
  );
}
