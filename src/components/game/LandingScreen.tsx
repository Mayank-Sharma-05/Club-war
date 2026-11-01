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
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F8FAFC] bg-light-pattern">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-slate-200 bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-2xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-slate-900">
              Data Science Society
            </div>
            <div className="text-xs text-slate-500">
              Campus Cyber Challenge
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
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          <button
            onClick={handleLeaderboard}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-teal-700 text-xs font-medium text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>View Leaderboard</span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center my-auto py-8">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span>System Breach Simulation Active</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-slate-900 mb-4">
          Data Breach: Critical Countdown
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8 font-sans">
          The Central Intelligence Network has suffered an active cyberattack. Neutralize three compromised security layers before the shared 2-minute countdown reaches zero.
        </p>

        {/* 3 Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
          {/* Mission 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-teal-700">Mission 01</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-heading font-semibold text-base text-slate-900 mb-1.5">
              Phishing Hunt
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Analyze incoming campus communications and isolate the single deceptive phishing attack.
            </p>
          </div>

          {/* Mission 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-indigo-700">Mission 02</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <BarChart2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-heading font-semibold text-base text-slate-900 mb-1.5">
              Outlier Hunt
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Examine live system telemetry to detect statistical anomalies in the numerical observation stream.
            </p>
          </div>

          {/* Mission 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-emerald-700">Mission 03</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <KeyRound className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-heading font-semibold text-base text-slate-900 mb-1.5">
              Crack the Code
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Decipher the 4-digit security vault passcode using positional feedback before attempts expire.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleStart}
            className="w-full sm:w-2/3 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs hover:shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Mission</span>
          </motion.button>

          <button
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-medium text-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Leaderboard</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-4 text-xs font-medium text-slate-500">
          <Clock className="w-3.5 h-3.5 text-teal-700" />
          <span>Global Allotment:</span>
          <span className="font-mono font-semibold text-slate-900">02:00 (120s)</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl text-center py-4 text-xs text-slate-500 border-t border-slate-200">
        Single-device tournament mode • Persistent local records • Data Science Society
      </footer>
    </div>
  );
};
