"use client";

import { useEffect, useState } from "react";
import { CAPTURE_COPY } from "./capture/copy";
import CaptureDemo from "./capture/demo";
import { CAPTURE, CAPTURE_PATHS } from "./capture/facts";
import { COPY, type Lang, LANG_KEY, LINKS } from "./copy";
import FlickDemo from "./demo-flick";
import LensDemo from "./demo-lens";
import MulbitDemo from "./demo-mulbit";
import RelDemo from "./demo-rel";
import Dictation from "./dictation";
import { useReveal } from "./motion";
import { Typed } from "./text";
import Traveller from "./traveller";

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
      if (localStorage.getItem(LANG_KEY) === "en") setLang("en");
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
      localStorage.setItem(LANG_KEY, next);
    } catch {}
  };

  const s = t.sections;
  const cap = CAPTURE_COPY[lang].home;

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
          <Dictation key={lang} lines={t.hero} replay={replay} mobileBreak={t.heroMobileBreak} />
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

          <section className="wrap sec" aria-labelledby="h-screens">
            <Heading id="h-screens" {...s.screens} />
            <article className="mulbit flip">
              <h3 className="mulbit-name">
                {t.flick.name}
                {lang === "ko" && <span className="alt">{t.flick.alt}</span>}
              </h3>
              <p className="pitch">{t.flick.pitch}</p>
              <FlickDemo d={t.flick.demo} />
              <ul className="facts">
                {t.flick.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta">
                <div className="cta-row">
                  <a className="btn" href={LINKS.flickExe}>
                    {t.flick.download}
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a className="mono-link" href={LINKS.flickSite}>
                    {t.flick.site}
                  </a>
                  <a className="mono-link" href={LINKS.flick}>
                    GitHub ↗
                  </a>
                </div>
                <p className="meta">{t.flick.meta}</p>
                <p className="meta note">{t.flick.note}</p>
              </div>
            </article>
          </section>

          <section className="wrap sec" aria-labelledby="h-capture">
            {/* a still heading: no typing, so no glowing dot (user rule 11-19); not a .verb, so the traveller skips it */}
            <div className="head">
              <h2 className="cap-verb" id="h-capture">
                {cap.section.title}
              </h2>
              <p className="sub">{cap.section.sub}</p>
            </div>
            <article className="mulbit">
              <h3 className="mulbit-name cap-name">
                {CAPTURE.name[lang]}
                <span className="alt">{CAPTURE.name[lang === "ko" ? "en" : "ko"]}</span>
              </h3>
              <p className="pitch">{cap.pitch}</p>
              <CaptureDemo d={CAPTURE_COPY[lang].demo} />
              <ul className="facts">
                {cap.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="cta">
                <div className="cta-row">
                  <a className="btn" href={CAPTURE.play(lang)}>
                    {cap.get}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a className="mono-link" href={CAPTURE_PATHS.product[lang]}>
                    {cap.more} →
                  </a>
                </div>
                <p className="meta">{cap.meta}</p>
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
