"use client";

import { sendVerificationEmail } from "@/lib/actions";
import { useAppSelector } from "@elearning/global-store";
import { selectUser } from "@elearning/global-store/slices";
import { Button, Card, CardContent, useToast } from "@elearning/ui";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (resend) {
      return;
    }

    setTimer(30);

    const interval = setInterval(() => {
      setTimer((old) => {
        if (old > 1) {
          return old - 1;
        }

        setResend(true);

        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resend]);

  if (user === undefined) {
    return null;
  }

  if (user?.emailVerified) {
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

  return (
    <div className="container py-5">
      <Card className="shadow-none">
        <CardContent className="px-6 py-4">
          <div className="flex flex-col items-center">
            <h2 className="text-center mt-5 mb-2">Verify your email</h2>
            <p className="text-muted-foreground text-center">
              Check your email &amp; click the link to verify your email.
            </p>

            <div className="max-w-[350px] w-full">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  src={require("@elearning/assets/images/undraw_mailbox.svg")}
                  alt=""
                  fill
                  sizes="100vh"
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mb-2">
              <Button
                disabled={!resend}
                onClick={async () => {
                  try {
                    setResend(false);
                    await sendVerificationEmail();
                  } catch (error: any) {
                    toast({
                      title: "Error",
                      description: error.message,
                      variant: "destructive",
                    });
                  }
                }}
              >
                Resend confirmation email
                {timer > 0 && <span className="ms-1">({timer})</span>}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground mb-4 text-center">
              Didn&apos;t get confirmation email?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
