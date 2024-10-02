"use client";

import { clearAuthCookies } from "@/lib/actions";
import { useAppDispatch } from "@elearning/global-store";
import { setUser } from "@elearning/global-store/slices";
import { User } from "@elearning/lib/models";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ProfileAvatar,
  ProfilePlaceholder,
  ThemeToggleButton,
} from "@elearning/ui";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderSearchField from "./header-search-field";

export default function Header({ user }: { user?: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const accountView = () => {
    if (user) {
      const isAdminOrOwner = user.role === "owner" || user.role === "admin";
      return (
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
                  <a
                    href={isAdminOrOwner ? "/admin" : "/admin/courses"}
                    target="_blank"
                  >
                    Dashboard
                  </a>
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
      );
    }

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none lg:hidden">
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

        <NavbarItem className="hidden lg:flex">
          <Link
            href="/login"
            color="foreground"
            className="font-medium hover:text-primary"
          >
            Log In
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </NavbarItem>
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
      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderSearchField />
        </NavbarItem>

        {accountView()}

        <NavbarItem>
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </NavbarItem>
      </NavbarContent>

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
