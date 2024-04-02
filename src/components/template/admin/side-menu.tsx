"use client";

import { DrawerContext } from "@/components";
import {
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  HashtagIcon,
  HomeIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

const iconSize = 24;

export default function SideMenu() {
  const { isMenuOpen, toggle } = useContext(DrawerContext);
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([pathname.replace("/admin/", "")])
  );

  if (pathname.startsWith("/admin/posts/")) {
    return null;
  }

  return (
    <div
      className={`${
        isMenuOpen ? "translate-x-0" : `-translate-x-[300px]`
      } transition-transform ease-out min-w-[200px] max-w-[300px] fixed inset-y-0 w-full border-r z-50 flex flex-col bg-white lg:translate-x-0`}
    >
      <div className="h-[65px] min-h-[65px] px-5 flex items-center gap-3">
        <div className="bg-primary rounded w-[30px] h-[30px]"></div>
        <h3 className="">Brand</h3>
        <button className="ms-auto lg:hidden" onClick={toggle}>
          <XMarkIcon width={iconSize} className="text-muted" />
        </button>
      </div>
      {/* <Divider /> */}
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
        >
          <ListboxItem
            key="dashboard"
            variant="flat"
            href="/admin"
            startContent={<HomeIcon width={iconSize} />}
            color="primary"
          >
            Dashboard
          </ListboxItem>
          <ListboxItem
            key="view-site"
            variant="flat"
            href="/"
            startContent={<GlobeAltIcon width={iconSize} />}
            endContent={<ArrowTopRightOnSquareIcon width={iconSize} />}
            color="primary"
            target="_blank"
          >
            View site
          </ListboxItem>
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
              href="/admin/posts"
              startContent={<PencilSquareIcon width={iconSize} />}
              color="primary"
            >
              Posts
            </ListboxItem>
            <ListboxItem
              key="tags"
              variant="flat"
              href="/admin/tags"
              startContent={<HashtagIcon width={iconSize} />}
              color="primary"
            >
              Tags
            </ListboxItem>
          </ListboxSection>
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
              href="/admin/courses"
              startContent={<AcademicCapIcon width={iconSize} />}
              color="primary"
            >
              Courses
            </ListboxItem>
            <ListboxItem
              key="categories"
              variant="flat"
              href="/admin/categories"
              startContent={<FolderIcon width={iconSize} />}
              color="primary"
            >
              Categories
            </ListboxItem>
            <ListboxItem
              key="skills"
              variant="flat"
              href="/admin/skills"
              startContent={<HashtagIcon width={iconSize} />}
              color="primary"
            >
              Skills
            </ListboxItem>
          </ListboxSection>

          <ListboxItem
            key="settings"
            variant="flat"
            href="/admin/settings"
            startContent={<Cog6ToothIcon width={iconSize} />}
            color="primary"
            className="mt-auto mb-2"
          >
            Settings
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}
