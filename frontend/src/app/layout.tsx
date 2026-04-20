import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/bottom-nav";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nail Reservation",
  description: "ネイルサロン予約アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} h-full antialiased`}>
      <body
        className="min-h-screen flex justify-center"
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        <div className="w-full max-w-[390px] min-h-screen flex flex-col">
          <header className="neu-surface mx-2 mt-6 px-6 py-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#b08a8a]">
                Nail Salon
              </p>
              <h1 className="text-lg font-extrabold text-[#5a4f4c] leading-tight">
                Reservation
              </h1>
            </div>
            <div className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center text-[#9e9590]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </header>
          <main className="neu-surface mx-2 my-4 rounded-2xl flex flex-1 px-2 py-6 overflow-y-auto">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
