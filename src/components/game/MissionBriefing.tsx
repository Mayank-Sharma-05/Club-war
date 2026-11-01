"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Clock, KeyRound, Database, Play, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-cyber-grid bg-[#070B14] relative">
      <div className="absolute w-[600px] h-[300px] bg-[#A855F7]/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-[#111C2E]/95 border border-[#1E293B] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1E293B] pb-4 mb-6 gap-2">
          <div>
            <span className="text-[10px] font-cyber text-[#00E5FF] tracking-widest uppercase">
              CONFIDENTIAL BRIEFING
            </span>
            <h2 className="font-cyber font-extrabold text-xl sm:text-2xl text-[#F8FAFC]">
              MISSION DIRECTIVE
            </h2>
          </div>
          <div className="px-3 py-1 rounded bg-[#101827] border border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF]">
            CALLSIGN: <span className="font-bold text-[#F8FAFC]">{gamerTag}</span>
          </div>
        </div>

        {/* Global Constraints Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-cyber text-[#94A3B8]">GLOBAL CLOCK</div>
              <div className="text-sm font-mono font-bold text-[#F8FAFC]">03:00 TOTAL</div>
            </div>
          </div>

          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#00E676]/10 text-[#00E676]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-cyber text-[#94A3B8]">SYSTEM INTEGRITY</div>
              <div className="text-sm font-mono font-bold text-[#F8FAFC]">3 LIVES ALLOTTED</div>
            </div>
          </div>

          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#A855F7]/10 text-[#A855F7]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-cyber text-[#94A3B8]">VAULT PROTOCOL</div>
              <div className="text-sm font-mono font-bold text-[#F8FAFC]">5 CODE ATTEMPTS</div>
            </div>
          </div>
        </div>

        {/* 3 Mission Details */}
        <div className="space-y-3 mb-8">
          <div className="bg-[#101827]/70 border border-[#1E293B] rounded-xl p-4 flex items-start space-x-3">
            <div className="p-2 rounded bg-[#00E5FF]/10 text-[#00E5FF] mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-cyber font-bold text-[#00E5FF]">MISSION 01:</span>
                <span className="text-xs font-bold text-[#F8FAFC]">PHISHING HUNT</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Examine 4 simulated incoming email dispatches simultaneously. Only 1 is a malicious phishing attack. Wrong selections burn 1 life. Find the phishing email to restore the defense perimeter.
              </p>
            </div>
          </div>

          <div className="bg-[#101827]/70 border border-[#1E293B] rounded-xl p-4 flex items-start space-x-3">
            <div className="p-2 rounded bg-[#A855F7]/10 text-[#A855F7] mt-0.5">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-cyber font-bold text-[#A855F7]">MISSION 02:</span>
                <span className="text-xs font-bold text-[#F8FAFC]">OUTLIER HUNT</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Scan telemetry data containing 10–12 observations. Multiple statistical anomalies (outliers) are corrupting the dataset. Identify all outliers and submit your analysis.
              </p>
            </div>
          </div>

          <div className="bg-[#101827]/70 border border-[#1E293B] rounded-xl p-4 flex items-start space-x-3">
            <div className="p-2 rounded bg-[#00E676]/10 text-[#00E676] mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-cyber font-bold text-[#00E676]">MISSION 03:</span>
                <span className="text-xs font-bold text-[#F8FAFC]">CRACK THE CODE</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                Decipher the 4-digit unique cryptographic passcode to unlock the Central Intelligence Vault. Use color feedback: <span className="text-[#00E676] font-bold">GREEN</span> (correct spot), <span className="text-[#F59E0B] font-bold">YELLOW</span> (wrong spot), <span className="text-[#FF334F] font-bold">RED</span> (not in code). Max 5 attempts.
              </p>
            </div>
          </div>
        </div>

        {/* Warning rules */}
        <div className="flex items-center space-x-2 mb-6 text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>The 180s countdown initiates immediately upon clicking INITIALIZE SYSTEM and never resets between missions.</span>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLaunch}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#00E676] to-[#00E5FF] text-[#070B14] font-cyber font-black text-sm sm:text-base tracking-widest flex items-center justify-center space-x-3 glow-cyan-lg shadow-xl cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>INITIALIZE SYSTEM // START TIMER</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
