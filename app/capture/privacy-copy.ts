// CAPTURE philgood privacy policy, per language. Every flow here was checked against the app
// code (philaxis/spen-capture main, 2026-11-20): AnalyticsManager, OcrRepository,
// OcrUsageManager, functions/index.js, RemoteConfigManager, AppConfig (AdMob, Play Billing),
// UserTierManager, AndroidManifest.xml. Change the effective date when a new version goes live.

import type { Lang } from "../copy";
import { CAPTURE } from "./facts";

const { mail, folder, adMinutes, pkg, oldPolicy } = CAPTURE;

export type Flow = { what: string; when: string; to: string; why: string };
export type Block = string | { list: string[] } | { flows: Flow[] };
export type Section = { id: string; title: string; body: Block[] };

const GEMINI_TERMS = "https://ai.google.dev/gemini-api/terms";
const GOOGLE_PRIVACY = "https://policies.google.com/privacy";

const ko = {
  title: "캡처 필굿 개인정보 처리방침",
  description:
    "캡처 필굿(CAPTURE philgood) 안드로이드 앱이 기기 안에 두는 것과 밖으로 보내는 것, 받는 곳, 보관 기간, 지우는 법을 앱 코드 그대로 적었습니다.",
  effective: "시행일 2026년 11월 20일",
  back: "캡처 필굿",
  head: { what: "무엇을", when: "언제", to: "받는 곳", why: "왜" },
  summary: [
    "캡처한 그림은 기기 안에 있어요. 밖으로 나가는 건 글자 추출을 켰을 때 고른 부분, 그리고 내가 직접 공유할 때뿐이에요.",
    "앱 사용 통계(어떤 화면을 열고 캡처를 몇 번 했는지)를 Google 애널리틱스로 모아요. 이름, 전화번호, 주소록은 모으지 않아요.",
    "무료로 쓸 때는 Google AdMob 광고가 나오고, AdMob은 광고 ID를 써요.",
    "결제는 Google Play가 처리해요. 카드 정보는 앱이 보지 못해요.",
  ],
  sections: [
    {
      id: "who",
      title: "누가 처리하나요",
      body: [
        `캡처 필굿(CAPTURE philgood, 패키지 ${pkg})은 philaxis가 만들고 운영해요. 이 방침은 이 앱에 적용돼요.`,
      ],
    },
    {
      id: "device",
      title: "기기 안에 머무는 것",
      body: [
        {
          list: [
            `캡처한 그림: 클립보드에 넣으려고 앱 캐시에 잠깐 두는 파일, 그리고 '폴더 저장'을 켰을 때 정한 폴더(처음 값 ${folder})의 파일.`,
            "워크플로우, 효과, 떠 있는 버튼, 언어 같은 설정.",
            "'텍스트 인식 (개인 API)'에 넣은 내 Gemini API 키.",
            "광고 시청 타이머, 구매 상태, 오늘의 글자 추출 횟수 같은 캐시.",
          ],
        },
        "이것들은 philaxis에게 오지 않아요. 앱을 지우면 앱 캐시와 설정도 함께 지워져요. 폴더에 저장한 그림은 갤러리에 남으니 필요 없으면 직접 지우면 돼요.",
      ],
    },
    {
      id: "out",
      title: "기기 밖으로 나가는 것",
      body: [
        "아래가 전부예요. 받는 곳은 모두 Google LLC의 서비스이고, 문의 메일만 philaxis가 받아요.",
        {
          flows: [
            {
              what: "앱 사용 통계: 화면 보기, 캡처 완료·효과 적용·프리셋 사용·워크플로우 만들기와 지우기, 무료/유료 구분과 워크플로우 개수, 앱 인스턴스 ID, 기기 모델·OS·언어, IP로 추정한 나라·도시",
              when: "앱을 쓰는 동안",
              to: "Google LLC · Google 애널리틱스 for Firebase",
              why: "어떤 기능이 쓰이는지 보고 앱을 고치려고. 광고 ID는 통계로 모으지 않아요.",
            },
            {
              what: "익명 사용자 ID와 날짜별 글자 추출 횟수, PRO 크레딧",
              when: "글자 추출을 처음 쓸 때부터",
              to: "Google LLC · Firebase 인증, Cloud Firestore, Cloud Functions(서울 리전)",
              why: "하루 한도를 세려고. 그림이나 글자는 여기에 가지 않아요.",
            },
            {
              what: "고른 부분 그림(긴 변 1920px 이하로 줄인 JPEG)과 지시문(글자만 뽑기, 번역할 언어, LaTeX 여부)",
              when: "'텍스트 인식'을 켠 워크플로우에서 캡처할 때만",
              to: "Google LLC · Firebase AI Logic을 거친 Gemini API",
              why: "그림 속 글자를 읽어 돌려받으려고. 돌아온 글자는 클립보드에만 넣고, 앱은 그림과 글자를 어디에도 남기지 않아요.",
            },
            {
              what: "고른 부분 그림과 지시문, 내가 넣은 API 키",
              when: "'텍스트 인식 (개인 API)'을 켠 워크플로우에서 캡처할 때만",
              to: "Google LLC · Gemini API(내 Google 계정)",
              why: "같은 이유. 이때는 내 계정과 Google 사이의 Gemini API 약관을 따라요.",
            },
            {
              what: "앱 인스턴스 ID",
              when: "앱을 열 때",
              to: "Google LLC · Firebase Remote Config",
              why: "광고를 켤지 같은 설정을 받아 오려고",
            },
            {
              what: "광고 ID, IP 주소, 기기·앱 정보, 광고를 보고 누른 기록, IP로 추정한 대략적인 위치",
              when: "무료로 쓰며 광고가 나올 때",
              to: "Google LLC · Google AdMob",
              why: `광고를 보여 주고, 광고를 본 뒤 ${adMinutes}분 사용을 주려고`,
            },
            {
              what: "구매·구독 상태와 주문 정보",
              when: "광고 제거나 PRO를 살 때, 구매를 복원할 때",
              to: "Google LLC · Google Play 결제",
              why: "산 기능을 켜려고. 카드 정보는 Google Play만 봐요.",
            },
            {
              what: "로그인한 Google 계정 이메일",
              when: "'앱 정보'에서 'Google로 로그인'을 눌렀을 때만(개발자가 허가한 계정에만 있는 기능)",
              to: "Google LLC · Firebase 인증, Cloud Firestore",
              why: "허가받은 계정인지 확인하려고",
            },
            {
              what: "내가 쓴 글, 붙인 사진, 내 메일 주소",
              when: "'개발자에게 문의'로 메일을 보낼 때",
              to: `philaxis · ${mail}`,
              why: "답하려고",
            },
          ],
        },
        "philaxis는 이 정보를 팔지 않고, 위에 적은 곳 말고는 넘기지 않아요. 법이 정한 절차로 요청받을 때는 예외예요.",
      ],
    },
    {
      id: "permissions",
      title: "앱이 쓰는 권한",
      body: [
        {
          list: [
            "다른 앱 위에 표시: 떠 있는 버튼과 고르는 화면을 띄우려고.",
            "화면 캡처(MediaProjection)와 포그라운드 서비스: 고르기를 마친 순간의 한 장면을 가져오려고. 계속 녹화하지 않고, 서비스가 켜져 있는 동안 알림이 떠 있어요.",
            "알림: 서비스가 켜져 있다는 알림과 남은 시간을 보이려고.",
            "저장공간: 옛 안드로이드에서만 요청해요(쓰기는 9 이하, 읽기는 12 이하). 폴더에 그림을 저장하려고.",
            "인터넷, Google Play 결제.",
          ],
        },
        "위치, 주소록, 마이크, 카메라 권한은 쓰지 않아요. 캡처를 막아 둔 화면(은행 앱 등)은 안드로이드가 검게 내보내고, 앱은 이 보호를 우회하지 않아요.",
      ],
    },
    {
      id: "keep",
      title: "보관과 지우기",
      body: [
        {
          list: [
            "기기 안 데이터: 앱을 지우면 사라져요. 폴더에 저장한 그림은 직접 지워요.",
            "익명 ID와 글자 추출 횟수: 앱을 쓰는 동안 남아요. 앱을 지우면 기기와 이 기록의 연결이 끊기고, 기록까지 지우고 싶으면 메일로 부탁해 주세요.",
            "앱 사용 통계: Google 애널리틱스의 보관 기간(최대 14개월)이 지나면 저절로 지워져요.",
            `Gemini로 보낸 그림: 앱은 저장하지 않아요. Google 쪽의 처리와 보관은 Gemini API 추가 약관(${GEMINI_TERMS})을 따라요.`,
            "광고와 결제 기록: Google의 개인정보처리방침과 법이 정한 기간을 따라요.",
            "문의 메일: 답한 뒤 더 필요 없으면 지워요.",
          ],
        },
        "글자 추출로 보내고 싶지 않은 화면(신분증, 비밀번호 등)은 글자 추출을 끈 워크플로우로 캡처하세요.",
      ],
    },
    {
      id: "abroad",
      title: "국외 이전",
      body: [
        "위 '기기 밖으로 나가는 것'의 정보는 Google LLC(미국)가 운영하는 서버로 갈 수 있어요. 받는 곳은 Google LLC, 나라는 미국을 비롯해 Google 데이터센터가 있는 나라, 때와 방법은 앱을 쓰는 동안 암호화된 인터넷 연결(HTTPS)로, 항목·목적·보관 기간은 위 표와 '보관과 지우기'와 같아요.",
        "옮기는 게 싫다면 앱을 쓰지 않거나 지우면 돼요. 글자 추출만 꺼도 그림은 나가지 않아요.",
      ],
    },
    {
      id: "rights",
      title: "내 권리",
      body: [
        `내 정보를 보여 달라고, 고쳐 달라고, 지워 달라고, 처리를 멈춰 달라고 ${mail}로 부탁할 수 있어요. 10일 안에 답해요.`,
        "광고 ID는 기기 설정의 Google › 광고에서 재설정하거나 지울 수 있어요.",
      ],
    },
    {
      id: "safety",
      title: "안전하게 지키는 법",
      body: [
        "Google 서비스로 보내는 것은 모두 암호화된 연결(HTTPS)로 가요. 글자 추출에 쓰는 Gemini API 키는 앱 안에 들어 있지 않고, Firebase를 거쳐서만 써요. 횟수 확인은 로그인된 앱의 요청만 받아요.",
      ],
    },
    {
      id: "children",
      title: "아동",
      body: [
        "만 14세 미만 아동을 대상으로 하지 않고, 아동의 정보를 일부러 모으지 않아요. 알게 되면 바로 지워요. 보호자는 메일로 알려 주세요.",
      ],
    },
    {
      id: "changes",
      title: "바뀔 때",
      body: [
        "이 페이지를 고치고 맨 위 시행일을 바꿔요. 새로 밖으로 나가는 정보가 생기는 것처럼 중요한 변화는 앱 업데이트 설명에도 적어요.",
      ],
    },
    {
      id: "contact",
      title: "연락처",
      body: [
        `개인정보 보호책임자: philaxis · ${mail}`,
        "개인정보 침해 신고와 상담은 개인정보침해 신고센터(privacy.kisa.or.kr, 국번 없이 118)와 개인정보 분쟁조정위원회(kopico.go.kr, 1833-6972)에서도 받아요.",
        `Google의 개인정보처리방침: ${GOOGLE_PRIVACY}`,
        `지난 방침(2026-03-10부터): ${oldPolicy}`,
      ],
    },
  ] satisfies Section[],
};

const en: typeof ko = {
  title: "CAPTURE philgood privacy policy",
  description:
    "What the CAPTURE philgood Android app keeps on your device and what it sends out, who receives it, how long it is kept and how to delete it, written straight from the app's code.",
  effective: "Effective November 20, 2026",
  back: "CAPTURE philgood",
  head: { what: "What", when: "When", to: "Who receives it", why: "Why" },
  summary: [
    "Your captures stay on your device. They only leave it when text extraction is on (the selected part) or when you share them yourself.",
    "Usage statistics (which screens you open, how many captures you make) go to Google Analytics. No name, phone number or contacts are collected.",
    "On the free plan the app shows Google AdMob ads, and AdMob uses your advertising ID.",
    "Google Play handles payments. The app never sees your card details.",
  ],
  sections: [
    {
      id: "who",
      title: "Who is responsible",
      body: [
        `CAPTURE philgood (package ${pkg}) is made and run by philaxis. This policy applies to that app.`,
      ],
    },
    {
      id: "device",
      title: "What stays on your device",
      body: [
        {
          list: [
            `Captures: a file kept briefly in the app cache to put on the clipboard, and, with "Save to folder" on, files in the folder you chose (${folder} by default).`,
            "Settings: workflows, effects, the floating button, language.",
            'Your own Gemini API key, if you enter one for "Text recognition (Personal API)".',
            "Caches such as the ad timer, purchase state and today's text extraction count.",
          ],
        },
        "None of this comes to philaxis. Uninstalling the app removes its cache and settings. Captures saved to a folder stay in your gallery until you delete them.",
      ],
    },
    {
      id: "out",
      title: "What leaves your device",
      body: [
        "This is the complete list. Everything goes to services of Google LLC, except contact mail, which philaxis receives.",
        {
          flows: [
            {
              what: "Usage statistics: screen views, capture completed, effect applied, preset used, workflow created and deleted, free/paid status and workflow count, app instance ID, device model, OS, language, country and city estimated from IP",
              when: "While you use the app",
              to: "Google LLC · Google Analytics for Firebase",
              why: "To see which features get used and improve the app. The advertising ID is not collected for statistics.",
            },
            {
              what: "An anonymous user ID, text extraction counts per day, PRO credits",
              when: "From your first text extraction",
              to: "Google LLC · Firebase Authentication, Cloud Firestore, Cloud Functions (Seoul region)",
              why: "To count the daily limit. No images or text go here.",
            },
            {
              what: "The selected part as an image (JPEG, longest side at most 1920 px) and the instruction (text only, target language, LaTeX or not)",
              when: 'Only when you capture in a workflow with "Text recognition" on',
              to: "Google LLC · Gemini API through Firebase AI Logic",
              why: "To read the text in the image. The text that comes back only goes on the clipboard; the app keeps neither the image nor the text anywhere.",
            },
            {
              what: "The selected part as an image, the instruction, and the API key you entered",
              when: 'Only when you capture in a workflow with "Text recognition (Personal API)" on',
              to: "Google LLC · Gemini API (your Google account)",
              why: "Same reason. Here the Gemini API terms between you and Google apply.",
            },
            {
              what: "App instance ID",
              when: "When the app opens",
              to: "Google LLC · Firebase Remote Config",
              why: "To fetch settings such as whether ads are on",
            },
            {
              what: "Advertising ID, IP address, device and app information, ad views and taps, approximate location estimated from IP",
              when: "When ads show on the free plan",
              to: "Google LLC · Google AdMob",
              why: `To show ads and grant ${adMinutes} minutes of use after an ad`,
            },
            {
              what: "Purchase and subscription status, order details",
              when: "When you buy ad removal or PRO, or restore purchases",
              to: "Google LLC · Google Play Billing",
              why: "To turn on what you bought. Only Google Play sees card details.",
            },
            {
              what: "The email of the Google account you sign in with",
              when: 'Only when you tap "Sign in with Google" under About (a feature for accounts the developer has authorized)',
              to: "Google LLC · Firebase Authentication, Cloud Firestore",
              why: "To check whether the account is authorized",
            },
            {
              what: "What you write, attached screenshots, your email address",
              when: 'When you send mail from "Contact Developer"',
              to: `philaxis · ${mail}`,
              why: "To reply",
            },
          ],
        },
        "philaxis does not sell this information or pass it to anyone beyond the list above, except when required through a legal process.",
      ],
    },
    {
      id: "permissions",
      title: "Permissions the app uses",
      body: [
        {
          list: [
            "Display over other apps: for the floating button and the selection screen.",
            "Screen capture (MediaProjection) and a foreground service: to take the single frame at the moment you finish selecting. It does not keep recording, and a notification stays up while the service is on.",
            "Notifications: to show that the service is on and how much time is left.",
            "Storage: requested only on older Android (write on 9 and older, read on 12 and older), to save captures to a folder.",
            "Internet, Google Play Billing.",
          ],
        },
        "No location, contacts, microphone or camera permission. Screens that block capture (such as banking apps) come out black from Android itself, and the app does not get around that.",
      ],
    },
    {
      id: "keep",
      title: "Keeping and deleting",
      body: [
        {
          list: [
            "Data on your device: removed when you uninstall. Delete folder captures yourself.",
            "Anonymous ID and text extraction counts: kept while you use the app. Uninstalling cuts the link between your device and the record; to delete the record too, ask by mail.",
            "Usage statistics: deleted automatically after Google Analytics' retention period (at most 14 months).",
            `Images sent to Gemini: the app does not store them. Google's processing and retention follow the Gemini API Additional Terms (${GEMINI_TERMS}).`,
            "Ad and payment records: follow Google's privacy policy and the periods set by law.",
            "Contact mail: deleted once it is no longer needed after replying.",
          ],
        },
        "For screens you do not want sent for text extraction (ID cards, passwords), capture with a workflow that has text extraction off.",
      ],
    },
    {
      id: "abroad",
      title: "Transfers abroad",
      body: [
        'The information under "What leaves your device" may go to servers run by Google LLC (USA). Recipient: Google LLC. Countries: the United States and other countries with Google data centers. When and how: while you use the app, over encrypted connections (HTTPS). Items, purposes and retention: as in the table and "Keeping and deleting".',
        "If you do not want this, stop using or uninstall the app. Turning off text extraction alone keeps images from leaving.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [
        `You can ask to see, correct or delete your information, or to stop its processing, by mailing ${mail}. You will get an answer within 10 days.`,
        "You can reset or delete your advertising ID in your device settings under Google › Ads.",
      ],
    },
    {
      id: "safety",
      title: "How it is protected",
      body: [
        "Everything sent to Google services travels over encrypted connections (HTTPS). The Gemini API key for text extraction is not inside the app; it is only used through Firebase. Count checks only accept requests from a signed-in app.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "The app is not aimed at children under 14 (under 13 in the US), and does not knowingly collect their information. If we learn of it, we delete it right away. Parents can tell us by mail.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      body: [
        "We update this page and the effective date at the top. Important changes, such as new information leaving the device, are also noted in the app's update notes.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [
        `Privacy officer: philaxis · ${mail}`,
        `Google's privacy policy: ${GOOGLE_PRIVACY}`,
        `Previous policy (from 2026-03-10): ${oldPolicy}`,
      ],
    },
  ] satisfies Section[],
};

export const PRIVACY_COPY: Record<Lang, typeof ko> = { ko, en };
