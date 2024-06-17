import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function checkEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@fpt\.edu\.vn$/;
  return emailRegex.test(email);
}

export function getName(email: string) {
  const match = email.match(/^([^@]*)@/);
  return match ? match[1] : null;
}

export function formatElapsedTime(elapsed: string): string {
  const [hours, minutes, seconds] = elapsed.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalDays = Math.floor(totalSeconds / (3600 * 24));

  if (totalDays < 1) {
    const totalHours = Math.floor(totalSeconds / 3600);
    return `${totalHours} hour${totalHours > 1 ? "s" : ""} ago`;
  } else if (totalDays < 30) {
    return `${totalDays} day${totalDays > 1 ? "s" : ""} ago`;
  } else if (totalDays < 365) {
    const months = Math.floor(totalDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(totalDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
