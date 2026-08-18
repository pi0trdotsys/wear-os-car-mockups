interface Props {
  now: Date;
  use24Hour: boolean;
  ambient?: boolean;
}

export function TimeDisplay({ now, use24Hour, ambient = false }: Props) {
  const h24 = now.getHours();
  const hours = use24Hour ? h24 : h24 % 12 === 0 ? 12 : h24 % 12;
  const minutes = now.getMinutes();
  const meridiem = h24 < 12 ? "AM" : "PM";

  return (
    <div className="flex items-baseline justify-center gap-[0.06em]">
      <span
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-wf-display)",
          fontWeight: ambient ? 200 : 300,
          fontSize: 104,
          lineHeight: 0.86,
          letterSpacing: "-0.03em",
          color: "var(--wf-ink)",
          WebkitTextStroke: ambient ? "1px var(--wf-ink)" : undefined,
          opacity: ambient ? 0.92 : 1,
        }}
      >
        {String(hours).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-wf-display)",
          fontWeight: 300,
          fontSize: 96,
          lineHeight: 0.86,
          color: "var(--wf-accent)",
          opacity: ambient ? 0.5 : 0.9,
          margin: "0 0.04em",
        }}
      >
        :
      </span>
      <span
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-wf-display)",
          fontWeight: ambient ? 200 : 300,
          fontSize: 104,
          lineHeight: 0.86,
          letterSpacing: "-0.03em",
          color: "var(--wf-ink)",
          opacity: ambient ? 0.92 : 1,
        }}
      >
        {String(minutes).padStart(2, "0")}
      </span>
      {!use24Hour && (
        <span
          style={{
            fontFamily: "var(--font-wf-mono)",
            fontSize: 13,
            letterSpacing: "0.22em",
            color: "var(--wf-ink-muted)",
            marginLeft: 6,
          }}
        >
          {meridiem}
        </span>
      )}
    </div>
  );
}
