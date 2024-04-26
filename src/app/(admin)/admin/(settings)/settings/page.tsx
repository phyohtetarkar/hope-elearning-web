import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FilePenLine, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

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
            <h6 className="font-semibold mb-1">{title}</h6>
            <p className="text-xs mb-0 text-gray-500">{description ?? ""}</p>
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
        <div className="uppercase text-sm">Website</div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxxl:grid-cols-4 gap-3 mb-5 mt-5">
          <div>
            <Link href="/admin/users">
              <SettingMenu
                avatar={
                  <div
                    className="flex flex-shrink-0 rounded-full justify-center items-center bg-success"
                    style={{ width: 60, height: 60 }}
                  >
                    {<Users size={30} className="text-white" />}
                  </div>
                }
                title="User"
                description="Manage users "
              />
            </Link>
          </div>
          <div>
            <Link href="/admin/users">
              <SettingMenu
                avatar={
                  <div
                    className="flex flex-shrink-0 rounded-full justify-center items-center bg-default"
                    style={{ width: 60, height: 60 }}
                  >
                    {<FilePenLine size={30} className="text-dark" />}
                  </div>
                }
                title="Site Setting"
                description="Manage site settings "
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
