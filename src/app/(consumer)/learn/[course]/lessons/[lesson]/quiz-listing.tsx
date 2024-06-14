"use client";

import { Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioButton } from "@/components/ui/radio-button";
import { useToast } from "@/components/ui/use-toast";
import { resetQuizResponse, submitQuizResponse } from "@/lib/actions";
import { Lesson, Quiz, QuizAnswer, QuizResponse } from "@/lib/models";
import { parseErrorResponse } from "@/lib/parse-error-response";
import { cn } from "@/lib/utils";
import { Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface QuizForm {
  quiz: Quiz;
  correct?: true | "partial";
  answers: {
    quizId: number;
    answer: QuizAnswer;
    selected?: boolean;
    shortAnswer?: string;
  }[];
}

export default function QuizListing({
  lesson,
  responses,
}: {
  lesson: Lesson;
  responses: QuizResponse[];
}) {
  const mapToAnswer = (responses: QuizResponse[]) => {
    if (responses.length === 0) {
      return {};
    }
    const answerMap: { [answerId: string]: QuizResponse | undefined } = {};

    for (const qr of responses) {
      answerMap[qr.answer.id] = qr;
    }

    return answerMap;
  };

  const [answerMap, setAnswerMap] = useState<{
    [answerId: string]: QuizResponse | undefined;
  }>(() => mapToAnswer(responses));

  const [isResetting, setResetting] = useState(false);

  const { toast } = useToast();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<{
    quizzes: QuizForm[];
  }>();

  const { fields, update } = useFieldArray({
    control: control,
    name: "quizzes",
    keyName: "vId",
  });

  useEffect(() => {
    const isSubmitted = Object.keys(answerMap).length > 0;
    const quizzes =
      lesson.quizzes?.map((q) => {
        let correct: boolean | "partial" | undefined = undefined;
        let correctCount = 0;
        let incorrectCount = 0;

        const answers: {
          quizId: number;
          answer: QuizAnswer;
          selected?: boolean;
          shortAnswer?: string;
        }[] = [];

        for (const ans of q.answers) {
          const response = answerMap[ans.id];

          if (q.type === "short_answer") {
            const isCorrect = response && ans.answer === response.shortAnswer;
            correct = isCorrect;
          } else if (response && ans.correct) {
            correct =
              q.type === "multiple_choice" ? (correct ?? true) && true : true;
            correctCount += 1;
          } else if (response && !ans.correct) {
            correct = false;
            incorrectCount += 1;
          } else if (!response && ans.correct && q.type === "multiple_choice") {
            correct = false;
          }

          answers.push({
            quizId: q.id,
            answer: ans,
            selected: !!response,
            shortAnswer: response?.shortAnswer,
          });
        }

        if (q.type === "multiple_choice") {
          const totalCorrect = q.answers.filter((a) => a.correct).length;
          if (incorrectCount > 0) {
            correct = correctCount > 0 ? "partial" : correct;
          } else {
            correct = totalCorrect === correctCount ? true : "partial";
          }
        }

        return {
          quiz: q,
          correct: isSubmitted ? correct : undefined,
          answers: answers,
        } as QuizForm;
      }) ?? [];

    setAnswerMap(answerMap);
    setValue("quizzes", quizzes);
  }, [lesson, answerMap, setValue]);

  const submitQuiz = async (values: QuizForm[]) => {
    try {
      const body = values
        .flatMap((f) => f.answers)
        .filter((ans) => ans.selected === true)
        .map((ans) => {
          return {
            quizId: ans.quizId,
            answerId: ans.answer.id,
            shortAnswer: ans.shortAnswer,
          };
        });

      if (body.length === 0) {
        throw "Required at least one answer";
      }
      const result = await submitQuizResponse(lesson.id, body);
      setAnswerMap(mapToAnswer(result));
      toast({
        title: "Success",
        description: "Quiz submitted",
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

  const resetQuiz = async () => {
    try {
      setResetting(true);
      await resetQuizResponse(lesson.id);
      setAnswerMap({});
    } catch (error) {
      toast({
        title: "Error",
        description: parseErrorResponse(error),
        variant: "destructive",
      });
    } finally {
      setResetting(false);
    }
  };

  const isSubmitted = Object.keys(answerMap).length > 0;

  const resultIcon = (isCorrect: boolean | undefined) => {
    if (typeof isCorrect === "undefined") {
      return null;
    }
    return (
      <div
        className={cn(
          "ms-3",
          {
            "text-success": isCorrect,
          },
          {
            "text-destructive": !isCorrect,
          }
        )}
      >
        {isCorrect ? (
          <Check className="size-5" strokeWidth={2} />
        ) : (
          <X className="size-5" strokeWidth={2} />
        )}
      </div>
    );
  };

  const resultUI = (isCorrect: boolean | "partial" | undefined) => {
    if (typeof isCorrect === "undefined") {
      return null;
    }

    if (isCorrect === "partial") {
      return (
        <span className="rounded-md px-2 py-1 text-sm text-warning bg-warning/15">
          Partially correct
        </span>
      );
    }

    if (isCorrect) {
      return (
        <span className="rounded-md px-2 py-1 text-sm text-success bg-success/15">
          Correct
        </span>
      );
    }
    return (
      <span className="rounded-md px-2 py-1 text-sm text-destructive bg-destructive/15">
        Incorrect
      </span>
    );
  };

  const renderAnswers = (form: QuizForm, index: number) => {
    const quiz = form.quiz;
    return form.answers.map((a, i) => {
      const ans = a.answer;
      const resp = answerMap[a.answer.id];

      let isCorrect: boolean | undefined = undefined;

      if (isSubmitted && quiz.type === "short_answer" && resp) {
        isCorrect = resp.shortAnswer?.trim() === a.answer.answer.trim();
      } else if (isSubmitted && a.answer.correct && resp) {
        isCorrect = true;
      } else if (isSubmitted && resp) {
        isCorrect = false;
      }

      if (quiz.type === "short_answer") {
        return (
          <div key={ans.id} className="flex items-center">
            <Input
              type="text"
              placeholder="Enter short answer"
              className="mb-1"
              wrapperClass="max-w-[300px] w-full"
              maxLength={1000}
              value={a?.shortAnswer ?? ""}
              onChange={(evt) => {
                const value = evt.target.value.trim();
                update(index, {
                  ...form,
                  answers: [{ ...a, shortAnswer: value, selected: !!value }],
                });
              }}
            />
            {resultIcon(isCorrect)}
          </div>
        );
      }

      if (quiz.type === "multiple_choice") {
        return (
          <div key={ans.id} className="flex items-center mb-1">
            <Checkbox
              id={`answer-${ans.id}`}
              checked={a.selected ?? false}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") return;
                const updatedAns = { ...a, selected: checked };
                const answers = [...form.answers];
                answers[i] = updatedAns;

                update(index, {
                  ...form,
                  answers: answers,
                });
              }}
            />
            <label htmlFor={`answer-${ans.id}`} className="ms-2">
              {ans.answer}
            </label>
            {resultIcon(isCorrect)}
          </div>
        );
      }

      return (
        <div
          key={ans.id}
          className="flex items-center mb-1"
          onClick={() => {
            update(index, {
              ...form,
              answers: form.answers.map((v) => {
                return {
                  ...v,
                  selected: v.answer.id === ans.id,
                };
              }),
            });
          }}
        >
          <RadioButton checked={a.selected ?? false} />
          <label className="ms-2">{ans.answer}</label>
          {resultIcon(isCorrect)}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col">
      {fields.map((field, i) => {
        const quiz = field.quiz;
        return (
          <div key={i} className="flex flex-col mb-8">
            <div className="mb-2 font-medium">{quiz.question}</div>
            {renderAnswers(field, i)}
            <div className="mt-3">{resultUI(field.correct)}</div>
          </div>
        );
      })}

      {isSubmitted && (
        <div className="text-muted-foreground">
          ({fields.filter((f) => f.correct).length}/
          {lesson.quizzes?.length ?? 0}) Correct
        </div>
      )}

      <div className="flex space-x-2 mt-5">
        <Button
          disabled={isSubmitting || isResetting}
          onClick={() => {
            handleSubmit(async (values) => {
              await submitQuiz(values.quizzes);
            })();
          }}
        >
          {isSubmitting && (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          )}
          Submit
        </Button>
        <div className="flex-1"></div>
        <Button
          disabled={isSubmitting || isResetting || !isSubmitted}
          variant="default"
          onClick={resetQuiz}
        >
          {isResetting && <LoaderCircle className="mr-2 size-4 animate-spin" />}
          Reset
        </Button>
      </div>
    </div>
  );
}
