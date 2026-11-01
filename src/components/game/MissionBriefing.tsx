"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Clock, KeyRound, BarChart2, Play, Info } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface MissionBriefingProps {
  gamerTag: string;
  onInitialize: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  gamerTag,
  onInitialize,
}) => {
  const handleLaunch = () => {
    sound.playInit();
    onInitialize();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#090D14] bg-subtle-grid">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-[#111827] border border-[#263244] rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#263244] gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F1F5F9]">
              Mission Briefing
            </h1>
            <p className="text-sm text-[#A1AEC0] mt-1">
              Review operational parameters before initiating the countdown
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#151F2E] border border-[#263244]">
            <span className="text-xs text-[#718096]">Analyst:</span>
            <span className="text-xs font-mono font-medium text-[#22D3EE]">{gamerTag}</span>
          </div>
        </div>

        {/* 3 Compact Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#718096]">Global Timer</div>
              <div className="text-sm font-mono font-semibold text-[#F1F5F9]">03:00 Shared</div>
            </div>
          </div>

          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#718096]">System Integrity</div>
              <div className="text-sm font-mono font-semibold text-[#F1F5F9]">3 Lives Allowed</div>
            </div>
          </div>

          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#A78BFA]/10 text-[#A78BFA] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#718096]">Vault Security</div>
              <div className="text-sm font-mono font-semibold text-[#F1F5F9]">5 Code Attempts</div>
            </div>
          </div>
        </div>

        {/* Three Mission Detail Rows */}
        <div className="space-y-3 mb-6">
          {/* Mission 1 */}
          <div className="bg-[#151F2E]/60 border border-[#263244] rounded-xl p-4 flex items-start space-x-3.5">
            <div className="p-2 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#22D3EE]">01</span>
                <span className="text-sm font-semibold text-[#F1F5F9]">Phishing Hunt</span>
              </div>
              <p className="text-xs text-[#A1AEC0] mt-1 leading-relaxed">
                Review four incoming email transmissions simultaneously. Exactly one message is a phishing attempt. An incorrect selection deducts one life.
              </p>
            </div>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#151F2E]/60 border border-[#263244] rounded-xl p-4 flex items-start space-x-3.5">
            <div className="p-2 rounded-lg bg-[#A78BFA]/10 text-[#A78BFA] shrink-0 mt-0.5">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#A78BFA]">02</span>
                <span className="text-sm font-semibold text-[#F1F5F9]">Outlier Hunt</span>
              </div>
              <p className="text-xs text-[#A1AEC0] mt-1 leading-relaxed">
                Scan numerical telemetry containing 10–12 observations. Multiple statistical anomalies deviate from the baseline. Select and submit all outliers.
              </p>
            </div>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#151F2E]/60 border border-[#263244] rounded-xl p-4 flex items-start space-x-3.5">
            <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#22C55E]">03</span>
                <span className="text-sm font-semibold text-[#F1F5F9]">Crack the Code</span>
              </div>
              <p className="text-xs text-[#A1AEC0] mt-1 leading-relaxed">
                Decipher a unique 4-digit passcode for the digital vault. Colored blocks reveal whether digits are in the correct position (Green), misplaced (Yellow), or absent (Red).
              </p>
            </div>
          </div>
        </div>

        {/* Global Timer Notice */}
        <div className="flex items-center space-x-2 mb-6 px-3.5 py-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-xs text-[#F59E0B]">
          <Info className="w-4 h-4 shrink-0" />
          <span>The 3-minute global countdown starts immediately and remains running across all three missions.</span>
        </div>

        {/* Initialize Button */}
        <button
          onClick={handleLaunch}
          className="w-full py-3.5 rounded-xl bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#090D14] font-semibold text-sm tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Initialize System & Start Timer</span>
        </button>
      </motion.div>
    </div>
  );
};
