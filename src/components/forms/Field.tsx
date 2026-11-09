import type { ComponentProps, ReactNode } from "react";

const inputClass =
  "w-full rounded-none border-b border-cream/25 py-3 text-[1.15rem] text-cream transition-[border-color,box-shadow] duration-300 placeholder:text-stone hover:border-cream/60 focus:border-cream focus:shadow-[0_1px_0_var(--color-cream)] focus:outline-none user-invalid:border-error";

type FieldProps = { id: string; label: string; optional?: boolean; children: ReactNode };

/** Label above an underlined input */
export function Field({ id, label, optional, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.85rem] tracking-[0.08em] text-muted">
        {label}
        {optional && <span className="text-stone"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input className={`${inputClass} bg-transparent`} {...props} />;
}

export function TextArea(props: ComponentProps<"textarea">) {
  return <textarea className={`${inputClass} min-h-40 resize-y bg-transparent leading-normal`} {...props} />;
}

export function Select({ options, ...props }: ComponentProps<"select"> & { options: string[] }) {
  return (
    <select className={`${inputClass} bg-select-arrow appearance-none pr-8 *:bg-ink *:text-cream`} {...props}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
