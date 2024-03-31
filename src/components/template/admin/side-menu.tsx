"use client";

import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import {
  RiBloggerLine,
  RiExternalLinkLine,
  RiFolder2Line,
  RiGlobalLine,
  RiGraduationCapLine,
  RiHashtag,
  RiHome4Line,
  RiSettings3Line,
} from "@remixicon/react";
import { useContext } from "react";
import { DrawerContext } from ".";

export default function SideMenu() {
  const { isMenuOpen } = useContext(DrawerContext);

  return (
    <div
      className={`${
        isMenuOpen ? "translate-x-0" : "-translate-x-[300px]"
      } transition-transform absolute w-[300px] border-r z-50 flex flex-col h-full bg-white lg:translate-x-0 lg:static`}
    >
      <div className="h-[65px] px-5 flex items-center gap-3">
        <div className="bg-primary rounded w-[30px] h-[30px]"></div>
        <h3 className="">Brand</h3>
      </div>
      {/* <Divider /> */}
      <div className="flex flex-grow p-2 pb-0 overflow-y-auto scrollbar-custom">
        <Listbox
          aria-label="Admin menus"
          selectionMode="single"
          // selectedKeys={["dashboard"]}
          hideSelectedIcon
          itemClasses={{
            base: "py-2 mb-1 h-auto rounded-md data-[selected=true]:text-primary data-[selected=true]:bg-primary/20",
          }}
          classNames={{
            list: "flex-grow",
          }}
        >
          <ListboxItem
            key="dashboard"
            variant="flat"
            href="/admin"
            startContent={<RiHome4Line />}
            color="primary"
          >
            Dashboard
          </ListboxItem>
          <ListboxItem
            key="view-site"
            variant="flat"
            href="/"
            startContent={<RiGlobalLine />}
            endContent={<RiExternalLinkLine />}
            color="primary"
            target="_blank"
          >
            View site
          </ListboxItem>
          <ListboxSection
            title="BLOG"
            className="mt-3"
            classNames={{
              heading: "px-3 font-medium",
            }}
          >
            <ListboxItem
              key="posts"
              variant="flat"
              href="/admin/posts"
              startContent={<RiBloggerLine />}
              color="primary"
            >
              Posts
            </ListboxItem>
            <ListboxItem
              key="tags"
              variant="flat"
              href="/admin/tags"
              startContent={<RiHashtag />}
              color="primary"
            >
              Tags
            </ListboxItem>
          </ListboxSection>
          <ListboxSection
            title="COURSE"
            className="mt-3"
            classNames={{
              heading: "px-3 font-medium",
            }}
          >
            <ListboxItem
              key="courses"
              variant="flat"
              href="/admin/courses"
              startContent={<RiGraduationCapLine />}
              color="primary"
            >
              Courses
            </ListboxItem>
            <ListboxItem
              key="categories"
              variant="flat"
              href="/admin/categories"
              startContent={<RiFolder2Line />}
              color="primary"
            >
              Categories
            </ListboxItem>
            <ListboxItem
              key="skills"
              variant="flat"
              href="/admin/skills"
              startContent={<RiHashtag />}
              color="primary"
            >
              Skills
            </ListboxItem>
          </ListboxSection>

          <ListboxItem
            key="settings"
            variant="flat"
            href="/admin/settings"
            startContent={<RiSettings3Line />}
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
