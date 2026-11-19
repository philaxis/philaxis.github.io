## ADDED Requirements

### Requirement: 처리방침은 Firebase와 Gemini로 가는 것을 적는다
`/capture/privacy/`(한국어)와 `/capture/en/privacy/`(영어)는 앱 코드(`philaxis/spen-capture`, 11-20 main)에서 확인한 Google 쪽 흐름을 받는 곳 표에 적어야 한다(MUST): Firebase 애널리틱스(화면·앱 안 행동·사용자 속성, 광고 ID는 모으지 않음), 익명 로그인과 Firestore 사용 횟수, 서울 리전 Cloud Functions의 횟수 확인, Firebase AI Logic을 거친 Gemini 글자 추출(고른 부분 그림과 지시문), 내 Gemini 키 출력, Remote Config.

#### Scenario: 글자 추출 줄
- **WHEN** `/capture/privacy/`의 '기기 밖으로 나가는 것' 표를 본다
- **THEN** Gemini 줄에 '글자 추출을 켠 워크플로우에서 캡처할 때만', '고른 부분 그림', 'Google LLC'가 보인다

#### Scenario: 옛 처리방침과 견주기
- **WHEN** 옛 처리방침(https://philgoodlabhelp-spec.github.io/policy/)에 있던 받는 곳(Google Play 서비스, AdMob, Firebase 애널리틱스)을 찾는다
- **THEN** 새 처리방침에도 모두 있고, 옛 방침에 없던 Gemini·Firestore·Cloud Functions·Remote Config가 더 있다

### Requirement: 처리방침은 광고·결제·로그인을 적는다
받는 곳 표에는 Google AdMob(리워드·배너 광고, 광고 ID·IP·기기 정보, IP로 추정한 대략적인 위치), Google Play 결제(구매·구독 기록, 카드 정보는 앱이 보지 않음), 개발자가 허가한 계정만 쓰는 Google 로그인(이메일로 권한 문서를 읽음)도 있어야 한다(MUST).

#### Scenario: 광고 줄
- **WHEN** 받는 곳 표의 AdMob 줄을 본다
- **THEN** 광고 ID와 대략적인 위치가 적혀 있다

### Requirement: 캡처는 기기 안에 머문다고 적는다
처리방침은 캡처한 그림이 기기 안(클립보드용 앱 캐시, 고른 폴더 `Pictures/CapturePhilgood/...`)에만 있고, 글자 추출과 사용자가 직접 고른 공유 말고는 밖으로 나가지 않으며, 화면 캡처 권한(MediaProjection)은 고른 순간의 한 장만 쓰고 녹화하지 않는다고 적어야 한다(MUST).

#### Scenario: 기기 안 문단
- **WHEN** '기기 안에 머무는 것'을 읽는다
- **THEN** 캡처 그림, 워크플로우 설정, 내 Gemini 키가 기기 안에만 있다는 말이 있다

### Requirement: 한국 법이 묻는 항목을 쉬운 말로 담는다
처리방침은 처리 목적, 항목, 보관 기간과 지우는 법, 제3자 제공·처리 위탁(받는 곳 표), 국외 이전(Google LLC, 미국 등, 항목·때·방법), 이용자의 권리(보기·고치기·지우기 요청, 메일로), 안전 조치, 만 14세 미만 아동, 바뀔 때 알리는 법, 개인정보 보호책임자와 연락처(philgood.lab.help@gmail.com), 시행일을 가져야 한다(MUST). 문장은 짧은 해요체(영어는 평이한 문장)로 쓴다.

#### Scenario: 지우기 요청
- **WHEN** '보관과 지우기'를 읽는다
- **THEN** 앱 지우기로 기기 안 데이터가 사라진다는 것, 익명 ID의 사용 기록을 지우려면 메일로 부탁하면 된다는 것, 애널리틱스 보관은 최대 14개월이라는 것이 보인다

### Requirement: 처리방침은 제품 페이지와 서로 잇는다
제품 페이지의 위쪽 줄·바닥과 홈 블록에서 그 언어의 처리방침으로 갈 수 있어야 하고(MUST), 처리방침 위쪽에는 제품 페이지로 돌아가는 링크와 KO/EN이 있다.

#### Scenario: 영어 처리방침
- **WHEN** `/capture/en/`의 바닥에서 'Privacy policy'를 누른다
- **THEN** `/capture/en/privacy/`가 열리고 같은 표가 영어로 보인다
