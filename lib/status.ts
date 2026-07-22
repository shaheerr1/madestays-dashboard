import type { PillTone, Property, PropertyStatus, Step } from "./types";

export const TOTAL_STEPS = 10;

/** Percentage (0-100) of the fixed 10-step checklist that is marked "complete". */
export function calculateProgress(steps: Step[]): number {
  const completeCount = steps.filter((step) => step.status === "complete").length;
  return Math.round((completeCount / TOTAL_STEPS) * 100);
}

/**
 * Derives a property's overall status from its steps:
 * all 10 complete -> live, any action_required -> needs_attention, else in_progress.
 *
 * TODO(phase-2): guard the empty-steps case (see prop_kingsgate) — right now zero
 * steps falls through to "in_progress", which may not be the right call.
 */
export function derivePropertyStatus(steps: Step[]): PropertyStatus {
  const completeCount = steps.filter((step) => step.status === "complete").length;
  if (completeCount === TOTAL_STEPS) return "live";
  if (steps.some((step) => step.status === "action_required")) return "needs_attention";
  return "in_progress";
}

/** Average onboarding progress across every property in the portfolio. */
export function calculatePortfolioProgress(properties: Property[]): number {
  if (properties.length === 0) return 0;
  const total = properties.reduce((sum, property) => sum + calculateProgress(property.steps), 0);
  return Math.round(total / properties.length);
}

interface StatusMeta {
  label: string;
  tone: PillTone;
}

export const PROPERTY_STATUS_META: Record<PropertyStatus, StatusMeta> = {
  live: { label: "Live", tone: "success" },
  needs_attention: { label: "Needs attention", tone: "warning" },
  in_progress: { label: "In progress", tone: "progress" },
};

const STEP_STATUS_META: Record<string, StatusMeta> = {
  complete: { label: "Complete", tone: "success" },
  in_progress: { label: "In progress", tone: "progress" },
  action_required: { label: "Action required", tone: "warning" },
  not_started: { label: "Not started", tone: "neutral" },
};


/** Turns a raw status key like "on_hold" into a readable label like "On hold". */
function humaniseStatus(status: string): string {
  const spaced = status.replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// export function getStepStatusMeta(status: string): StatusMeta {
//   return STEP_STATUS_META[status] ?? { label: status, tone: "neutral" };
// }

export function getStepStatusMeta(status: string): StatusMeta {
  return (
    STEP_STATUS_META[status] ?? {
      label: humaniseStatus(status),
      tone: "neutral",
    }
  );
}

