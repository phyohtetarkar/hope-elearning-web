import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BadgePercent,
  CalendarRange,
  CircleDollarSign,
  FilePenLine,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function Settings() {
  const SettingMenu = ({
    icon,
    title,
    description,
    variant = "default",
  }: {
    icon: ReactNode;
    title: string;
    description?: string;
    variant?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
  }) => {
    return (
      <Card>
        <CardContent className="pt-3">
          <div className="flex items-start gap-3">
            <div
              className={`flex rounded-full justify-center items-center bg-${variant}`}
              style={{ width: 60, height: 60 }}
            >
              {icon}
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold mb-1">{title}</h6>
              <p className="text-xs mb-0 text-gray-500">{description ?? ""}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Settings</h2>
      </div>
      <div className="mb-10">
        <div className="uppercase text-sm">Website</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <div>
            <Link href="/admin/users">
              <SettingMenu
                icon={<Users size={30} className="text-white" />}
                variant="success"
                title="User"
                description="Manage users"
              />
            </Link>
          </div>
          <div>
            <Link href="/admin/users">
              <SettingMenu
                icon={<FilePenLine size={30} className="text-black" />}
                title="Site Setting"
                description="Manage site settings"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="uppercase text-sm">Subscriptions</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <div>
            <Link href="/admin/users">
              <SettingMenu
                icon={<CircleDollarSign size={30} className="text-white" />}
                variant="danger"
                title="Subscription plans"
                description="Manage subscription plans"
              />
            </Link>
          </div>
          <div>
            <Link href="/admin/users">
              <SettingMenu
                icon={<BadgePercent size={30} className="text-white" />}
                variant="warning"
                title="Promo codes"
                description="Manage subscription promos"
              />
            </Link>
          </div>
          <div>
            <Link href="/admin/users">
              <SettingMenu
                icon={<CalendarRange size={30} className="text-black" />}
                title="Subscription history"
                description="View subscription log"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
