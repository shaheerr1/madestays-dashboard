import type { PillTone } from "@/lib/types";

interface StatusPillProps {
  label: string;
  tone: PillTone;
}

const TONE_CLASSES: Record<PillTone, string> = {
  success: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20",
  progress: "bg-accent/10 text-accent-ink ring-1 ring-inset ring-accent/30",
  neutral: "bg-stone-100 text-stone-600 ring-1 ring-inset ring-stone-400/20",
};

/** Small rounded status badge. Purely presentational — callers resolve label/tone via lib/status.ts. */
export function StatusPill({ label, tone }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  );
}
