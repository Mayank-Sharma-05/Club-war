"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart2, KeyRound, Play, Trophy, Volume2, VolumeX, ShieldAlert, Clock } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface LandingScreenProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  onViewLeaderboard,
  soundEnabled,
  onToggleSound,
}) => {
  const handleStart = () => {
    sound.playClick();
    onStart();
  };

  const handleLeaderboard = () => {
    sound.playClick();
    onViewLeaderboard();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#090D14] bg-subtle-grid">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-[#263244]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#263244] flex items-center justify-center text-[#22D3EE]">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-[#F1F5F9]">
              Data Science Society
            </div>
            <div className="text-xs text-[#718096]">
              Campus Arcade Challenge
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            aria-label="Toggle Sound"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#263244] text-xs font-medium text-[#A1AEC0] hover:text-[#F1F5F9] hover:border-[#334155] transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#EF4444]" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          <button
            onClick={handleLeaderboard}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#111827] border border-[#263244] text-xs font-medium text-[#F1F5F9] hover:bg-[#151F2E] hover:border-[#334155] transition-colors cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Leaderboard</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center my-auto py-8">
        {/* Subtle Alert Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
          <span>System Breach Simulation Active</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F1F5F9] mb-4">
          Data Breach: Critical Countdown
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#A1AEC0] max-w-2xl leading-relaxed mb-8">
          The DSS Central Intelligence Network has suffered a critical cyberattack. Neutralize three compromised security layers before the global countdown reaches zero.
        </p>

        {/* Three Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
          {/* Mission 1 */}
          <div className="bg-[#111827] border border-[#263244] rounded-xl p-5 hover:border-[#334155] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#22D3EE]">Mission 01</span>
              <ShieldCheck className="w-5 h-5 text-[#22D3EE]" />
            </div>
            <h3 className="font-semibold text-base text-[#F1F5F9] mb-1.5">
              Phishing Hunt
            </h3>
            <p className="text-sm text-[#A1AEC0] leading-relaxed">
              Analyze incoming communications and isolate the single deceptive phishing attack.
            </p>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#111827] border border-[#263244] rounded-xl p-5 hover:border-[#334155] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#A78BFA]">Mission 02</span>
              <BarChart2 className="w-5 h-5 text-[#A78BFA]" />
            </div>
            <h3 className="font-semibold text-base text-[#F1F5F9] mb-1.5">
              Outlier Hunt
            </h3>
            <p className="text-sm text-[#A1AEC0] leading-relaxed">
              Examine live system telemetry to detect statistical anomalies in the observation stream.
            </p>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#111827] border border-[#263244] rounded-xl p-5 hover:border-[#334155] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#22C55E]">Mission 03</span>
              <KeyRound className="w-5 h-5 text-[#22C55E]" />
            </div>
            <h3 className="font-semibold text-base text-[#F1F5F9] mb-1.5">
              Crack the Code
            </h3>
            <p className="text-sm text-[#A1AEC0] leading-relaxed">
              Decipher the 4-digit security vault passcode using positional feedback before attempts expire.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <div className="flex items-center space-x-2 bg-[#111827] px-4 py-3 rounded-xl border border-[#263244] text-xs font-medium text-[#A1AEC0]">
            <Clock className="w-4 h-4 text-[#22D3EE]" />
            <span>Time Allotment:</span>
            <span className="font-mono font-semibold text-[#F1F5F9]">03:00 (180s)</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#090D14] font-semibold text-sm tracking-wide flex items-center justify-center space-x-2.5 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Mission</span>
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl text-center py-4 text-xs text-[#718096] border-t border-[#263244]">
        Single-device tournament mode • Persistent local records • Data Science Society
      </footer>
    </div>
  );
};
