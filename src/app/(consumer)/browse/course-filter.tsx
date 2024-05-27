"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/models";
import { formatAbbreviate } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CourseFilter({ categories }: { categories: Category[] }) {
  const sp = useSearchParams();
  const router = useRouter();

  const [level, setLevel] = useState<string>(sp.get("level") ?? "all");
  const [access, setAccess] = useState<string>(sp.get("access") ?? "all");

  useEffect(() => {
    setLevel(sp.get("level") ?? "all");
    setAccess(sp.get("access") ?? "all");
  }, [sp]);

  return (
    <Accordion
      type="multiple"
      defaultValue={["category", "level", "access"]}
      className="rounded-md border"
    >
      <AccordionItem value="category">
        <AccordionTrigger
          className="px-4 py-3 text-base font-semibold"
          iconType="plus"
        >
          Category
        </AccordionTrigger>
        <Separator />
        <AccordionContent className="p-0">
          {categories.length > 0 ? (
            <div className="overflow-y-auto scrollbar-custom">
              <div className="flex flex-col space-y-2 max-h-[150px] p-4 pb-0">
                {categories.map((c) => {
                  return (
                    <div key={c.id} className="flex items-start">
                      <Link
                        href={`/browse?category=${c.slug}`}
                        className="text-foreground/90 hover:text-foreground font-medium underline grow"
                      >
                        {c.name}
                      </Link>
                      <span className="bg-slate-200 dark:bg-muted rounded-full px-2.5 text-sm text-muted-foreground">
                        {formatAbbreviate(Number(c.courseCount ?? 0))}
                      </span>
                    </div>
                  );
                })}
                <div className="pb-4"></div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground p-4">No categories found</div>
          )}
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="level">
        <AccordionTrigger
          className="px-4 py-3 text-base font-semibold"
          iconType="plus"
        >
          Level
        </AccordionTrigger>
        <Separator />
        <AccordionContent className="p-4">
          <RadioGroup
            value={level}
            onValueChange={(v) => {
              const params = new URLSearchParams(sp.toString());
              if (v === "all") {
                params.delete("level");
              } else {
                params.set("level", v);
              }
              setLevel(v);
              router.push(`?${params.toString()}`);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-level" />
              <label htmlFor="all-level">All levels</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner-level" />
              <label htmlFor="beginner-level">Beginner</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate-level" />
              <label htmlFor="intermediate-level">Intermediate</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced-level" />
              <label htmlFor="advanced-level">Advanced</label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
      <Separator />
      <AccordionItem value="access">
        <AccordionTrigger
          iconType="plus"
          className="px-4 py-3 text-base font-semibold"
        >
          Access
        </AccordionTrigger>
        <Separator />
        <AccordionContent className="p-4">
          <RadioGroup
            value={access}
            onValueChange={(v) => {
              const params = new URLSearchParams(sp.toString());
              if (v === "all") {
                params.delete("access");
              } else {
                params.set("access", v);
              }
              setAccess(v);
              router.push(`?${params.toString()}`);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-access" />
              <label htmlFor="all-access">All access</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free-access" />
              <label htmlFor="free-access">Free</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="premium" id="premium-access" />
              <label htmlFor="premium-access">Premium</label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
