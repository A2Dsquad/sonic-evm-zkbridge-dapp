import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function headAddress(address: string) {
  return `${address.slice(0, 6)}`;
}

export const formatImageUrl = (url?: string) => {
  if (!url) {
    return "";
  }

  if (!url.startsWith("https://")) {
    const cleanedUrl = url.replace("/api/file-upload/", "");
    const baseUrl = `${import.meta.env.VITE_API_URL}api/file-upload/`;

    return baseUrl + cleanedUrl;
  }

  return url;
};
