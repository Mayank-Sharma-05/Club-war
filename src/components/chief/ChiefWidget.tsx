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
          className="pointer-events-auto flex items-center space-x-2 bg-white border border-slate-200 rounded-2xl p-1.5 sm:p-2 shadow-sm transition-shadow hover:shadow-md"
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600" />
              </span>
            )}
          </button>

          {/* Commander details & mini-status (hidden when collapsed) */}
          {!isMinimized && (
            <div className="pr-1 pl-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-semibold text-slate-900 font-sans">CHIEF</span>
                <span className="text-[10px] text-teal-700 font-medium bg-teal-50 border border-teal-100 px-1.5 py-0.2 rounded-md font-sans">
                  {activeEngine === "elevenlabs" && elevenLabsConfigured
                    ? "ElevenLabs AI"
                    : "Voice Ops"}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans truncate max-w-[130px]">
                {isSpeaking ? (
                  <span className="text-teal-700 font-medium">Speaking...</span>
                ) : (
                  <span>Ready & monitoring</span>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-0.5 border-l border-slate-200 pl-1.5">
            {/* Quick Mute Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? "Mute CHIEF voice" : "Unmute CHIEF voice"}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-teal-700" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-600" />
              )}
            </button>

            {/* Settings button */}
            {!isMinimized && (
              <button
                onClick={() => setIsSettingsOpen(true)}
                title="CHIEF Voice & Text Settings"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {/* Minimize / Maximize toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expand CHIEF widget" : "Minimize CHIEF widget"}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-xl text-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-slate-900">
                      CHIEF Voice Settings
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Cyber Operations Game Commander
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Engine Status Banner */}
              <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5 font-sans">
                <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-medium text-slate-800">
                    Active Voice Engine:{" "}
                    <span className="text-teal-700 font-semibold">
                      {activeEngine === "elevenlabs" && elevenLabsConfigured
                        ? "ElevenLabs AI Voice"
                        : "Browser SpeechSynthesis"}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {activeEngine === "elevenlabs" && elevenLabsConfigured
                      ? "Natural expressive male commander voice stream active."
                      : "Native OS neural/synthesized English voice fallback."}
                  </div>
                </div>
              </div>

              {/* Settings Controls */}
              <div className="space-y-4 text-xs font-sans">
                {/* Voice Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <div className="font-medium text-slate-800">Speech Audio</div>
                    <div className="text-slate-500 text-[11px]">
                      Enable spoken reactions and commentary
                    </div>
                  </div>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                      voiceEnabled
                        ? "bg-teal-700 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {voiceEnabled ? "Enabled" : "Muted"}
                  </button>
                </div>

                {/* Subtitles Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <div className="font-medium text-slate-800">Subtitles / Speech Bubble</div>
                    <div className="text-slate-500 text-[11px]">
                      Show text popups alongside speech
                    </div>
                  </div>
                  <button
                    onClick={() => setShowText(!showText)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                      showText
                        ? "bg-teal-700 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {showText ? "Visible" : "Hidden"}
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">Commander Volume</span>
                    <span className="font-mono text-slate-600">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-teal-700 cursor-pointer"
                  />
                </div>

                {/* Browser Fallback Voice Selector (if using browser engine) */}
                {englishVoices.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <label className="block font-medium text-slate-800">
                      Fallback Voice (SpeechSynthesis)
                    </label>
                    <select
                      value={selectedURI}
                      onChange={(e) => {
                        setSelectedURI(e.target.value);
                        setPreferredVoice(e.target.value);
                      }}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-700"
                    >
                      {englishVoices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({getVoiceTag(v)})
                        </option>
                      ))}
                    </select>
                    <div className="text-[11px] text-slate-500">
                      Current selection: {selectedVoiceName || "Default system voice"}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 font-sans">
                <button
                  onClick={testVoice}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test Voice</span>
                </button>

                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
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
