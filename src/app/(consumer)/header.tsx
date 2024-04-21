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
import { clearAuthCookies } from "@/lib/actions";
import { User } from "@/lib/models";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import NProgress from "nprogress";

export default function Header({ user }: { user?: User }) {
  const accountView = () => {
    if (user) {
      return (
        <NavbarContent as="div" justify="end">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="aspect-1 w-[32px] relative">
                <Image
                  src={user.image ?? "/images/profile.png"}
                  alt="Avatar"
                  fill
                  sizes="50vh"
                  className="rounded-full border-1 border-transparent ring-1 ring-primary object-cover"
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
                <DropdownMenuItem asChild>
                  <Link href="/admin">Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  NProgress.start();
                  await clearAuthCookies();
                }}
              >
                Log Out
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
              <div className="aspect-1 w-[32px] relative">
                <Image
                  src={"/images/user-placeholder.png"}
                  alt="Avatar"
                  fill
                  sizes="50vh"
                  className="rounded-full border-1 border-transparent ring-1 ring-primary object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-xl">
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
      maxWidth="xl"
      className="fixed top-0"
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarBrand className="flex-grow-0">
        <Link href="/" color="foreground" className="flex items-center">
          <div className="size-[40px] relative">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className="rounded object-fill"
            />
          </div>
          <h3 className="ms-3">{process.env.NEXT_PUBLIC_APP_NAME}</h3>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem>
          <Link
            href={"/courses"}
            color="foreground"
            className="hover:text-primary"
          >
            Courses
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
        <NavbarItem>
          <Link
            href={"/about-us"}
            color="foreground"
            className="hover:text-primary"
          >
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>

      {accountView()}
    </Navbar>
  );
}
