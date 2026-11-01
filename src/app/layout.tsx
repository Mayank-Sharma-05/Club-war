import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DATA BREACH: CRITICAL COUNTDOWN | DSS Cyber Arcade",
  description: "A premium cybersecurity arcade experience presented by the Data Science Society. Neutralize the threat across 3 security layers before time runs out.",
  keywords: ["cybersecurity", "game", "arcade", "data science society", "phishing", "data breach"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} h-full dark`}>
      <body className="min-h-full bg-[#070B14] text-[#F8FAFC] antialiased flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
