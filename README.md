# Madestays — Owner Onboarding Dashboard

A Next.js + TypeScript + Tailwind take-home: a calm, editorial dashboard that lets a
Madestays property owner see their portfolio's onboarding progress at a glance and
drill into any property's full checklist.

## Running it

Requires Node 20.9+ (matches the installed Next.js version).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm start
```

## Tech stack

- **Next.js (App Router)** — file-based routing and a clean split between the
  server-rendered shell (`app/page.tsx`) and the interactive dashboard.
- **TypeScript** — the onboarding data shape (properties, steps, statuses) is
  small but easy to get subtly wrong; types catch that at compile time.
- **Tailwind v4** — utility classes plus a small set of custom theme tokens
  (`app/globals.css`) for the palette and fonts, no separate component library.
- **lucide-react** — icons only. No other dependencies were added; for a dashboard
  this size, most "nice to have" libraries (state managers, animation libraries,
  UI kits) would add more weight than value.

## Key decisions

- **Status is derived, not stored.** A property's status is computed from its
  steps rather than read off a stored field:
  - all 10 steps `complete` → **Live**
  - zero steps → **Not started**
  - any step `action_required` → **Needs attention**
  - otherwise → **In progress**
- **Progress is `complete steps / 10`**, using a fixed `TOTAL_STEPS` constant
  rather than `steps.length`, since the checklist is a defined 10-step process —
  a property with fewer recorded steps is incomplete, not "100% of what exists."
- **All of this logic lives in `lib/status.ts` as small, pure functions**
  (`derivePropertyStatus`, `calculateProgress`, `calculatePortfolioProgress`,
  `getStepStatusMeta`), independent of React. Components call these rather than
  duplicating status/progress logic inline.
- **Visual direction:** a light, "luxury hospitality" feel rather than a
  typical dark SaaS dashboard — warm ivory background, Cormorant Garamond for
  headings paired with Inter for body text, and a single muted gold accent.

## Handling messy data

The sample dataset (`dataset/onboarding-data.json`) intentionally includes a few
awkward cases, and the UI is built to degrade gracefully rather than break:

- **Empty `steps` array** (Kingsgate Mews House) → status resolves to "Not
  started" and the modal shows an explicit "onboarding hasn't started yet"
  message instead of an empty checklist.
- **Empty or broken image URL** → `PropertyImage` shows the same tasteful
  placeholder tile either way (checked up front for an empty string, and via
  the `<img>`'s `onError` for a URL that 404s), so a card never shows a
  broken-image icon.
- **A step status outside the legend** (e.g. `on_hold`) → `getStepStatusMeta`
  falls back to a neutral pill with a humanised label ("On hold") instead of
  the raw key or a blank pill.
- **An `action_required` step with no note** → falls back to a generic
  guidance line ("Action needed — your account manager will be in touch with
  the details") so the owner isn't left looking at a status with no next step.
- **A very long property name** (The Old Rectory at Lower Slaughter…) → clamped
  to two lines on the card so the grid stays aligned, and shown in full in the
  modal title.
- **Steps are sorted by their defined order** in the modal
  (`onboardingStepDefinitions[].order`), not by their order in the property's
  own `steps` array, which varies between properties in the source data.

## Loading and empty states

- On load, the dashboard shows skeleton summary tiles and card placeholders for
  ~800ms (simulating a real fetch) before rendering the actual data.
- Filtering to a status with no matching properties shows a dedicated empty
  state, not just a blank grid.

## An honest note on images

`PropertyImage` uses a plain `<img>` rather than `next/image`. Property photos
come from an arbitrary external host in the sample data, so `next/image` would
need a `remotePatterns` entry per host — and it throws at render on an empty
`src`, which is exactly the "missing photo" case this component has to survive.
A plain `<img>` with an `onError` handler was the simpler, more robust choice
for data that can't be trusted to always resolve.

## With more time

- Real data fetching via a Next.js API route (or a proper data layer) instead
  of importing the JSON file directly.
- Unit tests for the `lib/status.ts` functions — they're pure and small, so
  they're cheap to cover thoroughly.
- A keyboard focus-trap inside the property detail modal (currently it focuses
  the panel on open and closes on Escape/backdrop, but Tab can still leave it).
- Search, for portfolios too large to scan visually.
- Persisting the active status filter (URL query param or local storage) so it
  survives a refresh.

## AI tools used
- **Claude Code** — scaffolded the Next.js project and built the initial dashboard UI
  (portfolio overview, filtering, detail modal). Session transcript in `ai-sessions/`.
  - Skill used: **frontend-design** (Anthropic) for visual design direction.
- **Claude (desktop app)** — a sounding board while I worked through the edge-case
  handling myself (loading/skeleton, empty states, messy-data guards). This was a
  chat rather than a coding session, so there's no transcript to include.