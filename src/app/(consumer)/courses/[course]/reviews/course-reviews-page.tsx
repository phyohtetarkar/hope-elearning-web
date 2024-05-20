"use client";

import { AuthenticationContext } from "@/components/authentication-context-porvider";
import { Textarea } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Pagination from "@/components/ui/pagination";
import { ProfilePlaceholder } from "@/components/ui/profile-placeholder";
import Rating from "@/components/ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { writeCourseReview } from "@/lib/actions";
import { Course, CourseReview, Page } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { formatRelativeTimestamp } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().optional(),
});

type ReviewForm = z.infer<typeof schema>;

export default function CourseReviewsPage({
  course,
  reviews,
  userReview,
}: {
  course: Course;
  reviews?: Page<CourseReview>;
  userReview?: CourseReview;
}) {
  // const ratings: { [key: string]: number } = {
  //   5: 50,
  //   4: 20,
  //   3: 20,
  //   2: 10,
  //   1: 0,
  // };
  const [openReviewEdit, setOpenReviewEdit] = useState(false);

  const { toast } = useToast();

  const {
    control,
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm<ReviewForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: userReview?.rating ?? 5,
      message: userReview?.message,
    },
  });

  const handleWriteReview = async (values: ReviewForm) => {
    try {
      const path = `/courses/${course.slug}/reviews`;
      await writeCourseReview(course.id, values, path);
      toast({
        title: "Success",
        description: "Your review submitted",
        variant: "success",
      });
      setOpenReviewEdit(false);
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl py-6">
      <h2 className="mb-1">{course?.title}</h2>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/${course.slug}`}>{course.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reviews</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="aspect-w-16 aspect-h-9 mb-6">
        <Image
          src={course.cover ?? "/images/placeholder.jpeg"}
          className="object-cover rounded-md"
          alt="Cover"
          fill
          sizes="100vh"
          priority
        />
      </div>

      <div className="flex items-center space-x-2 mb-4 text-sm">
        <Rating rating={parseFloat(course.meta?.rating ?? "0")} />
        <span className="text-sliver">{course.meta?.rating ?? 0} out of 5</span>
        {/* <span className="text-sliver">({formatNumber(2000)} ratings)</span> */}
        <div className="flex-grow"></div>

        <Dialog
          open={openReviewEdit}
          onOpenChange={(open) => {
            setOpenReviewEdit(open);
            !open && reset();
          }}
        >
          <DialogTrigger asChild>
            <Button className="">
              {userReview ? "Update" : "Write"} review
            </Button>
          </DialogTrigger>

          <DialogContent onInteractOutside={(evt) => evt.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Write Review</DialogTitle>
            </DialogHeader>

            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(handleWriteReview)();
              }}
            >
              <Controller
                control={control}
                name="rating"
                render={({ field }) => {
                  return (
                    <Select
                      value={`${field.value}`}
                      onValueChange={(v) => {
                        setValue("rating", parseInt(v));
                      }}
                    >
                      <SelectTrigger className="focus:border-primary ring-0 outline-none focus:ring-0">
                        <SelectValue placeholder="Choose rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={`${v}`}
                              hideIndicator
                              className="pl-2"
                            >
                              <div className="flex items-center gap-1">
                                <Rating rating={v} size="sm" />
                                <span>({v}/5)</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              <Textarea
                placeholder="Write your review"
                className="mb-4"
                rows={4}
                maxLength={2000}
                {...register("message")}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="default"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* {Object.keys(ratings).reverse().map((k) => {
            return (
              <div key={k} className="flex items-center mb-1">
                <span className="text-sliver w-6">{k}</span>
                <StarIcon
                  className="text-warning size-5"
                  fill="currentColor"
                />
                <Progress
                  className="h-2 mx-2"
                  indicatorClass="bg-warning"
                  value={ratings[k]}
                />
                <span className="text-sliver w-[50px] text-end">{ratings[k]}%</span>
              </div>
            );
          })} */}

      <Separator />

      <div className="flex flex-col space-y-4 py-5">
        {reviews?.contents.map((r, i) => {
          return (
            <div key={i} className="flex items-start space-x-4 border-b py-4">
              {r.user?.image ? (
                <Image
                  src={r.user.image}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
              ) : (
                <ProfilePlaceholder className="size-[50px] border" />
              )}
              <div className="flex flex-col">
                <h6 className="font-semibold mb-1">{r.user.nickname}</h6>
                <span className="text-sm text-sliver mb-5">
                  {formatRelativeTimestamp(r.audit?.createdAt)}
                </span>
                <Rating rating={r.rating} />
                <p className="text-sliver mt-3">{r.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {!reviews?.contents.length && <Alert>No reviews found</Alert>}

      <div className="mb-10 mt-5 flex justify-center">
        <Pagination
          totalPage={reviews?.totalPage ?? 0}
          currentPage={reviews?.currentPage ?? 0}
        />
      </div>
    </div>
  );
}
