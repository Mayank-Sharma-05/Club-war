"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChiefAvatar } from "./ChiefAvatar";
import { ChiefSpeechBubble } from "./ChiefSpeechBubble";
import { useChief } from "@/hooks/useChief";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Settings,
  X,
  Play,
  Sparkles,
  Cpu,
  Info,
} from "lucide-react";

export const ChiefWidget: React.FC = () => {
  const {
    isSpeaking,
    emotion,
    dialogue,
    voiceEnabled,
    volume,
    showText,
    selectedVoiceName,
    activeEngine,
    elevenLabsConfigured,
    setVoiceEnabled,
    setShowText,
    setVolume,
    replayLast,
    testVoice,
    dismissDialogue,
    setPreferredVoice,
    getAvailableVoices,
    getSettings,
  } = useChief();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setSelectedURI] = useState<string>("");

  useEffect(() => {
    const updateVoices = () => {
      const v = getAvailableVoices();
      setAvailableVoices(v);
      const settings = getSettings();
      if (settings.preferredVoiceURI) {
        setSelectedURI(settings.preferredVoiceURI);
      }
    };

    updateVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
      };
    }
  }, [getAvailableVoices, getSettings]);

  // Filter English voices for the voice selector
  const englishVoices = availableVoices.filter((v) =>
    v.lang.toLowerCase().startsWith("en")
  );

  const getVoiceTag = (v: SpeechSynthesisVoice) => {
    const lower = v.name.toLowerCase();
    const isMale = [
      "male",
      "david",
      "mark",
      "guy",
      "ravi",
      "prabhat",
      "george",
      "oliver",
      "ryan",
      "daniel",
      "arthur",
      "steffan",
      "andrew",
      "natural",
    ].some((kw) => lower.includes(kw));

    const lang = v.lang.toLowerCase();
    let region = "EN";
    if (lang.includes("in")) region = "India";
    else if (lang.includes("us")) region = "US";
    else if (lang.includes("gb")) region = "UK";

    return `${region}${isMale ? " • Male" : ""}`;
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end pointer-events-none select-none max-w-[calc(100vw-2rem)]">
        {/* Compact Speech Bubble floating in dedicated safe space */}
        {!isMinimized && showText && dialogue && (
          <div className="pointer-events-auto mb-2">
            <ChiefSpeechBubble
              text={dialogue.text}
              isSpeaking={isSpeaking}
              voiceEnabled={voiceEnabled}
              onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
              onReplay={replayLast}
              onDismiss={dismissDialogue}
            />
          </div>
        )}

        {/* Companion Control Dock */}
        <motion.div
          layout
          className="pointer-events-auto flex items-center space-x-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-1.5 sm:p-2 shadow-md transition-shadow hover:shadow-lg"
        >
          {/* Avatar button: click to replay or expand */}
          <button
            onClick={() => {
              if (isMinimized) {
                setIsMinimized(false);
              } else {
                replayLast();
              }
            }}
            title={isMinimized ? "Expand CHIEF Commander" : "Click to repeat last comment"}
            className="relative cursor-pointer transition-transform hover:scale-105 shrink-0"
          >
            <ChiefAvatar emotion={emotion} isSpeaking={isSpeaking} size={isMinimized ? 38 : 42} />
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0F766E]" />
              </span>
            )}
          </button>

          {/* Commander details & mini-status (hidden when collapsed) */}
          {!isMinimized && (
            <div className="pr-1 pl-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-[#17212B]">CHIEF</span>
                <span className="text-[10px] text-[#0F766E] font-semibold bg-[#0F766E]/10 px-1.5 py-0.2 rounded font-mono">
                  {activeEngine === "elevenlabs" && elevenLabsConfigured
                    ? "ELEVENLABS AI"
                    : "VOICE OPS"}
                </span>
              </div>
              <div className="text-[11px] text-[#64748B] font-medium truncate max-w-[130px]">
                {isSpeaking ? (
                  <span className="text-[#0F766E] font-semibold">Speaking...</span>
                ) : (
                  <span>Ready & monitoring</span>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-0.5 border-l border-[#E2E8F0] pl-1.5">
            {/* Quick Mute Toggle */}
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

            {/* Settings button */}
            {!isMinimized && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                title="CHIEF Voice & Text Settings"
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {/* Minimize / Maximize toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand CHIEF widget" : "Minimize CHIEF widget"}
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

      {/* CHIEF Stall-Ready Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B14]/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-6 shadow-2xl text-[#17212B]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#17212B]">
                      CHIEF Voice Operations
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      ElevenLabs AI voice & speech synthesis configuration
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Settings Controls */}
              <div className="space-y-4 text-xs">
                {/* Voice Engine Status Banner */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span className="font-semibold text-xs text-[#17212B]">
                        Active Voice Engine
                      </span>
                    </div>
                    {elevenLabsConfigured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D] border border-[#15803D]/20">
                        ElevenLabs AI (Adam)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]">
                        Browser Speech Fallback
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {elevenLabsConfigured
                      ? "High-fidelity AI voice with deep, confident male commander personality and dynamic emotional inflection."
                      : "Using local browser SpeechSynthesis. Add ELEVENLABS_API_KEY in .env.local to activate the expressive ElevenLabs AI commander voice."}
                  </p>
                </div>

                {/* 1. Voice ON/OFF */}
                <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                  <div>
                    <span className="font-semibold text-sm text-[#17212B] block">
                      CHIEF Voice Output
                    </span>
                    <span className="text-[#64748B] text-[11px]">
                      Enable spoken audio commentary during missions
                    </span>
                  </div>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      voiceEnabled ? "bg-[#0F766E]" : "bg-[#CBD5E1]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        voiceEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 2. Show CHIEF Text ON/OFF */}
                <div className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
                  <div>
                    <span className="font-semibold text-sm text-[#17212B] block">
                      Show Dialogue Bubble
                    </span>
                    <span className="text-[#64748B] text-[11px]">
                      Display written speech bubble on screen
                    </span>
                  </div>
                  <button
                    onClick={() => setShowText(!showText)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      showText ? "bg-[#0F766E]" : "bg-[#CBD5E1]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showText ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 3. Voice Volume Slider */}
                <div className="py-2 border-b border-[#F1F5F9]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-semibold text-[#17212B]">
                      Voice Volume
                    </span>
                    <span className="font-mono text-[11px] text-[#0F766E] font-bold">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-[#0F766E] cursor-pointer"
                  />
                </div>

                {/* 4. Fallback Browser Voice Selection */}
                <div className="py-2 border-b border-[#F1F5F9]">
                  <label className="font-semibold text-[#17212B] block mb-1">
                    Browser Fallback Voice (Offline / Backup)
                  </label>
                  <p className="text-[11px] text-[#64748B] mb-2">
                    Used if ElevenLabs AI is offline or unkeyed:
                  </p>
                  <select
                    value={selectedURI || ""}
                    onChange={(e) => {
                      setSelectedURI(e.target.value);
                      setPreferredVoice(e.target.value);
                    }}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#17212B] focus:outline-none focus:border-[#0F766E]"
                  >
                    <option value="">
                      Auto Male ({selectedVoiceName || "Detecting..."})
                    </option>
                    {englishVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} [{getVoiceTag(v)}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Action Buttons: Preview Voice & Replay Last */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={testVoice}
                    className="flex-1 py-2.5 px-3 bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Preview Voice</span>
                  </button>

                  <button
                    onClick={replayLast}
                    className="py-2.5 px-3 bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Last</span>
                  </button>
                </div>
              </div>

              {/* Close footer */}
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex justify-end">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#17212B] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
