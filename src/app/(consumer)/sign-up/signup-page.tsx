"use client";

import { Input, PasswordInput } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { applyAuthCookies } from "@/lib/actions";
import { firebaseAuth } from "@/lib/firebase.config";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    nickname: z.string().min(2, {
      message: "Please your enter nick name",
    }),
    email: z.string().email({
      message: "Please enter valid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof schema>;

function SignUpPage() {
  const [error, setError] = useState<string>();
  const [oauthLogin, setOauthLogin] = useState<"facebook" | "google">();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const handleSignUp = async (values: SignUpForm) => {
    try {
      setError(undefined);
      const auth = firebaseAuth;
      auth.setPersistence(inMemoryPersistence);
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      sendEmailVerification(result.user);
      await updateProfile(result.user, {
        displayName: values.nickname,
      });

      const idToken = await result.user.getIdToken();
      const refreshToken = result.user.refreshToken;

      await auth.signOut();
      await applyAuthCookies({
        accessToken: idToken,
        refreshToken: refreshToken,
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
            <h3 className="fw-bold mt-2 mb-4">Sign Up</h3>

            {error && <Alert variant="destructive">{error}</Alert>}

            <form
              className="grid grid-cols-1"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(handleSignUp)();
              }}
            >
              <Input
                label="Nick Name"
                id="nameInput"
                type="text"
                wrapperClass="mb-4"
                placeholder="Enter nick name"
                {...register("nickname")}
                error={errors.nickname?.message}
              />
              <Input
                label="Email"
                id="emailInput"
                type="email"
                wrapperClass="mb-4"
                autoComplete="username"
                placeholder="Enter email address"
                {...register("email")}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                wrapperClass="mb-4"
                {...register("password")}
                error={errors.password?.message}
              />

              <PasswordInput
                label="Confirm Password"
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                color="primary"
                className="mt-7"
                disabled={isSubmitting || !!oauthLogin}
              >
                {isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </Button>

              <div className="flex items-center my-4">
                <hr className="flex-grow" />
                <div className=" text-sliver mx-4">OR</div>
                <hr className="flex-grow" />
              </div>

              <div className="flex gap-2">
                {/* <Button
                  className="border flex-1 justify-start"
                  variant="outline"
                  disabled={isSubmitting || !!oauthLogin}
                  onClick={async () => {
                    try {
                      setError(undefined);
                      setOauthLogin("facebook");
                    } catch (error) {
                    } finally {
                      setOauthLogin(undefined);
                    }
                  }}
                >
                  {oauthLogin === "facebook" && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Image
                    src="/images/icons8-facebook-48.png"
                    alt="facebook"
                    width={28}
                    height={28}
                    className="mr-2"
                  />
                  Facebook
                </Button> */}

                <Button
                  className="border flex-1"
                  variant="outline"
                  disabled={isSubmitting || !!oauthLogin}
                  onClick={async () => {
                    try {
                      setError(undefined);
                      setOauthLogin("google");
                    } catch (error) {
                    } finally {
                      setOauthLogin(undefined);
                    }
                  }}
                >
                  {oauthLogin === "google" && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Image
                    src="/images/icons8-google-48.png"
                    alt="google"
                    width={28}
                    height={28}
                    className="mr-2"
                  />
                  Continue with Google
                </Button>
              </div>
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

export default SignUpPage;
