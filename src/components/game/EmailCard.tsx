"use client";

import React from "react";
import { motion } from "framer-motion";
import { EmailCardData } from "@/types/game";
import { Mail, Paperclip, ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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

  return (
    <motion.div
      whileHover={!disabled && status === "idle" ? { y: -3, borderColor: "rgba(0, 229, 255, 0.6)" } : {}}
      onClick={() => {
        if (!disabled && status === "idle") {
          onSelect();
        }
      }}
      className={`relative flex flex-col justify-between h-[340px] sm:h-[360px] rounded-xl p-4 transition-all duration-300 border cursor-pointer select-text overflow-hidden ${
        isRight
          ? "bg-[#00E676]/10 border-[#00E676] glow-green"
          : isWrong
          ? "bg-[#FF334F]/10 border-[#FF334F] opacity-75 cursor-not-allowed glow-red"
          : isSelected
          ? "bg-[#111C2E] border-[#00E5FF] glow-cyan"
          : "bg-[#111C2E]/90 border-[#1E293B] hover:bg-[#111C2E]"
      }`}
    >
      {/* Status Overlay Banner */}
      {isRight && (
        <div className="absolute top-0 right-0 bg-[#00E676] text-[#070B14] px-3 py-0.5 text-[11px] font-cyber font-black tracking-wider rounded-bl-lg flex items-center space-x-1 z-20">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>THREAT CONFIRMED</span>
        </div>
      )}
      {isWrong && (
        <div className="absolute top-0 right-0 bg-[#FF334F] text-[#F8FAFC] px-3 py-0.5 text-[11px] font-cyber font-black tracking-wider rounded-bl-lg flex items-center space-x-1 z-20">
          <XCircle className="w-3.5 h-3.5" />
          <span>LEGITIMATE TRANSMISSION (-1 LIFE)</span>
        </div>
      )}

      {/* Email Header */}
      <div className="border-b border-[#1E293B] pb-3 select-none">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
          <span className="flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-semibold text-[#F8FAFC] truncate max-w-[160px] sm:max-w-[200px]">
              {email.senderName}
            </span>
          </span>
          <span className="text-[10px] shrink-0">{email.date}</span>
        </div>

        <div className="text-[11px] font-mono text-[#94A3B8] truncate mb-2">
          &lt;{email.senderEmail}&gt;
        </div>

        <div className="text-xs sm:text-sm font-cyber font-bold text-[#F8FAFC] line-clamp-1">
          {email.subject}
        </div>
      </div>

      {/* Email Body - scrollable internally if needed */}
      <div className="my-3 overflow-y-auto pr-1 text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed select-text font-sans">
        {email.body}
      </div>

      {/* Link or Attachment indicator */}
      {email.linkOrAttachment && (
        <div className="pt-2 border-t border-[#1E293B]/70 select-none">
          {email.linkOrAttachment.type === "link" ? (
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-1.5 rounded-lg border border-[#00E5FF]/20 truncate">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate underline">{email.linkOrAttachment.text}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1.5 rounded-lg border border-[#F59E0B]/20">
              <span className="flex items-center space-x-1.5 truncate">
                <Paperclip className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{email.linkOrAttachment.fileName}</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] shrink-0 ml-2">
                {email.linkOrAttachment.fileSize}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-3 pt-2 border-t border-[#1E293B]/50 select-none flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#94A3B8]">
          {isRight ? "Identified as attack" : isWrong ? "Verified safe" : "Click to flag as phishing"}
        </span>

        {status === "idle" && (
          <button
            type="button"
            disabled={disabled}
            className="px-2.5 py-1 rounded bg-[#101827] border border-[#1E293B] hover:border-[#FF334F] text-[11px] font-cyber text-[#FF334F] hover:bg-[#FF334F]/10 transition-colors flex items-center space-x-1"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>FLAG PHISHING</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
