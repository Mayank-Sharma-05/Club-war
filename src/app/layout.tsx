import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-[#080611] text-[#F8FAFC] antialiased flex flex-col font-sans select-none overflow-x-hidden bg-cyber-grid">
        {children}
      </body>
    </html>
  );
}
