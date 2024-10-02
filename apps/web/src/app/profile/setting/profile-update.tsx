"use client";

import { updateUserProfile, uploadImage } from "@/lib/actions";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { Input } from "@elearning/ui/forms";
import { Button, ProfileAvatar, Separator, useToast } from "@elearning/ui";
import { User } from "@elearning/lib/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  nickname: z.string().min(1, {
    message: "Please enter nickname",
  }),
  headline: z.string().optional(),
  email: z.string().optional(),
  username: z.string(),
});

type ProfileUpdateForm = z.infer<typeof schema>;

export default function ProfileUpdate({ user }: { user: User }) {
  const [isUploading, setUploading] = useState(false);
  const { toast } = useToast();
  const imageFileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProfileUpdateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: user.nickname,
      headline: user.headline,
      email: user.email,
      username: user.username,
    },
  });

  const handleUpdate = async (values: ProfileUpdateForm) => {
    try {
      await updateUserProfile(values);
      toast({
        title: "Success",
        description: "Profile updated",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    }
  };

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0]!;
        const fileSize = file.size / (1024 * 1024);

        if (fileSize > 1) {
          throw "File size too big (max 1MB).";
        }

        setUploading(true);
        const form = new FormData();
        form.append("file", file);
        const url = await uploadImage(form);
        await updateUserProfile({
          nickname: user.nickname,
          headline: user.headline,
          email: user.email,
          username: user.username,
          image: url,
        });

        toast({
          title: "Success",
          description: "Profile image updated",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      event.target.value = "";
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(handleUpdate)();
      }}
    >
      <div className="grid grid-cols-12 mb-5">
        <div className="lg:col-span-8 col-span-12 me-2 md:order-2 order-2">
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
                label={
                  <div className="flex items-center space-x-2">
                    <span>Email</span>
                    {!user.emailVerified && (
                      <>
                        <Separator orientation="vertical" className="h-4" />
                        <Link
                          href="/verify-email"
                          className="text-primary text-sm"
                        >
                          Verify
                        </Link>
                      </>
                    )}
                  </div>
                }
                id="emailInput"
                type="email"
                wrapperClass="mb-5"
                {...register("email")}
                disabled
              />
            </div>
          </div>
          <Input
            label="Headline"
            id="headlineInput"
            type="text"
            wrapperClass="mb-4"
            placeholder="Enter headline"
            maxLength={500}
            {...register("headline")}
          />
          <Button type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update profile
          </Button>
        </div>

        <div className="lg:col-span-4 col-span-12 flex justify-center lg:order-2 mb-5">
          <div
            role="button"
            className="relative overflow-hidden rounded-full size-[128px] mt-4 lg:mt-0"
            onClick={() => {
              if (isUploading) {
                return;
              }
              imageFileRef.current?.click();
            }}
          >
            <ProfileAvatar
              src={user.image}
              prefix={user.nickname.substring(0, 2)}
              className="size-[128px] text-4xl"
            />
            <div className="absolute bg-black bg-opacity-50 text-white text-center inset-x-0 bottom-0 py-1">
              Edit
            </div>
            {isUploading && (
              <>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                  <LoaderCircle className="size-6 animate-spin text-gray-200" />
                </div>
              </>
            )}

            <input
              ref={imageFileRef}
              type="file"
              accept="image/x-png,image/jpeg"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
