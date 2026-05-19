import type { Metadata } from "next";
import { Kufam, Press_Start_2P } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const kufam = Kufam({
  variable: "--font-kufam",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gamevault",
  description: "gamevault is a website for you to explore Indonesian popular games, be the first! be the player!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kufam.variable} ${pressStart.variable} h-full antialiased`}
    >

      <body className="min-h-full w-full flex flex-col font-sans bg-fixed from-primary to-darkPrimary bg-gradient-to-br">
         <Navbar />

         <main className="">
          {children}
         </main>
      </body>
    </html>
  );
}
