"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

export function CourseFilter() {
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
      defaultValue={["level", "access"]}
      className="rounded-md border"
    >
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
