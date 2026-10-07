import type { CSSProperties } from "react";

// The full text is always in the HTML; CSS only hides characters once
// <html class="motion"> says JS will reveal them.

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Text typed character by character, with the caret dot riding the last typed char. */
export function Typed({ text, step, stay = false }: { text: string; step: number; stay?: boolean }) {
  let i = 0;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className={stay ? "typed stay" : "typed"} aria-hidden="true" style={{ "--step": `${step}ms` } as Vars}>
        {words.map((w, wi) => (
          <span key={wi}>
            {wi > 0 && (
              <span className="t sp" style={{ "--i": i++ } as Vars}>
                {" "}
              </span>
            )}
            <span className="word">
              {[...w].map((c, ci) => {
                const n = i++;
                const end = wi === words.length - 1 && ci === w.length - 1;
                return (
                  <span key={ci} className={end ? "t end" : "t"} style={{ "--i": n } as Vars}>
                    {c}
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
