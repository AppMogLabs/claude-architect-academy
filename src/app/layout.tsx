import type { Metadata } from "next";
import { VT323, JetBrains_Mono } from "next/font/google";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Claude Architect Academy",
  description:
    "A gamified, interactive learning platform that teaches developers to build AI systems with Claude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#00ff41] font-[family-name:var(--font-jetbrains)]">
        <NavBar />
        <main className="flex-1 flex flex-col">{children}</main>
        <CRTOverlay />
      </body>
    </html>
  );
}
