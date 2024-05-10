"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { YoutubeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearAuthCookies } from "@/lib/actions";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import HeaderSearchField from "./header-search-field";

export default function Header() {
  const { user } = useContext(AuthenticationContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socials = (
    <>
      <NavbarItem>
        <a
          href="https://www.youtube.com"
          color="foreground"
          className="text-gray-500 hover:text-primary flex items-center space-x-1"
        >
          <YoutubeIcon />
        </a>
      </NavbarItem>
    </>
  );

  const accountView = () => {
    if (user) {
      return (
        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <HeaderSearchField />
          </NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="size-[40px] relative">
                <Image
                  src={user.image ?? "/images/profile.png"}
                  alt="Avatar"
                  fill
                  sizes="50vh"
                  priority
                  className="rounded-full border object-cover"
                />
              </div>
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
                    <Link href="/admin">Dashboard</Link>
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
        </NavbarContent>
      );
    }

    return (
      <>
        <NavbarContent as="div" justify="end" className="flex lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex items-center justify-center size-[36px] bg-gray-200 border rounded-full">
                <UserIcon className="size-6 text-gray-700" />
              </div>
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
        </NavbarContent>
      </>
    );
  };

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      className="fixed top-0"
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
          <div className="size-[40px] relative">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className="rounded object-fill"
              priority
            />
          </div>
          <h3 className="ms-3 hidden sm:block">{process.env.NEXT_PUBLIC_APP_NAME}</h3>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem>
          <Link
            href={"/categories"}
            color="foreground"
            className="hover:text-primary"
          >
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={"/blogs"}
            color="foreground"
            className="hover:text-primary"
          >
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>

      {accountView()}

      <NavbarMenu className="gap-4 px-4 backdrop-blur-xl bg-white/95">
        <NavbarMenuItem>
          <Link
            href={"/categories"}
            color="foreground"
            className="hover:text-primary"
          >
            Categories
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href={"/blogs"}
            color="foreground"
            className="hover:text-primary"
          >
            Blogs
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href={"/about-us"}
            color="foreground"
            className="hover:text-primary"
          >
            About us
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
