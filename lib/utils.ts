import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = [
  "from-[rgba(243,153,74,1)] to-[rgba(179,37,226,1)]",
  "from-[rgba(137,71,254,1)] to-[rgba(179,25,254,1)]",
  "to-[rgba(243,153,74,1)] from-[rgba(179,37,226,1)]",
  "to-[rgba(137,71,254,1)] from-[rgba(179,25,254,1)]",
];

const directions = ["r", "l", "t", "b"];

export const getRandomGradient = () => {
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];
  return (
    colors[Math.floor(Math.random() * colors.length)] +
    " bg-gradient-to-" +
    randomDirection
  );
};

export const formatDate = (d: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeStyle: "medium",
    dateStyle: "medium",
  }).format(new Date(d));
