# Wear OS Watch Face — Future Tech Minimalism

Redesign the watch face shown in the reference into a refined "future tech minimalism" aesthetic, with a rotating gallery of supercar and classic-car silhouettes. Deliver interactive TypeScript mockups (main screen + AOD) in this app, plus an implementation handbook for Claude.

## Visual direction

- Deep near-black base (oklch ~0.14) with two ambient radial glows; no pure black except in AOD.
- Single accent: ember orange, used sparsely — active tick arc, car silhouette, one metric highlight.
- Typography: condensed geometric numerals for time (tabular, tight tracking), tiny uppercase mono labels with wide letter-spacing (KROKI / TEMP / BATERIA / ENERGIA).
- Structure: outer minute ring drawn as thin ticks with only 12 numerals, weight increasing near the current minute; inner content on a 3-zone vertical grid (energy bar, car stage, metrics + time).
- Restrained motion: accent arc sweeps on the second, silhouette cross-fades between cars, no bouncing or fade-in-everything.
- Sharp geometry, radius 2px on chips only, hairline 1px dividers instead of boxes.

## Screens

1. `/` — Main watch face (interactive preview inside a 480x480 round bezel, on a neutral studio backdrop with a small control strip to switch car / toggle 12–24h / battery level).
2. `/aod` — Always-On Display variant: pure black, ~5% pixel coverage, outline-only car, time in thin outline numerals, accent reduced to a single tick. Reachable from the main preview via a toggle.

## Car silhouettes

Six vector silhouettes as React components (single path each, currentColor):
- Modern: mid-engine hypercar, electric hyper-sedan, modern GT.
- Classics: 60s muscle fastback, 70s wedge, 50s roadster.
Silhouettes are drawn as SVG paths (no bitmaps), so they stay crisp and AOD-safe.

## Deliverables

- `src/routes/index.tsx` — main face preview (replaces placeholder), with route `head()` metadata.
- `src/routes/aod.tsx` — AOD preview with its own `head()`.
- `src/components/watchface/` — `WatchFace.tsx`, `TickRing.tsx`, `TimeDisplay.tsx`, `MetricRow.tsx`, `EnergyBadge.tsx`, `CarSilhouette.tsx`, `cars.ts` (path data + metadata), `types.ts` (`WatchFaceState`, `CarSpec`, `MetricSpec`, `ThemeTokens`).
- `src/styles.css` — add accent/glow/ring tokens (oklch) + `@theme inline` mappings; no hardcoded colors in components.
- `docs/CLAUDE_IMPLEMENTATION.md` — implementation handbook.

## Documentation for Claude (contents)

- Design tokens table (colors, type scale, spacing, tick geometry) with exact values.
- Layout spec in 480x480 coordinates: safe zones, ring radii, element anchors.
- Data contract: `WatchFaceState` fields (time, steps, temp, battery, energy, carId, ambientMode) and where each comes from on Wear OS (Watch Face Format / complications: `SHORT_TEXT`, `RANGED_VALUE`, health steps, battery status).
- Mapping guide: which mockup component maps to which Watch Face Format XML element (or Kotlin `WatchFaceService` renderer), including AOD constraints (pixel budget, no red/orange fills at full brightness, 1Hz updates).
- Car rotation logic rules (daily/manual/tap-to-cycle) and how to store the selection.
- Acceptance checklist: burn-in safety, contrast ratios, tap targets, 12/24h, locale-aware temperature units.

## Technical notes

Mockups are pure presentation React + SVG, no backend and no data fetching; state is local (`useState` + a 1s tick). All colors come from semantic tokens in `src/styles.css`.
