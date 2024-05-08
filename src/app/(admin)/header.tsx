"use client";
import { AuthenticationContext } from "@/components/authentication-context-porvider";
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
import { clearAuthCookies } from "@/lib/actions";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
  const { toggle } = useContext(DrawerContext);
  const { user } = useContext(AuthenticationContext);

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      height="65px"
      className="fixed top-0"
      classNames={{
        wrapper: "px-4 lg:px-5",
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
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="size-[36px] relative">
                <Image
                  src={user.image ?? "/images/profile.png"}
                  alt="Avatar"
                  fill
                  sizes="50vh"
                  className="rounded-full border-1 object-cover"
                  priority
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-xl">
              <DropdownMenuLabel className="gap-2">
                <p className="font-normal">Signed in as</p>
                <p className="font-semibold">{user.nickname}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await clearAuthCookies();
                }}
                className="text-destructive focus:text-destructive"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </NavbarContent>
    </Navbar>
  );
}
