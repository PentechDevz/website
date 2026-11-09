/**
 * Rounded outline button. It takes the text colour it sits in, then fills on hover:
 * cream on dark backgrounds, or ink when `inverted` (on the cream cards).
 */
export function pillClass(inverted = false) {
  return `group/pill inline-flex items-center justify-center gap-3 rounded-full border border-current px-[26px] py-3.5 text-[0.95rem] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${
    inverted
      ? "hover:bg-ink hover:text-cream focus-visible:bg-ink focus-visible:text-cream focus-visible:outline-ink"
      : "hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink focus-visible:outline-cream"
  }`;
}
