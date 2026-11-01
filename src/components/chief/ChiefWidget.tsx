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
          className="pointer-events-auto flex items-center space-x-2 bg-[#171127] border border-[#35264D] rounded-2xl p-1.5 sm:p-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md"
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF]" />
              </span>
            )}
          </button>

          {/* Commander details & mini-status (hidden when collapsed) */}
          {!isMinimized && (
            <div className="pr-1 pl-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-display font-bold text-[#F8FAFC] tracking-wider uppercase">
                  CHIEF
                </span>
                <span className="text-[10px] text-[#00E5FF] font-mono font-bold bg-[#00E5FF]/20 border border-[#00E5FF]/40 px-1.5 py-0.2 rounded">
                  VOICE OPS
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] font-mono truncate max-w-[130px]">
                {isSpeaking ? (
                  <span className="text-[#00E5FF] font-semibold animate-pulse">Speaking...</span>
                ) : (
                  <span>Ready & monitoring</span>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-0.5 border-l border-[#35264D] pl-1.5">
            {/* Quick Mute Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#100B1D] transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00E5FF]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#FF365D]" />
              )}
            </button>

            {/* Settings button */}
            {!isMinimized && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                title="CHIEF Voice & Text Settings"
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#100B1D] transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {/* Minimize / Maximize toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand CHIEF widget" : "Minimize CHIEF widget"}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#100B1D] transition-colors cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#171127] border border-[#00E5FF]/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,229,255,0.25)] text-[#F8FAFC]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#35264D]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#F8FAFC] uppercase tracking-wider">
                      CHIEF VOICE CALIBRATION
                    </h3>
                    <p className="text-xs font-mono text-[#94A3B8]">
                      Voice synthesis and commentary settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#35264D] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Settings Controls */}
              <div className="space-y-4 text-xs font-mono">
                {/* 1. Voice ON/OFF */}
                <div className="flex items-center justify-between py-2 border-b border-[#35264D]">
                  <div>
                    <span className="font-display font-bold text-sm text-[#F8FAFC] block uppercase">
                      VOICE OUTPUT
                    </span>
                    <span className="text-[#94A3B8] text-[11px]">
                      Enable spoken audio commentary during missions
                    </span>
                  </div>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      voiceEnabled ? "bg-[#00E5FF]" : "bg-[#35264D]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#080611] transition-transform ${
                        voiceEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 2. Show CHIEF Text ON/OFF */}
                <div className="flex items-center justify-between py-2 border-b border-[#35264D]">
                  <div>
                    <span className="font-display font-bold text-sm text-[#F8FAFC] block uppercase">
                      SPEECH BUBBLE
                    </span>
                    <span className="text-[#94A3B8] text-[11px]">
                      Display written dialog box on screen
                    </span>
                  </div>
                  <button
                    onClick={() => setShowText(!showText)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      showText ? "bg-[#00E5FF]" : "bg-[#35264D]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#080611] transition-transform ${
                        showText ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 3. Voice Volume Slider */}
                <div className="py-2 border-b border-[#35264D]">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-display font-bold text-[#F8FAFC] uppercase">
                      SYNTHESIS VOLUME
                    </span>
                    <span className="font-digital text-sm text-[#00E5FF] font-bold">
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
                    className="w-full accent-[#00E5FF] cursor-pointer"
                  />
                </div>

                {/* 4. Preferred Voice Selection */}
                <div className="py-2 border-b border-[#35264D]">
                  <label className="font-display font-bold text-[#F8FAFC] block mb-1 uppercase">
                    MALE SYNTHESIS ENGINE
                  </label>
                  <p className="text-[11px] text-[#94A3B8] mb-2 font-sans">
                    Priority: English India Male &rarr; US Male &rarr; UK Male &rarr; English
                  </p>
                  <select
                    value={selectedURI || ""}
                    onChange={(e) => {
                      setSelectedURI(e.target.value);
                      setPreferredVoice(e.target.value);
                    }}
                    className="w-full bg-[#100B1D] border border-[#35264D] rounded-xl px-3 py-2 text-xs text-[#00E5FF] focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="">
                      Default Male ({selectedVoiceName || "Auto-detecting..."})
                    </option>
                    {englishVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} [{getVoiceTag(v)}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Action Buttons: Test Voice & Replay Last */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={testVoice}
                    className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>TEST VOICE</span>
                  </button>

                  <button
                    onClick={replayLast}
                    className="py-2.5 px-3 bg-[#100B1D] border border-[#35264D] hover:border-[#00E5FF] text-[#CBD5E1] hover:text-[#00E5FF] font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>REPLAY</span>
                  </button>
                </div>
              </div>

              {/* Close footer */}
              <div className="mt-5 pt-3 border-t border-[#35264D] flex justify-end">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-2 bg-[#100B1D] border border-[#35264D] hover:border-[#00E5FF] text-white font-display font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  SAVE & CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
