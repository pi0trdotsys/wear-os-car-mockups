import type { MetricSpec } from "./types";

interface Props {
  metrics: MetricSpec[];
  ambient?: boolean;
}

export function MetricRow({ metrics, ambient = false }: Props) {
  return (
    <div
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="flex flex-col items-center gap-[6px]"
          style={{
            borderLeft: i === 0 ? "none" : "1px solid var(--wf-hairline)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-wf-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--wf-ink-muted)",
              opacity: ambient ? 0.6 : 1,
            }}
          >
            {m.label}
          </span>
          <span className="flex items-baseline gap-[2px]">
            <span
              className="tabular-nums"
              style={{
                fontFamily: "var(--font-wf-display)",
                fontWeight: 400,
                fontSize: 26,
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color:
                  m.accent && !ambient ? "var(--wf-accent)" : "var(--wf-ink)",
                opacity: ambient ? 0.8 : 1,
              }}
            >
              {m.value}
            </span>
            {m.unit ? (
              <span
                style={{
                  fontFamily: "var(--font-wf-mono)",
                  fontSize: 11,
                  color: "var(--wf-ink-muted)",
                }}
              >
                {m.unit}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
