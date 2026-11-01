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
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#F4F6F8] text-[#17212B] antialiased flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
