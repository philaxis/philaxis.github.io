// /llms.txt: a plain summary for AI assistants and answer engines (llmstxt.org format),
// built from the same facts and copy the pages show.

import { CAPTURE_COPY } from "../capture/copy";
import { CAPTURE, CAPTURE_PATHS, SITE } from "../capture/facts";
import { LINKS } from "../copy";

export const dynamic = "force-static";

export function GET() {
  const en = CAPTURE_COPY.en.page;
  const { ocr } = CAPTURE;
  const body = `# philaxis

> Personal site of philaxis (필락시스), a developer in Seoul who builds small tools that keep work from breaking flow. Korean is the main language; product pages also have English.

## CAPTURE philgood (캡처 필굿)

${en.define}

- Platform: Android ${CAPTURE.minAndroid}+ (package ${CAPTURE.pkg}). Not available for iPhone or PC.
- Buttons (from version 1.0.5): the home screen starts with three buttons, Copy image, Copy text, and Translate and copy (PRO). Users can make more buttons; effects, save folder and file names live under Advanced settings. Older "workflows" became buttons with the same settings.
- Trigger: a floating button (shape: circle, pill, or half-circle on the screen edge), or holding the S Pen button and double-tapping the screen; a home screen widget turns chosen buttons on and off.
- Selection: rectangle, freehand or full screen.
- What a button does, together on one capture: copy the image to the clipboard, copy its text read by Google Gemini (translation into ${CAPTURE.translate.length} languages and LaTeX math are PRO), save to a folder, pin to screen (a small window floating over other apps), share.
- Effects: black and white, grayscale, invert, rotate, flip, opacity, saturation, contrast.
- Samepaste handoff: with Samepaste installed and "Also send to Samepaste" on (default), what goes to the clipboard is also handed to Samepaste on the same device.
- Price: free with ads (one rewarded ad unlocks ${CAPTURE.adMinutes} minutes). One-time ad removal. PRO subscription (monthly or yearly): no ads while subscribed, translation and LaTeX math, ${ocr.proDailyTopUp} text extractions added daily up to ${ocr.proMax}. Free and ad-removal users get ${ocr.freePerDay} text extractions a day.
- Privacy: captures stay on the device; only with a button that copies text is the selected part sent to Google Gemini. Usage statistics go to Google Analytics for Firebase; ads use Google AdMob.
- Support: ${CAPTURE.mail}

- [CAPTURE philgood (English)](${SITE}${CAPTURE_PATHS.product.en}): what it does, plans, FAQ
- [캡처 필굿 (한국어)](${SITE}${CAPTURE_PATHS.product.ko})
- [Privacy policy](${SITE}${CAPTURE_PATHS.privacy.en})
- [개인정보 처리방침](${SITE}${CAPTURE_PATHS.privacy.ko})
- [Google Play](${CAPTURE.play("en")})

## Other tools

- [mulbit (물빛)](${LINKS.mulbitSite}): Windows dictation that types where the cursor is; runs offline.
- [Flick](${LINKS.flick}): Windows 11 virtual desktops as a grid you flick through with the mouse.
- [Rel Search](${LINKS.rel}), [Markdown Lens](${LINKS.lens}): Obsidian plugins.

## Contact

- ${LINKS.email}
- ${LINKS.github}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
