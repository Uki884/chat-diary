import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/mode-toggle";
import { FooterNav } from "@/components/FooterNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link
          href="/fonts/GenJyuuGothicMedium/GenJyuuGothic-Medium.css"
          type="text/css"
          rel="stylesheet"
        />
        <link
          href="/fonts/GenJyuuGothicRegular/GenJyuuGothic-Regular.css"
          type="text/css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-[#f7f3e8] dark:bg-[#1c1c1c] text-[#5c4b31] dark:text-[#e6e0cc]">
            <header className="container mx-auto p-4 flex justify-between items-center border-b border-[#d3c9a9] dark:border-[#4a4a4a]">
              <h1 className="text-3xl font-bold">My Diary</h1>
              <ModeToggle />
            </header>
            <main className="container mx-auto p-4 pb-20">{children}</main>
            <FooterNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
