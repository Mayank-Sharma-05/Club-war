"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, X } from "lucide-react";

interface ChiefSpeechBubbleProps {
  text: string | null;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onReplay: () => void;
  onDismiss: () => void;
}

export const ChiefSpeechBubble: React.FC<ChiefSpeechBubbleProps> = ({
  text,
  isSpeaking,
  voiceEnabled,
  onToggleVoice,
  onReplay,
  onDismiss,
}) => {
  if (!text) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="relative w-[300px] sm:w-[340px] max-w-[calc(100vw-2.5rem)] bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-3.5 shadow-lg text-[#17212B]"
      >
        {/* Header: Commander ID + Speaking status + Action icons */}
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#F1F5F9] gap-1.5">
          <div className="flex items-center space-x-1.5 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isSpeaking ? "bg-[#0F766E] animate-ping" : "bg-[#0F766E]"}`} />
            <span className="text-[11px] font-bold text-[#0F766E] tracking-wider truncate">
              CHIEF // OPS
            </span>
            {isSpeaking && (
              <span className="text-[9px] bg-[#0F766E]/10 text-[#0F766E] px-1.5 py-0.2 rounded font-semibold shrink-0">
                Speaking
              </span>
            )}
          </div>

          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={onReplay}
              title="Replay dialogue"
              className="p-1 rounded text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={onToggleVoice}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1 rounded text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-3 h-3 text-[#0F766E]" />
              ) : (
                <VolumeX className="w-3 h-3 text-[#DC2626]" />
              )}
            </button>
            <button
              onClick={onDismiss}
              title="Dismiss comment"
              className="p-1 rounded text-[#94A3B8] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Spoken Dialogue Text */}
        <p className="text-xs sm:text-[13px] text-[#17212B] leading-relaxed font-medium">
          &ldquo;{text}&rdquo;
        </p>

        {/* Pointer notch pointing towards avatar */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#FFFFFF] border-r border-b border-[#CBD5E1] transform rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
};
