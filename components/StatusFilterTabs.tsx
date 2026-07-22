import type { StatusFilter } from "@/lib/types";

interface StatusFilterTabsProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  counts: Record<StatusFilter, number>;
}

const TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in_progress", label: "In progress" },
  { value: "needs_attention", label: "Needs attention" },
  { value: "live", label: "Live" },
];

/** Status filter tabs. Horizontally scrollable so they stay usable on narrow screens. */
export function StatusFilterTabs({ value, onChange, counts }: StatusFilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter properties by status"
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.value)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "border-accent bg-accent text-white shadow-sm"
                : "border-stone-200 bg-white text-stone-600 hover:border-accent/40 hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs ${isActive ? "text-white/80" : "text-stone-400"}`}
            >
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
