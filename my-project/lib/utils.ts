import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function unescapeHtml(html: string): string {
  if (html.includes('&lt;') || html.includes('&gt;') || html.includes('&amp;')) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || html;
  }
  return html;
}

export function isFile(value: any) {
  return value instanceof File;
}