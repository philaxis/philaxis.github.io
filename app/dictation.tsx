"use client";

import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { canAnimate } from "./motion";
import { AMPS, SEG, WAVE_H, WAVE_W, wavePath } from "./wave";

const START = 280;
const STEP = 200;
const REST = 0.62;
const REST_PATH = wavePath(() => REST);

/**
 * Drives the waveform like a live mic: idle breathing, louder near the pointer
 * (gaussian falloff along x and y), and a talking boost while the headline is dictated.
 */
function useMicWave(
  svgRef: RefObject<SVGSVGElement | null>,
  pathRef: RefObject<SVGPathElement | null>,
  talkingRef: RefObject<boolean>,
) {
  useEffect(() => {
    if (!canAnimate()) return;
    const svg = svgRef.current!;
    const path = pathRef.current!;
    const near = new Float32Array(AMPS.length);
    let px = -1e5;
    let py = -1e5;
    let talk = 0;
    let raf = 0;
    let on = false;

    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const leave = () => {
      px = py = -1e5;
    };
    const frame = (now: number) => {
      const t = now / 1000;
      const r = svg.getBoundingClientRect();
      const sx = r.width / WAVE_W;
      const dy = py - (r.top + r.height / 2);
      const gy = Math.exp(-(dy * dy) / (2 * 120 * 120));
      talk += ((talkingRef.current ? 1 : 0) - talk) * 0.06;
      path.setAttribute(
        "d",
        wavePath((i) => {
          const dx = px - (r.left + (i + 0.5) * SEG * sx);
          near[i] += (Math.exp(-(dx * dx) / (2 * 70 * 70)) * gy - near[i]) * 0.09;
          // idle never goes flat: a swell travels along the line, and every few seconds
          // a short murmur comes through, like someone thinking out loud near the mic
          const breath = REST + 0.16 * Math.sin(t * 1.4 - i * 0.32) + 0.06 * Math.sin(t * 2.9 + i * 1.7);
          const murmur = 0.55 * Math.max(0, Math.sin(t * 0.8)) ** 4;
          const speak = Math.max(talk, murmur) * (0.32 + 0.28 * Math.sin(t * 13 + i * 2.1));
          return Math.min(breath + speak + near[i] * 0.85, 1.8);
        }),
      );
      raf = on ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(svg);
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [svgRef, pathRef, talkingRef]);
}

type Mode = "static" | "run" | "done";

/** The hero headline, dictated phrase by phrase with the glowing caret, over a live waveform. */
export default function Dictation({
  lines,
  replay,
  mobileBreak,
}: {
  lines: string[][];
  replay: boolean;
  /** index of the phrase that starts the second line on phones */
  mobileBreak?: number;
}) {
  const phrases = lines.flat();
  const text = lines.map((l) => l.join(" ")).join(" ");
  const [mode, setMode] = useState<Mode>("static");
  const [shown, setShown] = useState(phrases.length);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const talkingRef = useRef(false);

  useEffect(() => {
    talkingRef.current = mode === "run";
  }, [mode]);
  useMicWave(svgRef, pathRef, talkingRef);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!canAnimate() || !(root.classList.contains("dictating") || replay)) return;
    setMode("run");
    setShown(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let live = true;
    // start once the fonts are in, so the first letters aren't typed in the fallback face
    void (window.__fontsReady ?? Promise.resolve()).then(() => {
      if (!live) return;
      phrases.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), START + i * STEP)));
      timers.push(
        setTimeout(() => {
          setMode("done");
          root.classList.remove("dictating");
        }, START + phrases.length * STEP + 120),
      );
    });
    return () => {
      live = false;
      timers.forEach(clearTimeout);
    };
    // runs once per mount; the parent remounts this per language
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let index = 0;
  const caret = <span className="caret" key="caret" />;

  return (
    <div className="dictation" data-mode={mode}>
      <h1 className="headline">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {mode === "run" && shown === 0 && caret}
          {lines.map((line, li) => (
            <span className="line" key={li}>
              {line.map((phrase, pi) => {
                const i = index++;
                return (
                  <span key={pi} className={i === mobileBreak ? "m-br" : undefined}>
                    {(pi > 0 || li > 0) && " "}
                    <span className={i < shown ? "phrase on" : "phrase"}>
                      {[...phrase].map((ch, ci) => (
                        <span className="ch" key={ci} style={{ transitionDelay: `${ci * 30}ms` }}>
                          {ch}
                        </span>
                      ))}
                    </span>
                    {i === shown - 1 && caret}
                  </span>
                );
              })}
            </span>
          ))}
        </span>
      </h1>
      <svg
        className="wave"
        ref={svgRef}
        viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="wave-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--water)" stopOpacity="0" />
            <stop offset=".18" stopColor="var(--water)" stopOpacity=".9" />
            <stop offset=".72" stopColor="var(--water)" stopOpacity=".9" />
            <stop offset="1" stopColor="var(--water)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={REST_PATH}
          pathLength={1}
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
