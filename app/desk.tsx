"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { type Copy, LINKS } from "./copy";
import { canAnimate, useLoop } from "./motion";
import { TOTEM } from "./totem";

/* ── projection ──────────────────────────────────────────────────────────────
   World units are centimetres: x along the desk, y toward the viewer, z up.
   A 3/4 axonometric view from the front right. */
const TH = (25 * Math.PI) / 180;
const PH = (38 * Math.PI) / 180;
const CT = Math.cos(TH);
const ST = Math.sin(TH);
const SP = Math.sin(PH);
const CP = Math.cos(PH);

type V3 = [number, number, number];
const P = (x: number, y: number, z: number): [number, number] => [x * CT - y * ST, (x * ST + y * CT) * SP - z * CP];
const f = (n: number) => n.toFixed(2);
const pt = ([x, y, z]: V3) => P(x, y, z).map(f).join(" ");
const path = (vs: V3[], close = true) => "M" + vs.map(pt).join(" L") + (close ? "Z" : "");
const seg = (a: V3, b: V3) => path([a, b], false);
const add = (a: V3, b: V3, k = 1): V3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const norm = (v: V3): V3 => {
  const l = Math.hypot(...v);
  return [v[0] / l, v[1] / l, v[2] / l];
};
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** Unit vector from the scene toward the viewer (this is an orthographic view). */
const VIEW: V3 = [ST * CP, CT * CP, SP];

/** The three faces of an axis-aligned box the viewer can see: +x side, +y front, +z top. */
function box(x0: number, y0: number, z0: number, w: number, d: number, h: number) {
  const [x1, y1, z1] = [x0 + w, y0 + d, z0 + h];
  return [
    path([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]),
    path([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]),
    path([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]),
  ];
}
const FACES = ["side", "front", "top"];
const Box = ({ b, className = "solid" }: { b: string[]; className?: string }) => (
  <g className={className}>
    {b.map((d, i) => (
      <path key={i} d={d} className={FACES[i]} />
    ))}
  </g>
);

/* ── dimensions ─────────────────────────────────────────────────────────── */
const UX = 70; // the user's midline: left monitor, keyboard gap, chair and mic all line up on it
const H = 110; // standing desk height; the sitting pose is drawn by sliding everything down
const SIT = 72;
const LIFT = (H - SIT) * CP; // screen units
const CHAIR_ROLL = 12; // cm the chair sits closer to the desk while seated
const ROLL: [number, number] = [CHAIR_ROLL * ST, -CHAIR_ROLL * CT * SP];

/* ── TOTEM, from the official layout: mirrored halves, thumbs at the inner bottom ─ */
const KB_SCALE = 0.0353 * 1.9; // layout unit → cm; drawn larger than life, it is the star of the desk
const KB_X = UX - (TOTEM.width * KB_SCALE) / 2; // the gap between the halves sits on the midline
const KB_Y = 40;
const SPLAY = 6; // degrees each half is turned toward the other
type Key = { d: string; ch: string; cx: number; cy: number };

function totemHalf(side: -1 | 1) {
  const W = TOTEM.width;
  const pivot = [W / 4, 134];
  const a = (-side * SPLAY * Math.PI) / 180;
  // layout point → desk-plane cm; the right half mirrors the left about the centre
  const place = (x: number, y: number): [number, number] => {
    const lx = side < 0 ? x : W - x;
    const px = side < 0 ? pivot[0] : W - pivot[0];
    const [dx, dy] = [lx - px, y - pivot[1]];
    const rx = px + dx * Math.cos(a) - dy * Math.sin(a);
    const ry = pivot[1] + dx * Math.sin(a) + dy * Math.cos(a);
    return [KB_X + rx * KB_SCALE, KB_Y + ry * KB_SCALE];
  };
  const ring = (z: number) => path(TOTEM.case.map(([x, y]) => [...place(x, y), z] as V3));
  const keys: Key[] = TOTEM.keys.map((k) => {
    const pts = k.c.map(([x, y]) => place(x, y));
    const cx = pts.reduce((s, q) => s + q[0], 0) / 4;
    const cy = pts.reduce((s, q) => s + q[1], 0) / 4;
    // inset each cap a little toward its centre so neighbours read as separate keys
    const cap = pts.map(([x, y]) => [cx + (x - cx) * 0.86, cy + (y - cy) * 0.86, H + 1.9] as V3);
    return { d: path(cap), ch: side < 0 ? k.l : k.r, cx, cy };
  });
  return { keys, base: ring(H), top: ring(H + 1.1) };
}

const LEFT = totemHalf(-1);
const RIGHT = totemHalf(1);
const KEYS = [...LEFT.keys, ...RIGHT.keys];
const RIPPLE_FROM = LEFT.keys[17]; // left inner thumb, as if a shortcut started there

function convexHull(p: [number, number][]) {
  const s = [...p].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [];
  const up: [number, number][] = [];
  for (const q of s) {
    while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop();
    lo.push(q);
  }
  for (const q of s.reverse()) {
    while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop();
    up.push(q);
  }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}

/* ── chair (Aeron-like): five-star base, mesh seat, tall mesh back, arms ───── */
const CX = UX;
const CY = 136;

function chair() {
  const spokes = [0, 1, 2, 3, 4]
    .map((k) => ((-90 + 72 * k + 18) * Math.PI) / 180)
    .sort((a, b) => Math.sin(a) - Math.sin(b))
    .map((a) => {
      const end: V3 = [CX + 30 * Math.cos(a), CY + 30 * Math.sin(a), 4];
      return { d: seg([CX, CY, 9], end), caster: P(end[0], end[1], 2) };
    });

  const seatZ = 46;
  const seatPt = (t: number): V3 => {
    const c = Math.cos(t);
    const s = Math.sin(t);
    const narrow = 1 - 0.14 * Math.max(0, s);
    return [CX + 25 * Math.sign(c) * Math.abs(c) ** 0.55 * narrow, CY + 21 * Math.sign(s) * Math.abs(s) ** 0.7, seatZ];
  };
  const seatOutline = path(Array.from({ length: 48 }, (_, i) => seatPt((i / 48) * Math.PI * 2)));
  const seatMesh: string[] = [];
  for (let i = 1; i < 12; i++) {
    const t = -Math.PI / 2 + (i / 12) * Math.PI;
    const a = seatPt(Math.PI - t);
    const b = seatPt(t);
    seatMesh.push(seg([a[0] + 1.2, a[1], seatZ], [b[0] - 1.2, b[1], seatZ]));
  }

  // back: a plane leaning away from the desk, widest in the upper middle
  const w = (v: number) => 15 + 9 * Math.sin(v * Math.PI * 0.82);
  const at = (u: number, v: number): V3 => [CX + u, CY + 23 + v * 9, 54 + v * 52];
  const outline: V3[] = [];
  for (let i = 0; i <= 10; i++) outline.push(at(-w(i / 10), i / 10));
  for (let i = 1; i < 10; i++) {
    const t = Math.PI - (i / 10) * Math.PI;
    outline.push(at(w(1) * Math.cos(t), 1 + 0.07 * Math.sin(t)));
  }
  for (let i = 10; i >= 0; i--) outline.push(at(w(i / 10), i / 10));
  const backMesh: string[] = [];
  for (let i = 1; i < 15; i++) {
    const v = i / 15;
    backMesh.push(seg(at(-w(v) + 1, v), at(w(v) - 1, v)));
  }
  const arm = (s: number) => ({
    post: seg([CX + s * 26, CY + 8, 44], [CX + s * 27, CY + 6, 63]),
    pad: box(CX + s * 27 - 2.2, CY - 7, 62.5, 4.4, 22, 2),
  });
  return {
    spokes,
    cylinder: seg([CX, CY, 9], [CX, CY, 40]),
    mech: box(CX - 8, CY - 4, 38, 16, 12, 5),
    seatOutline,
    seatMesh,
    spine: [seg([CX, CY + 6, 42], at(0, 0)), seg([CX - 17, CY + 17, 45], at(-15, 0)), seg([CX + 17, CY + 17, 45], at(15, 0))],
    back: path(outline),
    backMesh,
    arms: [arm(-1), arm(1)],
  };
}
const CHAIR = chair();

/* ── monitors: the left one is primary, square to the user; the right one is
   hinged at its inner edge and yawed 30° toward the user (150° between the screens) ─ */
const MON_W = 34;
const MON_D = 2.5;
const MON_H = 60;
const MON_Z = H + 30; // bottom edge of the screens, held up on the arm
const MON_Y = 13.5; // front face of the primary screen
const YAW = (30 * Math.PI) / 180;
type Monitor = { o: V3; u: V3 }; // front-bottom-left corner, unit vector along the width
const MONITORS: Monitor[] = [
  { o: [UX - MON_W / 2, MON_Y, MON_Z], u: [1, 0, 0] },
  { o: [UX + MON_W / 2 + 0.8, MON_Y, MON_Z], u: [Math.cos(YAW), Math.sin(YAW), 0] },
];
const normalOf = (u: V3): V3 => [-u[1], u[0], 0]; // front normal, toward the user

/** A thin slab along u (width), back along −n (depth), up z (height): the faces the viewer sees. */
function slab(o: V3, u: V3, w: number, d: number, h: number) {
  const n = normalOf(u);
  const Z: V3 = [0, 0, h];
  const f0 = o;
  const f1 = add(o, u, w);
  const b0 = add(f0, n, -d);
  const b1 = add(f1, n, -d);
  const faces: string[] = [];
  if (dot(u, VIEW) > 0) faces.push(path([f1, b1, add(b1, Z), add(f1, Z)]));
  else faces.push(path([f0, b0, add(b0, Z), add(f0, Z)]));
  faces.push(path([f0, f1, add(f1, Z), add(f0, Z)]));
  faces.push(path([add(f0, Z), add(f1, Z), add(b1, Z), add(b0, Z)]));
  return faces;
}

/** Affine map for drawing flat content onto a screen: content x runs along u, content y runs down. */
function screenMatrix({ o, u }: Monitor) {
  const inset = 1.5;
  const [ox, oy] = P(...add(add(o, u, inset), [0, 0, MON_H - inset]));
  const [ax, ay] = [u[0] * CT - u[1] * ST, (u[0] * ST + u[1] * CT) * SP];
  return `matrix(${f(ax)} ${f(ay)} 0 ${f(CP)} ${f(ox)} ${f(oy)})`;
}
const SCR_W = MON_W - 3;
const SCR_H = MON_H - 3;

/* ── dual monitor arm: one pole behind the seam, an arm to each screen's back ─ */
const POLE: V3 = [UX + MON_W / 2 + 1, 3, H];
const ARM_Z = MON_Z + 22;
const backCentre = ({ o, u }: Monitor): V3 => add(add(o, u, MON_W / 2), normalOf(u), -MON_D - 1.5);
const ARMS = MONITORS.map((m, i) => {
  const end = backCentre(m);
  const elbow: V3 = i === 0 ? [UX - 26, -1, ARM_Z] : [POLE[0] + 20, -2, ARM_Z];
  return path([[POLE[0], POLE[1], ARM_Z], elbow, [end[0], end[1], ARM_Z]], false);
});

/* ── mouse: Logitech Signature M840 L, right-handed sculpted, at the keyboard's scale ─ */
const MS = 1.9; // same enlargement as the keyboard
const M_LEN = 12.5 * MS;
const M_WID = 8.4 * MS;
const M_HGT = 4.5 * MS;
const M_X = UX + 37; // centre line, right of the right half
const M_Y = 42; // front (button) end
// u: −1 left (thumb side) … 1 right; v: 0 front … 1 back (palm)
const mHalf = (v: number) => (M_WID / 2) * (0.8 + 0.2 * Math.sin(Math.PI * Math.min(1, v * 1.25)));
const mHeight = (u: number, v: number) => {
  const hump = Math.sin(Math.PI * (0.12 + 0.82 * v)) ** 0.7; // palm hump, highest a little behind centre
  const side = 1 - 0.8 * ((u + 0.3) / 1.3) ** 2; // tall on the left, sloping down to the right
  return 0.7 + M_HGT * Math.max(0, hump * side);
};
const mPoint = (u: number, v: number): V3 => [M_X + u * mHalf(v), M_Y + v * M_LEN, H + mHeight(u, v)];
const mLine = (pts: [number, number][]) => path(pts.map(([u, v]) => mPoint(u, v)), false);
function mouse() {
  const shelf = (v: number) => -1 - 0.32 * Math.sin(Math.PI * Math.min(1, Math.max(0, (v - 0.3) / 0.65)));
  // outline of the body at the desk, the thumb shelf flaring out on the left
  const footprint: V3[] = [];
  for (let i = 0; i <= 24; i++) {
    const v = i / 24;
    footprint.push([M_X + mHalf(v), M_Y + v * M_LEN, H + 0.4]);
  }
  for (let i = 24; i >= 0; i--) {
    const v = i / 24;
    footprint.push([M_X + shelf(v) * mHalf(v), M_Y + v * M_LEN, H + 0.4]);
  }
  // silhouette: hull of the surface and the footprint, so it can occlude what is behind
  const pts: [number, number][] = footprint.map((q) => P(...q));
  for (let i = 0; i <= 12; i++) for (let j = 0; j <= 12; j++) pts.push(P(...mPoint(-1 + (2 * i) / 12, j / 12)));
  const hull = convexHull(pts);
  const ribs = [mLine(Array.from({ length: 14 }, (_, i) => [-0.3, 0.44 + (0.52 * i) / 13] as [number, number]))];
  return {
    silhouette: "M" + hull.map((q) => q.map(f).join(" ")).join(" L") + "Z",
    shelf: path(
      Array.from({ length: 15 }, (_, i) => {
        const v = 0.3 + (0.65 * i) / 14;
        return [M_X + shelf(v) * mHalf(v), M_Y + v * M_LEN, H + 1.6] as V3;
      }),
      false,
    ),
    grip: [0.48, 0.56, 0.64, 0.72, 0.8].map((v) => mLine([[-1, v], [-0.86, v + 0.02]])),
    seam: mLine(Array.from({ length: 8 }, (_, i) => [-0.08, (0.42 * i) / 7] as [number, number])),
    buttonsEdge: mLine(Array.from({ length: 13 }, (_, i) => [-1 + (2 * i) / 12, 0.42 + 0.04 * Math.cos(((i / 12) * 2 - 1) * 1.4)] as [number, number])),
    wheel: seg(add(mPoint(-0.08, 0.1), [0, 0, 0.9]), add(mPoint(-0.08, 0.26), [0, 0, 0.9])),
    sideButtons: [0.26, 0.38].map((v) => mLine([[-0.97, v], [-0.97, v + 0.09]])),
    ribs,
    anchor: P(...mPoint(0.85, 0.5)),
  };
}
const MOUSE = mouse();

/* ── broadcast dynamic mic on a two-segment boom clamped to the left back edge ─ */
// The boom swings the mic in from the left back corner, low over the keyboard's left half,
// angled across toward the user's midline so it reads as being in front of their mouth.
const MIC_C: V3 = [UX - 22, 58, H + 28];
const MIC_AX = norm([1, 0.3, 0.08]);
const MIC_R = 3;
const MIC_SIDE = norm(cross(MIC_AX, [0, 0, 1]));
const MIC_BACK = add(MIC_C, MIC_AX, -10);
const MIC_FRONT = add(MIC_C, MIC_AX, 5);
const MIC_TIP = add(MIC_C, MIC_AX, 10);
const YOKE_BASE = add(MIC_C, [0, 0, 1], MIC_R + 4.5);
const CLAMP_TOP: V3 = [5, 4, H + 2];
const BOOM_ROOT: V3 = [5, 4, H + 12];
const ELBOW: V3 = [10, 24, H + 48];

/** Silhouette of a cylinder between a and b, plus the visible end cap. */
function cylinder(a: V3, b: V3, r: number) {
  const pa = P(...a);
  const pb = P(...b);
  const [dx, dy] = [pb[0] - pa[0], pb[1] - pa[1]];
  const l = Math.hypot(dx, dy) || 1;
  const [nx, ny] = [(-dy / l) * r, (dx / l) * r];
  const axis = norm([b[0] - a[0], b[1] - a[1], b[2] - a[2]]);
  const k = Math.abs(dot(axis, VIEW)); // how much of the end cap we see
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const capAt = dot(axis, VIEW) > 0 ? pb : pa;
  return {
    body: `M${f(pa[0] + nx)} ${f(pa[1] + ny)} L${f(pb[0] + nx)} ${f(pb[1] + ny)} A${f(r * k)} ${f(r)} ${f(ang)} 0 1 ${f(pb[0] - nx)} ${f(pb[1] - ny)} L${f(pa[0] - nx)} ${f(pa[1] - ny)} A${f(r * k)} ${f(r)} ${f(ang)} 0 1 ${f(pa[0] + nx)} ${f(pa[1] + ny)}Z`,
    cap: { cx: f(capAt[0]), cy: f(capAt[1]), rx: f(Math.max(r * k, 0.3)), ry: f(r), rot: f(ang) },
    rings: (ts: number[]) =>
      ts.map((t) => {
        const c = P(...add(a, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], t));
        return { cx: f(c[0]), cy: f(c[1]), rx: f(Math.max(r * k, 0.3)), ry: f(r), rot: f(ang) };
      }),
  };
}
const MIC_BODY = cylinder(MIC_BACK, MIC_FRONT, MIC_R);
const MIC_SCREEN = cylinder(MIC_FRONT, MIC_TIP, MIC_R + 0.5);
const MIC_P = P(...MIC_C);
const springAlong = (a: V3, b: V3) => seg(add(add(a, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], 0.2), [0, 0, 2.6]), add(add(a, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], 0.8), [0, 0, 2.6]));

// rough advance widths, in em, for wrapping text on the tiny left screen
const adv = (ch: string) => (/[ㄱ-힝]/.test(ch) ? 0.92 : ch === " " ? 0.28 : /[A-Z]/.test(ch) ? 0.62 : 0.52);
const FS = 2.5;
function wrap(words: string[], width: number) {
  const out: { line: number; x: number; end: number }[] = [];
  let line = 0;
  let x = 0;
  for (const w of words) {
    const wl = [...w].reduce((s, c) => s + adv(c), 0) * FS;
    if (x > 0 && x + adv(" ") * FS + wl > width) {
      line++;
      x = 0;
    }
    const start = x === 0 ? 0 : x + adv(" ") * FS;
    out.push({ line, x: start, end: start + wl });
    x = start + wl;
  }
  return out;
}

// graph on the right screen
const NODES: [number, number][] = [
  [6, 32], [15, 28], [24, 34], [10, 42], [20, 44], [27, 50], [5, 51],
];
const LINKS_G: [number, number][] = [
  [0, 1], [1, 2], [1, 4], [3, 4], [4, 5], [0, 3], [3, 6],
];

/* ── callouts, in view-box units ──────────────────────────────────────────── */
const VB = { x: -40, y: -150, w: 192, h: 272 };
const anchorKeyboard = P(RIGHT.keys[6].cx, RIGHT.keys[6].cy, H + 2);
const callout = (id: string, a: [number, number], side: -1 | 1, dy = 0) => ({ id, a, side, y: Math.round(a[1] + dy) });
const CALLOUTS = [
  callout("monitors", P(UX - MON_W / 2, MON_Y, MON_Z + MON_H), -1, -4),
  callout("mic", P(...MIC_BACK), -1, -6),
  callout("keyboard", anchorKeyboard, 1, -30),
  callout("mouse", MOUSE.anchor, 1, -6),
  callout("desk", P(147, 40, 34), 1),
  callout("chair", P(CX - 18, CY + 26, 84), -1, 10),
] as const;
const LEFT_X = -52;
const RIGHT_X = 162;

type Labels = Copy["desk"];

const pct = (v: number, o: number, s: number) => `${(((v - o) / s) * 100).toFixed(2)}%`;

export default function Desk({ c, words: text }: { c: Labels; words: string }) {
  const words = text.split(" ");
  const layout = wrap(words, SCR_W - 8);
  const [n, setN] = useState(words.length);
  const stage = useRef<HTMLDivElement>(null);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  const keyEls = useRef<(SVGPathElement | null)[]>([]);
  const played = useRef(false);

  // the screen text and the mic meter run off one clock so they stay in sync
  const PRE = 2500;
  const PERIOD = 7600;
  useLoop(stage, 1e9, (t) => {
    let T: number;
    if (played.current) T = t % PERIOD;
    else if (t < PRE) T = -1;
    else T = t - PRE;
    if (T >= PERIOD) {
      played.current = true;
      T %= PERIOD;
    }
    const per = 3000 / words.length;
    const next = T < 400 ? 0 : T > 6900 ? 0 : Math.min(words.length, Math.floor((T - 400) / per) + 1);
    setN((p) => (p === next ? p : next));
    const talking = T >= 400 && T < 3500;
    bars.current.forEach((b, i) => {
      if (!b) return;
      const h = talking
        ? 1.4 + 6.4 * Math.abs(Math.sin(t * 0.011 + i * 1.7) * Math.sin(t * 0.0047 + i))
        : 1 + 0.5 * (1 + Math.sin(t * 0.002 + i * 0.9));
      b.setAttribute("height", f(h));
      b.setAttribute("y", f(MIC_P[1] - 2 - h));
    });
  });

  // pause idle CSS offscreen; light the matching key when you type while the desk is in view
  useEffect(() => {
    const el = stage.current!;
    let live = false;
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      el.toggleAttribute("data-live", live);
    });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!live || !canAnimate() || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();
      KEYS.forEach((key, i) => {
        if (key.ch !== k) return;
        const node = keyEls.current[i];
        if (!node) return;
        node.classList.remove("hit");
        void node.getBoundingClientRect();
        node.classList.add("hit");
        setTimeout(() => node.classList.remove("hit"), 260);
      });
    };
    addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      removeEventListener("keydown", onKey);
    };
  }, []);

  const last = n > 0 ? layout[n - 1] : null;
  const caret = last ? { x: 4 + last.end + 1.1, y: 45 + last.line * 3.4 - 0.85 } : { x: 4.4, y: 44.15 };
  const labels = c as unknown as Record<string, string>;

  return (
    <div className="desk" data-reveal="" style={{ "--lift": `${f(LIFT)}px`, "--roll-x": `${f(ROLL[0])}px`, "--roll-y": `${f(ROLL[1])}px` } as CSSProperties}>
      <div className="desk-stage" ref={stage}>
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={c.alt}>
          <defs>
            <radialGradient id="desk-dot">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#fff" />
              <stop offset=".6" stopColor="var(--glow)" />
              <stop offset="1" stopColor="var(--glow)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* desk frame: feet and outer columns stay; the inner columns and top rise */}
          <Box b={box(12, 4, 0, 10, 72, 3)} />
          <Box b={box(138, 4, 0, 10, 72, 3)} />
          <g className="lift">
            <Box b={box(14.5, 37, H - 58, 5, 6, 55)} />
            <Box b={box(140.5, 37, H - 58, 5, 6, 55)} />
          </g>
          <Box b={box(13.5, 36, 3, 7, 8, 59)} />
          <Box b={box(139.5, 36, 3, 7, 8, 59)} />

          <g className="lift">
            <Box b={box(20, 38, H - 9, 120, 4, 5)} />
            <Box b={box(0, 0, H - 3, 160, 80, 3)} className="solid slab" />
            <Box b={box(128, 79.5, H - 5.5, 14, 2.5, 3)} />

            {/* boom arm: clamp at the left back edge, two segments with springs */}
            <Box b={box(1.5, 0.5, H - 6, 7, 7, 8)} />
            <path className="tube" d={path([CLAMP_TOP, BOOM_ROOT, ELBOW, YOKE_BASE], false)} />
            <path className="tube-in" d={path([CLAMP_TOP, BOOM_ROOT, ELBOW, YOKE_BASE], false)} />
            <path className="spring" d={springAlong(BOOM_ROOT, ELBOW)} />
            <path className="spring" d={springAlong(ELBOW, YOKE_BASE)} />
            <circle className="joint" cx={f(P(...ELBOW)[0])} cy={f(P(...ELBOW)[1])} r="1.6" />

            {/* monitor arm: clamp, pole behind the seam, an arm to each screen */}
            <Box b={box(POLE[0] - 3.5, -1, H - 6, 7, 7, 8)} />
            <Box b={box(POLE[0] - 1.6, POLE[1] - 0.6, H + 2, 3.2, 3.2, ARM_Z - H + 4)} />
            {ARMS.map((d, i) => (
              <g key={i}>
                <path className="tube" d={d} />
                <path className="tube-in" d={d} />
              </g>
            ))}

            {/* monitors */}
            {MONITORS.map((m, i) => (
              <g key={i} className="monitor">
                <g className="solid">
                  {slab(m.o, m.u, MON_W, MON_D, MON_H).map((d, k) => (
                    <path key={k} d={d} className={FACES[k]} />
                  ))}
                </g>
                <g transform={screenMatrix(m)}>
                  <rect className="display" width={SCR_W} height={SCR_H} />
                  <g className="screen">
                    <line className="ui" x1="0" x2={SCR_W} y1="5" y2="5" />
                    {[2.5, 4.5, 6.5].map((x) => (
                      <circle key={x} className="ui-dot" cx={x} cy="2.5" r=".55" />
                    ))}
                    {i === 0 ? (
                      <>
                        <text className="scr-label" x="3" y="10.5">
                          #
                        </text>
                        <rect className="bar" x="3" y="14" width="19" height="1.3" rx=".6" />
                        <rect className="bar" x="3" y="17.5" width="13" height="1.3" rx=".6" />
                        <rect className="bar" x="3" y="23" width="22" height="1.3" rx=".6" />
                        <rect className="bar" x="3" y="26.5" width="9" height="1.3" rx=".6" />
                        <rect className="field" x="2" y="40" width={SCR_W - 4} height="13" rx="1.2" />
                        {[0, 1, 2].map((ln) => (
                          <text key={ln} className="scr-text" x="4" y={45 + ln * 3.4} fontSize={FS}>
                            {words.map((w, wi) =>
                              layout[wi].line === ln ? (
                                <tspan key={wi} className={wi < n ? undefined : "off"}>
                                  {(layout[wi].x > 0 ? " " : "") + w}
                                </tspan>
                              ) : null,
                            )}
                          </text>
                        ))}
                        <circle className="scr-caret" cx={caret.x} cy={caret.y} r="1.1" fill="url(#desk-dot)" />
                      </>
                    ) : (
                      <>
                        <rect className="bar strong" x="3" y="9" width="9" height="1.8" rx=".6" />
                        <rect className="box-ui" x="3" y="13.5" width="1.6" height="1.6" />
                        <rect className="bar" x="6" y="13.7" width="14" height="1.2" rx=".6" />
                        <rect className="box-ui" x="3" y="17.5" width="1.6" height="1.6" />
                        <rect className="bar" x="6" y="17.7" width="10" height="1.2" rx=".6" />
                        <line className="ui" x1="3" x2={SCR_W - 3} y1="23" y2="23" />
                        {LINKS_G.map(([a, b], li) => (
                          <line key={li} className="g-edge" x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
                        ))}
                        {NODES.map(([x, y], ni) => (
                          <circle key={ni} className={ni === 4 ? "g-node hl" : "g-node"} cx={x} cy={y} r={ni === 4 ? 1.3 : 0.9} />
                        ))}
                      </>
                    )}
                  </g>
                </g>
              </g>
            ))}

            {/* keyboard */}
            {[LEFT, RIGHT].map((h, i) => (
              <g key={i} className="kb">
                <path className="case base" d={h.base} />
                <path className="case top" d={h.top} />
              </g>
            ))}
            {KEYS.map((k, i) => {
              const [a, b] = [k.cx - RIPPLE_FROM.cx, k.cy - RIPPLE_FROM.cy];
              return (
                <path
                  key={i}
                  ref={(el) => {
                    keyEls.current[i] = el;
                  }}
                  className="key"
                  d={k.d}
                  style={{ "--d": `${(Math.hypot(a, b) * 0.022).toFixed(3)}s` } as CSSProperties}
                />
              );
            })}

            {/* mouse */}
            <g className="mouse">
              <path className="m-body" d={MOUSE.silhouette} />
              <path className="m-shelf" d={MOUSE.shelf} />
              {MOUSE.ribs.map((d, i) => (
                <path key={i} className="m-rib" d={d} />
              ))}
              {MOUSE.grip.map((d, i) => (
                <path key={i} className="m-grip" d={d} />
              ))}
              <path className="m-line" d={MOUSE.buttonsEdge} />
              <path className="m-line" d={MOUSE.seam} />
              {MOUSE.sideButtons.map((d, i) => (
                <path key={i} className="m-side" d={d} />
              ))}
              <path className="m-wheel" d={MOUSE.wheel} />
            </g>

            {/* mic: yoke, body, windscreen */}
            <g className="mic">
              <path
                className="yoke"
                d={path([add(MIC_C, MIC_SIDE, MIC_R + 1), add(add(MIC_C, MIC_SIDE, MIC_R + 1), [0, 0, MIC_R + 4.5]), add(add(MIC_C, MIC_SIDE, -MIC_R - 1), [0, 0, MIC_R + 4.5]), add(MIC_C, MIC_SIDE, -MIC_R - 1)], false)}
              />
              <path className="capsule" d={MIC_BODY.body} />
              <path className="capsule screen-foam" d={MIC_SCREEN.body} />
              {MIC_SCREEN.rings([0.25, 0.5, 0.75]).map((e, i) => (
                <ellipse key={i} className="foam" cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} transform={`rotate(${e.rot} ${e.cx} ${e.cy})`} />
              ))}
              <ellipse className="foam-cap" cx={MIC_SCREEN.cap.cx} cy={MIC_SCREEN.cap.cy} rx={MIC_SCREEN.cap.rx} ry={MIC_SCREEN.cap.ry} transform={`rotate(${MIC_SCREEN.cap.rot} ${MIC_SCREEN.cap.cx} ${MIC_SCREEN.cap.cy})`} />
              {[1, -1].map((sd) => {
                const k = P(...add(MIC_C, MIC_SIDE, sd * (MIC_R + 1)));
                return <circle key={sd} className="knob" cx={f(k[0])} cy={f(k[1])} r="1.1" />;
              })}
            </g>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                ref={(el) => {
                  bars.current[i] = el;
                }}
                className="meter"
                x={f(MIC_P[0] + 7 + i * 2.1)}
                y={f(MIC_P[1] - 2 - [2, 4, 6, 4.5, 3, 2][i])}
                width="1.2"
                height={[2, 4, 6, 4.5, 3, 2][i]}
                rx=".5"
              />
            ))}
          </g>

          {/* chair */}
          <g className="chair">
            {CHAIR.spokes.map((s, i) => (
              <g key={i}>
                <path className="tube" d={s.d} />
                <path className="tube-in" d={s.d} />
                <circle className="caster" cx={f(s.caster[0])} cy={f(s.caster[1])} r="1.9" />
              </g>
            ))}
            <path className="tube" d={CHAIR.cylinder} />
            <path className="tube-in" d={CHAIR.cylinder} />
            <Box b={CHAIR.mech} />
            <path className="seat" d={CHAIR.seatOutline} />
            {CHAIR.seatMesh.map((d, i) => (
              <path key={i} className="mesh" d={d} />
            ))}
            {[CHAIR.arms[0]].map((a, i) => (
              <g key={i}>
                <path className="tube" d={a.post} />
                <path className="tube-in" d={a.post} />
                <Box b={a.pad} />
              </g>
            ))}
            {CHAIR.spine.map((d, i) => (
              <path key={i} className="frame" d={d} />
            ))}
            <path className="back" d={CHAIR.back} />
            {CHAIR.backMesh.map((d, i) => (
              <path key={i} className="mesh" d={d} />
            ))}
            <g>
              <path className="tube" d={CHAIR.arms[1].post} />
              <path className="tube-in" d={CHAIR.arms[1].post} />
              <Box b={CHAIR.arms[1].pad} />
            </g>
          </g>

          {/* leader lines */}
          <g className="leaders">
            {CALLOUTS.map((co) => {
              const lx = co.side < 0 ? LEFT_X : RIGHT_X;
              const kx = lx - co.side * 10;
              return (
                <g key={co.id}>
                  <path d={`M${f(co.a[0])} ${f(co.a[1])} L${f(kx)} ${co.y} L${lx} ${co.y}`} />
                  <circle cx={f(co.a[0])} cy={f(co.a[1])} r="1" />
                </g>
              );
            })}
          </g>
        </svg>

        <ul className="callouts">
          {CALLOUTS.map((co) => (
            <li
              key={co.id}
              className={co.side < 0 ? "co left" : "co right"}
              style={{
                left: pct(co.side < 0 ? LEFT_X : RIGHT_X, VB.x, VB.w),
                top: pct(co.y, VB.y, VB.h),
              }}
            >
              {co.id === "keyboard" ? <a href={LINKS.totem}>{labels[co.id]}</a> : labels[co.id]}
            </li>
          ))}
        </ul>
      </div>
      <p className="desk-note">{c.note}</p>
    </div>
  );
}
