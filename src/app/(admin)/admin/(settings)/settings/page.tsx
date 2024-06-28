import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  Handshake,
  Info,
  ScrollText,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const iconSize = 30;

const SettingMenu = ({
  avatar,
  title,
  description,
}: {
  avatar: ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <Card className="shadow-none">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          {avatar}
          <div className="flex flex-col">
            <h6 className="font-semibold mb-1 text-foreground">{title}</h6>
            <p className="text-sm mb-0 text-muted-foreground">
              {description ?? ""}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Settings() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Settings</h2>
      </div>
      <div className="mb-10">
        <div className="uppercase text-sm">Members</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <Link href="/admin/users">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-success"
                  style={{ width: 60, height: 60 }}
                >
                  {
                    <Users
                      size={iconSize}
                      className="text-success-foreground"
                    />
                  }
                </div>
              }
              title="User"
              description="Manage users"
            />
          </Link>
          <Link href="/admin/subscribers">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-default"
                  style={{ width: 60, height: 60 }}
                >
                  {
                    <DollarSign
                      size={iconSize}
                      className="text-default-foreground"
                    />
                  }
                </div>
              }
              title="Subscribers"
              description="Manage subscribers"
            />
          </Link>
        </div>
      </div>
      <div className="mb-10">
        <div className="uppercase text-sm">Website</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <Link href="/admin/about-us">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-primary"
                  style={{ width: 60, height: 60 }}
                >
                  {<Info size={iconSize} className="text-primary-foreground" />}
                </div>
              }
              title="About Us"
              description="Edit about us"
            />
          </Link>
          <Link href="/admin/privacy-policy">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-warning"
                  style={{ width: 60, height: 60 }}
                >
                  {
                    <Shield
                      size={iconSize}
                      className="text-warning-foreground"
                    />
                  }
                </div>
              }
              title="Privacy Policy"
              description="Edit privacy policy"
            />
          </Link>
          <Link href="/admin/terms-and-conditions">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-default"
                  style={{ width: 60, height: 60 }}
                >
                  {
                    <Handshake
                      size={iconSize}
                      className="text-default-foreground"
                    />
                  }
                </div>
              }
              title="Terms And Conditions"
              description="Edit terms and conditions"
            />
          </Link>
        </div>
      </div>
      <div className="mb-10">
        <div className="uppercase text-sm">Misc</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <Link href="/admin/audit-log">
            <SettingMenu
              avatar={
                <div
                  className="flex flex-shrink-0 rounded-full justify-center items-center bg-default"
                  style={{ width: 60, height: 60 }}
                >
                  {
                    <ScrollText
                      size={iconSize}
                      className="text-default-foreground"
                    />
                  }
                </div>
              }
              title="Audit Log"
              description="View audit actions"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
