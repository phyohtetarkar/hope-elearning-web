"use client";

import { Input, PasswordInput } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { applyAuthCookies } from "@/lib/actions";
import { firebaseAuth } from "@/lib/firebase.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { inMemoryPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NProgress from "nprogress";

const schema = z.object({
  username: z.string().email({
    message: "Please enter valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter password",
  }),
});

type LoginForm = z.infer<typeof schema>;

function LoginPage() {
  const [error, setError] = useState<string>();
  const [oauthLogin, setOauthLogin] = useState<"facebook" | "google">();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (values: LoginForm) => {
    try {
      setError(undefined);
      const auth = firebaseAuth;
      auth.setPersistence(inMemoryPersistence);
      const result = await signInWithEmailAndPassword(auth, values.username, values.password);

      const idToken = await result.user.getIdToken();
      const refreshToken = result.user.refreshToken;

      await auth.signOut();
      await applyAuthCookies({
        accessToken: idToken,
        refreshToken: refreshToken,
      });
      NProgress.start();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-3">
      <div className="grid grid-cols-12 mt-10 mb-5">
        <Card className="shadow-none col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5">
          <CardContent className="px-6 py-4">
            <h3 className="fw-bold mt-2 mb-4">Sign In</h3>

            {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}

            <form
              className="grid grid-cols-1"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(handleLogin)();
              }}
            >
              <Input
                label="Email"
                id="emailInput"
                type="email"
                wrapperClass="mb-4"
                autoComplete="username"
                placeholder="Enter email address"
                {...register("username")}
                error={errors.username?.message}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                autoComplete="current-password"
                {...register("password")}
                error={errors.password?.message}
              />
              <Link
                href="/forgot-password"
                className="mt-1 underline mb-5 text-anchor hover:text-opacity-80"
              >
                Forgot password?
              </Link>

              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || !!oauthLogin}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="ms-1 font-medium text-anchor hover:text-opacity-80"
            >
              Sign Up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
