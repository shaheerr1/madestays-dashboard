import type { ReactNode } from "react";
import { Building2, CheckCircle2, AlertCircle, Gauge } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface SummaryBarProps {
  total: number;
  live: number;
  needsAttention: number;
  overallProgress: number;
}

interface StatTileProps {
  icon: ReactNode;
  label: string;
  value: string;
  children?: ReactNode;
}

function StatTile({ icon, label, value, children }: StatTileProps) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white/60 p-3.5 shadow-sm">
      <div className="flex items-center gap-2 text-stone-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      {/* font-sans + tabular-nums here (not the serif heading font) so digits like "1" never read as a capital I */}
      <p className="mt-1 font-sans text-2xl font-semibold tabular-nums text-ink">{value}</p>
      {children}
    </div>
  );
}

/** Portfolio-wide snapshot: total properties, Live, Needs attention, overall onboarding %. */
export function SummaryBar({ total, live, needsAttention, overallProgress }: SummaryBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <StatTile
        icon={<Building2 className="h-4 w-4" strokeWidth={1.75} />}
        label="Properties"
        value={String(total)}
      />
      <StatTile
        icon={<CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />}
        label="Live"
        value={String(live)}
      />
      <StatTile
        icon={<AlertCircle className="h-4 w-4" strokeWidth={1.75} />}
        label="Needs attention"
        value={String(needsAttention)}
      />
      <StatTile
        icon={<Gauge className="h-4 w-4" strokeWidth={1.75} />}
        label="Overall onboarding"
        value={`${overallProgress}%`}
      >
        <div className="mt-1.5">
          <ProgressBar value={overallProgress} label="Overall portfolio onboarding progress" />
        </div>
      </StatTile>
    </div>
  );
}
