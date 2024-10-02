"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";

import { cn } from "@elearning/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    iconType?: "chevron" | "plus";
  }
>(({ className, children, iconType = "chevron", ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>#icon>svg]:rotate-180",
        className,
        iconType === "plus"
          ? "[&[data-state=open]&svg]:rotate-180 [&[data-state=open]>#icon>#plus]:opacity-0 [&[data-state=open]>#icon>#minus]:opacity-100 [&[data-state=closed]>#icon>#plus]:opacity-100 [&[data-state=closed]>#icon>#minus]:opacity-0"
          : undefined
      )}
      {...props}
    >
      {children}
      {iconType === "chevron" && (
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      )}
      {iconType === "plus" && (
        <div id="icon" className="relative h-full">
          <Plus
            id="plus"
            className="h-4 w-4 absolute right-0 top-[50%] translate-y-[-50%] shrink-0 transition duration-200"
          />
          <Minus
            id="minus"
            className="h-4 w-4 absolute right-0 top-[50%] translate-y-[-50%] shrink-0 transition duration-200"
          />
        </div>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
