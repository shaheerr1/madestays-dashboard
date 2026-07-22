"use client";

import { useEffect, useMemo, useState } from "react";
import { SummaryBar } from "./SummaryBar";
import { StatusFilterTabs } from "./StatusFilterTabs";
import { PropertyGrid } from "./PropertyGrid";
import { PropertyDetailModal } from "./PropertyDetailModal";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { derivePropertyStatus, calculatePortfolioProgress } from "@/lib/status";
import type { Property, StatusFilter, StepDefinition } from "@/lib/types";

interface PortfolioDashboardProps {
  properties: Property[];
  stepDefinitions: StepDefinition[];
}

/** Client-side orchestrator: owns filter + selected-property state, derives summary stats. */
export function PortfolioDashboard({
  properties,
  stepDefinitions,
}: PortfolioDashboardProps) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const counts = useMemo(() => {
    const result: Record<StatusFilter, number> = {
      all: properties.length,
      live: 0,
      needs_attention: 0,
      in_progress: 0,
      not_started: 0,
    };
    for (const property of properties) {
      result[derivePropertyStatus(property.steps)] += 1;
    }
    return result;
  }, [properties]);

  const overallProgress = useMemo(
    () => calculatePortfolioProgress(properties),
    [properties],
  );

  const filteredProperties = useMemo(() => {
    if (filter === "all") return properties;
    return properties.filter(
      (property) => derivePropertyStatus(property.steps) === filter,
    );
  }, [properties, filter]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <SummaryBar
        total={counts.all}
        live={counts.live}
        needsAttention={counts.needs_attention}
        overallProgress={overallProgress}
      />

      <div className="flex flex-col gap-3">
        <StatusFilterTabs value={filter} onChange={setFilter} counts={counts} />
        <PropertyGrid
          properties={filteredProperties}
          onSelect={setSelectedProperty}
        />
      </div>

      <PropertyDetailModal
        property={selectedProperty}
        stepDefinitions={stepDefinitions}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
