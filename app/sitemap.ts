import type { MetadataRoute } from "next";
import { CAPTURE_PATHS, SITE } from "./capture/facts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (paths: { ko: string; en: string }) =>
    (["ko", "en"] as const).map((lang) => ({
      url: `${SITE}${paths[lang]}`,
      alternates: { languages: { ko: `${SITE}${paths.ko}`, en: `${SITE}${paths.en}`, "x-default": `${SITE}${paths.en}` } },
    }));
  return [{ url: `${SITE}/` }, ...pair(CAPTURE_PATHS.product), ...pair(CAPTURE_PATHS.privacy)];
}
