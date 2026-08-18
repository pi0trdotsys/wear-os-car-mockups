import { CarSilhouette } from "./CarSilhouette";
import { EnergyBadge } from "./EnergyBadge";
import { MetricRow } from "./MetricRow";
import { TickRing } from "./TickRing";
import { TimeDisplay } from "./TimeDisplay";
import type { MetricSpec, WatchFaceState } from "./types";

interface Props {
  state: WatchFaceState;
  /** Rendered at 480x480 and scaled by the caller. */
  size?: number;
}

export function WatchFace({ state, size = 480 }: Props) {
  const {
    now,
    use24Hour,
    battery,
    energy,
    steps,
    temperatureC,
    carId,
    ambient,
  } = state;

  const metrics: MetricSpec[] = [
    { label: "KROKI", value: steps.toLocaleString("pl-PL") },
    { label: "TEMP", value: String(Math.round(temperatureC)), unit: "°" },
    {
      label: "BATERIA",
      value: String(Math.round(battery * 100)),
      unit: "%",
      accent: true,
    },
  ];

  return (
    <div
      className={ambient ? "wf-root wf-ambient" : "wf-root"}
      style={{
        width: 480,
        height: 480,
        transform: `scale(${size / 480})`,
        transformOrigin: "top left",
      }}
    >
      <div className="wf-dial">
        {!ambient && <div className="wf-glow" aria-hidden />}

        <TickRing
          minute={now.getMinutes()}
          second={now.getSeconds()}
          ambient={ambient}
        />

        <div className="absolute left-0 right-0" style={{ top: 62 }}>
          <div className="flex justify-center">
            <EnergyBadge energy={energy} ambient={ambient} />
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: ambient ? 158 : 150, width: ambient ? 268 : 320 }}
        >
          <CarSilhouette
            key={carId}
            carId={carId}
            ambient={ambient}
            className="wf-car h-auto w-full"
          />
        </div>

        {!ambient && (
          <div
            className="absolute"
            style={{
              top: 266,
              left: 96,
              right: 96,
              height: 1,
              background: "var(--wf-hairline-strong)",
            }}
          />
        )}

        {!ambient && (
          <div className="absolute" style={{ top: 282, left: 74, right: 74 }}>
            <MetricRow metrics={metrics} />
          </div>
        )}

        <div
          className="absolute left-0 right-0"
          style={{ top: ambient ? 300 : 334 }}
        >
          <TimeDisplay now={now} use24Hour={use24Hour} ambient={ambient} />
        </div>

        {ambient && (
          <div className="absolute left-0 right-0 flex justify-center" style={{ top: 414 }}>
            <span
              style={{
                fontFamily: "var(--font-wf-mono)",
                fontSize: 10,
                letterSpacing: "0.34em",
                color: "var(--wf-ink-muted)",
              }}
            >
              {String(Math.round(battery * 100))}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
