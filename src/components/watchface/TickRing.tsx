interface Props {
  /** 0..59 — drives the accent arc and tick weighting. */
  minute: number;
  second: number;
  ambient?: boolean;
}

const CENTER = 240;
const R_OUTER = 232;

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CENTER + Math.cos(rad) * r, y: CENTER + Math.sin(rad) * r };
}

export function TickRing({ minute, second, ambient = false }: Props) {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const sweepEnd = (minute + second / 60) * 6;

  const arcStart = polar(R_OUTER - 1, 0);
  const arcEnd = polar(R_OUTER - 1, sweepEnd);
  const largeArc = sweepEnd > 180 ? 1 : 0;

  return (
    <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full">
      {!ambient && (
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R_OUTER - 34}
          fill="none"
          stroke="var(--wf-hairline)"
          strokeWidth={1}
        />
      )}

      {ticks.map((i) => {
        const isMajor = i % 5 === 0;
        const dist = Math.abs(((i - minute + 60) % 60 + 30) % 60 - 30);
        const near = dist <= 2;
        const len = isMajor ? 14 : near ? 11 : 7;
        const p1 = polar(R_OUTER, i * 6);
        const p2 = polar(R_OUTER - len, i * 6);
        if (ambient && !isMajor) return null;
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={near && !ambient ? "var(--wf-accent)" : "var(--wf-ink)"}
            strokeWidth={isMajor ? 2 : 1}
            opacity={ambient ? 0.5 : near ? 1 : isMajor ? 0.62 : 0.28}
          />
        );
      })}

      {!ambient && (
        <path
          d={`M ${arcStart.x} ${arcStart.y} A ${R_OUTER - 1} ${R_OUTER - 1} 0 ${largeArc} 1 ${arcEnd.x} ${arcEnd.y}`}
          fill="none"
          stroke="var(--wf-accent)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
        />
      )}

      {[0, 15, 30, 45].map((m) => {
        const p = polar(R_OUTER - 30, m * 6);
        return (
          <text
            key={m}
            x={p.x}
            y={p.y + 6}
            textAnchor="middle"
            fill="var(--wf-ink)"
            opacity={ambient ? 0.45 : 0.62}
            style={{
              fontFamily: "var(--font-wf-mono)",
              fontSize: 15,
              letterSpacing: "0.12em",
            }}
          >
            {String(m).padStart(2, "0")}
          </text>
        );
      })}
    </svg>
  );
}
