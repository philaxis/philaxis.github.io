"use client";

import { useRef, useState } from "react";
import type { Copy } from "./copy";
import { useLoop } from "./motion";

// Scattered notes in a 360x150 field.
const NOTES: [number, number][] = [
  [35, 35], [83, 98], [127, 48], [169, 121], [220, 28], [239, 81],
  [292, 51], [325, 114], [57, 127], [156, 84], [275, 130], [99, 22],
  [334, 23], [198, 54],
];
// Matches for the query, each tied by one kind of relation.
const EDGES: { a: number; b: number; kind: "content" | "place" | "link" }[] = [
  { a: 2, b: 13, kind: "content" },
  { a: 13, b: 5, kind: "content" },
  { a: 5, b: 9, kind: "place" },
  { a: 13, b: 6, kind: "link" },
];
const LIT = [2, 13, 5, 9, 6];

const LOOP = 7200;
const TYPE = [500, 1700];
const LIGHT = 1950;
const LINK = 2500;
const CLEAR = 6300;

/** Rel Search, looping: a query types in, matching notes light up and link by content, place and links. */
export default function RelDemo({ r }: { r: Copy["rel"] }) {
  const end = { q: r.query.length, phase: 2 };
  const [f, setF] = useState(end);
  const root = useRef<HTMLDivElement>(null);

  useLoop(root, LOOP, (t) => {
    const q =
      t < TYPE[0] ? 0 : t >= CLEAR ? 0 : Math.min(r.query.length, Math.ceil(((t - TYPE[0]) / (TYPE[1] - TYPE[0])) * r.query.length));
    const phase = t >= CLEAR ? 0 : t >= LINK ? 2 : t >= LIGHT ? 1 : 0;
    setF((p) => (p.q === q && p.phase === phase ? p : { q, phase }));
  });

  return (
    <div className="demo rel-demo" ref={root} aria-hidden="true" data-phase={f.phase}>
      <div className="query">
        <span className="query-icon">⌕</span>
        <span>{r.query.slice(0, f.q)}</span>
        <span className="caret" />
      </div>
      <svg viewBox="0 0 360 150" focusable="false">
        {EDGES.map((e, i) => {
          const [x1, y1] = NOTES[e.a];
          const [x2, y2] = NOTES[e.b];
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - 12;
          return (
            <path
              key={i}
              className={`edge ${e.kind}`}
              d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
              pathLength={1}
              style={{ transitionDelay: `${i * 0.18}s` }}
            />
          );
        })}
        {NOTES.map(([x, y], i) => {
          const lit = LIT.indexOf(i);
          return (
            <circle
              key={i}
              className={lit >= 0 ? "note hit" : "note"}
              cx={x}
              cy={y}
              r={lit >= 0 ? 4 : 3}
              style={lit >= 0 ? { transitionDelay: `${lit * 0.12}s` } : undefined}
            />
          );
        })}
      </svg>
      <div className="legend">
        <span className="content">{r.legend[0]}</span>
        <span className="place">{r.legend[1]}</span>
        <span className="link">{r.legend[2]}</span>
      </div>
    </div>
  );
}
