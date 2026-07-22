import { BedDouble, MapPin } from "lucide-react";
import { PropertyImage } from "./PropertyImage";
import { ProgressBar } from "./ProgressBar";
import { StatusPill } from "./StatusPill";
import { PROPERTY_STATUS_META } from "@/lib/status";
import type { Property, PropertyStatus } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  status: PropertyStatus;
  progress: number;
  onSelect: (property: Property) => void;
  /** Stagger delay for the card's initial fade-in-up (see PropertyGrid). */
  animationDelayMs?: number;
}

/**
 * NOTE: `name` is line-clamped to 2 lines with a fixed-height wrapper so cards stay
 * aligned in the grid even for an outlier like "The Old Rectory at Lower Slaughter
 * with the Coach House Annexe and Walled Garden". If phase-2 wants the full name
 * accessible, add a `title` attribute or a hover tooltip rather than removing the clamp.
 */
export function PropertyCard({
  property,
  status,
  progress,
  onSelect,
  animationDelayMs = 0,
}: PropertyCardProps) {
  const statusMeta = PROPERTY_STATUS_META[status];

  return (
    <button
      type="button"
      onClick={() => onSelect(property)}
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className="animate-fade-in-up group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative overflow-hidden">
        <PropertyImage src={property.image} alt={property.name} className="group" />
        <div className="absolute right-3 top-3">
          <StatusPill label={statusMeta.label} tone={statusMeta.tone} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="min-h-[2.75rem]">
          <h3 className="line-clamp-2 font-serif text-lg leading-tight text-ink">
            {property.name}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {property.location}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" strokeWidth={1.75} />
            {property.bedrooms} bed{property.bedrooms === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-0.5 flex items-center gap-3">
          <ProgressBar value={progress} label={`${property.name} onboarding progress`} />
          <span className="shrink-0 text-xs font-medium text-stone-500">{progress}%</span>
        </div>
      </div>
    </button>
  );
}
