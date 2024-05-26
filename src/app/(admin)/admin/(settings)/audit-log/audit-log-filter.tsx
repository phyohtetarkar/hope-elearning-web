"use client";

import { Select } from "@/components/forms";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AuditLogFilter() {
  const router = useRouter();
  const sp = useSearchParams();

  const [resource, setResource] = useState<string>(sp.get("resource") ?? "");
  const [event, setEvent] = useState<string>(sp.get("event") ?? "");

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={resource}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("resource", evt.target.value);
          } else {
            params.delete("resource");
          }

          if (params.has("page")) {
            params.delete("page");
          }

          setResource(evt.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All resource</option>
        <option value="course">Course</option>
        <option value="post">Post</option>
        <option value="category">Category</option>
        <option value="tag">Tag</option>
        <option value="setting">Setting</option>
      </Select>
      <Select
        value={event}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("event", evt.target.value);
          } else {
            params.delete("event");
          }

          if (params.has("page")) {
            params.delete("page");
          }

          setEvent(evt.target.value);
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All event</option>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
        <option value="deleted">Deleted</option>
      </Select>
    </div>
  );
}
