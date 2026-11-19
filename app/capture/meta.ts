// <head> metadata and JSON-LD for the capture pages.

import type { Metadata } from "next";
import type { Lang } from "../copy";
import { CAPTURE_COPY } from "./copy";
import { CAPTURE, CAPTURE_PATHS, type CapturePage, SITE } from "./facts";
import { PRIVACY_COPY } from "./privacy-copy";

const LOCALE = { ko: "ko_KR", en: "en_US" } as const;

export function captureMetadata(page: CapturePage, lang: Lang): Metadata {
  const { title, description } = page === "product" ? CAPTURE_COPY[lang].page : PRIVACY_COPY[lang];
  const paths = CAPTURE_PATHS[page];
  const image = { url: CAPTURE.og[lang], width: 1200, height: 630, alt: CAPTURE.name[lang] };
  return {
    title,
    description,
    alternates: {
      canonical: paths[lang],
      languages: { ko: paths.ko, en: paths.en, "x-default": paths.en },
    },
    openGraph: {
      title,
      description,
      url: paths[lang],
      siteName: "philaxis",
      locale: LOCALE[lang],
      alternateLocale: LOCALE[lang === "ko" ? "en" : "ko"],
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

const PERSON = { "@type": "Person", name: "philaxis", url: `${SITE}/`, sameAs: ["https://github.com/philaxis"] };

/** SoftwareApplication + FAQPage, from the same copy the page shows. No ratings: none are shown. */
export function captureJsonLd(lang: Lang) {
  const p = CAPTURE_COPY[lang].page;
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: CAPTURE.name[lang],
      alternateName: CAPTURE.name[lang === "ko" ? "en" : "ko"],
      description: p.define,
      url: `${SITE}${CAPTURE_PATHS.product[lang]}`,
      image: `${SITE}${CAPTURE.icon}`,
      operatingSystem: `Android ${CAPTURE.minAndroid}+`,
      applicationCategory: "UtilitiesApplication",
      installUrl: CAPTURE.play(lang),
      inLanguage: lang,
      author: PERSON,
      offers: { "@type": "Offer", price: "0", priceCurrency: lang === "ko" ? "KRW" : "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: p.faq.items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export const HOME_JSONLD = [
  { "@context": "https://schema.org", "@type": "WebSite", name: "philaxis", alternateName: "필락시스", url: `${SITE}/` },
  { "@context": "https://schema.org", ...PERSON, alternateName: "필락시스" },
];
