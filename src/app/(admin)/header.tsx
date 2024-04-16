"use client";
import { Button } from "@/components/ui/button";
import { DrawerContext } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

export default function Header() {
  const { toggle } = useContext(DrawerContext);
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
          <Menu className="text-sliver" />
        </Button>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
              <Image
                src="/images/profile.png"
                alt="Avatar"
                width={36}
                height={36}
                className="rounded-full border-1 border-transparent ring-1 ring-primary"
              />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-xl">
            <DropdownMenuLabel className="gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">Name</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavbarContent>
    </Navbar>
  );
}
