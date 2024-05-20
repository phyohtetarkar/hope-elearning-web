"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { firebaseAuth } from "@/lib/firebase.config";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { applyActionCode } from "firebase/auth";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VerifyEmailPage({ oobCode }: { oobCode: string }) {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const initRef = useRef(false);

  const verifyCode = useCallback(async (code: string) => {
    try {
      setError(undefined);
      const auth = firebaseAuth;
      await applyActionCode(auth, code);
      setVerified(true);
      const refreshResponse = await fetch("/api/auth/refresh", {
        method: "POST",
      });
      router.refresh();
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  }, [router]);

  useEffect(() => {
    if (initRef.current) {
      return;
    }
    initRef.current = true;
    verifyCode(oobCode);
  }, [oobCode, verifyCode]);

  const content = () => {
    if (error) {
      return <Alert variant="destructive">{error}</Alert>;
    }

    if (!verified) {
      return <Loading />;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="my-5">
          <div className="rounded-full bg-success p-3.5">
            <Check size={64} className="text-white" />
          </div>
        </div>

        <h3 className="mb-10 text-center">Your email has been verified</h3>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="flex-1" asChild>
            <Link href="/courses">Browse courses</Link>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <Link href="/profile">Go to profile</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="grid grid-cols-12">
        <Card className="shadow-none col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
          <CardContent className="p-5">{content()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
