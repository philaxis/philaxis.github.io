// CAPTURE philgood copy, per language: the home block, the live demo and the product page.
// Numbers and lists come from facts.ts so the page, JSON-LD and llms.txt never disagree.

import type { Lang } from "../copy";
import { CAPTURE } from "./facts";

const { ocr, adMinutes, minAndroid, folder, mail } = CAPTURE;
const LATEX = "$\\Delta S \\geq Q/T$";
const LANGS = CAPTURE.translate.length;

export type Faq = { q: string; a: string };

const ko = {
  home: {
    section: { title: "옮겨 적는 대신 잘라서", sub: "screen → paste" },
    pitch: "안드로이드 화면 일부를 잘라, 바로 붙여 넣거나 글자로 받습니다.",
    facts: [
      "떠 있는 버튼을 누르거나, S펜 버튼을 누른 채 화면을 두 번 톡 치면 고르기가 시작돼요.",
      "첫 화면에 버튼이 셋 있어요. 그림 복사, 글자 복사, 번역해서 복사. 고른 부분이 그대로 클립보드에 들어가요.",
      "버튼을 누르면 '끝나면'에서 화면에 붙여 두기와 폴더 저장을 켜고, '고급 설정'에서 꾸미기와 파일 이름을 정해요.",
    ],
    get: "Google Play에서 받기",
    more: "자세히 보기",
    meta: `Android ${minAndroid} 이상 · 무료(광고) · PRO 구독`,
  },
  demo: {
    app: "강의 슬라이드 3/12",
    slide: {
      title: "Thermodynamics · Lecture 2",
      line: "The entropy of an isolated system never decreases.",
      math: "ΔS ≥ Q/T",
    },
    dest: "강의 노트",
    modes: ["그림으로", "글자로", "번역해서"],
    out: {
      text: ["The entropy of an isolated system never decreases.", LATEX],
      translate: ["고립계의 엔트로피는 줄어들지 않는다.", LATEX],
    },
    steps: ["버튼", "끌어서 고르기", "붙여넣음"],
    label: "캡처 필굿 데모. 아래 단추로 붙여 넣는 모양을 고릅니다.",
  },
  page: {
    title: "캡처 필굿 — 화면 일부를 잘라 바로 붙여넣기·글자 추출 (안드로이드)",
    description: `캡처 필굿(CAPTURE philgood)은 안드로이드 화면 일부를 잘라 클립보드에 바로 넣는 앱입니다. 떠 있는 버튼이나 S펜으로 고르고, 첫 화면의 버튼으로 그림 그대로 또는 글자로 복사합니다. 무료는 글자 추출 하루 ${ocr.freePerDay}번(번역·LaTeX 수식 포함, 광고 있음), PRO는 하루 ${ocr.proDailyTopUp}번에 광고 없음.`,
    home: "필락시스",
    privacy: "처리방침",
    contact: "문의",
    alt: "CAPTURE philgood · Android",
    define: `캡처 필굿은 안드로이드에서 화면의 일부를 잘라 곧바로 클립보드에 넣는 앱입니다. 첫 화면에 버튼이 셋 있습니다. 그림 복사는 고른 부분을 그림으로, 글자 복사는 Google Gemini가 읽은 글자로 클립보드에 넣고, 번역해서 복사는 ${LANGS}개 언어 중 하나로 옮겨서 넣습니다. 갤러리를 열고, 자르고, 복사하는 단계를 건너뜁니다. 무료는 글자 추출을 하루 ${ocr.freePerDay}번 쓰고 번역과 LaTeX 수식도 이 안에 들어갑니다. PRO는 하루 ${ocr.proDailyTopUp}번까지 쓰고 광고가 없습니다.`,
    badge: "Google Play에서 다운로드",
    meta: `Android ${minAndroid} 이상 · 무료, 광고 있음 · 광고 제거와 PRO는 앱 안 결제`,
    steps: {
      title: "이렇게 써요",
      sub: "call → select → paste",
      items: [
        {
          name: "부르기",
          line: "떠 있는 버튼을 누르거나, 버튼 달린 S펜으로 버튼을 누른 채 화면을 두 번 톡 쳐요. 홈 화면 위젯으로 켜고 끌 수도 있어요.",
        },
        {
          name: "고르기",
          line: "손가락이나 펜으로 끌어서 골라요. 사각형, 손으로 그린 모양, 화면 전체 중에서 정해 둬요.",
        },
        {
          name: "받기",
          line: "손을 떼는 순간 그 버튼이 정해 둔 일을 해요. 그림이나 글자를 클립보드에 넣고, 켜 두었다면 폴더 저장, 화면에 붙여 두기, 공유도 함께 해요.",
        },
      ],
    },
    features: {
      title: "할 수 있는 것",
      sub: "what it does",
      items: [
        {
          name: "내 버튼",
          line: "처음엔 그림 복사, 글자 복사, 번역해서 복사가 있어요. 버튼을 더 만들 수 있고, '고급 설정'에서 꾸미기, 저장 폴더, 파일 이름을 고쳐요.",
        },
        {
          name: "꾸미기",
          line: "흑백, 그레이스케일, 색 반전, 회전, 뒤집기, 투명도, 채도, 대비를 정한 순서대로 입혀요. 강의 화면을 흑백으로 바꿔 붙이는 식이에요.",
        },
        { name: "글자 추출", line: `고른 부분의 글자를 Google Gemini가 읽어 클립보드에 넣어요. 무료는 하루 ${ocr.freePerDay}번.` },
        { name: "번역", line: `읽은 글자를 ${LANGS}개 언어 중 하나로 옮겨서 넣어요. 버튼마다 언어를 따로 정해요.` },
        { name: "수식", line: "수식을 LaTeX로 받아요. Obsidian, Logseq 같은 노트에 붙이면 수식으로 보여요." },
        {
          name: "화면에 붙여 두기",
          line: "잘라 낸 그림을 다른 앱 위에 작은 창으로 띄워 둬요. 끌어서 옮기고 크기를 바꾸고, 두 번 톡 치면 닫혀요. 여러 장도 함께 띄워요.",
        },
        { name: "떠 있는 버튼", line: "모양을 동그라미, 알약, 화면 가장자리 반원 중에서 골라요. 색, 크기, 투명도도 바꿔요." },
        {
          name: "Samepaste로도 보내기",
          line: "Samepaste가 깔려 있으면 클립보드에 넣은 그림과 글자가 Samepaste 기록과 다른 기기에도 가요. 설정에서 끌 수 있어요.",
        },
        { name: "위젯", line: "홈 화면 위젯으로 고른 버튼 여러 개를 한 번에 켜고 꺼요." },
      ],
    },
    plans: {
      title: "무료와 PRO",
      sub: "free · no ads · pro",
      head: ["", "무료", "광고 제거", "PRO"],
      kind: ["", "", "한 번 구매", "월·연 구독"],
      rows: [
        { name: "그림 복사·저장·꾸미기·붙여 두기", cells: ["모두", "모두", "모두"] },
        {
          name: "광고",
          cells: [`광고 한 편 보면 ${adMinutes}분 사용. 처음 한 번은 광고 없이`, "없음", "구독하는 동안 없음"],
        },
        {
          name: "글자 추출 (번역·LaTeX 수식 포함)",
          cells: [`하루 ${ocr.freePerDay}번`, `하루 ${ocr.freePerDay}번`, `매일 ${ocr.proDailyTopUp}번 충전, ${ocr.proMax}번까지 쌓임`],
        },
      ],
      note: "가격은 나라마다 달라서 Google Play에 나와요. 구독은 Google Play에서 언제든 해지할 수 있어요.",
    },
    faq: {
      title: "자주 묻는 질문",
      sub: "faq",
      items: [
        {
          q: "캡처 필굿은 어떤 앱인가요?",
          a: "안드로이드 화면 일부를 잘라 클립보드에 바로 넣는 캡처 앱이에요. 첫 화면의 버튼으로 고른 부분을 그림으로 복사하거나, 글자로 복사하거나, 번역해서 복사해요. philaxis가 만들었어요.",
        },
        {
          q: "S펜이 없어도 되나요?",
          a: "돼요. 화면에 떠 있는 버튼을 누르면 고르기가 시작돼요. S펜 두 번 톡은 버튼 달린 S펜이 있는 갤럭시에서 쓰는 다른 방법이에요.",
        },
        {
          q: "글자 추출은 몇 번까지 무료인가요?",
          a: `하루 ${ocr.freePerDay}번이에요. 번역과 LaTeX 수식도 이 안에서 써요. 날이 바뀌면 다시 ${ocr.freePerDay}번이에요. PRO를 구독하면 매일 ${ocr.proDailyTopUp}번이 충전되고 ${ocr.proMax}번까지 쌓여요. 내 Gemini API 키를 넣어 쓰는 출력(베타)도 있어요.`,
        },
        {
          q: "수식도 글자로 뽑히나요?",
          a: `네. 그냥 두면 √, ², Σ 같은 기호로 최대한 그대로 나와요. '수식은 LaTeX로'를 켜면 ${LATEX}처럼 LaTeX로 나와서, Obsidian·Logseq 같은 마크다운 노트에 붙이면 수식으로 보여요. 무료에서도 돼요.`,
        },
        {
          q: "어떤 언어로 번역되나요?",
          a: `번역해서 복사는 ${CAPTURE.translate.length}개 언어로 옮겨요: ${CAPTURE.translate.join(", ")}. 버튼마다 언어를 따로 정할 수 있어요.`,
        },
        {
          q: "워크플로우는 어디 갔나요?",
          a: "1.0.5부터 '버튼'이라고 불러요. 전에 만든 워크플로우는 같은 순서와 설정 그대로 첫 화면의 버튼이 돼요. 효과·출력·폴더 같은 자세한 설정은 버튼을 누르고 '고급 설정'에 있어요.",
        },
        {
          q: "화면에 붙여 두기는 뭔가요?",
          a: "잘라 낸 그림을 다른 앱 위에 작은 창으로 띄워 두는 거예요. 문제를 보면서 풀이를 쓰거나, 지도를 보면서 메시지를 쓸 때 좋아요. 버튼의 '끝나면'에서 켜고, 창은 두 번 톡 치면 닫혀요.",
        },
        {
          q: "캡처한 그림은 어디로 가나요?",
          a: `기기 안에만 있어요. 클립보드와 정해 둔 폴더(처음 값은 ${folder})에 들어가요. 글자를 복사하는 버튼일 때만 고른 부분이 Google Gemini로 가서 글자로 바뀌어 돌아와요. 'Samepaste로도 보내기'를 켜 두면 클립보드에 넣은 것이 Samepaste로도 가요. 자세한 건 개인정보 처리방침에 있어요.`,
        },
        {
          q: "화면을 계속 녹화하나요?",
          a: "아니요. 안드로이드의 화면 캡처 권한을 쓰지만, 고르기를 마친 순간의 한 장면만 가져와요. 캡처 서비스가 켜져 있는 동안은 알림이 떠 있어요.",
        },
        {
          q: "어떤 화면은 검게 찍혀요.",
          a: "은행 앱이나 동영상 서비스처럼 캡처를 막아 둔 화면은 안드로이드가 검게 내보내요. 캡처 필굿은 이 보호를 우회하지 않아요.",
        },
        {
          q: "광고는 어떻게 나오나요?",
          a: `무료로 쓸 때는 광고 한 편을 보면 ${adMinutes}분 동안 캡처가 켜져요. 광고 제거를 한 번 사면 광고 없이 계속 써요. PRO를 구독하면 구독하는 동안 광고가 없고 글자 추출을 하루 ${ocr.proDailyTopUp}번까지 써요. 번역과 LaTeX 수식은 무료에서도 돼요.`,
        },
        { q: "아이폰이나 PC에서도 되나요?", a: `아니요. 안드로이드 ${minAndroid} 이상 폰과 태블릿용이에요.` },
        {
          q: "문의는 어디로 하나요?",
          a: `${mail}로 보내 주세요. 앱의 '개발자에게 문의'에서 사진을 붙여 보낼 수도 있어요.`,
        },
      ] satisfies Faq[],
    },
    foot: { privacy: "개인정보 처리방침", others: "philaxis가 만든 다른 것", copyright: "© 2026 필락시스" },
  },
};

const en: typeof ko = {
  home: {
    section: { title: "Crop instead of retyping", sub: "screen → paste" },
    pitch: "Crop part of your Android screen and paste it right away, as a picture or as text.",
    facts: [
      "Tap the floating button, or hold the S Pen button and double-tap the screen, and selection starts.",
      "The home screen has three buttons: Copy image, Copy text, and Translate and copy. Your selection goes straight to the clipboard.",
      "Open a button to turn on Pin to screen or saving to a folder; Advanced settings hold effects and file names.",
    ],
    get: "Get it on Google Play",
    more: "Details",
    meta: `Android ${minAndroid}+ · free (ads) · PRO subscription`,
  },
  demo: {
    app: "Lecture slide 3/12",
    slide: { title: "熱力学 第2講", line: "孤立系のエントロピーは減少しない。", math: "ΔS ≥ Q/T" },
    dest: "Lecture notes",
    modes: ["As image", "As text", "Translated"],
    out: {
      text: ["孤立系のエントロピーは減少しない。", LATEX],
      translate: ["The entropy of an isolated system never decreases.", LATEX],
    },
    steps: ["button", "drag to select", "pasted"],
    label: "CAPTURE philgood demo. The buttons below pick how it pastes.",
  },
  page: {
    title: "CAPTURE philgood — crop part of the screen, paste it or extract the text (Android)",
    description: `CAPTURE philgood is an Android app that crops part of the screen straight to the clipboard. Select with a floating button or the S Pen, then copy it as a picture or as text with the buttons on the home screen. Free: ${ocr.freePerDay} text extractions a day, translation and LaTeX math included, with ads. PRO: ${ocr.proDailyTopUp} a day, no ads.`,
    home: "philaxis",
    privacy: "Privacy",
    contact: "Contact",
    alt: "캡처 필굿 · Android",
    define: `CAPTURE philgood is an Android app that crops part of the screen and puts it straight on the clipboard. The home screen has three buttons: Copy image puts the selection on the clipboard as a picture, Copy text puts the text Google Gemini reads in it, and Translate and copy puts it translated into one of ${LANGS} languages. It skips opening the gallery, cropping and copying. The free version gives ${ocr.freePerDay} text extractions a day, translation and LaTeX math included; PRO gives ${ocr.proDailyTopUp} a day with no ads.`,
    badge: "Get it on Google Play",
    meta: `Android ${minAndroid}+ · free with ads · ad removal and PRO are in-app purchases`,
    steps: {
      title: "How it works",
      sub: "call → select → paste",
      items: [
        {
          name: "Call",
          line: "Tap the floating button, or hold the button on an S Pen and double-tap the screen. A home screen widget turns it on and off.",
        },
        {
          name: "Select",
          line: "Drag with a finger or the pen. Choose a rectangle, a freehand shape or the full screen.",
        },
        {
          name: "Paste",
          line: "The moment you let go, the button does its job: the picture or text goes to the clipboard, and if you turned them on, it also saves to a folder, pins to the screen or shares.",
        },
      ],
    },
    features: {
      title: "What it does",
      sub: "what it does",
      items: [
        {
          name: "Your buttons",
          line: "You start with Copy image, Copy text and Translate and copy. Make more buttons, and change effects, the save folder and file names under Advanced settings.",
        },
        {
          name: "Effects",
          line: "Black and white, grayscale, invert, rotate, flip, opacity, saturation and contrast, applied in the order you set. Say, turn a lecture slide black and white before it lands.",
        },
        { name: "Text extraction", line: `Google Gemini reads the text in your selection and puts it on the clipboard. ${ocr.freePerDay} a day for free.` },
        { name: "Translation", line: `Get the text translated into one of ${LANGS} languages. Each button keeps its own language.` },
        { name: "Math", line: "Get math as LaTeX, so it renders when pasted into notes like Obsidian or Logseq." },
        {
          name: "Pin to screen",
          line: "Keep the cropped picture floating over other apps in a small window. Drag it, resize it, double-tap to close. Pin several at once.",
        },
        { name: "Floating button", line: "Pick its shape: circle, pill, or a half-circle on the screen edge. Change its color, size and opacity too." },
        {
          name: "Also send to Samepaste",
          line: "With Samepaste installed, the pictures and text you put on the clipboard also reach Samepaste's history and your other devices. You can turn it off in Settings.",
        },
        { name: "Widget", line: "Turn several chosen buttons on and off at once from a home screen widget." },
      ],
    },
    plans: {
      title: "Free and PRO",
      sub: "free · no ads · pro",
      head: ["", "Free", "No ads", "PRO"],
      kind: ["", "", "one-time purchase", "monthly or yearly"],
      rows: [
        { name: "Copy image, save, effects, pin", cells: ["all", "all", "all"] },
        {
          name: "Ads",
          cells: [`watch one ad for ${adMinutes} minutes of use; the first time is free`, "none", "none while subscribed"],
        },
        {
          name: "Text extraction (translation and LaTeX math included)",
          cells: [
            `${ocr.freePerDay} a day`,
            `${ocr.freePerDay} a day`,
            `${ocr.proDailyTopUp} added daily, banks up to ${ocr.proMax}`,
          ],
        },
      ],
      note: "Prices differ by country, so Google Play shows them. You can cancel a subscription in Google Play any time.",
    },
    faq: {
      title: "Questions",
      sub: "faq",
      items: [
        {
          q: "What is CAPTURE philgood?",
          a: "A capture app for Android that crops part of the screen straight to the clipboard. The buttons on the home screen copy your selection as a picture, as text, or translated. Made by philaxis.",
        },
        {
          q: "Do I need an S Pen?",
          a: "No. Tap the floating button on the screen and selection starts. Double-tapping with the S Pen is another way in, for Galaxy devices with a buttoned S Pen.",
        },
        {
          q: "How many free text extractions do I get?",
          a: `${ocr.freePerDay} a day, translation and LaTeX math included, back to ${ocr.freePerDay} when the day changes. A PRO subscription adds ${ocr.proDailyTopUp} every day and banks up to ${ocr.proMax}. There is also an output (beta) that uses your own Gemini API key.`,
        },
        {
          q: "Does it extract math too?",
          a: `Yes. Left as is, math keeps its symbols (√, ², Σ). Turn on "Formulas as LaTeX" and it comes out like ${LATEX}, which renders when pasted into Markdown notes such as Obsidian or Logseq. This works on the free plan too.`,
        },
        {
          q: "Which languages can it translate into?",
          a: `Translate and copy works in ${CAPTURE.translate.length} languages: ${CAPTURE.translate.join(", ")}. Each button can have its own language.`,
        },
        {
          q: "Where did workflows go?",
          a: "From 1.0.5 they are called buttons. Every workflow you made becomes a button on the home screen, in the same order with the same settings. Effects, outputs and folders are under Advanced settings when you open a button.",
        },
        {
          q: "What is Pin to screen?",
          a: "It keeps the cropped picture floating over other apps in a small window, handy for writing a solution while looking at the problem, or texting directions while looking at a map. Turn it on in a button's options; double-tap the window to close it.",
        },
        {
          q: "Where do my captures go?",
          a: `They stay on your device: on the clipboard and in the folder you set (${folder} by default). Only with a button that copies text does the selection go to Google Gemini, which sends the text back. With "Also send to Samepaste" on, what goes to the clipboard also goes to Samepaste. The privacy policy has the details.`,
        },
        {
          q: "Does it record my screen all the time?",
          a: "No. It uses Android's screen capture permission, but takes only the single frame at the moment you finish selecting. A notification stays up while the capture service is on.",
        },
        {
          q: "Some screens come out black.",
          a: "Apps that block screenshots, like banking apps and video services, are sent out black by Android itself. CAPTURE philgood does not get around that.",
        },
        {
          q: "How do the ads work?",
          a: `On the free plan, watching one ad turns capture on for ${adMinutes} minutes. Buy ad removal once to use it without ads for good. Subscribe to PRO for no ads while subscribed and up to ${ocr.proDailyTopUp} text extractions a day. Translation and LaTeX math work on the free plan too.`,
        },
        { q: "Does it work on iPhone or PC?", a: `No. It is for Android ${minAndroid}+ phones and tablets.` },
        {
          q: "How do I get in touch?",
          a: `Mail ${mail}. You can also attach screenshots from "Contact Developer" in the app.`,
        },
      ] satisfies Faq[],
    },
    foot: { privacy: "Privacy policy", others: "More from philaxis", copyright: "© 2026 philaxis" },
  },
};

export const CAPTURE_COPY: Record<Lang, typeof ko> = { ko, en };

export type CaptureCopy = typeof ko;
