"use client";

import { type RefObject, useEffect, useRef } from "react";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/** True when the boot script decided this visit animates (motion allowed, JS alive in time). */
export const canAnimate = () => document.documentElement.classList.contains("motion");

/**
 * Runs tick(t) every frame, t looping over `period` ms, only while `ref` is on screen.
 * Never runs under reduced motion, so the server-rendered end frame stays.
 */
export function useLoop(ref: RefObject<Element | null>, period: number, tick: (t: number) => void) {
  const tickRef = useRef(tick);
  useEffect(() => {
    tickRef.current = tick;
  });
  useEffect(() => {
    if (!canAnimate()) return;
    let raf = 0;
    let on = false;
    let start = 0;
    const frame = (now: number) => {
      tickRef.current((now - start) % period);
      raf = on ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) {
        start = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, period]);
}

/**
 * Marks every [data-reveal] element with data-in (and its start time) the first time
 * it is reached, then stops watching it. CSS does the rest.
 * data-reveal="line": when the element crosses 40% of the viewport. Otherwise: when it enters.
 */
export function useReveal() {
  useEffect(() => {
    window.__motionReady = true;
    if (!canAnimate()) return;

    const make = (rootMargin: string) =>
      new IntersectionObserver(
        (entries, io) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            el.dataset.t0 = String(performance.now());
            el.dataset.in = "";
            io.unobserve(el);
          }
        },
        { rootMargin },
      );
    const line = make("0px 0px -60% 0px");
    const view = make("0px 0px -12% 0px");
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => (el.dataset.reveal === "line" ? line : view).observe(el));
    return () => {
      line.disconnect();
      view.disconnect();
    };
  }, []);
}
