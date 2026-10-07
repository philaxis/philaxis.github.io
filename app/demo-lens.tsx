"use client";

import { type ReactNode, useRef, useState } from "react";
import { useLoop } from "./motion";

const STEP = 1400;
const STILL = 3; // the frame shown without motion: the math line

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
  const parts = line.split(/\*\*(.+?)\*\*/);
  return <span>{parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}</span>;
}

/** Markdown Lens, looping: the caret walks down raw Markdown and a lens renders the current line beside it. */
export default function LensDemo({ raw }: { raw: string[] }) {
  const [at, setAt] = useState(STILL);
  const root = useRef<HTMLDivElement>(null);

  useLoop(root, STEP * raw.length, (t) => {
    const i = Math.floor(t / STEP);
    setAt((p) => (p === i ? p : i));
  });

  return (
    <div className="demo lens-demo" ref={root} aria-hidden="true" style={{ ["--at" as string]: at }}>
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
        <div className="lens">{render(raw[at])}</div>
      </div>
    </div>
  );
}
