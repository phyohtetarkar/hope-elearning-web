import useSWR from "swr";
import { makeApiRequest } from "./make-api-request";
import { Category, Page, Tag, User } from "./models";

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    "/api/admin/categories",
    async () => {
      const url = `/admin/categories`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
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
      const url = `/admin/tags`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
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
      const url = `/admin/users?staffOnly=true`;
      const resp = await makeApiRequest({
        url,
        options: {
          credentials: "include",
        },
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
