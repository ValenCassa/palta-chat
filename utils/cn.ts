import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classeNames: ClassValue[]) => twMerge(clsx(classeNames));
