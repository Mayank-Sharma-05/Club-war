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
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F4F6F8] bg-light-pattern">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-[#E2E8F0] bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] flex items-center justify-center text-[#0F766E] shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-[#17212B]">
              Data Science Society
            </div>
            <div className="text-xs text-[#64748B]">
              Campus Cyber Arcade Challenge
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
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] text-xs font-medium text-[#475569] hover:text-[#17212B] hover:border-[#CBD5E1] transition-colors cursor-pointer shadow-xs"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          {/* Prominent View Leaderboard Button in Header */}
          <button
            onClick={handleLeaderboard}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#0F766E] text-xs font-semibold text-[#17212B] hover:bg-[#F8FAFC] transition-colors cursor-pointer shadow-xs"
          >
            <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
            <span>View Leaderboard</span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center my-auto py-8">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 text-[#DC2626] text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
          <span>System Breach Simulation Active</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#17212B] mb-4">
          Data Breach: Critical Countdown
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed mb-8">
          The Central Intelligence Network has suffered an active cyberattack. Neutralize three compromised security layers before the shared 3-minute countdown reaches zero.
        </p>

        {/* 3 Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
          {/* Mission 1 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#CBD5E1] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#0F766E]">Mission 01</span>
              <div className="w-8 h-8 rounded-lg bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-semibold text-base text-[#17212B] mb-1.5">
              Phishing Hunt
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Analyze incoming campus communications and isolate the single deceptive phishing attack.
            </p>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#CBD5E1] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#4F46E5]">Mission 02</span>
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
                <BarChart2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-semibold text-base text-[#17212B] mb-1.5">
              Outlier Hunt
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Examine live system telemetry to detect statistical anomalies in the numerical observation stream.
            </p>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs hover:border-[#CBD5E1] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#15803D]">Mission 03</span>
              <div className="w-8 h-8 rounded-lg bg-[#15803D]/10 flex items-center justify-center text-[#15803D]">
                <KeyRound className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-semibold text-base text-[#17212B] mb-1.5">
              Crack the Code
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Decipher the 4-digit security vault passcode using positional feedback before attempts expire.
            </p>
          </div>
        </div>

        {/* Action Controls with Prominent Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleStart}
            className="w-full sm:w-2/3 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-sm tracking-wide flex items-center justify-center space-x-2.5 transition-colors cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Mission</span>
          </motion.button>

          <button
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0F766E] text-[#17212B] font-semibold text-xs tracking-wide flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Leaderboard</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-4 text-xs font-medium text-[#64748B]">
          <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Global Allotment:</span>
          <span className="font-mono font-semibold text-[#17212B]">03:00 (180s)</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl text-center py-4 text-xs text-[#64748B] border-t border-[#E2E8F0]">
        Single-device tournament mode • Persistent local records • Data Science Society
      </footer>
    </div>
  );
};
