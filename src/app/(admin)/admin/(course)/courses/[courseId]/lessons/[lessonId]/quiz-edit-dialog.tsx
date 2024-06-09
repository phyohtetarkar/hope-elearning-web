"use client";

import { Input, Select } from "@/components/forms";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioButton } from "@/components/ui/radio-button";
import { useToast } from "@/components/ui/use-toast";
import { createQuiz, updateQuiz } from "@/lib/actions";
import { Lesson, Quiz, QuizAnswer, QuizType } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  question: z.string().min(1, {
    message: "Please enter quiz question",
  }),
  type: z.custom<QuizType>((v) => {
    return typeof v === "string"
      ? /multiple_choice|single_choice|true_false|short_answer/.test(v)
      : false;
  }),
  sortOrder: z.number(),
  answers: z
    .array(
      z.object({
        id: z.number(),
        answer: z.string().min(1, {
          message: "Please enter quiz answer",
        }),
        correct: z.boolean(),
        deleted: z.boolean().optional(),
        sortOrder: z.number(),
      })
    )
    .min(1, { message: "Required at least one answer" })
    .refine((data) => data.filter((a) => a.correct).length > 0, {
      message: "Required at least one correct answer",
      path: undefined,
    }),
});

type QuizForm = z.infer<typeof schema>;

export default function QuizEditDialog({
  lesson,
  quiz,
  index,
  isOpen,
  onOpenChange,
  afterSubmit,
}: {
  lesson: Lesson;
  quiz?: Quiz;
  index: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  afterSubmit?: (quiz: Quiz) => void;
}) {
  const [data, setData] = useState(quiz);

  const { toast } = useToast();

  const {
    control,
    formState: { isSubmitting, errors },
    setValue,
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
  } = useForm<QuizForm>({
    resolver: zodResolver(schema),
    values: data
      ? {
          id: data.id,
          type: data.type,
          question: data.question,
          sortOrder: data.sortOrder,
          answers: data.answers.map((a) => {
            return {
              id: a.id,
              answer: a.answer,
              correct: a.correct,
              sortOrder: a.sortOrder,
            };
          }),
        }
      : {
          id: 0,
          question: "",
          type: "multiple_choice",
          answers: [],
          sortOrder: index,
        },
  });

  const { fields, append, remove, update, replace } = useFieldArray({
    control: control,
    name: "answers",
    keyName: "vId",
  });

  const handleUpdate = async (values: QuizForm) => {
    try {
      const body = {
        lessonId: lesson.id,
        quiz: values,
      };

      if (quiz) {
        const result = await updateQuiz(lesson.chapter?.course?.id ?? 0, body);
        afterSubmit?.(result);
        setData(result);
      } else {
        const result = await createQuiz(lesson.chapter?.course?.id ?? 0, body);
        afterSubmit?.(result);
        setData(undefined);
      }

      toast({
        title: "Success",
        description: `Quiz ${quiz ? "updated" : "created"}`,
        variant: "success",
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    }
  };

  // const type = useWatch({ control: control, name: "type" });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          reset();
        }
      }}
    >
      <DialogContent
        onInteractOutside={(evt) => evt.preventDefault()}
        className="overflow-y-auto max-h-[80vh]"
      >
        <DialogHeader>
          <DialogTitle>{quiz ? "Update Quiz" : "Create Quiz"}</DialogTitle>
        </DialogHeader>
        <div className="gird grid-cols-1 mb-8">
          {errors.answers?.root?.message && (
            <Alert variant="destructive" className="mb-4">
              {errors.answers.root.message}
            </Alert>
          )}

          {errors.answers?.message && (
            <Alert variant="destructive" className="mb-4">
              {errors.answers.message}
            </Alert>
          )}

          <Select
            label="Type"
            wrapperClass="mb-2"
            disabled={!!quiz}
            {...register("type", {
              onChange: (evt) => {
                const value = evt.target.value;
                if (value === "true_false") {
                  const answers: QuizAnswer[] = [
                    {
                      id: 0,
                      answer: "True",
                      correct: false,
                      sortOrder: 0,
                    },
                    {
                      id: 0,
                      answer: "False",
                      correct: false,
                      sortOrder: 1,
                    },
                  ];
                  setValue("answers", answers);
                } else if (value === "short_answer") {
                  setValue("answers", [
                    {
                      id: 0,
                      answer: "",
                      correct: true,
                      sortOrder: 0,
                    },
                  ]);
                } else {
                  setValue("answers", []);
                }
              },
            })}
            error={errors.type?.message}
          >
            <option value="multiple_choice">Multipe Choice</option>
            <option value="single_choice">Single Choice</option>
            <option value="true_false">True Or False</option>
            <option value="short_answer">Short Answer</option>
          </Select>

          <Input
            label="Question"
            type="text"
            wrapperClass="mb-4"
            placeholder="Enter quiz question"
            {...register("question")}
            error={errors.question?.message}
            maxLength={1500}
          />

          <div
            className={cn("flex flex-col space-y-2", {
              "mb-4": fields.length > 0,
            })}
          >
            {fields
              .filter((a) => !a.deleted)
              .map((a, i) => {
                const type = getValues("type");
                const error = errors.answers?.[i]?.answer?.message;
                if (type === "short_answer") {
                  return (
                    <Input
                      key={i}
                      type="text"
                      placeholder="Enter quiz answer"
                      {...register(`answers.${i}.answer`)}
                      error={errors.answers?.[i]?.answer?.message}
                    />
                  );
                }

                if (type === "true_false") {
                  return (
                    <div
                      key={i}
                      className="flex items-center space-x-2"
                      onClick={(evt) => {
                        const answers = fields.map((ans, index) => {
                          return {
                            ...ans,
                            correct: i === index,
                          };
                        });

                        replace(answers);
                        trigger("answers");
                      }}
                    >
                      <RadioButton checked={a.correct} />
                      <label>{a.answer}</label>
                    </div>
                  );
                }

                if (type === "single_choice") {
                  return (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          wrapperClass="flex-1 me-3"
                          placeholder="Enter quiz answer"
                          {...register(`answers.${i}.answer`)}
                          error={error}
                          hideErrorMessage
                        />
                        <div
                          key={i}
                          className="flex items-center space-x-2"
                          onClick={(evt) => {
                            const answers = getValues("answers").map(
                              (ans, index) => {
                                return {
                                  ...ans,
                                  correct: i === index,
                                };
                              }
                            );

                            replace(answers);
                            trigger("answers");
                          }}
                        >
                          <RadioButton checked={a.correct} />
                          <label>Correct</label>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="size-8"
                          onClick={() => {
                            if (a.id > 0) {
                              update(i, { ...a, deleted: true });
                            } else {
                              remove(i);
                            }
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      {error && (
                        <div className="text-destructive text-sm mt-1.5">
                          {error}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={i} className="flex flex-col">
                    <div className="flex space-x-2 items-center">
                      <Input
                        type="text"
                        wrapperClass="flex-1 me-3"
                        placeholder="Enter quiz answer"
                        {...register(`answers.${i}.answer`)}
                        error={error}
                        hideErrorMessage
                      />
                      <Checkbox
                        id={`answer${i}`}
                        checked={a.correct}
                        onCheckedChange={(v) => {
                          if (v === "indeterminate") {
                            return;
                          }
                          update(i, { ...a, correct: v });
                          trigger("answers");
                        }}
                      />
                      <label htmlFor={`answer${i}`}>Correct</label>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                          if (a.id > 0) {
                            update(i, { ...a, deleted: true });
                          } else {
                            remove(i);
                          }
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    {error && (
                      <div className="text-destructive text-sm mt-1.5">
                        {error}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div>
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                if (field.value === "short_answer") {
                  return <></>;
                }

                if (field.value === "true_false") {
                  return <></>;
                }
                return (
                  <Button
                    size={"sm"}
                    onClick={() => {
                      append({
                        id: 0,
                        answer: "",
                        correct: false,
                        sortOrder: fields.length,
                      });
                    }}
                  >
                    Add answer
                  </Button>
                );
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="default" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              handleSubmit(handleUpdate)();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            )}
            {quiz ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
