import { PropertyCard } from "./PropertyCard";
import { derivePropertyStatus, calculateProgress } from "@/lib/status";
import type { Property } from "@/lib/types";

interface PropertyGridProps {
  properties: Property[];
  onSelect: (property: Property) => void;
}

/** Responsive card grid: 1 column mobile, 2 columns tablet, 3 columns desktop. */
export function PropertyGrid({ properties, onSelect }: PropertyGridProps) {
  if (properties.length === 0) {
    // TODO(phase-2): design a real empty state (illustration/copy) for when the
    // active filter matches no properties. Placeholder message for now.
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white/40 px-6 py-16 text-center text-stone-500">
        No properties match this filter.
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
