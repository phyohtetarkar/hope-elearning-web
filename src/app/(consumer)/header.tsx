"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { ProfilePlaceholder } from "@/components/ui/profile-placeholder";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import { clearAuthCookies } from "@/lib/actions";
import { User } from "@/lib/models";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useState } from "react";
import HeaderSearchField from "./header-search-field";

export default function Header({ user }: { user?: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themeButton = (
    <>
      <NavbarItem>
        <ThemeToggleButton />
      </NavbarItem>
    </>
  );

  const accountView = () => {
    if (user) {
      const isAdminOrOwner = user.role === "owner" || user.role === "admin";
      return (
        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <HeaderSearchField />
          </NavbarItem>
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
              {user.role !== "user" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={isAdminOrOwner ? "/admin" : "/admin/courses"}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/learnings">My Learnings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/bookmarks">My Bookmarks</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
          {themeButton}
        </NavbarContent>
      );
    }

    return (
      <>
        <NavbarContent as="div" justify="end" className="flex lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <ProfilePlaceholder
                className="size-[40px] border"
                iconClass="size-6"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-xl">
              <DropdownMenuLabel className="font-semibold">
                Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {themeButton}
        </NavbarContent>

        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem>
            <Link
              href="/login"
              color="foreground"
              className="font-medium hover:text-primary"
            >
              Log In
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </NavbarItem>
          {themeButton}
        </NavbarContent>
      </>
    );
  };

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      className="fixed top-0 bg-background"
      classNames={{
        wrapper: "px-4",
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand className="flex-grow-0">
        <Link href="/" color="foreground" className="flex items-center">
          <div className="size-[40px] relative bg-primary rounded">
            {/* <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className="rounded object-fill"
              priority
            />  */}
          </div>
          <h3 className="ms-3 hidden sm:block text-foreground">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h3>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem>
          <Link
            href={"/browse"}
            color="foreground"
            className="text-foreground hover:text-primary"
          >
            Browse
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={"/categories"}
            color="foreground"
            className="text-foreground hover:text-primary"
          >
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={"/blogs"}
            color="foreground"
            className="text-foreground hover:text-primary"
          >
            Blogs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={"/pricing"}
            color="foreground"
            className="text-foreground hover:text-primary"
          >
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>

      {accountView()}

      <NavbarMenu className="gap-4 px-4 backdrop-blur-xl bg-background/95 z-50">
        <NavbarMenuItem>
          <Link
            href={"/browse"}
            color="foreground"
            className="text-foreground hover:text-primary"
            onClick={(evt) => setIsMenuOpen(false)}
          >
            Browse
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href={"/categories"}
            color="foreground"
            className="text-foreground hover:text-primary"
            onClick={(evt) => setIsMenuOpen(false)}
          >
            Categories
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href={"/blogs"}
            color="foreground"
            className="text-foreground hover:text-primary"
            onClick={(evt) => setIsMenuOpen(false)}
          >
            Blogs
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href={"/pricing"}
            color="foreground"
            className="text-foreground hover:text-primary"
            onClick={(evt) => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
