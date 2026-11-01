"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Database, KeyRound, Play, Trophy, Volume2, VolumeX, Terminal, Cpu } from "lucide-react";
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
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-cyber-grid bg-[#070B14] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5FF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[250px] bg-[#A855F7]/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <header className="w-full max-w-6xl flex items-center justify-between z-10 py-2 border-b border-[#1E293B]/60">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-[#101827] border border-[#00E5FF]/30">
            <Cpu className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <div>
            <div className="font-cyber font-extrabold text-sm tracking-wider text-[#F8FAFC]">
              DATA SCIENCE SOCIETY
            </div>
            <div className="text-[11px] font-mono text-[#94A3B8] tracking-widest">
              CAMPUS TECH STALL ARCADE // v2.6
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
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B] text-xs font-mono text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="hidden sm:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF334F]" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            )}
          </button>

          <button
            onClick={handleLeaderboard}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B] text-xs font-mono text-[#F8FAFC] hover:border-[#00E5FF]/40 transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>STANDINGS</span>
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center my-auto py-8 z-10">
        {/* Animated SYSTEM BREACHED warning */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF334F]/10 border border-[#FF334F]/50 text-[#FF334F] text-xs md:text-sm font-mono font-bold tracking-widest mb-6 animate-pulse glow-red"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>ALERT: DSS CENTRAL INTELLIGENCE COMPROMISED</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cyber font-black text-3xl sm:text-5xl md:text-6xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#00E5FF] to-[#A855F7] leading-tight mb-4 drop-shadow-[0_0_25px_rgba(0,229,255,0.3)]"
        >
          DATA BREACH:
          <br />
          <span className="text-[#00E5FF]">CRITICAL COUNTDOWN</span>
        </motion.h1>

        {/* Storyline text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed mb-8"
        >
          The DSS Central Intelligence Network has suffered a critical cyberattack. Three mission-critical security layers have been penetrated. As an appointed Cyber Security Analyst, you must neutralize the intrusion before the global countdown reaches zero.
        </motion.p>

        {/* Mission Preview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10 text-left"
        >
          {/* Mission 1 */}
          <div className="bg-[#111C2E]/80 border border-[#1E293B] hover:border-[#00E5FF]/40 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-cyber tracking-widest text-[#00E5FF]">LAYER 01</span>
              <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <h3 className="font-cyber text-sm font-bold text-[#F8FAFC] mb-1">
              PHISHING HUNT
            </h3>
            <p className="text-xs text-[#94A3B8] leading-normal">
              Inspect incoming transmissions and intercept the single malicious phishing payload.
            </p>
          </div>

          {/* Mission 2 */}
          <div className="bg-[#111C2E]/80 border border-[#1E293B] hover:border-[#A855F7]/40 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-cyber tracking-widest text-[#A855F7]">LAYER 02</span>
              <Database className="w-5 h-5 text-[#A855F7]" />
            </div>
            <h3 className="font-cyber text-sm font-bold text-[#F8FAFC] mb-1">
              OUTLIER HUNT
            </h3>
            <p className="text-xs text-[#94A3B8] leading-normal">
              Analyze statistical distribution anomalies within live telemetry streams.
            </p>
          </div>

          {/* Mission 3 */}
          <div className="bg-[#111C2E]/80 border border-[#1E293B] hover:border-[#00E676]/40 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-cyber tracking-widest text-[#00E676]">LAYER 03</span>
              <KeyRound className="w-5 h-5 text-[#00E676]" />
            </div>
            <h3 className="font-cyber text-sm font-bold text-[#F8FAFC] mb-1">
              CRACK THE CODE
            </h3>
            <p className="text-xs text-[#94A3B8] leading-normal">
              Break the 4-digit cryptographic vault code using positional feedback.
            </p>
          </div>
        </motion.div>

        {/* Global time badge & Start button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <div className="flex items-center space-x-2 bg-[#101827] px-4 py-2.5 rounded-xl border border-[#1E293B] text-xs font-mono text-[#94A3B8]">
            <Terminal className="w-4 h-4 text-[#00E5FF]" />
            <span>GLOBAL ALLOTMENT:</span>
            <span className="text-[#00E5FF] font-bold">03:00 (180s)</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-[#070B14] font-cyber font-extrabold text-sm md:text-base tracking-widest flex items-center justify-center space-x-3 glow-cyan-lg cursor-pointer transition-all hover:opacity-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START MISSION</span>
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl text-center z-10 py-4 text-xs font-mono text-[#94A3B8]/60 border-t border-[#1E293B]/40">
        Data Science Society Tech Stall Arcade • Single-Laptop Tournament Mode • Offline Enabled
      </footer>
    </div>
  );
};
