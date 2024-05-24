import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookText, Bookmark, Settings, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const iconSize = 20;

export default function ProfileLayout({ children }: { children: ReactNode }) {
  function menuLink({
    href,
    title,
    icon,
  }: {
    href: string;
    title: string;
    icon: ReactNode;
  }) {
    return (
      <Link href={href} className={"flex p-2 items-center hover:text-primary"}>
        {icon}
        <span>{title}</span>
      </Link>
    );
  }

  const content = (
    <>
      <div className="text-muted-foreground px-1 mb-2 text-sm uppercase hidden lg:block ">
        ACCOUNT
      </div>
      <div className="flex flex-col gap-1">
        {menuLink({
          href: "/profile",
          title: "Profile",
          icon: <User className="me-2" size={iconSize} />,
        })}
        {menuLink({
          href: "/profile/learnings",
          title: "Learnings",
          icon: <BookText className="me-2" size={iconSize} />,
        })}
        {menuLink({
          href: "/profile/bookmarks",
          title: "Bookmarks",
          icon: <Bookmark className="me-2" size={iconSize} />,
        })}
        {menuLink({
          href: "/profile/setting",
          title: "Setting",
          icon: <Settings className="me-2" size={iconSize} />,
        })}
      </div>
    </>
  );

  return (
    <div className="container py-5 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <div className="border rounded-md">
            <div className="block lg:hidden">
              <Accordion type="multiple">
                <AccordionItem value="menu">
                  <AccordionTrigger className="px-3 py-2 font-semibold text-lg">
                    Menu
                  </AccordionTrigger>
                  <AccordionContent className="border-t pb-0">
                    <div className="p-3">{content}</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="p-3 hidden lg:block">{content}</div>
          </div>
        </div>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
