"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { DrawerContext } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import {
  Edit,
  ExternalLink,
  FolderClosed,
  Globe,
  GraduationCap,
  Hash,
  Home,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const iconSize = 20;

export default function SideMenu() {
  const { user } = useContext(AuthenticationContext);
  const { isMenuOpen, toggle } = useContext(DrawerContext);
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const path = pathname.replace("/admin/", "");
    setSelectedKeys(new Set([path === "/admin" ? "dashboard" : path]));
  }, [pathname]);

  const isAdminOrOwner = user?.role === "owner" || user?.role === "admin";

  return (
    <div
      className={`${
        isMenuOpen ? "translate-x-0" : `-translate-x-[300px]`
      } transition-transform ease-out min-w-[200px] max-w-[300px] fixed lg:static inset-y-0 w-full border-r z-50 flex flex-col bg-white lg:translate-x-0`}
    >
      <div className="h-[65px] min-h-[65px] px-5 flex items-center gap-3">
        <div className="size-[40px] relative">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            fill
            className="rounded object-fill"
          />
        </div>
        <h3 className="">Brand</h3>
        <button className="ms-auto lg:hidden" onClick={toggle}>
          <X className="text-sliver" />
        </button>
      </div>
      <div className="flex grow p-2 pb-0 overflow-y-auto scrollbar-custom">
        <Listbox
          aria-label="Admin menus"
          selectionMode="single"
          selectedKeys={selectedKeys}
          hideSelectedIcon
          itemClasses={{
            base: "py-2 mb-1 h-auto rounded-md text-default-600 data-[selected=true]:text-primary data-[selected=true]:bg-primary/20",
            title: "font-medium",
          }}
          classNames={{
            list: "flex-grow",
          }}
          onAction={(key) => {
            if (isMenuOpen) {
              toggle?.();
            }
          }}
        >
          <ListboxItem
            key="dashboard"
            variant="flat"
            as={Link}
            href="/admin"
            startContent={<Home size={iconSize} />}
            color="primary"
            className={cn(!isAdminOrOwner ? "hidden" : undefined)}
          >
            Dashboard
          </ListboxItem>
          <ListboxItem
            key="view-site"
            variant="flat"
            href="/"
            startContent={<Globe size={iconSize} />}
            endContent={<ExternalLink size={iconSize} />}
            color="primary"
            target="_blank"
            className="data-[selectable=true]:focus:bg-white data-[selectable=true]:focus:text-default-600 data-[focus=true]:bg-white"
          >
            View site
          </ListboxItem>

          <ListboxSection
            title="COURSE"
            className="mt-3"
            classNames={{
              heading: "px-[0.65rem]",
            }}
          >
            <ListboxItem
              key="courses"
              variant="flat"
              as={Link}
              href="/admin/courses"
              startContent={<GraduationCap size={iconSize} />}
              color="primary"
            >
              Courses
            </ListboxItem>
            <ListboxItem
              key="categories"
              variant="flat"
              as={Link}
              href="/admin/categories"
              startContent={<FolderClosed size={iconSize} />}
              color="primary"
              className={cn(!isAdminOrOwner ? "hidden" : undefined)}
            >
              Categories
            </ListboxItem>
          </ListboxSection>

          <ListboxSection
            title="BLOG"
            className="mt-3"
            classNames={{
              heading: "px-[0.65rem]",
            }}
          >
            <ListboxItem
              key="posts"
              variant="flat"
              as={Link}
              href="/admin/posts"
              startContent={<Edit size={iconSize} />}
              color="primary"
            >
              Posts
            </ListboxItem>
            <ListboxItem
              key="tags"
              variant="flat"
              as={Link}
              href="/admin/tags"
              startContent={<Hash size={iconSize} />}
              color="primary"
              className={cn(!isAdminOrOwner ? "hidden" : undefined)}
            >
              Tags
            </ListboxItem>
          </ListboxSection>

          <ListboxItem
            key="settings"
            variant="flat"
            as={Link}
            href="/admin/settings"
            startContent={<Settings size={iconSize} />}
            color="primary"
            className={cn(
              "mt-auto mb-2",
              !isAdminOrOwner ? "hidden" : undefined
            )}
          >
            Settings
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}
