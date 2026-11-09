export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mouse or trackpad, as opposed to touch */
export const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
