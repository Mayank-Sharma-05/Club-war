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
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} h-full`}>
      <body className="min-h-full bg-[#F4F6F8] text-[#17212B] antialiased flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
