"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, KeyRound, BarChart2, Play, Trophy, ShieldAlert, AlertTriangle, Terminal } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#F4F6F8] bg-light-pattern select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#E2E8F0] gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#0F766E] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span>OPERATION PARAMETERS & DIRECTIVES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-wide uppercase text-[#17212B]">
              Mission Briefing
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#475569] mt-1">
              Review threat vectors and system containment rules before initiating countdown
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
            <Terminal className="w-3.5 h-3.5 text-[#0F766E]" />
            <span className="text-xs font-mono text-[#64748B] uppercase">Analyst:</span>
            <span className="text-xs font-mono font-bold text-[#0F766E] tracking-wide">{gamerTag}</span>
          </div>
        </div>

        {/* 3 Overview Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Global Timer Card */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3 transition-colors hover:border-[#CBD5E1]">
            <div className="p-2.5 rounded-lg bg-[#0F766E]/10 text-[#0F766E] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Global Timer</div>
              <div className="text-sm font-mono font-bold text-[#17212B]">02:00 Shared</div>
              <div className="text-[11px] font-sans text-[#64748B]">Continuous 120s clock</div>
            </div>
          </div>

          {/* System Integrity Card */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3 transition-colors hover:border-[#CBD5E1]">
            <div className="p-2.5 rounded-lg bg-[#15803D]/10 text-[#15803D] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">System Integrity</div>
              <div className="text-sm font-mono font-bold text-[#17212B]">3 Lives Allowed</div>
              <div className="text-[11px] font-sans text-[#64748B]">Zero integrity locks game</div>
            </div>
          </div>

          {/* Vault Security Card */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3 transition-colors hover:border-[#CBD5E1]">
            <div className="p-2.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">Vault Security</div>
              <div className="text-sm font-mono font-bold text-[#17212B]">5 Code Attempts</div>
              <div className="text-[11px] font-sans text-[#64748B]">Positional digit feedback</div>
            </div>
          </div>
        </div>

        {/* Three Mission Detail Rows */}
        <div className="space-y-3 mb-6">
          {/* Mission 1 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors border-l-4 border-l-[#0F766E]">
            <div className="p-2 rounded-lg bg-[#0F766E]/10 text-[#0F766E] shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#0F766E]">LEVEL 01</span>
                <span className="text-base font-display font-bold uppercase tracking-wide text-[#17212B]">
                  Phishing Hunt
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#0F766E]/10 text-[#0F766E]">
                  Email Defense
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-sans text-[#475569] mt-1 leading-relaxed">
                Review four incoming campus email transmissions simultaneously. Exactly one message is a deceptive phishing attempt. An incorrect selection deducts one integrity life.
              </p>
            </div>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors border-l-4 border-l-[#4F46E5]">
            <div className="p-2 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] shrink-0 mt-0.5">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#4F46E5]">LEVEL 02</span>
                <span className="text-base font-display font-bold uppercase tracking-wide text-[#17212B]">
                  Outlier Hunt
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#4F46E5]/10 text-[#4F46E5]">
                  Telemetry Anomaly
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-sans text-[#475569] mt-1 leading-relaxed">
                Scan live numerical telemetry containing 10–12 observations. Multiple statistical anomalies deviate from the baseline. Target counts remain concealed. Select and submit all outliers.
              </p>
            </div>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors border-l-4 border-l-[#15803D]">
            <div className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D] shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#15803D]">LEVEL 03</span>
                <span className="text-base font-display font-bold uppercase tracking-wide text-[#17212B]">
                  Crack the Code
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#15803D]/10 text-[#15803D]">
                  Vault Decryption
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-sans text-[#475569] mt-1 leading-relaxed">
                Decipher a unique 4-digit passcode for the digital vault within 5 attempts. Positional color feedback reveals whether digits are in the correct position (Green), misplaced (Yellow), or absent (Red).
              </p>
            </div>
          </div>
        </div>

        {/* Global Timer Directive Notice */}
        <div className="flex items-start space-x-3 mb-6 p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans">
            <span className="font-bold text-[#B45309] block mb-0.5">CRITICAL COUNTDOWN DIRECTIVE</span>
            <span>The 2-minute global countdown starts immediately upon clicking Initialize System and remains running across all three missions without pause.</span>
          </div>
        </div>

        {/* Two Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleLaunch}
            className="w-full sm:w-2/3 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm hover:shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INITIALIZE SYSTEM</span>
          </button>

          <button
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0F766E] text-[#17212B] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
          >
            <Trophy className="w-4 h-4 text-[#D97706]" />
            <span>VIEW LEADERBOARD</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
