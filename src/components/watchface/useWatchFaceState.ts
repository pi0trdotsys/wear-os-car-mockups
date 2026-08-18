import { useEffect, useState } from "react";
import { DEFAULT_CAR_ID } from "./cars";
import type { WatchFaceState } from "./types";

/**
 * Mockup-only state: a 1 Hz clock plus locally adjustable sensor stand-ins.
 * On device every field except `carId` comes from the platform (see docs).
 */
export function useWatchFaceState(ambient: boolean) {
  const [now, setNow] = useState(() => new Date(2026, 0, 1, 21, 40, 0));
  const [use24Hour, setUse24Hour] = useState(true);
  const [carId, setCarId] = useState(DEFAULT_CAR_ID);
  const [battery, setBattery] = useState(0.86);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(
      () => setNow(new Date()),
      ambient ? 60_000 : 1_000,
    );
    return () => window.clearInterval(id);
  }, [ambient]);

  const state: WatchFaceState = {
    now,
    use24Hour,
    battery,
    energy: 0.84,
    steps: 8432,
    temperatureC: 24,
    carId,
    ambient,
  };

  return { state, setUse24Hour, setCarId, setBattery };
}
