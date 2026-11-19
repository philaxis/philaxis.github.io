import type { Lang } from "../copy";
import { CaptureFoot, CaptureTop, JsonLd } from "./chrome";
import { CAPTURE_COPY } from "./copy";
import CaptureDemo from "./demo";
import { CAPTURE } from "./facts";
import { captureJsonLd } from "./meta";

function Head({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div className="head">
      <h2 className="verb" id={id}>
        {title}
      </h2>
      <p className="sub">{sub}</p>
    </div>
  );
}

/** /capture/ and /capture/en/: the product page. */
export default function ProductPage({ lang }: { lang: Lang }) {
  const c = CAPTURE_COPY[lang];
  const p = c.page;

  return (
    <div lang={lang === "ko" ? undefined : lang}>
      <JsonLd data={captureJsonLd(lang)} />
      <CaptureTop lang={lang} page="product" />

      <main>
        <section className="wrap cap-hero">
          <article className="mulbit cap-product">
            <img className="cap-icon" src={CAPTURE.icon} width={72} height={72} alt="" />
            <h1 className="mulbit-name cap-name">
              {CAPTURE.name[lang]}
              <span className="alt">{p.alt}</span>
            </h1>
            <p className="pitch">{c.home.pitch}</p>
            <div className="cap-get">
              <a className="cap-badge" href={CAPTURE.play(lang)}>
                <img src={CAPTURE.badge[lang]} width={646} height={250} alt={p.badge} />
              </a>
              <p className="meta">{p.meta}</p>
            </div>
            <CaptureDemo d={c.demo} />
            <p className="cap-define">{p.define}</p>
          </article>
        </section>

        <section className="wrap sec" aria-labelledby="h-steps">
          <Head id="h-steps" {...p.steps} />
          <ol className="cap-howto">
            {p.steps.items.map((s, i) => (
              <li key={s.name}>
                <span className="cap-num">{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap sec" aria-labelledby="h-features">
          <Head id="h-features" {...p.features} />
          <ul className="cap-list">
            {p.features.items.map((f) => (
              <li key={f.name}>
                <h3>{f.name}</h3>
                <p>{f.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap sec" aria-labelledby="h-plans">
          <Head id="h-plans" {...p.plans} />
          <div className="cap-plans-wrap">
            <table className="cap-plans">
              <thead>
                <tr>
                  {p.plans.head.map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                      {p.plans.kind[i] && <span>{p.plans.kind[i]}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.plans.rows.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    {r.cells.map((cell, i) => (
                      <td key={i} data-label={p.plans.head[i + 1]}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cap-note-line">{p.plans.note}</p>
        </section>

        <section className="wrap sec" aria-labelledby="h-faq">
          <Head id="h-faq" {...p.faq} />
          <dl className="cap-faq">
            {p.faq.items.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <CaptureFoot lang={lang} />
    </div>
  );
}
