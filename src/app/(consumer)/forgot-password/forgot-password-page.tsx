"use client";

import { Input } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { firebaseAuth } from "@/lib/firebase.config";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({
    message: "Please enter valid email address",
  }),
});

type ForgorPasswordForm = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const [error, setError] = useState<string>();
  const { toast } = useToast();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ForgorPasswordForm>({
    resolver: zodResolver(schema),
  });

  const handleSendEmail = async (values: ForgorPasswordForm) => {
    try {
      setError(undefined);
      const auth = firebaseAuth;
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: "Success",
        description: "Password reset email has been sent",
        variant: "success",
      });
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  };

  return (
    <div className="container py-3">
      <div className="grid grid-cols-12 mt-10 mb-5">
        <Card className="shadow-none col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
          <CardContent className="px-6 py-4">
            <h3 className="fw-bold mt-2 mb-4">Forgot Password</h3>

            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <form
              className="grid grid-cols-1"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(handleSendEmail)();
              }}
            >
              <Input
                label="Email"
                id="emailInput"
                type="email"
                wrapperClass="mb-5"
                autoComplete="username"
                placeholder="Enter email address"
                {...register("email")}
                error={errors.email?.message}
              />

              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                )}
                Request
              </Button>
            </form>
          </CardContent>
          <Separator />
          <CardFooter className="justify-center py-3.5">
            Already have an account?
            <Link
              href="/login"
              className="ms-1 font-medium text-anchor hover:text-opacity-80"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
