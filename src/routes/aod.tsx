import { createFileRoute, Link } from "@tanstack/react-router";
import { CARS } from "@/components/watchface/cars";
import { WatchFace } from "@/components/watchface/WatchFace";
import { WatchShell } from "@/components/watchface/WatchShell";
import { useWatchFaceState } from "@/components/watchface/useWatchFaceState";

export const Route = createFileRoute("/aod")({
  head: () => ({
    meta: [
      { title: "Apex Dial — always-on display mockup" },
      {
        name: "description",
        content:
          "Ambient variant of the Apex Dial watch face: pure black, outline silhouette, minimal pixel coverage for burn-in safety.",
      },
      {
        property: "og:title",
        content: "Apex Dial — always-on display mockup",
      },
      {
        property: "og:description",
        content:
          "Ambient Wear OS watch face variant with outline-only car silhouette and low pixel coverage.",
      },
    ],
  }),
  component: AodPreview,
});

function AodPreview() {
  const { state, setCarId } = useWatchFaceState(true);

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ background: "var(--studio-bg)" }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-12">
        <header className="text-center">
          <p
            className="text-[11px] uppercase"
            style={{
              fontFamily: "var(--font-wf-mono)",
              letterSpacing: "0.5em",
              color: "var(--wf-ink-muted)",
            }}
          >
            Ambient · 1 Hz · outline only
          </p>
          <h1
            className="mt-3 text-4xl"
            style={{
              fontFamily: "var(--font-wf-display)",
              fontWeight: 300,
              color: "var(--wf-ink)",
            }}
          >
            Always-On Display
          </h1>
        </header>

        <WatchShell size={420}>
          <WatchFace state={state} size={420} />
        </WatchShell>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CARS.map((car) => {
            const active = car.id === state.carId;
            return (
              <button
                key={car.id}
                onClick={() => setCarId(car.id)}
                className="px-3 py-1 text-[11px] transition-colors"
                style={{
                  fontFamily: "var(--font-wf-mono)",
                  letterSpacing: "0.12em",
                  border: `1px solid ${active ? "var(--wf-accent)" : "var(--wf-hairline-strong)"}`,
                  color: active ? "var(--wf-accent)" : "var(--wf-ink-muted)",
                }}
              >
                {car.name}
              </button>
            );
          })}
        </div>

        <Link
          to="/"
          className="px-4 py-2 text-[11px]"
          style={{
            fontFamily: "var(--font-wf-mono)",
            letterSpacing: "0.2em",
            border: "1px solid var(--wf-hairline-strong)",
            color: "var(--wf-ink)",
          }}
        >
          ← EKRAN GŁÓWNY
        </Link>
      </div>
    </main>
  );
}
