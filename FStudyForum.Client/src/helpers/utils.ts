import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function checkEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@fpt\.edu\.vn$/;
  return emailRegex.test(email);
}
