"use client";

import { useEffect, useRef, useState } from "react";
import { X, MapPin, BedDouble } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { getStepStatusMeta } from "@/lib/status";
import type { Property, StepDefinition } from "@/lib/types";

interface PropertyDetailModalProps {
  property: Property | null;
  stepDefinitions: StepDefinition[];
  onClose: () => void;
}

const TRANSITION_MS = 220;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PropertyDetailModal({
  property,
  stepDefinitions,
  onClose,
}: PropertyDetailModalProps) {
  const [prevProperty, setPrevProperty] = useState(property);
  const [displayProperty, setDisplayProperty] = useState(property);
  const [mounted, setMounted] = useState(Boolean(property));
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  if (property !== prevProperty) {
    setPrevProperty(property);
    if (property) {
      setDisplayProperty(property);
      setMounted(true);
    } else {
      setVisible(false);
    }
  }

  useEffect(() => {
    if (!mounted || visible || !property) return undefined;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [mounted, visible, property]);

  useEffect(() => {
    if (!mounted || visible || property) return undefined;
    const timeout = setTimeout(
      () => setMounted(false),
      prefersReducedMotion() ? 0 : TRANSITION_MS,
    );
    return () => clearTimeout(timeout);
  }, [mounted, visible, property]);

  useEffect(() => {
    if (!mounted) return undefined;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mounted, onClose]);

  useEffect(() => {
    if (visible) panelRef.current?.focus();
  }, [visible]);

  if (!mounted || !displayProperty) return null;

  const definitionById = new Map(stepDefinitions.map((def) => [def.id, def]));

  // Order
  const orderedSteps = [...displayProperty.steps].sort((a, b) => {
    const orderA = definitionById.get(a.id)?.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = definitionById.get(b.id)?.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm transition-opacity duration-[220ms] ease-out motion-reduce:opacity-100 motion-reduce:transition-none sm:items-center sm:p-4 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-background shadow-xl outline-none transition-[opacity,transform] duration-[220ms] ease-out motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none sm:max-h-[85vh] sm:max-w-2xl sm:rounded-3xl ${
          visible ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200/80 px-6 py-5 sm:px-8">
          <div>
            <h2
              id="property-modal-title"
              className="font-serif text-2xl text-ink sm:text-3xl"
            >
              {displayProperty.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                {displayProperty.location}
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5" strokeWidth={1.75} />
                {displayProperty.bedrooms} bed
                {displayProperty.bedrooms === 1 ? "" : "s"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer rounded-full p-2 text-stone-400 transition-colors duration-150 hover:bg-stone-100 hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8">
          {orderedSteps.length === 0 ? (
            <p className="py-8 text-center text-sm text-stone-500">
              Onboarding for this property hasn&apos;t started yet. We&apos;ll
              add the checklist once it&apos;s underway.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-stone-200/80">
              {orderedSteps.map((step) => {
                const definition = definitionById.get(step.id);
                const meta = getStepStatusMeta(step.status);

                return (
                  <li
                    key={step.id}
                    className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-ink">
                        {definition?.label ?? step.id}
                      </span>
                      <StatusPill label={meta.label} tone={meta.tone} />
                    </div>
                    {step.note && (
                      <p className="text-sm leading-relaxed text-stone-500">
                        {step.note}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
