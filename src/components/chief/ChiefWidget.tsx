"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChiefAvatar } from "./ChiefAvatar";
import { ChiefSpeechBubble } from "./ChiefSpeechBubble";
import { useChief } from "@/hooks/useChief";
import { Volume2, VolumeX, RotateCcw, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

export const ChiefWidget: React.FC = () => {
  const {
    isSpeaking,
    emotion,
    dialogue,
    voiceEnabled,
    setVoiceEnabled,
    replayLast,
  } = useChief();

  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none max-w-[calc(100vw-2rem)]">
      {/* Speech Bubble floating above avatar */}
      {!isMinimized && dialogue && (
        <div className="pointer-events-auto mb-2">
          <ChiefSpeechBubble
            text={dialogue.text}
            isSpeaking={isSpeaking}
            voiceEnabled={voiceEnabled}
            onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
            onReplay={replayLast}
          />
        </div>
      )}

      {/* Companion Control Dock */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="pointer-events-auto flex items-center space-x-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-2 sm:p-2.5 shadow-md"
      >
        {/* Click avatar to replay or un-minimize */}
        <button
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              replayLast();
            }
          }}
          title={isMinimized ? "Expand CHIEF" : "Click CHIEF to repeat"}
          className="relative cursor-pointer transition-transform hover:scale-105"
        >
          <ChiefAvatar emotion={emotion} isSpeaking={isSpeaking} size={44} />
          {/* Speaking Audio Wave Indicator */}
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0F766E]" />
            </span>
          )}
        </button>

        {/* Name and Minimal Quick Stats */}
        {!isMinimized && (
          <div className="pr-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-[#17212B]">CHIEF</span>
              <span className="text-[10px] text-[#64748B] font-mono">VOICE OPS</span>
            </div>
            <div className="text-[11px] text-[#0F766E] font-medium flex items-center space-x-1">
              <span>{isSpeaking ? "Analyzing & Speaking" : "Monitoring System"}</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center space-x-1 border-l border-[#E2E8F0] pl-1.5">
          {/* Mute Voice */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            {voiceEnabled ? (
              <Volume2 className="w-4 h-4 text-[#0F766E]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#DC2626]" />
            )}
          </button>

          {/* Minimize / Maximize Toggle */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand dialogue bubble" : "Minimize companion"}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            {isMinimized ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
