import onboardingData from "@/dataset/onboarding-data.json";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import type { OnboardingData } from "@/lib/types";

// Cast rather than relying on structural inference from the JSON module: dataset
// entries intentionally vary in shape (e.g. `note` isn't present on every step) to
// exercise the guarding stubs, so a loose cast is more honest than fighting TS here.
const data = onboardingData as unknown as OnboardingData;

// TODO(phase-2): simulate a network delay (async fetch / setTimeout) and render a
// skeleton grid while it resolves. Data loads synchronously for now.

export default function Home() {
  const { owner, properties, onboardingStepDefinitions } = data;
  const firstName = owner.name.split(" ")[0];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-ink">
          Madestays &middot; Owner Portal
        </p>
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">
          Welcome back, {firstName}
        </h1>
        <p className="max-w-2xl text-stone-500">
          Here&apos;s how your portfolio is progressing. Select a property for its full
          onboarding checklist.
        </p>
      </header>

      <PortfolioDashboard properties={properties} stepDefinitions={onboardingStepDefinitions} />
    </main>
  );
}
