"use client";
import { clearAuthCookies } from "@/lib/actions";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import {
  Button,
  DrawerContext,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ProfileAvatar,
  ThemeToggleButton,
} from "@elearning/ui";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useContext } from "react";

export default function Header() {
  const { toggle } = useContext(DrawerContext);
  const user = useAppSelector(selectUser);
  const { theme, setTheme } = useTheme();

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
                <a href={`/profile`} target="_blank">
                  My Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    await clearAuthCookies();
                  } catch (error) {
                    console.error(error);
                  }
                }}
                className="text-destructive focus:text-destructive"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <NavbarItem>
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
