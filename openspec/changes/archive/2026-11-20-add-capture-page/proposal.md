# Proposal: 캡처 필굿 페이지와 검색 준비 (add-capture-page)

## Why

사용자 11-20(이슈 #3): "캡처필굿도 우리 필락시스 랜딩페이지에서 연결되게 같이좀 만들어야할듯. 도메인 또 사긴 좀 그렇고, 필락시스에서 하자." 캡처 필굿(안드로이드 앱 `com.philgood.capture`, 플레이 스토어에 나와 있음)은 Samepaste(#2, 자기 레포·도메인)와 달리 이 사이트 안에 둔다.

같은 날 사용자: "seo, geo가 전혀 안 되어 있지 지금?" 진단(11-20): 사이트에 `robots.txt`·`sitemap.xml`·`llms.txt`가 없고(모두 404), 정식 주소(canonical)·hreflang·JSON-LD도 없고, 공유 미리보기 그림은 GitHub 프로필 사진이다. '캡처 필굿'·'CAPTURE philgood'·'S펜 캡처 텍스트 추출'로 찾으면 구글·빙·네이버 어디에도 이 사이트가 나오지 않는다(앱 자체도 AppBrain 한 곳만 나옴). 앱의 개인정보 처리방침은 다른 계정의 생성기 페이지(https://philgoodlabhelp-spec.github.io/policy/)에 있고, 앱이 실제로 쓰는 Gemini 글자 추출·Firebase 익명 로그인·Firestore 사용량 기록·광고 ID를 정확히 적지 않는다.

## What Changes

- **홈의 캡처 필굿 자리**: 물빛·Flick과 같은 큰 블록(세 번째, 좌우가 번갈아 놓이도록 물빛 방향). 제목 '옮겨 적는 대신 잘라서', 한 줄 소개, 살아 있는 작은 시연(떠 있는 버튼 → 끌어서 고르기 → 노트에 그림·글자·번역으로 붙여넣기), 사실 3줄, 'Google Play에서 받기'와 '자세히'.
- **제품 페이지** `/capture/`(한국어)와 `/capture/en/`(영어): 아이콘·이름·한 줄 소개·사실형 정의 문장, Google Play 배지, 같은 시연(크게), 쓰는 순서 3단계, 할 수 있는 것, 무료·광고 제거·PRO 비교 표, 자주 묻는 질문(펼친 채). 위쪽 줄의 KO/EN은 다른 언어 주소로 가는 링크이고 고른 언어를 홈과 같은 자리(localStorage `lang`)에 기억한다.
- **개인정보 처리방침** `/capture/privacy/`와 `/capture/en/privacy/`: 앱 코드(`philaxis/spen-capture`)에서 확인한 것만 적는다 — 기기 안에 머무는 것, 기기 밖으로 나가는 것(Firebase 애널리틱스·익명 로그인·Firestore 사용량·Cloud Functions·Gemini 글자 추출·내 Gemini 키·Remote Config·AdMob·Google Play 결제·허가받은 Google 로그인), 권한, 보관과 지우기, 국외 이전, 아동, 바뀔 때, 연락처.
- **바꿔 끼울 자리 한 곳**: 아이콘 경로, 플레이 주소, 메일, 무료 한도, 번역 언어 목록은 `app/capture/facts.ts` 한 파일에. spen-capture#4(아이콘)·#5(새 기능) 결과는 이 파일과 `public/capture/`의 그림만 바꾸면 된다.
- **검색(SEO·GEO)**:
  - 페이지마다 제목·설명·정식 주소, 제품 페이지와 처리방침은 `ko`·`en`·`x-default` hreflang.
  - 공유 미리보기 그림 1200×630 `public/capture/og-ko.png`·`og-en.png`.
  - JSON-LD: 홈 `WebSite`+`Person`, 제품 페이지 `SoftwareApplication`(평점 없음, offers는 무료 0만)과 `FAQPage`(화면에 보이는 질문과 같은 글).
  - `app/sitemap.ts` → `sitemap.xml`(언어 짝 포함), `app/robots.ts` → `robots.txt`, `app/llms.txt/route.ts` → `llms.txt`(facts에서 만듦). 모두 정적 내보내기.
  - 홈 설명에 캡처 필굿을 더함.
- **주소 모양**: `next.config.ts`에 `trailingSlash: true`(GitHub Pages가 `/capture/`를 `capture/index.html`로 바로 내줌).

### 고르지 않은 것
- 영어를 한 주소에서 단추로만 바꾸기(홈 방식): 영어 글이 검색에 잡히지 않고 hreflang을 쓸 수 없다. 홈은 그대로 두고, 제품 페이지와 처리방침만 언어별 주소.
- 여러 루트 레이아웃(`app/(ko)`, `app/(en)`)으로 `<html lang>`을 나누기: 404 페이지에 실험 기능(`globalNotFound`)이 필요하다. 영어 페이지는 본문을 `lang="en"`으로 감싸고, 화면이 열리면 `<html lang>`도 `en`으로 바꾼다.
- 공유 그림을 빌드 때 그리기(`opengraph-image.tsx`): 한글 글꼴 파일을 레포에 넣거나 빌드 때 받아야 한다. 그림 두 장을 만들어 넣고, 만드는 원본 `scripts/capture-og.html`을 둔다.
- 질문을 접는 아코디언: 답이 가려지고, AI 답변·검색이 읽는 글이 화면 뒤로 숨는다. 모두 펼친 채 둔다.
- 가격 숫자 적기: 나라마다 Google Play 가격이 다르다. 표는 무엇이 다른지만 적고 가격은 플레이 스토어로 보낸다(사용자 판정에서 물음).
- 빛나는 점: 새로 넣는 캡처 자리와 페이지에는 빛나는 점이 없다. 커서는 가는 세로 막대, 고르는 손은 펜 그림.

## Capabilities

### New Capabilities
- `capture-page`: 홈의 캡처 필굿 자리, 제품 페이지(한·영), 시연, 바꿔 끼울 자리.
- `capture-privacy`: 앱 코드와 맞춘 처리방침(한·영).
- `site-search`: 제목·설명·정식 주소·hreflang, 공유 그림, JSON-LD, 사이트맵·robots·llms.txt.

## Impact

- 새 파일: `app/capture/**`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, `public/capture/*`, `scripts/capture-og.html`.
- 바뀌는 파일: `app/site.tsx`·`app/copy.ts`(홈 블록), `app/layout.tsx`(설명·정식 주소), `app/page.tsx`(JSON-LD), `app/globals.css`(캡처 스타일), `next.config.ts`(trailingSlash).
- 공개(main에 합치기)는 사용자가 폰·PC 그림을 보고 ✅한 다음. 그 뒤 할 일: Google Search Console·네이버 서치어드바이저 등록과 사이트맵 제출, 앱 안 처리방침 링크와 Play Console의 처리방침 주소 바꾸기(spen-capture 쪽).
