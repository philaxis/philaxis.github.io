// Every piece of copy on the page, per language. Korean is what the server renders.

export type Lang = "ko" | "en";

const GH = "https://github.com/philaxis";

export const LINKS = {
  github: GH,
  mail: "mailto:philaxis.dev@gmail.com",
  email: "philaxis.dev@gmail.com",
  mulbitExe: `${GH}/mulbit/releases/latest/download/mulbit.exe`,
  mulbitSite: "https://philaxis.github.io/mulbit/",
  mulbit: `${GH}/mulbit`,
  flickExe: `${GH}/flick/releases/latest/download/Flick.exe`,
  flickSite: "https://philaxis.github.io/flick/",
  flick: `${GH}/flick`,
  rel: `${GH}/rel-search`,
  lens: `${GH}/markdown-lens`,
  lensGif: "https://raw.githubusercontent.com/philaxis/markdown-lens/HEAD/markdown-lens-demo-v3.gif",
  totem: `${GH}/zmk-config-totem`,
};

export const COPY = {
  ko: {
    who: "필락시스 · 서울",
    mail: "메일",
    langLabel: "언어",
    title: "필락시스 · philaxis",
    hero: [
      ["흐름", "끊기는", "게", "싫어서"],
      ["만든", "것들"],
    ],
    // "흐름 끊기는 게 / 싫어서 만든 것들"
    heroMobileBreak: 3,
    lede: "생각이 손보다 빠를 때가 많아서, 그 사이에 걸리는 걸 하나씩 치웁니다.",
    sections: {
      voice: { title: "손 대신 말로", sub: "voice → cursor" },
      screens: { title: "한 줄 대신 격자로", sub: "desktops → grid" },
      notes: { title: "노트가 흐름을 안 끊게", sub: "notes → found" },
      also: { title: "그 밖에", sub: "small tools" },
      bench: { title: "작업대", sub: "my setup" },
    },
    mulbit: {
      name: "물빛",
      pitch: "Windows에서 말하면, 커서 자리에 바로 써집니다.",
      facts: [
        "내 PC에서 오프라인으로 돌아요. Gemini 키는 넣고 싶을 때만.",
        "G를 길게 누르면 시작, 다시 길게 누르면 끝. 짧게 치면 그냥 g예요. 마우스 버튼에 걸어도 돼요.",
        "받아 적은 글은 커서 자리에 바로 붙여 넣어요.",
      ],
      download: "내려받기 (Windows)",
      site: "사이트 ↗",
      demo: {
        channel: "# 팀-채널",
        text: "회의록 정리해서 팀 채널에 올려줘",
        hold: "길게",
        listening: "듣는 중",
        pasted: "붙여넣음",
      },
    },
    flick: {
      name: "Flick",
      alt: "플릭",
      pitch: "Windows 가상 데스크톱을 격자로 놓고, 마우스를 휙 밀어 옮겨 다닙니다.",
      facts: [
        "Windows는 가상 데스크톱을 한 줄로 길게 늘어놓아서, 많아지면 뭐가 어디 있는지 놓쳐요. 여기선 줄 하나가 일 하나, 그 줄의 칸들이 그 일의 화면이에요.",
        "마우스 옆 버튼을 누른 채 휙 밀면 한 칸. 누르고 있는 동안 커서는 제자리예요. 키나 키 조합에 걸어도 돼요.",
        "위아래로 가면 그 줄에서 마지막에 있던 칸으로 가요. 지도는 그 칸들이 한 열에 오도록 줄을 옆으로 밀어 맞춰요.",
        "버튼을 그냥 클릭하면 작업 보기 같은 보드가 열려요. 지금 칸의 창을 크게 보고, 끌어서 다른 칸으로 옮겨요.",
      ],
      download: "내려받기 (Windows 11)",
      site: "사이트 ↗",
      meta: "Rust · 0.7 MB exe 하나 · 무료 · MIT",
      note: "지금은 Windows 11 23H2에서만 돼요. 24H2는 아직.",
      demo: {
        rows: ["개발", "글", "연락"],
        line: "Windows · 한 줄",
        grid: "Flick · 격자",
        hold: "누른 채",
        flick: "휙",
        label: "Flick 데모. 방향키를 누르거나 칸을 클릭하면 옮겨 갑니다.",
        dirs: ["왼쪽", "위", "아래", "오른쪽"],
      },
    },
    rel: {
      line: "아무 데나 써 두고, 나중에 찾기.",
      query: "회의 메모",
      legend: ["내용", "자리", "링크"],
    },
    lens: {
      line: "마크다운 원문 그대로 쓰면서, 렌더링은 커서 옆에서.",
      raw: ["## 회의", "오늘 정한 것", "- [x] 자료 보내기", "- [ ] 할 일 정리", "$E=mc^2$", "**굵게** 쓴 메모", "> 다음 주에 다시"],
      gif: "실제 화면 GIF ↗",
    },
    also: [
      { name: "Gemini Transcribe", line: "녹음 파일을 시간이 찍힌 TXT로", href: `${GH}/gemini-transcribe` },
      { name: "History", line: "노트를 언제 만들고 고쳤는지 달력으로", href: `${GH}/history` },
      { name: "Topology Map", line: "Canvas 연결을 한눈에", href: `${GH}/topology-map` },
    ],
    desk: {
      keyboard: "스플릿 키보드 ↗",
      mic: "마이크 → 물빛으로 받아쓰기",
      mouse: "마우스",
      desk: "스탠딩 책상",
      monitors: "듀얼 세로 모니터",
      chair: "의자",
      note: "단축키는 AutoHotkey, 만드는 건 AI 에이전트 여러 대 병렬.",
      alt: "작업대 그림: 스탠딩 책상 위 세로 모니터 두 대와 붐 암 마이크, 스플릿 키보드, 마우스.",
    },
    copyright: "© 2026 필락시스",
  },
  en: {
    who: "philaxis · Seoul",
    mail: "Mail",
    langLabel: "Language",
    title: "philaxis",
    hero: [
      ["Things", "I", "built"],
      ["because", "I", "hate", "losing", "flow"],
    ],
    heroMobileBreak: undefined as number | undefined,
    lede: "My head usually runs ahead of my hands, so I keep clearing what gets in between.",
    sections: {
      voice: { title: "Talk instead of type", sub: "voice → cursor" },
      screens: { title: "A grid instead of a line", sub: "desktops → grid" },
      notes: { title: "Notes that keep up", sub: "notes → found" },
      also: { title: "Also", sub: "small tools" },
      bench: { title: "Workbench", sub: "my setup" },
    },
    mulbit: {
      name: "mulbit",
      pitch: "Talk on Windows, and the words land right where your cursor is.",
      facts: [
        "Runs offline on your own PC. A Gemini key is optional.",
        "Hold G to start, hold it again to stop. A quick tap still types g. A mouse button works too.",
        "When it's done, it pastes right at your cursor.",
      ],
      download: "Download for Windows",
      site: "Site ↗",
      demo: {
        channel: "# team-channel",
        text: "summarize the meeting notes and post them to the team channel",
        hold: "hold",
        listening: "listening",
        pasted: "pasted",
      },
    },
    flick: {
      name: "Flick",
      alt: "플릭",
      pitch: "Windows virtual desktops laid out as a grid you flick through with the mouse.",
      facts: [
        "Windows lays virtual desktops out in one long line, so with many of them I lose track of what is where. Here a row is one job, and its cells are that job's screens.",
        "Hold the mouse side button and flick to move one cell. The cursor stays put while you hold. A key or a key chord works too.",
        "Going up or down lands on the cell you last left in that row. The map slides each row sideways so those cells line up in one column.",
        "Just click the button and a board opens, like Task View: big previews of this cell's windows, and you drag them to other cells.",
      ],
      download: "Download for Windows 11",
      site: "Site ↗",
      meta: "Rust · one 0.7 MB exe · free · MIT",
      note: "Windows 11 23H2 only for now. 24H2 isn't supported yet.",
      demo: {
        rows: ["dev", "writing", "chat"],
        line: "Windows · one line",
        grid: "Flick · a grid",
        hold: "hold",
        flick: "flick",
        label: "Flick demo. Press the arrow keys or click a cell to move.",
        dirs: ["left", "up", "down", "right"],
      },
    },
    rel: {
      line: "Write it anywhere. Find it later.",
      query: "meeting notes",
      legend: ["content", "place", "links"],
    },
    lens: {
      line: "Stay in raw Markdown; see it rendered right by your cursor.",
      raw: ["## Meeting", "What we decided", "- [x] send files", "- [ ] to-do", "$E=mc^2$", "a **bold** note", "> revisit next week"],
      gif: "Real screen GIF ↗",
    },
    also: [
      { name: "Gemini Transcribe", line: "Recordings into timestamped TXT", href: `${GH}/gemini-transcribe` },
      { name: "History", line: "A calendar of when notes were made and edited", href: `${GH}/history` },
      { name: "Topology Map", line: "Canvas connections at a glance", href: `${GH}/topology-map` },
    ],
    desk: {
      keyboard: "Split keyboard ↗",
      mic: "Mic → talk and it types (mulbit)",
      mouse: "Mouse",
      desk: "Standing desk",
      monitors: "Two portrait monitors",
      chair: "Chair",
      note: "Hotkeys run on AutoHotkey; the building is several AI agents at once.",
      alt: "My desk: a standing desk with two portrait monitors, a boom-arm mic, a split keyboard and a mouse.",
    },
    copyright: "© 2026 philaxis",
  },
} satisfies Record<Lang, unknown>;

export type Copy = (typeof COPY)["ko"];
