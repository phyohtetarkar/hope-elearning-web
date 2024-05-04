import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePassword from "./change-password";
import ProfileUpdate from "./profile-update";

export default function SettingPage() {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        <ProfileUpdate />
        <Separator />
        <ChangePassword />
      </CardContent>
    </Card>
  );
}
