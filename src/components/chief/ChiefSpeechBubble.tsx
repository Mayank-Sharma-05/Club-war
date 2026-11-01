"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

interface ChiefSpeechBubbleProps {
  text: string | null;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onReplay: () => void;
}

export const ChiefSpeechBubble: React.FC<ChiefSpeechBubbleProps> = ({
  text,
  isSpeaking,
  voiceEnabled,
  onToggleVoice,
  onReplay,
}) => {
  if (!text) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -5, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-sm sm:max-w-md bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-4 shadow-md text-[#17212B]"
      >
        {/* Top Header: Character Name + Quick Audio Controls */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0] gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
              CHIEF // Operations Commander
            </span>
            {isSpeaking && (
              <span className="text-[10px] bg-[#0F766E]/10 text-[#0F766E] px-1.5 py-0.2 rounded font-medium">
                Speaking...
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={onReplay}
              title="Replay dialogue"
              className="p-1 rounded text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onToggleVoice}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1 rounded text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#DC2626]" />
              )}
            </button>
          </div>
        </div>

        {/* Spoken Dialogue Text */}
        <p className="text-sm sm:text-[15px] text-[#17212B] leading-relaxed font-medium">
          &ldquo;{text}&rdquo;
        </p>

        {/* Small pointer tail pointing downward towards the avatar */}
        <div className="absolute -bottom-2 right-6 w-3.5 h-3.5 bg-[#FFFFFF] border-r border-b border-[#CBD5E1] transform rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
};
