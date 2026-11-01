"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  KeyRound,
  BarChart2,
  Play,
  Trophy,
  ShieldAlert,
  AlertCircle,
  User,
} from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface MissionBriefingProps {
  gamerTag: string;
  onInitialize: () => void;
  onViewLeaderboard: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  gamerTag,
  onInitialize,
  onViewLeaderboard,
}) => {
  const handleLaunch = () => {
    sound.playInit();
    onInitialize();
  };

  const handleLeaderboard = () => {
    sound.playClick();
    onViewLeaderboard();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#F8FAFC] bg-light-pattern select-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-100 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-slate-900">
              Mission Briefing
            </h1>
            <p className="text-sm font-sans text-slate-500 mt-1">
              Review operational parameters and containment rules before initiating the countdown.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Analyst:</span>
            <span className="font-semibold text-slate-800">{gamerTag}</span>
          </div>
        </div>

        {/* 3 Parameter Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {/* Global Timer Card */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 transition-colors hover:border-slate-300">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">Global Timer</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-mono font-semibold text-slate-900">02:00 Shared</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Continuous 120s clock</p>
          </div>

          {/* System Integrity Card */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 transition-colors hover:border-slate-300">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">System Integrity</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-mono font-semibold text-slate-900">3</span>
              <span className="text-xs text-slate-500 font-medium">lives allowed</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Loss on failed verification</p>
          </div>

          {/* Vault Security Card */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 transition-colors hover:border-slate-300">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                <KeyRound className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-500">Vault Security</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-mono font-semibold text-slate-900">5</span>
              <span className="text-xs text-slate-500 font-medium">code attempts</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Positional clue feedback</p>
          </div>
        </div>

        {/* Three Mission Cards */}
        <div className="space-y-3 mb-6">
          {/* Mission 1 */}
          <div className="bg-white border border-slate-200 hover:border-teal-300/80 rounded-xl p-4 sm:p-4.5 transition-colors flex items-start space-x-3.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-semibold text-teal-700">Mission 01</span>
                <h3 className="text-base font-heading font-semibold text-slate-900">
                  Phishing Hunt
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                  Email Defense
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 font-sans mt-1 leading-relaxed">
                Review four incoming campus email transmissions simultaneously. Exactly one message is a deceptive phishing attempt. An incorrect selection deducts one integrity life.
              </p>
            </div>
          </div>

          {/* Mission 2 */}
          <div className="bg-white border border-slate-200 hover:border-indigo-300/80 rounded-xl p-4 sm:p-4.5 transition-colors flex items-start space-x-3.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-semibold text-indigo-700">Mission 02</span>
                <h3 className="text-base font-heading font-semibold text-slate-900">
                  Outlier Hunt
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                  Telemetry Anomaly
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 font-sans mt-1 leading-relaxed">
                Scan live numerical telemetry containing 10–12 observations. Multiple statistical anomalies deviate from the baseline with concealed target counts. Select and submit all outliers.
              </p>
            </div>
          </div>

          {/* Mission 3 */}
          <div className="bg-white border border-slate-200 hover:border-emerald-300/80 rounded-xl p-4 sm:p-4.5 transition-colors flex items-start space-x-3.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-semibold text-emerald-700">Mission 03</span>
                <h3 className="text-base font-heading font-semibold text-slate-900">
                  Crack the Code
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                  Vault Decryption
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 font-sans mt-1 leading-relaxed">
                Decipher a unique 4-digit passcode for the digital vault within 5 attempts. Positional color feedback reveals whether digits are in the correct position (Green), misplaced (Yellow), or absent (Red).
              </p>
            </div>
          </div>
        </div>

        {/* Global Timer Directive Notice */}
        <div className="flex items-start space-x-3 mb-6 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-sans">
            <span className="font-semibold text-amber-950 block mb-0.5">
              Continuous Countdown Notice
            </span>
            <span>
              The 2-minute global countdown starts immediately upon clicking Start Mission and remains running across all three missions without pause.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleLaunch}
            className="w-full sm:w-2/3 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs hover:shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Mission</span>
          </button>

          <button
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-2xs"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>View Leaderboard</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
