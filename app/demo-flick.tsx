"use client";

import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { Copy } from "./copy";
import { useLoop } from "./motion";

// A ragged grid: each row is a workspace, its cells are that workspace's desktops.
const ROWS = [4, 2, 3];
const WIDEST = Math.max(...ROWS);
// The column every row's landing cell is slid to. The map is 2 * WIDEST - 1 cells wide,
// so any cell of the widest row can sit there without the row leaving the map.
const ANCHOR = WIDEST - 1;

// Tiny window layouts drawn inside a cell: [left, top, width, height] in %.
const WINDOWS: [number, number, number, number][][] = [
  [[12, 16, 46, 68], [64, 16, 24, 30]],
  [[12, 16, 76, 68]],
  [[12, 16, 34, 68], [52, 16, 36, 68]],
  [[12, 16, 50, 40], [38, 44, 50, 40]],
];

type Dir = 0 | 1 | 2 | 3; // left, up, down, right
const ARROWS = ["←", "↑", "↓", "→"];
const KEYS: Record<string, Dir> = { ArrowLeft: 0, ArrowUp: 1, ArrowDown: 2, ArrowRight: 3 };

type Grid = { row: number; cur: number[] };
const START: Grid = { row: 0, cur: [1, 0, 2] };
// One tour that ends where it starts, so the loop has no seam.
const TOUR: Dir[] = [3, 3, 2, 3, 2, 0, 0, 1, 0, 1, 0, 0, 2, 2, 3, 3, 1, 1];

const STEP = 1300; // one hold-and-flick, in ms
const FLICK = 280; // when within the step the move lands
const RELEASE = 620; // when the button comes back up
const IDLE = 5000; // after a visitor's own move, how long the tour waits

/** Left and right move within the row; up and down land on the cell that row was last left on. */
function move(g: Grid, d: Dir): Grid {
  if (d === 1 || d === 2) {
    const row = Math.min(Math.max(g.row + (d === 1 ? -1 : 1), 0), ROWS.length - 1);
    return row === g.row ? g : { ...g, row };
  }
  const at = Math.min(Math.max(g.cur[g.row] + (d === 0 ? -1 : 1), 0), ROWS[g.row] - 1);
  return at === g.cur[g.row] ? g : { ...g, cur: g.cur.map((c, i) => (i === g.row ? at : c)) };
}

/**
 * Flick, looping: hold the side button, flick, and the selection moves one cell. Every row
 * slides sideways so the cells you would land on stay in one column. The strip on top is the
 * same desktops the way Windows lays them out, in one line. Arrow keys, the arrow
 * pad and clicking a cell all drive it; the tour picks up again after a pause.
 */
export default function FlickDemo({ d }: { d: Copy["flick"]["demo"] }) {
  const [g, setG] = useState<Grid>(START);
  const [held, setHeld] = useState(false);
  const [dir, setDir] = useState<Dir | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const auto = useRef({ last: 0, fired: false, n: 0, idleUntil: 0, away: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useLoop(root, STEP, (t) => {
    const a = auto.current;
    if (t < a.last) {
      a.fired = false;
      if (a.away && performance.now() >= a.idleUntil) {
        // back from the visitor's detour: return to the start and sit this step out
        a.away = false;
        a.n = 0;
        a.fired = true;
        setG(START);
      }
    }
    a.last = t;
    if (a.away) return;
    if (!a.fired && t >= FLICK) {
      a.fired = true;
      const next = TOUR[a.n++ % TOUR.length];
      setG((p) => move(p, next));
      setDir(next);
    }
    const down = !a.fired || t < RELEASE;
    setHeld((p) => (p === down ? p : down));
    if (!down) setDir((p) => (p === null ? p : null));
  });

  /** A move made by the visitor: show it like a flick and hold the tour back for a while. */
  const act = (next: Dir | null, apply: (p: Grid) => Grid) => {
    auto.current.away = true;
    auto.current.idleUntil = performance.now() + IDLE;
    setG(apply);
    setDir(next);
    setHeld(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setHeld(false);
      setDir(null);
    }, 340);
  };

  const onKey = (e: KeyboardEvent) => {
    const k = KEYS[e.key];
    if (k === undefined || e.altKey || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    act(k, (p) => move(p, k));
  };

  return (
    <div
      className="demo flick-demo"
      ref={root}
      role="group"
      aria-label={d.label}
      tabIndex={0}
      onKeyDown={onKey}
      data-held={held || undefined}
    >
      <div className="flick-line" aria-hidden="true">
        <span className="flick-cap">{d.line}</span>
        <div className="flick-strip">
          {ROWS.flatMap((n, r) =>
            Array.from({ length: n }, (_, c) => (
              <span key={`${r}-${c}`} data-on={(r === g.row && c === g.cur[r]) || undefined} />
            )),
          )}
        </div>
        <span className="flick-cap">{d.grid}</span>
      </div>
      <div className="flick-map" style={{ "--cols": ANCHOR * 2 + 1, "--anchor": ANCHOR } as CSSProperties}>
        <div className="flick-col" aria-hidden="true" />
        {ROWS.map((n, r) => (
          <div
            className="flick-row"
            key={r}
            data-on={r === g.row || undefined}
            style={{ "--cur": g.cur[r] } as CSSProperties}
          >
            <span className="flick-label">{d.rows[r]}</span>
            <div className="flick-cells">
              {Array.from({ length: n }, (_, c) => (
                <button
                  key={c}
                  type="button"
                  className="flick-cell"
                  tabIndex={-1}
                  aria-label={`${d.rows[r]} ${c + 1}`}
                  aria-pressed={r === g.row && c === g.cur[r]}
                  data-land={c === g.cur[r] || undefined}
                  onClick={() => act(null, (p) => ({ row: r, cur: p.cur.map((v, i) => (i === r ? c : v)) }))}
                >
                  <span className="flick-desktop">
                    {WINDOWS[(r * 3 + c) % WINDOWS.length].map(([x, y, w, h], i) => (
                      <span key={i} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flick-hud">
        <div className="flick-hand" aria-hidden="true">
          <svg className="flick-mouse" viewBox="0 0 34 48" focusable="false">
            <rect className="side" x="1" y="17" width="5" height="12" rx="2.5" />
            <rect className="body" x="5" y="1" width="26" height="46" rx="13" />
            <path className="seam" d="M18 1v17M5 19h26" />
          </svg>
          <span className="flick-hint">
            {d.hold} <b>{dir === null ? d.flick : ARROWS[dir]}</b>
          </span>
        </div>
        <div className="flick-pad">
          {ARROWS.map((a, i) => (
            <button
              key={a}
              type="button"
              tabIndex={-1}
              aria-label={d.dirs[i]}
              data-lit={dir === i || undefined}
              onClick={() => act(i as Dir, (p) => move(p, i as Dir))}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
