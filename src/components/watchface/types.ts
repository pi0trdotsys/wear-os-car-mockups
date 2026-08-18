/**
 * Shared contracts for the watch-face mockups.
 * These types are the hand-off contract for the native implementation.
 */

export type CarEra = "modern" | "classic";

export interface CarSpec {
  /** Stable id used for persistence / complication config. */
  id: string;
  /** Display name shown in the mockup control strip only (never on the face). */
  name: string;
  era: CarEra;
  /** SVG viewBox the paths are authored in. */
  viewBox: string;
  /** Filled body silhouette (single path, uses currentColor). */
  body: string;
  /** Hairline detail path (glass / shut lines). Stroked, never filled. */
  detail?: string;
  /** Wheel geometry in viewBox units. */
  wheels: { cx: number; cy: number; r: number }[];
}

export interface MetricSpec {
  /** Tiny uppercase label, e.g. "KROKI". */
  label: string;
  value: string;
  /** Small trailing unit glyph, e.g. "%" or "°". */
  unit?: string;
  /** Only one metric per face may be accented. */
  accent?: boolean;
}

export interface WatchFaceState {
  /** Current time; the mockup ticks this once per second. */
  now: Date;
  /** 24h when false the face renders 12h with a discreet meridiem. */
  use24Hour: boolean;
  /** 0..1 battery level. */
  battery: number;
  /** 0..1 "energy" ring value (body battery / activity goal). */
  energy: number;
  /** Step count for the day. */
  steps: number;
  /** Temperature in Celsius. */
  temperatureC: number;
  /** Selected silhouette. */
  carId: string;
  /** True when the display is in ambient (always-on) mode. */
  ambient: boolean;
}

export interface ThemeTokens {
  background: string;
  ink: string;
  inkMuted: string;
  accent: string;
  ring: string;
}
