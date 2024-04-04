"use client";
import { DrawerContext } from "@/components/ui/drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
          variant="outline"
          size="icon"
          onClick={toggle}
        >
          <Bars3Icon width={24} className="text-sliver" />
        </Button>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="bg-transparent ring-0 outline-none">
              <Image
                src="/images/profile.png"
                alt="Avatar"
                width={36}
                height={36}
                className="rounded-full border-1 border-transparent ring-2 ring-primary"
              />
            </button>
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
