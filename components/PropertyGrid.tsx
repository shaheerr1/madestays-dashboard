import { PropertyCard } from "./PropertyCard";
import { derivePropertyStatus, calculateProgress } from "@/lib/status";
import type { Property } from "@/lib/types";
import { SearchX } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  onSelect: (property: Property) => void;
}

/** Responsive card grid: 1 column mobile, 2 columns tablet, 3 columns desktop. */
export function PropertyGrid({ properties, onSelect }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/40 px-6 py-16 text-center">
        <SearchX
          className="h-8 w-8 text-stone-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-ink">
          No properties in this view
        </p>
        <p className="max-w-xs text-sm text-stone-500">
          Nothing matches this filter right now. Try another status to see more
          of your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {properties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          status={derivePropertyStatus(property.steps)}
          progress={calculateProgress(property.steps)}
          onSelect={onSelect}
          animationDelayMs={Math.min(index, 8) * 50}
        />
      ))}
    </div>
  );
}
