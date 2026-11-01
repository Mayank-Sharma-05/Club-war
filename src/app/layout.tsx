import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Breach: Critical Countdown | DSS Cybersecurity Challenge",
  description: "A professional cybersecurity arcade challenge by the Data Science Society. Neutralize three system threats before the countdown concludes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} h-full dark`}>
      <body className="min-h-full bg-[#090D14] text-[#F1F5F9] antialiased flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
