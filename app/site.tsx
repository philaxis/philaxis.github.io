"use client";

import { useEffect, useState } from "react";
import { COPY, type Lang, LINKS } from "./copy";
import LensDemo from "./demo-lens";
import MulbitDemo from "./demo-mulbit";
import RelDemo from "./demo-rel";
import Desk from "./desk";
import Dictation from "./dictation";
import { useReveal } from "./motion";
import { Typed } from "./text";
import Traveller from "./traveller";

const STORE = "lang";

/** A section heading the travelling caret types out when it reaches the 40% line. */
function Heading({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div className="head">
      <h2 className="verb" id={id} data-reveal="line">
        <Typed text={title} step={60} />
      </h2>
      <p className="sub">{sub}</p>
    </div>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("ko");
  const [replay, setReplay] = useState(false);
  const t = COPY[lang];
  useReveal();

  useEffect(() => {
    try {
      if (localStorage.getItem(STORE) === "en") setLang("en");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = COPY[lang].title;
  }, [lang]);

  const choose = (next: Lang) => {
    if (next === lang) return;
    setReplay(true);
    setLang(next);
    try {
      localStorage.setItem(STORE, next);
    } catch {}
  };

  const s = t.sections;

  return (
    <>
      <header className="wrap top">
        <span>{t.who}</span>
        <nav aria-label="links">
          <a href={LINKS.github}>GitHub</a>
          <a href={LINKS.mail}>{t.mail}</a>
          <span className="lang" role="group" aria-label={t.langLabel}>
            {(["ko", "en"] as const).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} lang={l} onClick={() => choose(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </span>
        </nav>
      </header>

      <main>
        <section className="wrap hero">
          <Dictation key={lang} lines={t.hero} replay={replay} />
          <p className="lede">{t.lede}</p>
        </section>

        <div className="groups">
          <Traveller />

          <section className="wrap sec" aria-labelledby="h-voice">
            <Heading id="h-voice" {...s.voice} />
            <article className="mulbit">
              <h3 className="mulbit-name">
                {t.mulbit.name}
                <span className="alt">{lang === "ko" ? "mulbit" : "물빛"}</span>
              </h3>
              <p className="pitch">{t.mulbit.pitch}</p>
              <MulbitDemo d={t.mulbit.demo} />
              <ul className="facts">
                {t.mulbit.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta">
                <div className="cta-row">
                  <a className="btn" href={LINKS.mulbitExe}>
                    {t.mulbit.download}
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a className="mono-link" href={LINKS.mulbitSite}>
                    {t.mulbit.site}
                  </a>
                  <a className="mono-link" href={LINKS.mulbit}>
                    GitHub ↗
                  </a>
                </div>
                <p className="meta">Rust · Windows 10/11 · v0.1.3</p>
              </div>
            </article>
          </section>

          <section className="wrap sec" aria-labelledby="h-notes">
            <Heading id="h-notes" {...s.notes} />
            <div className="pair">
              <article className="mid">
                <h3 className="name">
                  <span className="nm">Rel Search</span>
                </h3>
                <p className="desc">{t.rel.line}</p>
                <RelDemo r={t.rel} />
                <div className="foot">
                  <span className="meta">TypeScript · Obsidian</span>
                  <span className="links">
                    <a href={LINKS.rel}>GitHub ↗</a>
                  </span>
                </div>
              </article>
              <article className="mid">
                <h3 className="name">
                  <span className="nm">Markdown Lens</span>
                </h3>
                <p className="desc">{t.lens.line}</p>
                <LensDemo raw={t.lens.raw} />
                <div className="foot">
                  <span className="meta">TypeScript · Obsidian</span>
                  <span className="links">
                    <a href={LINKS.lensGif}>{t.lens.gif}</a>
                    <a href={LINKS.lens}>GitHub ↗</a>
                  </span>
                </div>
              </article>
            </div>
          </section>

          <section className="wrap sec" aria-labelledby="h-also">
            <Heading id="h-also" {...s.also} />
            <ul className="also">
              {t.also.map((a) => (
                <li key={a.name}>
                  <span className="nm">{a.name}</span>
                  <span className="also-line">{a.line}</span>
                  <a href={a.href} aria-label={`${a.name} GitHub`}>
                    GitHub ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="wrap sec" aria-labelledby="h-bench">
            <Heading id="h-bench" {...s.bench} />
            <Desk c={t.desk} words={t.mulbit.demo.text} />
          </section>
        </div>
      </main>

      <footer className="wrap foot-site">
        <a className="mail" href={LINKS.mail} data-reveal="">
          <Typed text={LINKS.email} step={42} stay />
        </a>
        <ul className="fine">
          <li>
            <a href={LINKS.github}>GitHub ↗ github.com/philaxis</a>
          </li>
          <li>{t.copyright}</li>
        </ul>
      </footer>
    </>
  );
}
