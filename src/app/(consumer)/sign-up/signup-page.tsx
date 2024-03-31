"use client";
import Alert from "@/components/Alert";
import { Input, PasswordInput } from "@/components/forms";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
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
  const [oauthLogin, setOauthLogin] = useState<"facebook" | "google">();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignUpInputs>();

  const processSignUp = async (values: SignUpInputs) => {
    try {
      setError(undefined);
    } catch (error) {}
  };

  return (
    <div className="container py-3">
      <div className="grid grid-cols-12 mt-10 mb-5">
        <Card
          shadow="none"
          className="border col-span-12 md:col-span-6 md:col-start-4 xl:col-span-6 xl:col-start-4"
        >
          <CardBody className="px-6 py-4">
            <h3 className="fw-bold mt-2 mb-4">Sign Up</h3>

            {error && <Alert message={error} variant="danger" />}

            <form
              className="grid grid-cols-1"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(async (data) => await processSignUp(data))();
              }}
            >
              <Input
                label="Full Name"
                id="nameInput"
                type="text"
                className="mb-4"
                placeholder="Your full name"
                {...register("fullName", {
                  required: true,
                })}
                error={errors.fullName && "Please enter full name"}
              />
              <Input
                label="Email"
                id="emailInput"
                type="email"
                className="mb-4"
                autoComplete="username"
                placeholder="Enter email address"
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                error={errors.email && "Please enter valid email"}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
                <PasswordInput
                  label="Password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  error={
                    errors.password && "Password must be at least 8 charachers"
                  }
                />
                <PasswordInput
                  label="Confirm Password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  {...register("confirmPassword", {
                    validate: (v, fv) => v === fv.password,
                  })}
                  error={errors.confirmPassword && "Password does not match"}
                />
              </div>

              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || !!oauthLogin}
                isLoading={isSubmitting}
              >
                Sign up
              </Button>

              <div className="flex items-center my-4">
                <hr className="flex-grow" />
                <div className=" text-muted mx-2">or continue with</div>
                <hr className="flex-grow" />
              </div>

              <div className="flex gap-2">
                <Button
                  className="border flex-1"
                  variant="light"
                  disabled={isSubmitting || !!oauthLogin}
                  isLoading={oauthLogin === "facebook"}
                  onClick={async () => {
                    try {
                      setError(undefined);
                      setOauthLogin("facebook");
                    } catch (error) {
                    } finally {
                      setOauthLogin(undefined);
                    }
                  }}
                  startContent={
                    <Image
                      src="/images/icons8-facebook-48.png"
                      alt="facebook"
                      width={28}
                      height={28}
                    />
                  }
                >
                  Facebook
                </Button>

                <Button
                  className="border flex-1"
                  variant="light"
                  disabled={isSubmitting || !!oauthLogin}
                  isLoading={oauthLogin === "google"}
                  onClick={async () => {
                    try {
                      setError(undefined);
                      setOauthLogin("google");
                    } catch (error) {
                    } finally {
                      setOauthLogin(undefined);
                    }
                  }}
                  startContent={
                    <Image
                      src="/images/icons8-google-48.png"
                      alt="google"
                      width={28}
                      height={28}
                    />
                  }
                >
                  Google
                </Button>
              </div>
            </form>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center">
            <div>
              Already have an account?
              <Link
                href="/login"
                className="ms-1 font-medium text-anchor hover:text-opacity-80"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;
