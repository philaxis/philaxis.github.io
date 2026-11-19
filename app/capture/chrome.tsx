import type { Lang } from "../copy";
import { COPY } from "../copy";
import { LangLinks } from "./client";
import { CAPTURE_COPY } from "./copy";
import { CAPTURE, CAPTURE_PATHS, type CapturePage } from "./facts";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The top line of a capture page: back home, privacy, contact, KO/EN. */
export function CaptureTop({ lang, page }: { lang: Lang; page: CapturePage }) {
  const p = CAPTURE_COPY[lang].page;
  return (
    <header className="wrap top">
      <a href="/" className="cap-home">
        ← {p.home}
      </a>
      <nav aria-label="links">
        {page === "product" ? (
          <a href={CAPTURE_PATHS.privacy[lang]}>{p.privacy}</a>
        ) : (
          <a href={CAPTURE_PATHS.product[lang]}>{CAPTURE.name[lang]}</a>
        )}
        <a href={`mailto:${CAPTURE.mail}`}>{p.contact}</a>
        <LangLinks lang={lang} page={page} label={COPY[lang].langLabel} />
      </nav>
    </header>
  );
}

export function CaptureFoot({ lang }: { lang: Lang }) {
  const f = CAPTURE_COPY[lang].page.foot;
  return (
    <footer className="wrap foot-site cap-foot-site">
      <ul className="fine">
        <li>
          <a href={CAPTURE_PATHS.privacy[lang]}>{f.privacy}</a>
        </li>
        <li>
          <a href={`mailto:${CAPTURE.mail}`}>{CAPTURE.mail}</a>
        </li>
        <li>
          <a href="/">{f.others} →</a>
        </li>
        <li>{f.copyright}</li>
      </ul>
    </footer>
  );
}
