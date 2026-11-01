"use client";

import React from "react";
import { EmailCardData } from "@/types/game";
import { Paperclip, ExternalLink, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";

interface EmailCardProps {
  email: EmailCardData;
  index?: number;
  isSelected: boolean;
  status: "idle" | "correct" | "incorrect";
  onSelect: () => void;
  disabled: boolean;
}

interface CardTheme {
  name: string;
  topBarGradient: string;
  cardBg: string;
  headerBg: string;
  borderColor: string;
  borderHover: string;
  avatarBg: string;
  avatarText: string;
  avatarBorder: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  tagName: string;
  ringColor: string;
}

const CARD_THEMES: CardTheme[] = [
  // 0: Soft Sky Blue
  {
    name: "blue",
    topBarGradient: "from-blue-500 via-indigo-500 to-sky-400",
    cardBg: "bg-[#FAFCFF]",
    headerBg: "bg-[#F1F6FD]",
    borderColor: "border-[#D6E4F5]",
    borderHover: "hover:border-[#93C5FD]",
    avatarBg: "bg-[#DBEAFE]",
    avatarText: "text-[#1D4ED8]",
    avatarBorder: "border-[#BFDBFE]",
    tagBg: "bg-[#EFF6FF]",
    tagText: "text-[#1D4ED8]",
    tagBorder: "border-[#BFDBFE]",
    tagName: "CAMPUS INBOX",
    ringColor: "ring-[#3B82F6]/30 border-[#3B82F6]",
  },
  // 1: Lavender / Violet
  {
    name: "lavender",
    topBarGradient: "from-violet-500 via-purple-500 to-fuchsia-400",
    cardBg: "bg-[#FAF8FF]",
    headerBg: "bg-[#F4F0FD]",
    borderColor: "border-[#E3DCF5]",
    borderHover: "hover:border-[#C4B5FD]",
    avatarBg: "bg-[#EDE9FE]",
    avatarText: "text-[#6D28D9]",
    avatarBorder: "border-[#DDD6FE]",
    tagBg: "bg-[#F5F3FF]",
    tagText: "text-[#6D28D9]",
    tagBorder: "border-[#DDD6FE]",
    tagName: "DIRECT DISPATCH",
    ringColor: "ring-[#8B5CF6]/30 border-[#8B5CF6]",
  },
  // 2: Fresh Teal / Mint
  {
    name: "teal",
    topBarGradient: "from-teal-500 via-emerald-500 to-cyan-400",
    cardBg: "bg-[#F8FCFA]",
    headerBg: "bg-[#EDF7F4]",
    borderColor: "border-[#D1EBE3]",
    borderHover: "hover:border-[#99F6E4]",
    avatarBg: "bg-[#CCFBF1]",
    avatarText: "text-[#0F766E]",
    avatarBorder: "border-[#99F6E4]",
    tagBg: "bg-[#F0FDFA]",
    tagText: "text-[#0F766E]",
    tagBorder: "border-[#99F6E4]",
    tagName: "SYSTEM NOTICE",
    ringColor: "ring-[#0D9488]/30 border-[#0D9488]",
  },
  // 3: Warm Peach / Amber
  {
    name: "peach",
    topBarGradient: "from-amber-500 via-orange-400 to-rose-400",
    cardBg: "bg-[#FFFDFC]",
    headerBg: "bg-[#FDF4EA]",
    borderColor: "border-[#F4DFCC]",
    borderHover: "hover:border-[#FED7AA]",
    avatarBg: "bg-[#FFEDD5]",
    avatarText: "text-[#C2410C]",
    avatarBorder: "border-[#FED7AA]",
    tagBg: "bg-[#FFF7ED]",
    tagText: "text-[#C2410C]",
    tagBorder: "border-[#FED7AA]",
    tagName: "OFFICIAL MEMO",
    ringColor: "ring-[#F97316]/30 border-[#F97316]",
  },
];

export const EmailCard: React.FC<EmailCardProps> = ({
  email,
  index = 0,
  isSelected,
  status,
  onSelect,
  disabled,
}) => {
  const isWrong = status === "incorrect";
  const isRight = status === "correct";

  // Pick theme deterministically based on card position (slot 0, 1, 2, 3)
  const theme = CARD_THEMES[Math.abs(index) % CARD_THEMES.length];

  // Initials for avatar
  const initials = email.senderName
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
        isRight
          ? "bg-[#FFFFFF] border-[#15803D] ring-2 ring-[#15803D]/25"
          : isWrong
          ? "bg-[#FEF2F2] border-[#DC2626]/70 opacity-90"
          : isSelected
          ? `${theme.cardBg} ${theme.ringColor} ring-2 ring-offset-1`
          : `${theme.cardBg} ${theme.borderColor} ${theme.borderHover}`
      }`}
    >
      {/* 1. Distinct Colored Top Accent Bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topBarGradient}`} />

      {/* Evaluation Status Banner */}
      {isRight && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#DCFCE7] border-b border-[#15803D]/30 text-[#15803D] text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Threat Confirmed — Malicious Phishing Payload</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#FEE2E2] border-b border-[#DC2626]/30 text-[#DC2626] text-xs font-semibold">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>Legitimate Communication — 1 Integrity Life Deducted</span>
        </div>
      )}

      {/* 2. Modern Header Section with Avatar, Sender Info & Folder Tag */}
      <div className={`${theme.headerBg} px-5 py-3.5 border-b ${theme.borderColor} flex items-start justify-between gap-3`}>
        <div className="flex items-start space-x-3 min-w-0">
          {/* Colored circular sender avatar */}
          <div
            className={`w-10 h-10 rounded-full ${theme.avatarBg} ${theme.avatarText} border ${theme.avatarBorder} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs`}
          >
            {initials}
          </div>

          {/* Sender Details */}
          <div className="min-w-0">
            <div className="text-[15px] sm:text-[16px] font-semibold text-[#0F172A] leading-tight truncate font-sans">
              {email.senderName}
            </div>
            <div className="text-xs text-[#64748B] font-mono mt-0.5 truncate max-w-[280px] sm:max-w-[320px]">
              &lt;{email.senderEmail}&gt;
            </div>
          </div>
        </div>

        {/* Date & Category Tag Badge */}
        <div className="flex flex-col items-end shrink-0 pt-0.5">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder} mb-1`}>
            {theme.tagName}
          </span>
          <span className="text-[11px] text-[#64748B] font-medium whitespace-nowrap">
            {email.date}
          </span>
        </div>
      </div>

      {/* 3. Main Email Content Body */}
      <div className="p-5 flex flex-col flex-grow bg-white/70">
        {/* Subject Line */}
        <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] leading-snug mb-3 font-sans tracking-tight">
          {email.subject}
        </h3>

        {/* Realistic Email Copy */}
        <div className="text-sm sm:text-[14.5px] text-[#334155] leading-relaxed font-sans font-normal mb-4 whitespace-pre-line flex-grow">
          {email.body}
        </div>

        {/* 4. Link or Attachment Area with appropriate accent styling */}
        {email.linkOrAttachment && (
          <div className="mb-3">
            {email.linkOrAttachment.type === "link" ? (
              /* Link Component */
              <div className="flex items-start space-x-2.5 text-xs bg-[#F0F7FF] hover:bg-[#E8F2FF] px-3.5 py-2.5 rounded-xl border border-[#BFDBFE] transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-[#1D4ED8] uppercase tracking-wide text-[11px]">
                    {email.linkOrAttachment.text || "VIEW RESOURCE LINK"}
                  </div>
                  {email.linkOrAttachment.url && (
                    <div className="text-[11px] font-mono text-[#2563EB] break-all underline mt-0.5">
                      {email.linkOrAttachment.url}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Attachment Component */
              <div className="flex items-center justify-between text-xs bg-[#FFF9F2] hover:bg-[#FFF3E6] px-3.5 py-2.5 rounded-xl border border-[#FED7AA] transition-colors">
                <div className="flex items-center space-x-2 min-w-0">
                  <Paperclip className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                  <span className="font-mono text-[11px] font-semibold text-[#9A3412] truncate">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-[10px] text-[#C2410C] shrink-0 font-mono ml-2 font-medium bg-[#FFEDD5] px-1.5 py-0.5 rounded">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Action Footer */}
      <div className={`p-3.5 bg-white border-t ${theme.borderColor} mt-auto`}>
        {status === "idle" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FEF2F2] border border-[#FDA4AF] hover:border-[#F43F5E] text-xs font-semibold text-[#E11D48] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs hover:shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flag as Phishing Attack</span>
          </button>
        ) : isRight ? (
          <div className="w-full py-2 px-3 rounded-xl bg-[#DCFCE7] border border-[#15803D]/30 text-center text-xs font-semibold text-[#15803D] flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed Phishing Attack</span>
          </div>
        ) : (
          <div className="w-full py-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center text-xs font-medium text-[#64748B] flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Verified Safe Communication</span>
          </div>
        )}
      </div>
    </div>
  );
};
