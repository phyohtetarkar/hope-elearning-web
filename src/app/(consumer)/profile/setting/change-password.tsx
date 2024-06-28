"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { PasswordInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { firebaseAuth } from "@/lib/firebase.config";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthErrorCodes,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    oldPassword: z.string().min(1, {
      message: "Required old password",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordForm = z.infer<typeof schema>;

export default function ChangePassword() {
  const { toast } = useToast();
  const { user } = useContext(AuthenticationContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleChangePassowrd = async (values: ChangePasswordForm) => {
    try {
      if (!user?.email) {
        throw "Something went wrong. Please try again";
      }
      const auth = firebaseAuth;
      auth.setPersistence(inMemoryPersistence);
      const result = await signInWithEmailAndPassword(
        auth,
        user.email,
        values.oldPassword
      );
      await updatePassword(result.user, values.newPassword);
      await auth.signOut();
      toast({
        title: "Success",
        description: "Password changed successfully",
        variant: "success",
      });
      reset();
    } catch (error: any) {
      let msg = parseErrorResponse(error);
      if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        msg = "Current password incorrect";
      } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        msg = "Current password incorrect";
      }
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      className="grid grid-cols-12 mt-4 mb-5"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(handleChangePassowrd)();
      }}
    >
      <div className="lg:col-span-8 col-span-12">
        <input
          hidden
          autoComplete="username"
          name="username"
          defaultValue={user?.email ?? ""}
        />
        <PasswordInput
          label="Old password"
          autoComplete="old-password"
          placeholder="Enter new password "
          wrapperClass="mb-4"
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
        />

        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="Enter new password "
          wrapperClass="mb-4"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <PasswordInput
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Re-enter new password"
          wrapperClass="mb-5"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          )}
          Change password
        </Button>
      </div>
    </form>
  );
}
