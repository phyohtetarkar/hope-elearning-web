"use client";
import { DrawerContext } from "@/components";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  User
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function Header() {
  const { toggle } = useContext(DrawerContext);
  const pathname = usePathname();

  if (pathname.startsWith("/admin/posts/")) {
    return null;
  }

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      height="65px"
      className="fixed top-0"
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarBrand className="flex-grow-0">
        <Button
          className="border lg:hidden"
          variant="light"
          isIconOnly
          onClick={toggle}
        >
          <Bars3Icon width={24} className="text-muted" />
        </Button>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              name=""
              avatarProps={{
                name: "User",
                src: "/images/profile.png",
                as: "button",
                isBordered: true,
                color: "primary",
                size: "sm",
                className: "transition-transform",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">Name</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
