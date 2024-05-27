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
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import { clearAuthCookies } from "@/lib/actions";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Menu } from "lucide-react";
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
          <Menu className="text-muted-foreground" />
        </Button>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none flex-shrink-0">
              <ProfileAvatar
                src={user.image}
                prefix={user.nickname.substring(0, 2)}
              />
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
        <NavbarItem>
          <ThemeToggleButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
