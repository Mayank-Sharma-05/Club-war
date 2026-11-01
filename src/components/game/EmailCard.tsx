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
    tagName: "Campus Inbox",
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
    tagName: "Direct Dispatch",
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
    tagName: "System Notice",
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
    tagName: "Official Memo",
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
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-sm hover:-translate-y-0.5 ${
        isRight
          ? "bg-white border-emerald-600 ring-2 ring-emerald-600/25"
          : isWrong
          ? "bg-rose-50/70 border-rose-300 opacity-90"
          : isSelected
          ? `${theme.cardBg} ${theme.ringColor} ring-2 ring-offset-1`
          : `${theme.cardBg} ${theme.borderColor} ${theme.borderHover}`
      }`}
    >
      {/* Distinct Colored Top Accent Bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${theme.topBarGradient}`} />

      {/* Evaluation Status Banner */}
      {isRight && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-medium font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Threat Confirmed — Malicious Phishing Payload</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-rose-50 border-b border-rose-200 text-rose-800 text-xs font-medium font-sans">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Legitimate Communication — 1 Integrity Life Deducted</span>
        </div>
      )}

      {/* Modern Header Section with Avatar, Sender Info & Folder Tag */}
      <div className={`${theme.headerBg} px-5 py-3 border-b ${theme.borderColor} flex items-start justify-between gap-3`}>
        <div className="flex items-start space-x-3 min-w-0">
          {/* Colored circular sender avatar */}
          <div
            className={`w-9 h-9 rounded-full ${theme.avatarBg} ${theme.avatarText} border ${theme.avatarBorder} flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 shadow-2xs font-heading`}
          >
            {initials}
          </div>

          {/* Sender Details */}
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-slate-900 leading-tight truncate font-sans">
              {email.senderName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-[280px] sm:max-w-[320px]">
              &lt;{email.senderEmail}&gt;
            </div>
          </div>
        </div>

        {/* Date & Category Tag Badge */}
        <div className="flex flex-col items-end shrink-0 pt-0.5">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder} mb-1 font-sans`}>
            {theme.tagName}
          </span>
          <span className="text-[11px] text-slate-500 font-sans whitespace-nowrap">
            {email.date}
          </span>
        </div>
      </div>

      {/* Main Email Content Body */}
      <div className="p-5 flex flex-col flex-grow bg-white/70">
        {/* Subject Line */}
        <h3 className="text-base font-semibold text-slate-900 leading-snug mb-3 font-sans tracking-tight">
          {email.subject}
        </h3>

        {/* Realistic Email Copy */}
        <div className="text-sm text-slate-700 leading-relaxed font-sans font-normal mb-4 whitespace-pre-line flex-grow">
          {email.body}
        </div>

        {/* Link or Attachment Area */}
        {email.linkOrAttachment && (
          <div className="mb-3">
            {email.linkOrAttachment.type === "link" ? (
              /* Link Component */
              <div className="flex items-start space-x-2.5 text-xs bg-blue-50/70 hover:bg-blue-50 px-3.5 py-2.5 rounded-xl border border-blue-200 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-medium text-blue-800 text-[11px] font-sans">
                    {email.linkOrAttachment.text || "View Resource Link"}
                  </div>
                  {email.linkOrAttachment.url && (
                    <div className="text-[11px] font-mono text-blue-600 break-all underline mt-0.5">
                      {email.linkOrAttachment.url}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Attachment Component */
              <div className="flex items-center justify-between text-xs bg-amber-50/70 hover:bg-amber-50 px-3.5 py-2.5 rounded-xl border border-amber-200 transition-colors">
                <div className="flex items-center space-x-2 min-w-0">
                  <Paperclip className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="font-mono text-[11px] font-medium text-amber-900 truncate">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-[11px] text-amber-800 shrink-0 font-mono ml-2 font-medium bg-amber-100 px-1.5 py-0.5 rounded">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className={`p-3.5 bg-white border-t ${theme.borderColor} mt-auto`}>
        {status === "idle" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-rose-50/60 border border-rose-300 hover:border-rose-400 text-xs font-medium text-rose-700 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs hover:shadow-xs font-sans"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flag as Phishing Attack</span>
          </button>
        ) : isRight ? (
          <div className="w-full py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-medium text-emerald-800 flex items-center justify-center space-x-1.5 font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed Phishing Attack</span>
          </div>
        ) : (
          <div className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-medium text-slate-600 flex items-center justify-center space-x-1.5 font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Verified Safe Communication</span>
          </div>
        )}
      </div>
    </div>
  );
};
