import type { Lang } from "../copy";
import { CaptureFoot, CaptureTop } from "./chrome";
import { CAPTURE } from "./facts";
import { type Block, PRIVACY_COPY } from "./privacy-copy";

const URL_RE = /(https?:\/\/[^\s)]+)/g;

/** Plain text with any URL in it turned into a link. */
function Linked({ text }: { text: string }) {
  return text.split(URL_RE).map((part, i) =>
    i % 2 ? (
      <a key={i} href={part}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/** /capture/privacy/ and /capture/en/privacy/. */
export default function PrivacyPage({ lang }: { lang: Lang }) {
  const t = PRIVACY_COPY[lang];

  const block = (b: Block, i: number) => {
    if (typeof b === "string")
      return (
        <p key={i}>
          <Linked text={b} />
        </p>
      );
    if ("list" in b)
      return (
        <ul key={i} className="cap-bullets">
          {b.list.map((l) => (
            <li key={l}>
              <Linked text={l} />
            </li>
          ))}
        </ul>
      );
    return (
      <div key={i} className="cap-flows-wrap">
        <table className="cap-flows">
          <thead>
            <tr>
              <th scope="col">{t.head.what}</th>
              <th scope="col">{t.head.when}</th>
              <th scope="col">{t.head.to}</th>
              <th scope="col">{t.head.why}</th>
            </tr>
          </thead>
          <tbody>
            {b.flows.map((f) => (
              <tr key={f.what}>
                <td data-label={t.head.what}>{f.what}</td>
                <td data-label={t.head.when}>{f.when}</td>
                <td data-label={t.head.to}>{f.to}</td>
                <td data-label={t.head.why}>{f.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div lang={lang === "ko" ? undefined : lang}>
      <CaptureTop lang={lang} page="privacy" />
      <main className="wrap cap-policy">
        <header className="cap-policy-head">
          <img className="cap-icon" src={CAPTURE.icon} width={48} height={48} alt="" />
          <h1>{t.title}</h1>
          <p className="meta">{t.effective}</p>
        </header>
        <ul className="cap-summary">
          {t.summary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <nav className="cap-toc" aria-label={t.title}>
          {t.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </nav>
        {t.sections.map((s) => (
          <section key={s.id} id={s.id} className="cap-policy-sec" aria-labelledby={`h-${s.id}`}>
            <h2 id={`h-${s.id}`}>{s.title}</h2>
            {s.body.map(block)}
          </section>
        ))}
      </main>
      <CaptureFoot lang={lang} />
    </div>
  );
}
