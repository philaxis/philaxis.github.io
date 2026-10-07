"use client";

import { useRef, useState } from "react";
import type { Copy } from "./copy";
import { useLoop } from "./motion";
import { WAVE_H, WAVE_W, wavePath } from "./wave";

// One take, in ms. Like the real app it toggles: long-press G to start, talk with the key
// up, long-press G again to stop, then it pastes.
const LOOP = 7800;
const HOLD_ON = [400, 1000];
const TALK = [1200, 4300];
const HOLD_OFF = [4600, 5200];
const CLEAR = 7200;

type Frame = { n: number; pressed: boolean; rec: boolean; pasted: boolean; clearing: boolean; interim: boolean };

/** Live loop of mulbit: long-press to start, words stream into a field, long-press to stop, pasted. */
export default function MulbitDemo({ d }: { d: Copy["mulbit"]["demo"] }) {
  const words = d.text.split(" ");
  const end: Frame = { n: words.length, pressed: false, rec: false, pasted: true, clearing: false, interim: false };
  const [f, setF] = useState<Frame>(end);
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const gain = useRef(0.25);

  useLoop(root, LOOP, (t) => {
    const pressed = (t >= HOLD_ON[0] && t < HOLD_ON[1]) || (t >= HOLD_OFF[0] && t < HOLD_OFF[1]);
    const rec = t >= HOLD_ON[1] && t < HOLD_OFF[1];
    const talking = t >= TALK[0] && t < TALK[1];
    const per = (TALK[1] - TALK[0]) / words.length;
    const n = t < TALK[0] ? 0 : Math.min(words.length, Math.floor((t - TALK[0]) / per) + 1);
    const next: Frame = {
      n,
      pressed,
      rec,
      pasted: t >= HOLD_OFF[1] && t < CLEAR,
      clearing: t >= CLEAR,
      interim: rec && n < words.length,
    };
    setF((p) =>
      p.n === next.n &&
      p.pressed === next.pressed &&
      p.rec === next.rec &&
      p.pasted === next.pasted &&
      p.clearing === next.clearing &&
      p.interim === next.interim
        ? p
        : next,
    );

    gain.current += ((talking ? 1 : rec ? 0.35 : 0.18) - gain.current) * 0.08;
    const s = t / 1000;
    path.current?.setAttribute(
      "d",
      wavePath((i) => gain.current * (0.6 + 0.28 * Math.sin(s * 11 + i * 2.3)) + 0.05 * Math.sin(s * 2 + i)),
    );
  });

  const typed = words.slice(0, f.n);
  const last = f.interim ? typed.pop() : undefined;

  return (
    <div
      className="demo mulbit-demo"
      ref={root}
      aria-hidden="true"
      data-pressed={f.pressed || undefined}
      data-rec={f.rec || undefined}
      data-pasted={f.pasted || undefined}
      data-clearing={f.clearing || undefined}
    >
      <div className="mic">
        <div className="keycap">
          <span>G</span>
        </div>
        <span className="key-hint">{f.pressed ? d.hold : d.listening}</span>
        <svg className="demo-wave" viewBox={`0 0 ${WAVE_W} ${WAVE_H}`} preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="demo-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--water)" stopOpacity="0" />
              <stop offset=".15" stopColor="var(--water)" />
              <stop offset=".85" stopColor="var(--water)" />
              <stop offset="1" stopColor="var(--water)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path ref={path} d={wavePath(() => 0.3)} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="slot">
        <div className="channel">{d.channel}</div>
        <div className="field">
          <span className="field-text">
            {typed.join(" ")}
            {last && (
              <>
                {typed.length > 0 && " "}
                <span className="interim">{last}</span>
              </>
            )}
          </span>
          <span className="caret" />
        </div>
        <div className="pasted">{d.pasted} ✓</div>
      </div>
    </div>
  );
}
