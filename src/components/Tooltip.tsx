"use client";
import { ReactNode, useRef } from "react";
import {
  Tooltip as AriaToolTip,
  OverlayArrow,
  TooltipTrigger,
} from "react-aria-components";
import { useTooltipTriggerState } from "react-stately";

interface TooltipProps {
  title: string;
  className?: string;
  children: ReactNode;
}

function Tooltip({ title, className, children }: TooltipProps) {
  let state = useTooltipTriggerState();
  const ref = useRef<HTMLDivElement>(null);

  return (
    // <div
    //   className={`d-flex align-items-center ${className ?? ""}`}
    // >
    //   {children}
    // </div>
    <TooltipTrigger delay={0}>
      {children}
      <AriaToolTip
        className={`bg-dark px-2 py-1 rounded-2 shadow ${className ?? ""}`}
        offset={4}
      >
        <OverlayArrow className="tooltip-arrow">
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        <div className="text-light">{title}</div>
      </AriaToolTip>
    </TooltipTrigger>
  );
}

export default Tooltip;
