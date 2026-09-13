import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juhyeok Kim",
  description: "Juhyeok Kim makes focused software for everyday problems.",
  metadataBase: new URL("https://philaxis.github.io"),
  openGraph: {
    title: "Juhyeok Kim",
    description: "Small tools for everyday problems.",
    images: ["https://avatars.githubusercontent.com/u/91249027?v=4"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
