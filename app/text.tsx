import type { CSSProperties } from "react";

// The full text is always in the HTML; CSS only hides characters once
// <html class="motion"> says JS will reveal them.

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Text typed character by character. */
export function Typed({ text, step }: { text: string; step: number }) {
  let i = 0;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="typed" aria-hidden="true" style={{ "--step": `${step}ms` } as Vars}>
        {words.map((w, wi) => (
          <span key={wi}>
            {wi > 0 && (
              <span className="t sp" style={{ "--i": i++ } as Vars}>
                {" "}
              </span>
            )}
            <span className="word">
              {[...w].map((c, ci) => (
                <span key={ci} className="t" style={{ "--i": i++ } as Vars}>
                  {c}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
