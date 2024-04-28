"use client";

import { Input, Select } from "@/components/forms";
import { useRouter, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useState } from "react";

export default function UserFilter() {
  const router = useRouter();
  const sp = useSearchParams();

  const [email, setEmail] = useState<string>(sp.get("email") ?? "");
  const [role, setRole] = useState<string>(sp.get("role") ?? "");

  const handleKeyDown = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      const params = new URLSearchParams(sp.toString());
      if (email) {
        params.set("email", email);
      } else {
        params.delete("email");
      }
      NProgress.start();
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Input
        placeholder="By email..."
        value={email}
        onChange={(evt) => {
          const value = evt.target.value;
          /* if (value.trim() === "") {
            const params = new URLSearchParams(sp.toString());
            params.delete("email");
            NProgress.start();
            router.push(`?${params.toString()}`);
          } */
          setEmail(value);
        }}
        onKeyDown={handleKeyDown}
      />
      <Select
        value={role}
        onChange={(evt) => {
          const params = new URLSearchParams(sp.toString());
          if (evt.target.value) {
            params.set("role", evt.target.value);
          } else {
            params.delete("role");
          }
          setRole(evt.target.value);
          NProgress.start();
          router.push(`?${params.toString()}`);
        }}
      >
        <option value="">All role</option>
        <option value="user">User</option>
        <option value="contributor">Contributor</option>
        <option value="author">Author</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </Select>
    </div>
  );
}
