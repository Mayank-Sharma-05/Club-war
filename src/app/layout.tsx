import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Data Breach: Critical Countdown | DSS Cybersecurity Challenge",
  description: "A professional cybersecurity challenge by the Data Science Society. Neutralize three system threats before the countdown concludes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#F8FAFC] text-[#0F172A] antialiased flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
