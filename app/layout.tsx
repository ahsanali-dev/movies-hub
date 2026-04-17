import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "CineStream | Premium Movie Experience",
  description: "Experience the best of cinema on CineStream.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="flex min-h-screen bg-[#0a0a0b] text-white antialiased"
        suppressHydrationWarning
      >
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
        <Sidebar />
        <div className="flex-1 md:ml-20 w-full overflow-x-hidden pb-16 md:pb-0">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
