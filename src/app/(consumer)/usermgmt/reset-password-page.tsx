"use client";

import { PasswordInput } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { useToast } from "@/components/ui/use-toast";
import { firebaseAuth } from "@/lib/firebase.config";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyActionCode, confirmPasswordReset } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPasswordPage({ oobCode }: { oobCode: string }) {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>();
  const initRef = useRef(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
  });

  const verifyCode = useCallback(async (code: string) => {
    try {
      setError(undefined);
      const auth = firebaseAuth;
      await applyActionCode(auth, code);
      setVerified(true);
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  }, []);

  useEffect(() => {
    if (initRef.current) {
      return;
    }
    initRef.current = true;
    verifyCode(oobCode);
  }, [oobCode, verifyCode]);

  const resetPassword = async (values: ResetPasswordForm) => {
    try {
      const auth = firebaseAuth;
      await confirmPasswordReset(auth, oobCode, values.newPassword);
      toast({
        title: "Success",
        description: "Reset password success. Please login again.",
        variant: "success",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    }
  };

  const content = () => {
    if (error) {
      return <Alert variant="destructive">{error}</Alert>;
    }

    if (!verified) {
      return <Loading />;
    }

    return (
      <form
        className="grid grid-cols-1"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(resetPassword)();
        }}
      >
        <PasswordInput
          label="New Password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          wrapperClass="mb-4"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <PasswordInput
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="mt-7" disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          )}
          Reset
        </Button>
      </form>
    );
  };

  return (
    <div className="container py-5">
      <div className="grid grid-cols-12">
        <Card className="shadow-none col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
          <CardContent className="px-6 py-4">{content()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
