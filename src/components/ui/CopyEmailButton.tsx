import { useEffect, useRef, useState } from "react";
import { EMAIL } from "../../data/site";

/** Copies the email address to the clipboard; hidden where the clipboard isn't available */
export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState("Copy");
  const [status, setStatus] = useState("");
  const resetTimer = useRef<number>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  if (!navigator.clipboard) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setLabel("Copied");
      setStatus("Email address copied to clipboard");
    } catch {
      setLabel("Couldn't copy");
      setStatus("");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setLabel("Copy");
      setStatus("");
    }, 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`min-w-24 rounded-full border border-cream px-[22px] py-3 text-[0.9rem] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${className}`}
      >
        {label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status}
      </span>
    </>
  );
}
