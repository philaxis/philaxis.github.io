import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "필락시스 · philaxis";
const description = "흐름 끊기는 게 싫어서 만든 것들. 말하면 커서 자리에 써 주는 물빛, 아무 데나 써 두고 나중에 찾는 노트 도구.";
const avatar = "https://avatars.githubusercontent.com/u/91249027?v=4";

export const metadata: Metadata = {
  metadataBase: new URL("https://philaxis.github.io"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "philaxis",
    locale: "ko_KR",
    type: "website",
    images: [{ url: avatar, width: 460, height: 460, alt: "philaxis" }],
  },
  twitter: { card: "summary", title, description, images: [avatar] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1219" },
  ],
};

// Runs before paint. "motion" lets CSS hold back text that JS will type or stream in;
// "dictating" hides the hero headline until it is dictated. If the client bundle has not
// hydrated within 4s, both are dropped so everything simply shows.
const boot = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('motion','dictating');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion');d.classList.remove('dictating')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@200..600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
