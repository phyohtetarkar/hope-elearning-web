"use client";
import Alert from "@/components/Alert";
import ProgressButton from "@/components/ProgressButton";
import { Input, PasswordInput } from "@/components/forms";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignUpInputs {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [oauthLogin, setOauthLogin] = useState<"facebook"|"google">();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SignUpInputs>();

  const processSignUp = async (values: SignUpInputs) => {
    try {
      setError(undefined);
    } catch (error) {
    }
  };

  return (
    <div className="container py-3">
      <div className="row my-4 mb-5">
        <div className=" col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-body p-lg-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>

              {error && <Alert message={error} variant="danger" />}

              <form
                className="row g-3"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(async (data) => await processSignUp(data))();
                }}
              >
                <div className="col-lg-6">
                  <Input
                    label="Full Name"
                    id="nameInput"
                    type="text"
                    placeholder="Your full name"
                    {...register("fullName", {
                      required: true,
                    })}
                    error={errors.fullName && "Please enter full name"}
                  />
                </div>
                <div className="col-lg-6">
                  <Input
                    label="Email"
                    id="emailInput"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter email address"
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    })}
                    error={errors.email && "Please enter valid email"}
                  />
                </div>
                <div className="col-12">
                  <PasswordInput
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    error={
                      errors.password &&
                      "Password must be at least 8 charachers"
                    }
                  />
                </div>
                <div className="col-12">
                  <PasswordInput
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    {...register("confirmPassword", {
                      validate: (v, fv) => v === fv.password
                    })}
                    error={errors.confirmPassword && "Password does not match"}
                  />
                </div>

                <div className="col-md-12 mt-4">
                  <ProgressButton
                    type="submit"
                    className="w-100 py-2h"
                    disabled={isSubmitting || !!oauthLogin}
                    loading={isSubmitting}
                  >
                    Sign up
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
              Already have an account?
              <Link
                href="/login"
                className="text-decoration-none fw-medium link-anchor ms-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
