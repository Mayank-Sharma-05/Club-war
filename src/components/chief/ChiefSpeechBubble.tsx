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
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.97 }}
        transition={{ duration: 0.16 }}
        className="relative w-[300px] sm:w-[340px] max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 rounded-2xl p-3.5 shadow-md text-slate-900"
      >
        {/* Header: Commander ID + Speaking status + Action icons */}
        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100 gap-1.5">
          <div className="flex items-center space-x-1.5 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isSpeaking ? "bg-teal-600 animate-pulse" : "bg-teal-600"}`} />
            <span className="text-xs font-semibold text-teal-800 tracking-tight font-sans">
              CHIEF Commander
            </span>
            {isSpeaking && (
              <span className="text-[10px] bg-teal-50 border border-teal-100 text-teal-700 px-1.5 py-0.5 rounded-md font-medium shrink-0 font-sans">
                Speaking
              </span>
            )}
          </div>

          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={onReplay}
              title="Replay dialogue"
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={onToggleVoice}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-3 h-3 text-teal-700" />
              ) : (
                <VolumeX className="w-3 h-3 text-rose-600" />
              )}
            </button>
            <button
              onClick={onDismiss}
              title="Dismiss comment"
              className="p-1 rounded text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Spoken Dialogue Text */}
        <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans">
          &ldquo;{text}&rdquo;
        </p>

        {/* Pointer notch pointing towards avatar */}
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 transform rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
};
