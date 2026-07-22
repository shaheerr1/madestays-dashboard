// Shape of dataset/onboarding-data.json. `Step.status` and `StepStatus` are kept as
// plain `string` (not a strict union) because the dataset is allowed to contain values
// outside the legend (see status.ts) — see TODO(phase-2) notes there for guarding.

export interface StepDefinition {
  id: string;
  label: string;
  order: number;
}

export interface Step {
  id: string;
  status: string;
  note?: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  image: string;
  targetGoLiveDate: string;
  steps: Step[];
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  accountManager: string;
}

export interface OnboardingData {
  owner: Owner;
  onboardingStepDefinitions: StepDefinition[];
  statusLegend: Record<string, string>;
  properties: Property[];
}

/** Derived, portfolio-level status for a property (computed from its steps). */
export type PropertyStatus = "live" | "needs_attention" | "in_progress";

/** Filter tab values — "all" plus every PropertyStatus. */
export type StatusFilter = "all" | PropertyStatus;

/** Visual tone a StatusPill can render, shared by property- and step-level statuses. */
export type PillTone = "success" | "warning" | "progress" | "neutral";
