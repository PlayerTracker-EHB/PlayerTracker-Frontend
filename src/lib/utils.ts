import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBaseUrl = (path: string): string => {
  const host = import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL;
  const port = ':3333'
  return `${host}${port}${path}`;
};


