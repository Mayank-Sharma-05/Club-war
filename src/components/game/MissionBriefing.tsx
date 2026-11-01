"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, KeyRound, BarChart2, Play, Trophy, ShieldAlert, Cpu, AlertTriangle } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#080611] text-[#F8FAFC] select-none relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#35264D] gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00E5FF]">
                MISSION READINESS PROTOCOL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#CBD5E1] to-[#00E5FF]">
              SYSTEM BREACH DEPLOYMENT
            </h1>
          </div>
          <div className="inline-flex items-center space-x-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#100B1D] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="text-xs font-mono text-[#94A3B8]">CALLSIGN:</span>
            <span className="text-sm font-digital font-bold text-[#00E5FF]">{gamerTag}</span>
          </div>
        </div>

        {/* 3 Parameter Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-[#FFD43B]/10 text-[#FFD43B] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Global Allotment</div>
              <div className="text-sm font-digital font-bold text-[#FFD43B]">02:00 Shared (120s)</div>
            </div>
          </div>

          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-[#FF365D]/10 text-[#FF365D] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Integrity Health</div>
              <div className="text-sm font-digital font-bold text-[#FF365D]">3 System Lives</div>
            </div>
          </div>

          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-[#39FF88]/10 text-[#39FF88] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Vault Cipher</div>
              <div className="text-sm font-digital font-bold text-[#39FF88]">5 Passcode Attempts</div>
            </div>
          </div>
        </div>

        {/* Three Mission Detail Cards */}
        <div className="space-y-3 mb-6">
          {/* Mission 1 */}
          <div className="bg-[#100B1D] border border-[#35264D] hover:border-[#00E5FF]/60 rounded-xl p-4 flex items-start space-x-3.5 transition-all group">
            <div className="p-2.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 mt-0.5 border border-[#00E5FF]/30 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#00E5FF]">LEVEL 01</span>
                <span className="text-sm font-display font-bold text-[#F8FAFC] uppercase tracking-wide">
                  Phishing Hunt
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  Email Defense
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-sans">
                Review 4 incoming campus communications. Exactly 1 is an active phishing attempt. False identification penalizes 1 system life.
              </p>
            </div>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#100B1D] border border-[#35264D] hover:border-[#A855F7]/60 rounded-xl p-4 flex items-start space-x-3.5 transition-all group">
            <div className="p-2.5 rounded-lg bg-[#A855F7]/10 text-[#A855F7] shrink-0 mt-0.5 border border-[#A855F7]/30 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#A855F7]">LEVEL 02</span>
                <span className="text-sm font-display font-bold text-[#F8FAFC] uppercase tracking-wide">
                  Outlier Hunt
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
                  Telemetry Scan
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-sans">
                Scan numerical sensor telemetry for statistical anomalies skewing the baseline. Target counts remain concealed. Submit all identified outliers together.
              </p>
            </div>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#100B1D] border border-[#35264D] hover:border-[#39FF88]/60 rounded-xl p-4 flex items-start space-x-3.5 transition-all group">
            <div className="p-2.5 rounded-lg bg-[#39FF88]/10 text-[#39FF88] shrink-0 mt-0.5 border border-[#39FF88]/30 group-hover:shadow-[0_0_15px_rgba(57,255,136,0.3)]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#39FF88]">LEVEL 03</span>
                <span className="text-sm font-display font-bold text-[#F8FAFC] uppercase tracking-wide">
                  Crack the Code
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30">
                  Vault Decryption
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-sans">
                Decipher the 4-digit security vault PIN within 5 attempts. Color feedback indicates exact placement (Green), wrong position (Yellow), or invalid (Gray).
              </p>
            </div>
          </div>
        </div>

        {/* Global Timer Alert Notice */}
        <div className="flex items-center space-x-3 mb-6 px-4 py-3 rounded-xl bg-[#100B1D] border border-[#FFD43B]/30 text-xs text-[#FFD43B]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#FFD43B]" />
          <span className="font-mono">
            CRITICAL: The 2-minute global countdown runs continuously through all three missions. No pauses. Zero time triggers immediate containment failure.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLaunch}
            className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INITIALIZE SYSTEM</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLeaderboard}
            className="w-full sm:w-1/3 py-3.5 rounded-xl bg-[#100B1D] hover:bg-[#171127] border border-[#A855F7] text-[#A855F7] hover:text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Trophy className="w-4 h-4 text-[#FFD43B]" />
            <span>VIEW LEADERBOARD</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
