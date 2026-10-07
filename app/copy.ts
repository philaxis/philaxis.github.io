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
      ["만든", "것들."],
    ],
    lede: "생각이 손보다 빠를 때가 많아서, 그 사이에 걸리는 걸 하나씩 치웁니다.",
    sections: {
      voice: { title: "손 대신 말로", sub: "voice → cursor" },
      notes: { title: "노트가 흐름을 안 끊게", sub: "notes → found" },
      also: { title: "그 밖에", sub: "small tools" },
      bench: { title: "작업대", sub: "my setup" },
    },
    mulbit: {
      name: "물빛",
      pitch: "Windows에서 말하면, 커서 자리에 바로 써집니다.",
      facts: [
        "내 PC에서 오프라인으로 돌아요. Gemini 키는 넣고 싶을 때만.",
        "G 키를 꾹 누른 채 말하고, 떼면 끝. 마우스 버튼에 걸어도 돼요.",
        "받아 적은 글은 커서 자리에 바로 붙여 넣어요.",
      ],
      download: "내려받기 (Windows)",
      site: "사이트 ↗",
      demo: {
        channel: "# 팀-채널",
        text: "회의록 정리해서 팀 채널에 올려줘",
        hold: "꾹",
        pasted: "붙여넣음",
      },
    },
    rel: {
      line: "아무 데나 써 두고, 나중에 찾기.",
      query: "회의 메모",
      legend: ["내용", "자리", "링크"],
    },
    lens: {
      line: "마크다운 원문 그대로 쓰면서, 렌더링은 커서 옆에서.",
      raw: ["## 회의", "- [ ] 할 일 정리", "- [x] 자료 보내기", "$E=mc^2$", "**굵게** 쓴 메모"],
      gif: "실제 화면 GIF ↗",
    },
    also: [
      { name: "Gemini Transcribe", line: "녹음 파일을 시간이 찍힌 TXT로", href: `${GH}/gemini-transcribe` },
      { name: "Extract Highlight", line: "하이라이트를 제목 구조째 개요로", href: `${GH}/obsidian-extract-highlight` },
      { name: "History", line: "노트를 언제 만들고 고쳤는지 달력으로", href: `${GH}/history` },
      { name: "Topology Map", line: "Canvas 연결을 한눈에", href: `${GH}/topology-map` },
    ],
    desk: {
      keyboard: "스플릿 키보드 · TOTEM 38키 (ZMK) ↗",
      mic: "마이크 → 물빛으로 받아쓰기",
      mouse: "마우스 · Logitech M840 L",
      desk: "스탠딩 책상",
      monitors: "듀얼 세로 모니터",
      chair: "허먼밀러",
      note: "단축키는 AutoHotkey, 만드는 건 AI 에이전트 여러 대 병렬.",
      alt: "작업대 그림: 스탠딩 책상 위 세로 모니터 두 대와 붐 암 마이크, TOTEM 스플릿 키보드, M840 L 마우스, 그리고 허먼밀러 의자.",
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
      ["because", "I", "hate", "losing", "flow."],
    ],
    lede: "My head usually runs ahead of my hands, so I keep clearing what gets in between.",
    sections: {
      voice: { title: "Talk instead of type", sub: "voice → cursor" },
      notes: { title: "Notes that keep up", sub: "notes → found" },
      also: { title: "Also", sub: "small tools" },
      bench: { title: "Workbench", sub: "my setup" },
    },
    mulbit: {
      name: "mulbit",
      pitch: "Talk on Windows, and the words land right where your cursor is.",
      facts: [
        "Runs offline on your own PC. A Gemini key is optional.",
        "Hold G, talk, let go. A mouse button works too.",
        "When it's done, it pastes right at your cursor.",
      ],
      download: "Download for Windows",
      site: "Site ↗",
      demo: {
        channel: "# team-channel",
        text: "summarize the meeting notes and post them to the team channel",
        hold: "hold",
        pasted: "pasted",
      },
    },
    rel: {
      line: "Write it anywhere. Find it later.",
      query: "meeting notes",
      legend: ["content", "place", "links"],
    },
    lens: {
      line: "Stay in raw Markdown; see it rendered right by your cursor.",
      raw: ["## Meeting", "- [ ] to-do", "- [x] send files", "$E=mc^2$", "a **bold** note"],
      gif: "Real screen GIF ↗",
    },
    also: [
      { name: "Gemini Transcribe", line: "Recordings into timestamped TXT", href: `${GH}/gemini-transcribe` },
      { name: "Extract Highlight", line: "Highlights into an outline, headings kept", href: `${GH}/obsidian-extract-highlight` },
      { name: "History", line: "A calendar of when notes were made and edited", href: `${GH}/history` },
      { name: "Topology Map", line: "Canvas connections at a glance", href: `${GH}/topology-map` },
    ],
    desk: {
      keyboard: "Split keyboard · TOTEM 38 keys (ZMK) ↗",
      mic: "Mic → talk and it types (mulbit)",
      mouse: "Mouse · Logitech M840 L",
      desk: "Standing desk",
      monitors: "Two portrait monitors",
      chair: "Herman Miller",
      note: "Hotkeys run on AutoHotkey; the building is several AI agents at once.",
      alt: "My desk: a standing desk with two portrait monitors, a boom-arm mic, a TOTEM split keyboard, an M840 L mouse and a Herman Miller chair.",
    },
    copyright: "© 2026 philaxis",
  },
} satisfies Record<Lang, unknown>;

export type Copy = (typeof COPY)["ko"];
