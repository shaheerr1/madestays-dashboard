interface ProgressBarProps {
  value: number;
  label?: string;
}

/** Reusable onboarding-progress bar. `value` is a 0-100 percentage. */
export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Onboarding progress"}
        className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200/70"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
