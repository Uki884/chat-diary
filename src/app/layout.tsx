import "./globals.css";

import type React from "react";
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
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-[#fffaf0] dark:bg-gray-900 text-gray-800 dark:text-white">
            <header className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-3xl font-serif font-bold">My Diary</h1>
              <nav className="flex items-center space-x-4">
                <ModeToggle />
              </nav>
            </header>
            <main className="container mx-auto p-4">{children}</main>
            <FooterNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
