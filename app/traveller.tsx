"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "./motion";

const LINE = 0.4; // where on the viewport the caret rides
const DOT = 10;

/**
 * The thread down the left gutter and the caret that rides it. When a verb heading
 * reaches the 40% line, the caret leaves the thread, types the verb, and blinks at its
 * end until the verb scrolls on. Scroll-linked, rAF only while something moves.
 */
export default function Traveller() {
  const threadRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = threadRef.current!;
    const fill = fillRef.current!;
    const dot = dotRef.current!;
    const box = thread.parentElement!;
    const verbs = [...box.querySelectorAll<HTMLElement>(".verb")];
    const motion = canAnimate();
    const wide = matchMedia("(min-width: 900px)");

    let raf = 0;
    let last = 0;
    let x = NaN;
    let y = NaN;

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;

      const b = box.getBoundingClientRect();
      const line = innerHeight * LINE;
      const trackY = Math.min(Math.max(line - b.top, 0), b.height);
      fill.style.transform = `scaleY(${b.height ? trackY / b.height : 0})`;

      if (!motion || !wide.matches) {
        dot.style.opacity = "0";
        return;
      }

      let tx = thread.offsetLeft + 0.5;
      let ty = trackY;
      let typing = false;
      let parked = false;
      let waiting = false;

      for (const v of verbs) {
        const r = v.getBoundingClientRect();
        const c = r.top + r.height / 2;
        if (c < line * 0.45 || c > line + 60) continue;
        if (v.dataset.in === undefined) {
          waiting = true; // the observer is about to fire
          break;
        }
        const chars = v.querySelectorAll<HTMLElement>(".t");
        const step = parseFloat(getComputedStyle(v.querySelector(".typed")!).getPropertyValue("--step")) || 70;
        let k = Math.floor((now - Number(v.dataset.t0)) / step);
        typing = k < chars.length;
        k = Math.min(Math.max(k, 0), chars.length - 1);
        if (chars[k].classList.contains("sp")) k -= 1;
        const cr = chars[k].getBoundingClientRect();
        const size = parseFloat(getComputedStyle(v).fontSize);
        tx = cr.right - b.left + size * 0.06 + DOT / 2;
        ty = cr.bottom - b.top - size * 0.27;
        parked = !typing;
        break;
      }

      if (Number.isNaN(x)) {
        x = tx;
        y = ty;
      }
      const a = 1 - Math.exp(-dt / 70);
      x += (tx - x) * a;
      y += (ty - y) * a;
      dot.style.transform = `translate3d(${x - DOT / 2}px, ${y - DOT / 2}px, 0)`;
      dot.style.opacity = b.bottom > 0 && b.top < innerHeight ? "1" : "0";
      dot.classList.toggle("parked", parked && Math.abs(tx - x) + Math.abs(ty - y) < 1);

      if (typing || waiting || Math.abs(tx - x) + Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    wide.addEventListener("change", kick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      wide.removeEventListener("change", kick);
    };
  }, []);

  return (
    <>
      <div className="thread" ref={threadRef} aria-hidden="true">
        <div className="thread-fill" ref={fillRef} />
      </div>
      <div className="traveller" ref={dotRef} aria-hidden="true" />
    </>
  );
}
