"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  nickname: z.string().min(1, {
    message: "Please enter nickname",
  }),
  headline: z.string(),
  email: z.string(),
  username: z.string(),
});

type ProfileUpdateForm = z.infer<typeof schema>;

export default function ProfileUpdate() {
  const { user } = useContext(AuthenticationContext);
  const { toast } = useToast();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProfileUpdateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: user?.nickname,
      headline: user?.headline,
      email: user?.email,
      username: user?.username,
    },
  });

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(async (values) => {
          try {
            await updateUserProfile(values);
          } catch (error) {
            toast({
              title: "Error",
              description: parseErrorResponse(error),
              variant: "destructive",
            });
          }
        })();
      }}
    >
      <div className="grid grid-cols-12 mb-5">
        <div className="lg:col-span-8 col-span-12 me-2 md:order-2 order-2">
          <Input
            label="Headline"
            id="headlineInput"
            type="text"
            wrapperClass="mb-4"
            placeholder="Enter headline"
            {...register("headline")}
          />
          <div className="grid grid-cols-12">
            <div className="lg:col-span-6 lg:me-2 col-span-12">
              <Input
                label="Nick Name"
                id="nameInput"
                type="text"
                wrapperClass="mb-4"
                placeholder="Enter nick name"
                {...register("nickname")}
                error={errors.nickname?.message}
              />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Input
                label="Email"
                id="emailInput"
                type="email"
                wrapperClass="mb-5"
                {...register("email")}
                disabled
              />
            </div>
          </div>

          <Button type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update profile
          </Button>
        </div>

        <div className="lg:col-span-4 col-span-12 flex justify-center lg:order-2 mb-2">
          <div>
            <div className="relative overflow-hidden rounded-full">
              <Image
                src={user?.image ?? "/images/profile.png"}
                width={128}
                height={128}
                alt="User image"
                sizes="33vw"
                className="rounded-full object-cover"
                priority
              />
              <div className="absolute bg-black bg-opacity-50 text-white text-center w-full bottom-0">
                Edit
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
