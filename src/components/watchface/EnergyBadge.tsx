interface Props {
  /** 0..1 */
  energy: number;
  ambient?: boolean;
}

/** Top-of-face energy readout: tiny label, value, and a 16-segment bar. */
export function EnergyBadge({ energy, ambient = false }: Props) {
  const pct = Math.round(energy * 100);
  const segments = 16;
  const filled = Math.round(energy * segments);

  return (
    <div className="flex flex-col items-center gap-[7px]">
      <span
        style={{
          fontFamily: "var(--font-wf-mono)",
          fontSize: 10,
          letterSpacing: "0.42em",
          textIndent: "0.42em",
          color: "var(--wf-ink-muted)",
          opacity: ambient ? 0.6 : 1,
        }}
      >
        ENERGIA
      </span>
      <span className="flex items-baseline gap-[3px]">
        <span
          className="tabular-nums"
          style={{
            fontFamily: "var(--font-wf-display)",
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1,
            color: ambient ? "var(--wf-ink)" : "var(--wf-accent)",
            opacity: ambient ? 0.8 : 1,
          }}
        >
          {pct}
        </span>
        <span
          style={{
            fontFamily: "var(--font-wf-mono)",
            fontSize: 11,
            color: "var(--wf-ink-muted)",
          }}
        >
          %
        </span>
      </span>
      {!ambient && (
        <div className="flex items-center gap-[3px]">
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 4,
                height: i < filled ? 8 : 5,
                background:
                  i < filled ? "var(--wf-accent)" : "var(--wf-hairline-strong)",
                opacity: i < filled ? 1 : 0.9,
                transition: "height 200ms ease, background 200ms ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
