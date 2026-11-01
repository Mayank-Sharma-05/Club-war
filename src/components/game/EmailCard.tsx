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
      className={`relative flex flex-col justify-between rounded-xl p-5 border transition-all duration-200 ${
        isRight
          ? "bg-[#22C55E]/10 border-[#22C55E]"
          : isWrong
          ? "bg-[#EF4444]/10 border-[#EF4444]/70 opacity-80"
          : isSelected
          ? "bg-[#151F2E] border-[#22D3EE]"
          : "bg-[#111827] border-[#263244] hover:border-[#334155]"
      }`}
    >
      {/* Top Banner Status if evaluated */}
      {isRight && (
        <div className="flex items-center space-x-1.5 mb-3 px-3 py-1.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Threat Confirmed — Phishing Identified</span>
        </div>
      )}
      {isWrong && (
        <div className="flex items-center space-x-1.5 mb-3 px-3 py-1.5 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>Legitimate Email — 1 Life Deducted</span>
        </div>
      )}

      {/* Main Email Header */}
      <div>
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#263244] mb-3">
          <div className="flex items-start space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#151F2E] border border-[#263244] flex items-center justify-center text-xs font-semibold text-[#A1AEC0] shrink-0 mt-0.5">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#F1F5F9] truncate">
                {email.senderName}
              </div>
              <div className="text-xs text-[#718096] truncate font-mono">
                {email.senderEmail}
              </div>
            </div>
          </div>
          <span className="text-xs text-[#718096] shrink-0 font-medium">
            {email.date}
          </span>
        </div>

        {/* Email Subject - fully wrapped, clear hierarchy */}
        <h3 className="text-base font-semibold text-[#F1F5F9] leading-snug mb-3">
          {email.subject}
        </h3>

        {/* Email Message Body - 15px font-normal, comfortable reading, no scrollbars needed */}
        <div className="text-[15px] text-[#A1AEC0] leading-relaxed mb-4">
          {email.body}
        </div>

        {/* Attached Link or File payload preview */}
        {email.linkOrAttachment && (
          <div className="mb-4">
            {email.linkOrAttachment.type === "link" ? (
              <div className="flex items-center space-x-2 text-xs text-[#22D3EE] bg-[#151F2E] px-3 py-2 rounded-lg border border-[#263244]">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate underline font-mono">
                  {email.linkOrAttachment.text}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-[#F59E0B] bg-[#151F2E] px-3 py-2 rounded-lg border border-[#263244]">
                <div className="flex items-center space-x-2 truncate">
                  <Paperclip className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate font-mono">
                    {email.linkOrAttachment.fileName}
                  </span>
                </div>
                <span className="text-[#718096] shrink-0 ml-2 font-mono">
                  {email.linkOrAttachment.fileSize}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#263244] mt-auto">
        {status === "idle" ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className="w-full py-2.5 px-4 rounded-lg bg-[#151F2E] hover:bg-[#EF4444]/15 border border-[#263244] hover:border-[#EF4444]/50 text-xs font-semibold text-[#F1F5F9] hover:text-[#EF4444] flex items-center justify-center space-x-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>Flag as Phishing</span>
          </button>
        ) : isRight ? (
          <div className="w-full py-2 px-3 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 text-center text-xs font-medium text-[#22C55E]">
            Verified Attack Vector
          </div>
        ) : (
          <div className="w-full py-2 px-3 rounded-lg bg-[#151F2E] border border-[#263244] text-center text-xs font-medium text-[#718096]">
            Verified Safe Email
          </div>
        )}
      </div>
    </div>
  );
};
