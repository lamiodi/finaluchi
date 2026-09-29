// Minimal class-name joiner (shadcn-style `cn` without the clsx/tailwind-merge
// dependency): falsy entries are dropped, the rest joined with single spaces.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
