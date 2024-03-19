"use client";

import Alert from "@/components/Alert";
import ProgressButton from "@/components/ProgressButton";
import { Input, PasswordInput } from "@/components/forms";
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
      <div className="row my-4 mb-5">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>

              {error && <Alert message={error} variant="danger" />}

              <form
                className="row g-3"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(async (data) => await passwordLogin(data))();
                }}
              >
                <div className="col-md-12">
                  <Input
                    label="Email"
                    id="emailInput"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter email address"
                    {...register("username", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                    error={
                      errors.username && "Please enter valid email address"
                    }
                  />
                </div>
                <div className="col-md-12">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Please enter password",
                    })}
                    error={errors.password?.message}
                  />
                  <div className="mt-1">
                    <Link href="/forgot-password" className="link-anchor">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    disabled={isSubmitting || !!oauthLogin}
                    loading={isSubmitting}
                  >
                    Login
                  </ProgressButton>
                </div>
                <div className="col-md-12 mb-2">
                  <div className="row g-2">
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                    <div className="col-auto align-self-center text-muted">
                      or continue with
                    </div>
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="hstack gap-2 align-items-center">
                    <ProgressButton
                      className="border w-50"
                      variant="light"
                      theme="outline"
                      disabled={isSubmitting || !!oauthLogin}
                      loading={oauthLogin === "facebook"}
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
                      <Image
                        src="/images/icons8-facebook-48.png"
                        alt="facebook"
                        width={28}
                        height={28}
                      />
                      <span className="text-dark ms-1 text-truncate">
                        Facebook
                      </span>
                    </ProgressButton>

                    <ProgressButton
                      className="border w-50"
                      variant="light"
                      theme="outline"
                      disabled={isSubmitting || !!oauthLogin}
                      loading={oauthLogin === "google"}
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
                      <Image
                        src="/images/icons8-google-48.png"
                        alt="google"
                        width={28}
                        height={28}
                      />
                      <span className="text-dark ms-1 text-truncate">
                        Google
                      </span>
                    </ProgressButton>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-center p-3 card-footer">
              Don&apos;t have an account?
              <Link
                href="/sign-up"
                className="text-decoration-none fw-medium link-anchor ms-1"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
