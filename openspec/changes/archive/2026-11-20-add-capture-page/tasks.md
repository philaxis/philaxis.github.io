# Tasks

## 1. 만들기(브랜치 `capture-page`, 초안 PR)

- [x] 1.1 스펙 — 확인: `openspec validate add-capture-page --strict`
- [x] 1.2 `app/capture/facts.ts`(바꿔 끼울 값 한 곳)와 `public/capture/icon.png`·배지 그림 — 확인: 홈·제품 페이지·JSON-LD·llms.txt가 같은 값을 씀(`rg` 로 하드코딩 없음)
- [x] 1.3 시연 `app/capture/demo.tsx`(세 모양, 단추 고정, 화면 밖에서 멈춤, 스크립트 없이 마지막 장면) — 확인: 390px·PC 화면 사진, 자바스크립트 끈 화면
- [x] 1.4 홈 블록(Flick 다음) — 확인: 390px·PC 화면 사진, KO/EN 바꿔 보기
- [x] 1.5 제품 페이지 `/capture/`·`/capture/en/` — 확인: 390px·PC 화면 사진, 가로 넘침 없음
- [x] 1.6 처리방침 `/capture/privacy/`·`/capture/en/privacy/` — 확인: 옛 방침의 받는 곳이 모두 있음, 화면 사진
- [x] 1.7 검색: 메타·정식 주소·hreflang, 공유 그림 2장(`scripts/capture-og.html`), JSON-LD, `sitemap.xml`·`robots.txt`·`llms.txt` — 확인: `out/`에서 스크립트로 머리·JSON-LD·사이트맵 대조
- [x] 1.8 `npm run build` 통과, `out/`을 판단용 띠를 붙여 :5777에 — 확인: 띠는 미리보기 복사본에만(레포 코드에 없음)

## 2. 사용자 ✅ 뒤(남에게 나가는 일)

- [ ] 2.1 PR을 main에 합쳐 GitHub Pages로 내보내기
- [ ] 2.2 Google Search Console·네이버 서치어드바이저 등록(HTML 파일 또는 메타 태그), 사이트맵 제출
- [ ] 2.3 앱 설정의 처리방침 링크와 Play Console의 처리방침 주소를 `https://philaxis.github.io/capture/privacy/`로(spen-capture 쪽 일)
- [ ] 2.4 spen-capture#4 아이콘·#5 새 기능이 정해지면 `facts.ts`와 `public/capture/` 그림 바꾸기, 공유 그림 다시 찍기
