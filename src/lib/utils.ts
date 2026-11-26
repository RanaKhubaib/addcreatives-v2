type ClassValue = string | number | false | null | undefined;

/** Minimal clsx-style join: keeps class lists tidy without a dependency. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}
