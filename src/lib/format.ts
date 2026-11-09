/** 1 -> "01", for the numbered lists across the site */
export const pad = (n: number) => String(n).padStart(2, "0");

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** 2500 -> "R2 500" */
export const formatRand = (amount: number) => "R" + Math.round(amount).toLocaleString("en-ZA");
