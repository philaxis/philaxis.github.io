"use client";

import { type ReactNode, useRef, useState } from "react";
import { useLoop } from "./motion";

const STEP = 1400;
const STILL = 4; // the frame shown without motion: the math line
const CONTEXT = 2; // rendered lines kept above and below the cursor line

/** Tiny renderer for exactly the kinds of lines the demo shows. */
function render(line: string): ReactNode {
  if (line.startsWith("## ")) return <strong className="r-h">{line.slice(3)}</strong>;
  const task = line.match(/^- \[( |x)\] (.*)$/);
  if (task)
    return (
      <span className={task[1] === "x" ? "r-task done" : "r-task"}>
        <span className="box">{task[1] === "x" ? "✓" : ""}</span>
        {task[2]}
      </span>
    );
  const math = line.match(/^\$(.+)\^(\d)\$$/);
  if (math)
    return (
      <span className="r-math">
        {math[1].replace("=", " = ")}
        <sup>{math[2]}</sup>
      </span>
    );
  if (line.startsWith("> ")) return <span className="r-quote">{line.slice(2)}</span>;
  const parts = line.split(/\*\*(.+?)\*\*/);
  return <span>{parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}</span>;
}

/**
 * Markdown Lens, looping: the caret walks down raw Markdown and a lens beside it renders the
 * cursor line together with its neighbours, scrolling with the caret like the real plugin.
 */
export default function LensDemo({ raw }: { raw: string[] }) {
  const [at, setAt] = useState(STILL);
  const root = useRef<HTMLDivElement>(null);

  useLoop(root, STEP * raw.length, (t) => {
    const i = Math.floor(t / STEP);
    setAt((p) => (p === i ? p : i));
  });

  // the lens window stays inside the note at the first and last lines
  const top = Math.min(Math.max(at - CONTEXT, 0), raw.length - (CONTEXT * 2 + 1));

  return (
    <div
      className="demo lens-demo"
      ref={root}
      aria-hidden="true"
      style={{ ["--at" as string]: at, ["--top" as string]: top, ["--win" as string]: CONTEXT * 2 + 1 }}
    >
      <div className="lens-body">
        <ol className="raw">
          {raw.map((l, i) => (
            <li key={i} className={i === at ? "cur" : undefined}>
              <span className="ln">{i + 1}</span>
              <span>{l}</span>
              {i === at && <span className="caret" />}
            </li>
          ))}
        </ol>
        <div className="lens">
          <ol className="lens-track">
            {raw.map((l, i) => (
              <li key={i} className={i === at ? "cur" : undefined}>
                {render(l)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
