import { createFileRoute, Link } from "@tanstack/react-router";
import { CARS } from "@/components/watchface/cars";
import { WatchFace } from "@/components/watchface/WatchFace";
import { WatchShell } from "@/components/watchface/WatchShell";
import { useWatchFaceState } from "@/components/watchface/useWatchFaceState";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Dial — main watch face mockup" },
      {
        name: "description",
        content:
          "Interactive Wear OS watch face mockup: minute ring, energy readout, supercar and classic silhouettes, condensed time.",
      },
      { property: "og:title", content: "Apex Dial — main watch face mockup" },
      {
        property: "og:description",
        content:
          "Interactive Wear OS watch face mockup with supercar and classic-car silhouettes.",
      },
    ],
  }),
  component: MainFacePreview,
});

function MainFacePreview() {
  const { state, setUse24Hour, setCarId, setBattery } = useWatchFaceState(false);

  const modern = CARS.filter((c) => c.era === "modern");
  const classic = CARS.filter((c) => c.era === "classic");

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ background: "var(--studio-bg)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <header className="text-center">
          <p
            className="text-[11px] uppercase"
            style={{
              fontFamily: "var(--font-wf-mono)",
              letterSpacing: "0.5em",
              color: "var(--wf-ink-muted)",
            }}
          >
            Wear OS · 480 × 480
          </p>
          <h1
            className="mt-3 text-4xl"
            style={{
              fontFamily: "var(--font-wf-display)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              color: "var(--wf-ink)",
            }}
          >
            Apex Dial
          </h1>
        </header>

        <WatchShell size={420}>
          <WatchFace state={state} size={420} />
        </WatchShell>

        <section className="w-full max-w-xl">
          <ControlLabel>Sylwetka</ControlLabel>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <CarGroup
              title="Nowoczesne"
              cars={modern}
              current={state.carId}
              onSelect={setCarId}
            />
            <CarGroup
              title="Klasyki"
              cars={classic}
              current={state.carId}
              onSelect={setCarId}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
            <div>
              <ControlLabel>Format</ControlLabel>
              <div className="mt-3 flex gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setUse24Hour(v)}
                    className="px-3 py-1 text-[11px] transition-colors"
                    style={{
                      fontFamily: "var(--font-wf-mono)",
                      letterSpacing: "0.14em",
                      border: `1px solid ${state.use24Hour === v ? "var(--wf-accent)" : "var(--wf-hairline-strong)"}`,
                      color:
                        state.use24Hour === v
                          ? "var(--wf-accent)"
                          : "var(--wf-ink-muted)",
                    }}
                  >
                    {v ? "24H" : "12H"}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-[180px] flex-1">
              <ControlLabel>
                Bateria · {Math.round(state.battery * 100)}%
              </ControlLabel>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(state.battery * 100)}
                onChange={(e) => setBattery(Number(e.target.value) / 100)}
                className="mt-4 w-full accent-[var(--wf-accent)]"
                aria-label="Poziom baterii"
              />
            </div>

            <Link
              to="/aod"
              className="px-4 py-2 text-[11px] transition-colors"
              style={{
                fontFamily: "var(--font-wf-mono)",
                letterSpacing: "0.2em",
                border: "1px solid var(--wf-hairline-strong)",
                color: "var(--wf-ink)",
              }}
            >
              AOD →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function ControlLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[10px] uppercase"
      style={{
        fontFamily: "var(--font-wf-mono)",
        letterSpacing: "0.34em",
        color: "var(--wf-ink-muted)",
      }}
    >
      {children}
    </span>
  );
}

function CarGroup({
  title,
  cars,
  current,
  onSelect,
}: {
  title: string;
  cars: typeof CARS;
  current: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <span
        className="block text-[10px] uppercase"
        style={{
          fontFamily: "var(--font-wf-mono)",
          letterSpacing: "0.28em",
          color: "var(--wf-ink-muted)",
          opacity: 0.7,
        }}
      >
        {title}
      </span>
      <div className="mt-2 flex flex-col">
        {cars.map((car) => {
          const active = car.id === current;
          return (
            <button
              key={car.id}
              onClick={() => onSelect(car.id)}
              className="py-2 text-left text-sm transition-colors"
              style={{
                fontFamily: "var(--font-wf-display)",
                letterSpacing: "0.01em",
                borderBottom: "1px solid var(--wf-hairline)",
                color: active ? "var(--wf-accent)" : "var(--wf-ink)",
                opacity: active ? 1 : 0.72,
              }}
            >
              {car.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
