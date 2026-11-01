"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, KeyRound, BarChart2, Play, Info, Trophy, ShieldAlert } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#F4F6F8] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#E2E8F0] gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17212B]">
              Mission Briefing
            </h1>
            <p className="text-sm text-[#475569] mt-1">
              Review operational parameters before initiating the countdown
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs text-[#64748B]">Analyst:</span>
            <span className="text-xs font-mono font-semibold text-[#0F766E]">{gamerTag}</span>
          </div>
        </div>

        {/* 3 Compact Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#0F766E]/10 text-[#0F766E] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#64748B]">Global Timer</div>
              <div className="text-sm font-mono font-semibold text-[#17212B]">02:00 Shared</div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#64748B]">System Integrity</div>
              <div className="text-sm font-mono font-semibold text-[#17212B]">3 Lives Allowed</div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#64748B]">Vault Security</div>
              <div className="text-sm font-mono font-semibold text-[#17212B]">5 Code Attempts</div>
            </div>
          </div>
        </div>

        {/* Three Mission Detail Rows */}
        <div className="space-y-3 mb-6">
          {/* Mission 1 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors">
            <div className="p-2 rounded-lg bg-[#0F766E]/10 text-[#0F766E] shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#0F766E]">01</span>
                <span className="text-sm font-semibold text-[#17212B]">Phishing Hunt</span>
              </div>
              <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                Review four incoming email transmissions simultaneously. Exactly one message is a phishing attempt. An incorrect selection deducts one life.
              </p>
            </div>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors">
            <div className="p-2 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] shrink-0 mt-0.5">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#4F46E5]">02</span>
                <span className="text-sm font-semibold text-[#17212B]">Outlier Hunt</span>
              </div>
              <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                Scan numerical telemetry containing 10–12 observations. Multiple statistical anomalies deviate from the baseline. Select and submit all outliers.
              </p>
            </div>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex items-start space-x-3.5 transition-colors">
            <div className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D] shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#15803D]">03</span>
                <span className="text-sm font-semibold text-[#17212B]">Crack the Code</span>
              </div>
              <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                Decipher a unique 4-digit passcode for the digital vault. Colored blocks reveal whether digits are in the correct position (Green), misplaced (Yellow), or absent (Red).
              </p>
            </div>
          </div>
        </div>

        {/* Global Timer Notice */}
        <div className="flex items-center space-x-2.5 mb-6 px-3.5 py-2.5 rounded-lg bg-[#D97706]/10 border border-[#D97706]/20 text-xs text-[#D97706] font-medium">
          <Info className="w-4 h-4 shrink-0" />
          <span>The 2-minute global countdown starts immediately upon clicking Initialize System and remains running across all three missions.</span>
        </div>

        {/* Two Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleLaunch}
            className="w-full sm:w-2/3 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-sm tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INITIALIZE SYSTEM</span>
          </button>

          <button
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0F766E] text-[#17212B] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
          >
            <Trophy className="w-4 h-4 text-[#D97706]" />
            <span>VIEW LEADERBOARD</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
