import { getCar } from "./cars";

interface Props {
  carId: string;
  /** Ambient mode draws the outline only (burn-in + power budget). */
  ambient?: boolean;
  className?: string;
}

export function CarSilhouette({ carId, ambient = false, className }: Props) {
  const car = getCar(carId);

  return (
    <svg
      viewBox={car.viewBox}
      className={className}
      role="img"
      aria-label={car.name}
      style={{ overflow: "visible" }}
    >
      {ambient ? (
        <g fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round">
          <path d={car.body} />
          {car.wheels.map((w, i) => (
            <circle key={i} cx={w.cx} cy={w.cy} r={w.r * 0.62} strokeWidth={2} />
          ))}
        </g>
      ) : (
        <>
          <path d={car.body} fill="currentColor" />
          {car.detail ? (
            <path
              d={car.detail}
              fill="none"
              stroke="var(--wf-bg)"
              strokeWidth={2.4}
              strokeLinecap="round"
              opacity={0.85}
            />
          ) : null}
          {car.wheels.map((w, i) => (
            <g key={i}>
              <circle cx={w.cx} cy={w.cy} r={w.r} fill="currentColor" />
              <circle cx={w.cx} cy={w.cy} r={w.r * 0.58} fill="var(--wf-bg)" />
              <circle cx={w.cx} cy={w.cy} r={w.r * 0.2} fill="currentColor" />
              {Array.from({ length: 8 }).map((_, k) => {
                const a = (k / 8) * Math.PI * 2;
                return (
                  <line
                    key={k}
                    x1={w.cx + Math.cos(a) * w.r * 0.22}
                    y1={w.cy + Math.sin(a) * w.r * 0.22}
                    x2={w.cx + Math.cos(a) * w.r * 0.54}
                    y2={w.cy + Math.sin(a) * w.r * 0.54}
                    stroke="currentColor"
                    strokeWidth={1.6}
                  />
                );
              })}
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
