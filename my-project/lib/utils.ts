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

export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export const toArray = (str?: string) => str?.split(",").map(s => s.trim()).filter(Boolean) ?? [];

export const superUser = { canView: true, canEdit: true, canCreate: true, canDelete: true };
