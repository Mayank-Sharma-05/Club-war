"use client";

import React from "react";
import { EmailCardData } from "@/types/game";
import { Paperclip, ExternalLink, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface EmailCardProps {
  email: EmailCardData;
  isSelected: boolean;
  status: "idle" | "correct" | "incorrect";
  onSelect: () => void;
  disabled: boolean;
}

export const EmailCard: React.FC<EmailCardProps> = ({
  email,
  isSelected,
  status,
  onSelect,
  disabled,
}) => {
  const isWrong = status === "incorrect";
  const isRight = status === "correct";

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
      className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
        isRight
          ? "bg-[#171127] border-[#39FF88] shadow-[0_0_20px_rgba(57,255,136,0.3)] ring-1 ring-[#39FF88]"
          : isWrong
          ? "bg-[#171127] border-[#FF365D] opacity-80 shadow-[0_0_15px_rgba(255,54,93,0.2)]"
          : isSelected
          ? "bg-[#171127] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]"
          : "bg-[#171127] border-[#35264D] hover:border-[#00E5FF]/60"
      }`}
    >
      {/* Top Banner Status if evaluated */}
      {isRight && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#39FF88]/15 border-b border-[#39FF88]/40 text-[#39FF88] text-xs font-mono font-bold tracking-wider">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>THREAT NEUTRALIZED — MALICIOUS PHISHING DETECTED</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#FF365D]/15 border-b border-[#FF365D]/40 text-[#FF365D] text-xs font-mono font-bold tracking-wider">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>AUTHENTIC TRANSMISSION — 1 SYSTEM LIFE PENALTY</span>
        </div>
      )}

      {/* 1. Sender Identity Section */}
      <div className="bg-[#100B1D] px-5 py-3.5 border-b border-[#35264D] flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#171127] border border-[#00E5FF]/40 flex items-center justify-center text-xs font-mono font-bold text-[#00E5FF] shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-display font-bold text-[#F8FAFC] leading-tight truncate tracking-wide">
              {email.senderName}
            </div>
            <div className="text-xs text-[#94A3B8] font-mono mt-0.5 break-all">
              &lt;{email.senderEmail}&gt;
            </div>
          </div>
        </div>
        <span className="text-[11px] text-[#64748B] shrink-0 font-mono whitespace-nowrap pt-1">
          {email.date}
        </span>
      </div>

      {/* Main Card Body Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* 2. Distinct Subject Section */}
        <h3 className="text-[17px] font-display font-bold text-[#F8FAFC] leading-snug mb-3 tracking-wide">
          {email.subject}
        </h3>

        {/* 3. Complete Email Body (16px Inter regular, light text for high contrast on dark bg) */}
        <div className="text-[15px] sm:text-[16px] text-[#E2E8F0] leading-[1.6] font-sans font-normal mb-4 whitespace-pre-line flex-grow">
          {email.body}
        </div>

        {/* 4. Link or Attachment Area */}
        {email.linkOrAttachment && (
          <div className="mb-4">
            {email.linkOrAttachment.type === "link" ? (
              /* Link area */
              <div className="flex items-start space-x-2.5 text-sm bg-[#100B1D] px-4 py-3 rounded-xl border border-[#00E5FF]/30 shadow-inner">
                <ExternalLink className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-mono font-bold text-xs text-[#00E5FF] uppercase tracking-wider">
                    {email.linkOrAttachment.text || "EXTERNAL RESOURCE LINK"}
                  </div>
                  {email.linkOrAttachment.url && (
                    <div className="text-xs font-mono text-[#38BDF8] break-all underline mt-0.5">
                      {email.linkOrAttachment.url}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Attachment area */
              <div className="flex items-center justify-between text-sm bg-[#100B1D] px-4 py-3 rounded-xl border border-[#FFD43B]/30 shadow-inner">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Paperclip className="w-4 h-4 text-[#FFD43B] shrink-0" />
                  <span className="font-mono text-xs font-bold text-[#FFD43B] truncate">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-xs text-[#94A3B8] shrink-0 font-mono ml-2">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Flag as Phishing Action Footer */}
      <div className="p-4 bg-[#100B1D]/80 border-t border-[#35264D] mt-auto">
        {status === "idle" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className="w-full py-3 px-4 rounded-xl bg-[#171127] hover:bg-[#FF365D]/15 border border-[#FF365D]/50 hover:border-[#FF365D] text-xs font-display font-black tracking-wider uppercase text-[#FF365D] hover:text-[#FFFFFF] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,54,93,0.4)]"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>FLAG AS PHISHING ATTACK</span>
          </button>
        ) : isRight ? (
          <div className="w-full py-2.5 px-4 rounded-xl bg-[#39FF88]/15 border border-[#39FF88]/40 text-center text-xs font-mono font-bold text-[#39FF88]">
            ✓ IDENTIFIED PHISHING THREAT
          </div>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-xl bg-[#171127] border border-[#35264D] text-center text-xs font-mono text-[#94A3B8]">
            SAFE INTERNAL DISPATCH
          </div>
        )}
      </div>
    </div>
  );
};
