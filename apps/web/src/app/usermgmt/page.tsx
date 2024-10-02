import { redirect } from "next/navigation";
import ResetPasswordPage from "./reset-password-page";
import VerifyEmailPage from "./verify-email-page";

export default function UserManagement({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mode = searchParams["mode"];
  const oobCode = searchParams["oobCode"];

  if (typeof mode !== "string") {
    redirect("/");
  }

  if (!mode.match("resetPassword|verifyEmail")) {
    redirect("/");
  }

  if (typeof oobCode !== "string" || oobCode.trim().length === 0) {
    redirect("/");
  }

  if (mode === "resetPassword") {
    return <ResetPasswordPage oobCode={oobCode} />;
  }

  return <VerifyEmailPage oobCode={oobCode} />;
}