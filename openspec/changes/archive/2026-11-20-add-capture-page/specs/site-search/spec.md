## ADDED Requirements

### Requirement: 페이지마다 제목·설명·정식 주소가 있다
홈, `/capture/`, `/capture/en/`, `/capture/privacy/`, `/capture/en/privacy/`는 각자의 `<title>`, 설명, 정식 주소(`https://philaxis.github.io/...`, 끝에 `/`)를 가져야 한다(MUST). 제품 페이지와 처리방침은 `hreflang` `ko`·`en`과 `x-default`(영어)를 갖고, 두 언어 페이지가 서로를 가리킨다. 사이트 주소는 `layout.tsx`의 `metadataBase` 한 곳에서 온다. 홈 설명에는 캡처 필굿이 들어간다.

#### Scenario: 한국어 제품 페이지 머리
- **WHEN** `out/capture/index.html`의 `<head>`를 본다
- **THEN** `<title>`에 '캡처 필굿'이 있고, canonical이 `https://philaxis.github.io/capture/`, `hreflang="en"`이 `https://philaxis.github.io/capture/en/`이다

### Requirement: 공유 미리보기 그림이 있다
제품 페이지는 언어별 1200×630 그림(`/capture/og-ko.png`, `/capture/og-en.png`)을 Open Graph와 X 카드(`summary_large_image`)로 가져야 한다(MUST). 그림에는 앱 아이콘, 이름, 그 언어의 한 줄 소개, 'philaxis'만 있고 빛나는 점은 없다. 원본은 `scripts/capture-og.html`(헤드리스 브라우저로 1200×630을 찍는다).

#### Scenario: 메신저에 링크
- **WHEN** `https://philaxis.github.io/capture/` 링크를 메신저에 붙인다
- **THEN** 캡처 필굿 아이콘과 한국어 한 줄 소개가 든 그림이 뜬다

### Requirement: JSON-LD는 화면에 보이는 사실만 적는다
홈은 `WebSite`와 `Person`(philaxis, GitHub 링크)을, 제품 페이지는 `SoftwareApplication`(이름, 다른 이름, Android, 최소 버전, 범주, 설명, 아이콘, 플레이 설치 주소, 만든 이, offers 무료 0)과 `FAQPage`(화면의 질문·답과 같은 글)를 가져야 한다(MUST). 평점·리뷰·다운로드 수는 넣지 않는다.

#### Scenario: 구조화 데이터 검사
- **WHEN** `out/capture/index.html`의 `application/ld+json`을 꺼내 JSON으로 읽는다
- **THEN** `SoftwareApplication`과 `FAQPage`가 있고, `FAQPage`의 질문 수와 화면의 질문 수가 같으며, `aggregateRating`이 없다

### Requirement: 사이트맵·robots·llms.txt가 있다
빌드하면 `out/sitemap.xml`(이 레포의 모든 페이지, 언어 짝 `xhtml:link`), `out/robots.txt`(모두 허용, 사이트맵 위치), `out/llms.txt`(사이트와 캡처 필굿을 사실 문장으로 소개하고 페이지 링크를 단 마크다운)가 생겨야 한다(MUST). `llms.txt`의 한도·언어·주소는 `app/capture/facts.ts`에서 온다.

#### Scenario: 사이트맵
- **WHEN** `out/sitemap.xml`을 연다
- **THEN** `https://philaxis.github.io/`, `/capture/`, `/capture/en/`, `/capture/privacy/`, `/capture/en/privacy/`가 있고 제품 페이지 두 주소에 서로의 `xhtml:link`가 있다

#### Scenario: robots
- **WHEN** `out/robots.txt`를 연다
- **THEN** 모두 허용과 `Sitemap: https://philaxis.github.io/sitemap.xml`이 있다

### Requirement: 찍어 낸 글을 만들지 않는다
검색을 노린 비슷한 페이지(키워드만 바꾼 페이지, 숨긴 글, 키워드 나열)를 만들지 않아야 한다(MUST, 구글 '대량 생산 콘텐츠' 스팸 정책). 질문과 답은 실제 사용자가 물을 만한 것이고, 답은 앱 코드에서 확인한 사실이다.

#### Scenario: 페이지 수
- **WHEN** `out/`에서 `capture` 아래 HTML을 센다
- **THEN** 제품 페이지 둘과 처리방침 둘, 모두 네 개다
