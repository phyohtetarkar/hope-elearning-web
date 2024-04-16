import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value?: number) {
  if (typeof value !== "number" && typeof value !== "bigint") {
    return "";
  }
  
  if (isNaN(value)) {
    return "";
  }

  return Intl.NumberFormat("en-US").format(value);
}

export function formatAbbreviate(value: number) {
  if (!value) {
    return "0";
  }

  return Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export function formatTimestamp(timestamp?: number | string, withTime = false) {
  if (!timestamp) {
    return "";
  }
  let date = dayjs(timestamp);
  if (withTime) {
    return date.format("MMM DD, YYYY hh:mm A");
  }

  return date.format("MMM DD, YYYY");
}

export function debounce(
  callback: (...args: any[]) => void | Promise<any>,
  timeout = 2000
) {
  if (typeof window === "undefined") {
    return () => {};
  }
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      callback && callback.apply(null, args);
    }, timeout);
  };
}

export function setEmptyOrString(v: any) {
  if (typeof v === "string") {
    return v.trim().length > 0 ? v.trim() : undefined;
  }

  return undefined;
}

export function setEmptyOrNumber(v: any) {
  if (!isNaN(parseFloat(v))) {
    const numRegex = "^([0-9]*[.])?[0-9]+$";
    return `${v}`.match(numRegex) ? parseFloat(v) : undefined;
  }

  return undefined;
}

export function setZeroOrNumber(v: any) {
  if (!isNaN(parseFloat(v))) {
    const numRegex = "^([0-9]*[.])?[0-9]+$";
    return `${v}`.match(numRegex) ? parseFloat(v) : undefined;
  }

  return 0;
}

export function setStringToSlug(v?: string) {
  return v
    ?.trim()
    .replaceAll(/[^\w-\s]*/g, "")
    .replaceAll(/\s+/g, "-")
    .toLowerCase();
}
