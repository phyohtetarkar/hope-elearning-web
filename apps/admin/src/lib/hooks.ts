import { makeApiRequest } from "@elearning/lib";
import { Category, Page, Tag, User } from "@elearning/lib/models";
import useSWR from "swr";
import { API_URL, BASE_URL } from "./constants";

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    "/api/admin/categories",
    async () => {
      const url = `${API_URL}/admin/categories`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
        refreshUrl: `${BASE_URL}/api/auth/refresh`,
      });

      if (!resp.ok) {
        return undefined;
      }

      return (await resp.json()) as Page<Category>;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    categories: data,
    error,
    isLoading,
  };
}

export function useTags() {
  const { data, error, isLoading } = useSWR(
    "/api/admin/tags",
    async () => {
      const url = `${API_URL}/admin/tags`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
        refreshUrl: `${BASE_URL}/api/auth/refresh`,
      });

      if (!resp.ok) {
        return undefined;
      }

      return (await resp.json()) as Page<Tag>;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    tags: data,
    error,
    isLoading,
  };
}

export function useStaffs() {
  const { data, error, isLoading } = useSWR(
    "/api/admin/staffs",
    async () => {
      const url = `${API_URL}/admin/users?staffOnly=true`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
        refreshUrl: `${BASE_URL}/api/auth/refresh`,
      });

      if (!resp.ok) {
        return undefined;
      }

      return (await resp.json()) as Page<User>;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    users: data,
    error,
    isLoading,
  };
}
