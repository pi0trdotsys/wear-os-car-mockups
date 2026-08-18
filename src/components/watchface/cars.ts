import type { CarSpec } from "./types";

/**
 * Side-profile silhouettes authored on a 400 x 150 grid.
 * Ground line sits at y = 118, wheel centre at y = 104.
 */
const VB = "0 0 400 150";

export const CARS: CarSpec[] = [
  {
    id: "hyper-mid",
    name: "Mid-engine hypercar",
    era: "modern",
    viewBox: VB,
    body: "M14 110 L22 92 C34 80 58 74 88 71 L134 47 C158 36 200 33 238 39 L306 55 L358 70 C378 75 388 86 388 99 L386 110 L344 111 C340 93 325 82 308 82 C291 82 276 93 272 111 L136 111 C132 93 117 82 100 82 C83 82 68 93 64 111 Z",
    detail:
      "M100 69 L138 50 C160 41 196 39 228 44 L272 53 M186 42 L188 66 M118 69 L136 51",
    wheels: [
      { cx: 100, cy: 100, r: 25 },
      { cx: 308, cy: 100, r: 25 },
    ],
  },
  {
    id: "electric-gt",
    name: "Electric hyper-sedan",
    era: "modern",
    viewBox: VB,
    body: "M10 106 C10 92 22 82 44 76 L104 60 C132 44 176 36 216 37 C252 38 282 47 314 61 L364 74 C382 79 390 88 390 100 L388 111 L342 111 C338 93 323 82 306 82 C289 82 274 93 270 111 L134 111 C130 93 115 82 98 82 C81 82 66 93 62 111 L14 111 Z",
    detail:
      "M104 61 C134 46 176 39 214 40 C248 41 276 49 306 62 L104 61 M196 40 L198 61 M250 43 L256 62",
    wheels: [
      { cx: 98, cy: 100, r: 25 },
      { cx: 306, cy: 100, r: 25 },
    ],
  },
  {
    id: "front-engine-gt",
    name: "Modern grand tourer",
    era: "modern",
    viewBox: VB,
    body: "M12 108 C12 94 26 84 52 78 L118 64 C146 48 186 42 222 44 C254 46 280 56 302 70 L360 76 C380 80 390 88 390 100 L388 111 L344 111 C340 93 325 82 308 82 C291 82 276 93 272 111 L136 111 C132 93 117 82 100 82 C83 82 68 93 64 111 L16 111 Z",
    detail: "M120 65 C148 50 186 45 220 47 C248 49 272 58 292 70 M204 46 L204 65",
    wheels: [
      { cx: 100, cy: 100, r: 25 },
      { cx: 308, cy: 100, r: 25 },
    ],
  },
  {
    id: "muscle-fastback",
    name: "60s muscle fastback",
    era: "classic",
    viewBox: VB,
    body: "M10 104 C10 90 20 82 40 78 L74 72 L128 44 C152 34 210 32 246 38 L282 62 L356 72 C378 76 390 84 390 98 L388 111 L344 111 C340 93 325 82 308 82 C291 82 276 93 272 111 L136 111 C132 93 117 82 100 82 C83 82 68 93 64 111 L14 111 Z",
    detail: "M78 72 L130 46 C154 36 208 34 242 40 L272 62 M182 37 L184 66",
    wheels: [
      { cx: 100, cy: 100, r: 26 },
      { cx: 308, cy: 100, r: 26 },
    ],
  },
  {
    id: "wedge-70s",
    name: "70s wedge",
    era: "classic",
    viewBox: VB,
    body: "M16 112 L20 96 L118 70 L168 48 L268 46 L302 66 L378 82 C388 86 390 92 390 100 L388 112 L346 112 C342 94 327 83 310 83 C293 83 278 94 274 112 L138 112 C134 94 119 83 102 83 C85 83 70 94 66 112 Z",
    detail: "M124 69 L170 50 L262 49 L292 66 M214 49 L212 68",
    wheels: [
      { cx: 102, cy: 100, r: 24 },
      { cx: 310, cy: 100, r: 24 },
    ],
  },
  {
    id: "roadster-50s",
    name: "50s roadster",
    era: "classic",
    viewBox: VB,
    body: "M18 100 C18 86 30 78 52 74 L108 66 C130 50 176 44 214 48 C246 51 268 60 286 70 L350 78 C374 82 384 88 384 100 L382 111 L340 111 C336 93 321 82 304 82 C287 82 272 93 268 111 L138 111 C134 93 119 82 102 82 C85 82 70 93 66 111 L22 111 Z",
    detail: "M112 66 C134 52 176 47 212 50 L118 67",
    wheels: [
      { cx: 102, cy: 100, r: 27 },
      { cx: 304, cy: 100, r: 27 },
    ],
  },
];

export const DEFAULT_CAR_ID = "hyper-mid";

export function getCar(id: string): CarSpec {
  return CARS.find((c) => c.id === id) ?? (CARS[0] as CarSpec);
}
