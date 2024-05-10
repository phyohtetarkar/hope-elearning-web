"use client";

import { Textarea } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Course, CourseReview } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().optional(),
});

type ReviewForm = z.infer<typeof schema>;

export default function CourseReviewEdit({
  course,
  review,
}: {
  course: Course;
  review?: CourseReview;
}) {
  const { toast } = useToast();

  const {
    control,
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<ReviewForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: review?.rating ?? 5,
      message: review?.message,
    },
  });

  const handleWriteReview = async (values: ReviewForm) => {
    try {
      await writeCourseReview(course.id, values);
      toast({
        title: "Success",
        description: "Your review submitted",
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

  return (
    <Card className="shadow-none">
      <CardHeader className="px-4 py-3">
        <h4>Leave a review</h4>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
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
            maxLength={4000}
            {...register("message")}
          />

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
