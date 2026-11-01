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
      className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isRight
          ? "bg-[#FFFFFF] border-[#15803D] ring-2 ring-[#15803D]/20"
          : isWrong
          ? "bg-[#FEF2F2] border-[#DC2626]/70 opacity-90"
          : isSelected
          ? "bg-[#FFFFFF] border-[#0F766E] ring-2 ring-[#0F766E]/20"
          : "bg-[#FFFFFF] border-[#DCE4EC] hover:border-[#CBD5E1]"
      }`}
    >
      {/* Top Banner Status if evaluated */}
      {isRight && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#DCFCE7] border-b border-[#15803D]/30 text-[#15803D] text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Threat Confirmed — Malicious Phishing Email</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-2 px-5 py-2.5 bg-[#FEE2E2] border-b border-[#DC2626]/30 text-[#DC2626] text-sm font-semibold">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>Legitimate Email — 1 Life Deducted</span>
        </div>
      )}

      {/* 1. Sender Identity Section (#F8FAFC subtle background) */}
      <div className="bg-[#F8FAFC] px-5 py-4 border-b border-[#DCE4EC] flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center text-sm font-bold text-[#1E293B] shrink-0 mt-0.5 shadow-2xs">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-[16px] font-semibold text-[#17212B] leading-tight truncate">
              {email.senderName}
            </div>
            <div className="text-[14px] text-[#475569] font-mono mt-0.5 break-all">
              &lt;{email.senderEmail}&gt;
            </div>
          </div>
        </div>
        <span className="text-xs text-[#64748B] shrink-0 font-medium whitespace-nowrap pt-1">
          {email.date}
        </span>
      </div>

      {/* Main Card Body Container (#FFFFFF) */}
      <div className="bg-[#FFFFFF] p-5 flex flex-col flex-grow">
        {/* 2. Distinct Subject Section (18px semibold) */}
        <h3 className="text-[18px] font-semibold text-[#17212B] leading-snug mb-3.5">
          {email.subject}
        </h3>

        {/* 3. Complete Email Body (16px regular, line-height 1.6, dark charcoal text) */}
        <div className="text-[16px] text-[#17212B] leading-[1.6] font-normal mb-4 whitespace-pre-line flex-grow">
          {email.body}
        </div>

        {/* 4. Link or Attachment Area with subtle background differentiation */}
        {email.linkOrAttachment && (
          <div className="mb-4">
            {email.linkOrAttachment.type === "link" ? (
              /* Link area: #EFF6FF with soft blue border */
              <div className="flex items-start space-x-2.5 text-sm bg-[#EFF6FF] px-4 py-3 rounded-xl border border-[#BFDBFE]">
                <ExternalLink className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-[#1D4ED8] uppercase tracking-wide">
                    {email.linkOrAttachment.text}
                  </div>
                  {email.linkOrAttachment.url && (
                    <div className="text-xs font-mono text-[#2563EB] break-all underline mt-0.5">
                      {email.linkOrAttachment.url}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Attachment area: #FFF7ED with soft warm amber border */
              <div className="flex items-center justify-between text-sm bg-[#FFF7ED] px-4 py-3 rounded-xl border border-[#FED7AA]">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Paperclip className="w-4 h-4 text-[#C2410C] shrink-0" />
                  <span className="font-mono text-xs font-semibold text-[#9A3412] truncate">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-xs text-[#C2410C] shrink-0 font-mono ml-2 font-medium">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Flag as Phishing Action Footer */}
      <div className="p-4 bg-[#FFFFFF] border-t border-[#DCE4EC] mt-auto">
        {status === "idle" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className="w-full py-3 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FEF2F2] border border-[#DC2626]/40 hover:border-[#DC2626] text-sm font-semibold text-[#DC2626] flex items-center justify-center space-x-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Flag as Phishing Email</span>
          </button>
        ) : isRight ? (
          <div className="w-full py-2.5 px-4 rounded-xl bg-[#DCFCE7] border border-[#15803D]/30 text-center text-sm font-semibold text-[#15803D]">
            ✓ Confirmed Phishing Payload
          </div>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] border border-[#DCE4EC] text-center text-sm font-medium text-[#64748B]">
            Verified Safe Communication
          </div>
        )}
      </div>
    </div>
  );
};
