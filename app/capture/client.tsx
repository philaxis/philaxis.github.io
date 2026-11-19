"use client";

import { useEffect } from "react";
import { type Lang, LANG_KEY } from "../copy";
import { useReveal } from "../motion";
import { CAPTURE_PATHS, type CapturePage } from "./facts";

/**
 * KO/EN on the capture pages: links to the other language's address, styled like the home
 * toggle. The choice goes to the same localStorage key the home page reads, so home follows.
 * Also marks the page as live for the boot script (motion) and sets <html lang>.
 */
export function LangLinks({ lang, page, label }: { lang: Lang; page: CapturePage; label: string }) {
  useReveal();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <span className="lang" role="group" aria-label={label}>
      {(["ko", "en"] as const).map((l) => (
        <a
          key={l}
          href={CAPTURE_PATHS[page][l]}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "page" : undefined}
          onClick={() => {
            try {
              localStorage.setItem(LANG_KEY, l);
            } catch {}
          }}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </span>
  );
}
