"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { sendVerificationEmail } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

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

  return (
    <div className="container py-3">
      <Card className="shadow-none">
        <CardContent className="px-6 py-4">
          <div className="flex flex-col items-center">
            <h2 className="text-center mt-5 mb-2">Verify your email</h2>
            <p className="text-sliver text-center">
              Check your email &amp; click the link to verify your email.
            </p>

            <div className="aspect-1 relative w-full my-6 max-w-[350px]">
              <Image
                src={"/images/undraw_mailbox.png"}
                alt=""
                fill
                sizes="100vh"
                priority
                className="object-contain"
              />
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
            <div className="text-sm text-sliver mb-4 text-center">
              Didn&apos;t get confirmation email?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
