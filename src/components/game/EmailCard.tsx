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
      className={`relative flex flex-col justify-between rounded-2xl p-6 border transition-all duration-200 shadow-xs ${
        isRight
          ? "bg-[#FFFFFF] border-[#15803D] ring-2 ring-[#15803D]/20"
          : isWrong
          ? "bg-[#FEF2F2] border-[#DC2626]/60 opacity-85"
          : isSelected
          ? "bg-[#FFFFFF] border-[#0F766E] ring-2 ring-[#0F766E]/20"
          : "bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#CBD5E1]"
      }`}
    >
      {/* Top Banner Status if evaluated */}
      {isRight && (
        <div className="flex items-center space-x-2 mb-4 px-3.5 py-2 rounded-xl bg-[#DCFCE7] border border-[#15803D]/30 text-[#15803D] text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Threat Confirmed — Malicious Phishing Email</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-2 mb-4 px-3.5 py-2 rounded-xl bg-[#FEE2E2] border border-[#DC2626]/30 text-[#DC2626] text-sm font-semibold">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>Legitimate Email — 1 Life Deducted</span>
        </div>
      )}

      {/* Main Content Area */}
      <div>
        {/* 1. Sender Information */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E8F0] mb-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#475569] shrink-0 mt-0.5">
              {initials}
            </div>
            <div>
              <div className="text-base font-semibold text-[#17212B] leading-tight">
                {email.senderName}
              </div>
              <div className="text-sm text-[#475569] font-mono mt-0.5 break-all">
                &lt;{email.senderEmail}&gt;
              </div>
            </div>
          </div>
          <span className="text-xs text-[#64748B] shrink-0 font-medium whitespace-nowrap pt-1">
            {email.date}
          </span>
        </div>

        {/* 2. Email Subject (18px semibold, fully wrapped) */}
        <h3 className="text-lg font-semibold text-[#17212B] leading-snug mb-3">
          {email.subject}
        </h3>

        {/* 3. Complete Email Body (16px minimum, line-height 1.6, dark charcoal text, no scrollbars) */}
        <div className="text-base text-[#17212B] leading-[1.65] font-normal mb-5 whitespace-pre-line">
          {email.body}
        </div>

        {/* 4. Link or Attachment (Un-truncated, clean layout) */}
        {email.linkOrAttachment && (
          <div className="mb-5">
            {email.linkOrAttachment.type === "link" ? (
              <div className="flex items-start space-x-2.5 text-sm text-[#0F766E] bg-[#F0FDFA] px-3.5 py-2.5 rounded-xl border border-[#CCFBF1]">
                <ExternalLink className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-medium text-xs text-[#0F766E] uppercase tracking-wide">
                    {email.linkOrAttachment.text}
                  </div>
                  {email.linkOrAttachment.url && (
                    <div className="text-xs font-mono text-[#0D9488] break-all underline mt-0.5">
                      {email.linkOrAttachment.url}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm text-[#B45309] bg-[#FFFBEB] px-3.5 py-2.5 rounded-xl border border-[#FEF3C7]">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Paperclip className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-xs font-medium text-[#92400E] truncate">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-xs text-[#B45309] shrink-0 font-mono ml-2">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Flag as Phishing Action Footer */}
      <div className="pt-4 border-t border-[#E2E8F0] mt-auto">
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
          <div className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center text-sm font-medium text-[#64748B]">
            Verified Safe Communication
          </div>
        )}
      </div>
    </div>
  );
};
