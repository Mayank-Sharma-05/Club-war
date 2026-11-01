"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, X, Radio } from "lucide-react";

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
        className="relative w-[300px] sm:w-[340px] max-w-[calc(100vw-2.5rem)] bg-[#171127] border border-[#00E5FF]/40 rounded-2xl p-3.5 shadow-[0_0_25px_rgba(0,0,0,0.8)] text-[#F8FAFC]"
      >
        {/* Header: Commander ID + Speaking status + Action icons */}
        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#35264D] gap-1.5">
          <div className="flex items-center space-x-1.5 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isSpeaking ? "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-ping" : "bg-[#00E5FF]"}`} />
            <span className="text-[11px] font-display font-bold text-[#00E5FF] tracking-wider uppercase truncate">
              CHIEF // OPS COMMAND
            </span>
            {isSpeaking && (
              <span className="text-[9px] bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 px-1.5 py-0.2 rounded font-mono font-bold shrink-0">
                SPEAKING
              </span>
            )}
          </div>

          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={onReplay}
              title="Replay dialogue"
              className="p-1 rounded text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#100B1D] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={onToggleVoice}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1 rounded text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#100B1D] transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-3 h-3 text-[#00E5FF]" />
              ) : (
                <VolumeX className="w-3 h-3 text-[#FF365D]" />
              )}
            </button>
            <button
              onClick={onDismiss}
              title="Dismiss comment"
              className="p-1 rounded text-[#64748B] hover:text-white hover:bg-[#100B1D] transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Spoken Dialogue Text */}
        <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed font-sans font-medium">
          &ldquo;{text}&rdquo;
        </p>

        {/* Pointer notch pointing towards avatar */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#171127] border-r border-b border-[#00E5FF]/40 transform rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
};
