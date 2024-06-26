import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import * as jose from "jose";
import { Check } from "lucide-react";
import Link from "next/link";
import VerifyEmailPage from "./verify-email-page";
import { Card, CardContent } from "@/components/ui/card";

export default async function VerifyEmail() {
  const session = await getSession();

  const { accessToken } = session;

  const payload = jose.decodeJwt(accessToken);
  const emailVerified = payload["email_verified"];

  if (emailVerified) {
    return (
      <div className="container py-5">
        <div className="grid grid-cols-12">
          <Card className="shadow-none col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
            <CardContent className="p-5">
              <div className="flex flex-col items-center">
                <div className="my-5">
                  <div className="rounded-full bg-success ring-8 ring-success/30 p-3">
                    <Check className="text-white size-14" />
                  </div>
                </div>

                <h3 className="mb-10 text-center">
                  Your email has been verified
                </h3>

                <div className="flex flex-wrap items-center gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/browse">Browse courses</Link>
                  </Button>
                  <Button className="flex-1" variant="outline" asChild>
                    <Link href="/profile">Go to profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <VerifyEmailPage />;
}
