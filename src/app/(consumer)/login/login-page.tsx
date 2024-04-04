"use client";

import Alert from "@/components/Alert";
import { Input, PasswordInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginInputs {
  username?: string;
  password?: string;
}

function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [oauthLogin, setOauthLogin] = useState<"facebook" | "google">();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginInputs>();

  const passwordLogin = async (values: LoginInputs) => {
    try {
      setError(undefined);
    } catch (error: any) {}
  };

  return (
    <div className="container py-3">
      <div className="grid grid-cols-12 mt-10 mb-5">
        <Card
          shadow="none"
          className="border col-span-12 md:col-span-6 md:col-start-4 xl:col-span-4 xl:col-start-5"
        >
          <CardBody className="px-6 py-4">
            <h3 className="fw-bold mt-2 mb-4">Sign In</h3>

            {error && <Alert message={error} variant="danger" />}

            <form
              className="grid grid-cols-1"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(async (data) => await passwordLogin(data))();
              }}
            >
              <Input
                label="Email"
                id="emailInput"
                type="email"
                wrapperClass="mb-4"
                autoComplete="username"
                placeholder="Enter email address"
                {...register("username", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                error={errors.username && "Please enter valid email address"}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Please enter password",
                })}
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
                <div className=" text-sliver mx-2">or continue with</div>
                <hr className="flex-grow" />
              </div>

              <div className="flex gap-2">
                <Button
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
                </Button>

                <Button
                  className="border flex-1 justify-start"
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
                  Google
                </Button>
              </div>
            </form>
          </CardBody>
          <Separator />
          <CardFooter className="flex justify-center">
            <div>
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="ms-1 font-medium text-anchor hover:text-opacity-80"
              >
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
