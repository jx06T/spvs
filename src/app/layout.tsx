import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/app/components/ClientLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2025 建北電資聯合春遊 RPG 隱藏結局",
  description: "猜猜看這要做啥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=LXGW+WenKai+TC&family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`h-[100svh] w-full ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="w-full h-full relative overflow-x-hidden overflow-y-auto">
          <div className=" absolute origin-center w-[200%] h-[60%] bg-black/50 top-[12%] left-[-50%] " style={{ transform: "rotate(-8deg)" }}></div>
          <div className=" fixed top-0 left-0 rounded-xl text-bg h-full w-full"></div>
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}