import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { ALLOWED_FILE_TYPES } from "./constants";

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

// export function formatElapsedTime(elapsed: string): string {
//   console.log(elapsed);
//   const [days, time] = elapsed.split(".");
//   const[hours, minutes, seconds] = elapsed.split(":").map(Number);
//   const totalSeconds = Math.floor(hours * 3600 + minutes * 60 + seconds);
//   const totalMinutes = Math.floor(totalSeconds / 60);
//   const totalHours = Math.floor(totalMinutes / 60);
//   const totalDays = Math.floor(totalHours / 24);
//   const totalMonths = Math.floor(totalDays / 30);
//   const totalYears = Math.floor(totalDays / 365);

  // if (totalYears > 0) {
  //   return `${totalYears} year${totalYears > 1 ? "s" : ""} ago`;
  // } else if (totalMonths > 0) {
  //   return `${totalMonths} month${totalMonths > 1 ? "s" : ""} ago`;
  // } else if (totalDays > 0) {
  //   return `${totalDays} day${totalDays > 1 ? "s" : ""} ago`;
  // } else if (totalHours > 0) {
  //   return `${totalHours} hr${totalHours > 1 ? "s" : ""} ago`;
  // } else {
  //   return `${totalMinutes} min${totalMinutes > 1 ? "s" : ""} ago`;
  // } 
// }


export function formatElapsedTime(elapsed: string): string {
  console.log(elapsed);
  const [days] = elapsed.split(".");
  const [hours, minutes, seconds] = elapsed.split(":").map(Number);
  
  const totalSeconds = Math.floor(hours * 3600 + minutes * 60 + seconds);
  const totalMinutes = Math.ceil(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(Number(days));
  const totalMonths = Math.floor(totalDays / 30);
  const totalYears = Math.floor(totalDays / 365);

  if (totalYears > 0) {
    return `${totalYears} year${totalYears > 1 ? "s" : ""} ago`;
  } else if (totalMonths > 0) {
    return `${totalMonths} month${totalMonths > 1 ? "s" : ""} ago`;
  } else if (totalDays > 0) {
    return `${totalDays} day${totalDays > 1 ? "s" : ""} ago`;
  } else if (totalHours > 0) {
    return `${totalHours} hr${totalHours > 1 ? "s" : ""} ago`;
  } else {
    return `${totalMinutes} min${totalMinutes > 1 ? "s" : ""} ago`;
  } 
}


export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type);
}

export const ImageUtil = {
  getInfo
};

function getInfo(file: File): Promise<{
  colorThief: string;
  width: number;
  height: number;
}> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const bg = ctx?.getImageData(0, 0, 1, 1).data;
        if (!bg) {
          return reject();
        }
        const bgColor = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${bg[3] / 255})`;
        resolve({
          colorThief: bgColor,
          width: img.width,
          height: img.height
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
