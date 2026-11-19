"use client";

import { type CSSProperties, useRef, useState } from "react";
import { useLoop } from "../motion";
import type { CaptureCopy } from "./copy";

// One take, in ms: the floating button is tapped, the pen drags a box over the sentence and
// the formula, the box flashes, and the selection lands in the notes the chosen way.
const LOOP = 7800;
const PRESS = [500, 900];
const SELECT = [900, 2300];
const SNAP = 2600;
const PASTE = [2700, 5000];
const CLEAR = 7000;

const MODES = ["image", "text", "translate"] as const;
type Mode = (typeof MODES)[number];
type Phase = "idle" | "press" | "select" | "snap" | "paste" | "clear";

const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

/**
 * CAPTURE philgood, looping: tap, drag, paste. The three buttons pick how the selection lands
 * (picture, text, translated text); picking one stops the rotation. Without JS the last frame
 * of a text take stays: the box drawn, the text pasted.
 */
export default function CaptureDemo({ d }: { d: CaptureCopy["demo"] }) {
  const [phase, setPhase] = useState<Phase>("paste");
  const [mode, setMode] = useState<Mode>("text");
  const [n, setN] = useState(Infinity);
  const root = useRef<HTMLDivElement>(null);
  const auto = useRef({ last: 0, pinned: false });

  useLoop(root, LOOP, (t) => {
    const a = auto.current;
    if (t < a.last && !a.pinned) setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
    a.last = t;

    const next: Phase =
      t >= CLEAR
        ? "clear"
        : t >= PASTE[0]
          ? "paste"
          : t >= SELECT[1]
            ? "snap"
            : t >= SELECT[0]
              ? "select"
              : t >= PRESS[0]
                ? "press"
                : "idle";
    setPhase((p) => (p === next ? p : next));
    root.current?.style.setProperty("--p", String(ease((t - SELECT[0]) / (SELECT[1] - SELECT[0]))));
    const chars = t < PASTE[0] ? 0 : Math.floor(((t - PASTE[0]) / (PASTE[1] - PASTE[0])) * 80);
    setN((p) => (p === chars ? p : chars));
  });

  const pick = (m: Mode) => {
    auto.current.pinned = true;
    setMode(m);
  };

  const lines = mode === "translate" ? d.out.translate : d.out.text;
  // stream the first line, then show the LaTeX line whole
  const first = lines[0];
  const shown = Math.min(n, first.length);
  const step = phase === "paste" || phase === "clear" ? 2 : phase === "idle" ? -1 : phase === "press" ? 0 : 1;

  return (
    <div
      className="demo cap-demo"
      ref={root}
      role="group"
      aria-label={d.label}
      data-phase={phase}
      data-mode={mode}
      style={{ "--p": 1 } as CSSProperties}
    >
      <div className="cap-stage" aria-hidden="true">
        <div className="cap-phone">
          <div className="cap-screen">
            <span className="cap-status">9:41</span>
            <span className="cap-app">{d.app}</span>
            <p className="cap-title">{d.slide.title}</p>
            <span className="cap-bar" style={{ top: "27%", width: "70%" }} />
            <span className="cap-bar" style={{ top: "31%", width: "52%" }} />
            <div className="cap-target">
              <p className="cap-line">{d.slide.line}</p>
              <p className="cap-math">{d.slide.math}</p>
            </div>
            <span className="cap-bar" style={{ top: "70%", width: "76%" }} />
            <span className="cap-bar" style={{ top: "74%", width: "60%" }} />
            <span className="cap-bar" style={{ top: "78%", width: "68%" }} />
            <div className="cap-sel" />
            <svg className="cap-pen" viewBox="0 0 24 96" focusable="false">
              <path className="cap-pen-body" d="M8 30 L8 92 Q12 96 16 92 L16 30 Z" />
              <path className="cap-pen-tip" d="M8 30 L12 2 L16 30 Z" />
              <rect className="cap-pen-btn" x="16" y="44" width="2.5" height="9" rx="1" />
            </svg>
            <span className="cap-fab">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" />
              </svg>
            </span>
          </div>
        </div>

        <div className="cap-note">
          <span className="cap-dest">{d.dest}</span>
          <div className="cap-field">
            {mode === "image" ? (
              <>
                <span className="cap-shot">
                  <span className="cap-line">{d.slide.line}</span>
                  <span className="cap-math">{d.slide.math}</span>
                </span>
                <span className="cap-caret" />
              </>
            ) : (
              // the caret sits right after the last character, never on a line of its own
              <span className="cap-text">
                {first.slice(0, shown)}
                {shown >= first.length ? (
                  <span className="cap-tex">
                    {lines[1]}
                    <span className="cap-caret" />
                  </span>
                ) : (
                  <span className="cap-caret" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="cap-foot">
        <ol className="cap-steps" aria-hidden="true">
          {d.steps.map((s, i) => (
            <li key={s} data-on={i === step || undefined}>
              {s}
              {i === 2 && " ✓"}
            </li>
          ))}
        </ol>
        <div className="cap-modes">
          {MODES.map((m, i) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => pick(m)}>
              {d.modes[i]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
