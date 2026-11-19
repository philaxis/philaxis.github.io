// Everything about CAPTURE philgood that changes when the app changes, in one place.
// Checked against philaxis/spen-capture main on 2026-11-20. The icon lives at
// public/capture/icon.png; swap that file when spen-capture#4 lands.

import type { Lang } from "../copy";

export const SITE = "https://philaxis.github.io";

const PKG = "com.philgood.capture";

export const CAPTURE = {
  name: { ko: "캡처 필굿", en: "CAPTURE philgood" },
  /** The app's own name, as on the launcher in every language. */
  appName: "CAPTURE philgood",
  pkg: PKG,
  icon: "/capture/icon.png",
  badge: { ko: "/capture/badge-ko.png", en: "/capture/badge-en.png" },
  og: { ko: "/capture/og-ko.png", en: "/capture/og-en.png" },
  play: (lang: Lang) => `https://play.google.com/store/apps/details?id=${PKG}&hl=${lang}`,
  /** Support mail shown in the app's contact screen. */
  mail: "philgood.lab.help@gmail.com",
  minAndroid: "7.0",
  minSdk: 24,
  /** Watching one rewarded ad unlocks this many minutes (AdTimerManager.AD_DURATION_MS). */
  adMinutes: 30,
  /** OcrUsageManager */
  ocr: { freePerDay: 5, proDailyTopUp: 100, proMax: 300 },
  /** GeminiConfig.TRANSLATE_LANGUAGES, in the app's order. */
  translate: [
    "한국어 Korean",
    "English",
    "日本語 Japanese",
    "中文 Chinese",
    "Español",
    "Français",
    "Deutsch",
    "Português",
    "Русский",
    "العربية Arabic",
    "हिन्दी Hindi",
    "Italiano",
    "Türkçe",
    "Tiếng Việt",
    "Bahasa Indonesia",
  ],
  /** Where the app saves to by default (WorkflowConfig.DEFAULT_FOLDER, placeholders dropped). */
  folder: "Pictures/CapturePhilgood",
  oldPolicy: "https://philgoodlabhelp-spec.github.io/policy/",
} as const;

/** Paths of the capture pages, per language. Trailing slash: next.config trailingSlash. */
export const CAPTURE_PATHS = {
  product: { ko: "/capture/", en: "/capture/en/" },
  privacy: { ko: "/capture/privacy/", en: "/capture/en/privacy/" },
} as const;

export type CapturePage = keyof typeof CAPTURE_PATHS;
