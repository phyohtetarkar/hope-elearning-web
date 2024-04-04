import { Button } from "@/components/ui/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Image from "next/image";

export default function Header() {
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

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex gap-4">
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
    </Navbar>
  );
}
