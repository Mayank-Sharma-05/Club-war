"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Play, 
  Trophy, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Clock, 
  Heart, 
  Zap, 
  Terminal, 
  CheckCircle2, 
  X, 
  Sparkles,
  Cpu
} from "lucide-react";
import { sound } from "@/lib/sound-engine";
import { ChiefAvatar } from "@/components/chief/ChiefAvatar";

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
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleStart = () => {
    sound.playClick();
    onStart();
  };

  const handleLeaderboard = () => {
    sound.playClick();
    onViewLeaderboard();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#080611] text-[#F8FAFC] overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-[#FF3CAC]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Arcade Navbar */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-4 border-b border-[#35264D]/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#171127] border border-[#35264D] flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <Cpu className="w-5 h-5 text-[#00E5FF] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-sm tracking-widest text-[#00E5FF] uppercase">
                DSS CYBER COMMAND
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#FF3CAC]/20 text-[#FF3CAC] border border-[#FF3CAC]/30 font-semibold">
                ARCADE v3.0
              </span>
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">
              Central Intelligence Cyber Division
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
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#171127] border border-[#35264D] hover:border-[#00E5FF]/60 text-xs font-mono text-[#CBD5E1] hover:text-[#00E5FF] transition-all cursor-pointer shadow-xs"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="hidden sm:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF365D]" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            )}
          </button>

          <button
            onClick={handleLeaderboard}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#171127] border border-[#A855F7]/60 hover:border-[#A855F7] text-xs font-mono font-semibold text-[#A855F7] hover:bg-[#A855F7]/10 transition-all cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LEADERBOARD</span>
          </button>
        </div>
      </header>

      {/* Main Title Arena */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center my-auto py-6">
        {/* Club Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#171127] border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-medium mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-widest uppercase">DATA SCIENCE SOCIETY PRESENTS</span>
        </motion.div>

        {/* Title */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FF3CAC] via-[#A855F7] to-[#00E5FF] drop-shadow-[0_5px_15px_rgba(255,60,172,0.4)]">
            DATA BREACH
          </h1>
          <div className="font-digital font-bold text-lg sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-[#00E5FF] drop-shadow-[0_0_12px_rgba(0,229,255,0.7)] mt-1">
            CRITICAL COUNTDOWN
          </div>
        </motion.div>

        {/* Brief Narrative */}
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed mb-6 font-sans">
          The Central Intelligence Network has suffered an active breach. Neutralize 3 critical threat vectors before the 2-minute countdown reaches zero.
        </p>

        {/* CHIEF Interactive Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-lg mb-8 bg-[#171127]/90 border border-[#35264D] rounded-2xl p-4 flex items-center space-x-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <div className="shrink-0 scale-90">
            <ChiefAvatar emotion="idle" size="sm" isSpeaking={false} />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-display font-bold text-xs tracking-wider text-[#00E5FF] uppercase">
                CHIEF // AI COMMANDER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" />
              <span className="text-[10px] font-mono text-[#64748B]">ONLINE</span>
            </div>
            <p className="text-xs text-[#CBD5E1] italic leading-relaxed font-sans">
              &quot;Think you have what it takes to stop the breach, Rookie? The clock is ticking!&quot;
            </p>
          </div>
        </motion.div>

        {/* Quick Game Rules Summary Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8">
          <div className="bg-[#171127] border border-[#35264D] rounded-xl p-3 flex flex-col items-center text-center">
            <Clock className="w-4 h-4 text-[#FFD43B] mb-1" />
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Global Timer</span>
            <span className="font-digital text-sm font-bold text-[#FFD43B]">02:00 (120s)</span>
          </div>

          <div className="bg-[#171127] border border-[#35264D] rounded-xl p-3 flex flex-col items-center text-center">
            <ShieldAlert className="w-4 h-4 text-[#00E5FF] mb-1" />
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Missions</span>
            <span className="font-digital text-sm font-bold text-[#00E5FF]">3 Threat Vectors</span>
          </div>

          <div className="bg-[#171127] border border-[#35264D] rounded-xl p-3 flex flex-col items-center text-center">
            <Heart className="w-4 h-4 text-[#FF365D] mb-1" />
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Player Health</span>
            <span className="font-digital text-sm font-bold text-[#FF365D]">3 Lives Max</span>
          </div>

          <div className="bg-[#171127] border border-[#35264D] rounded-xl p-3 flex flex-col items-center text-center">
            <Zap className="w-4 h-4 text-[#A855F7] mb-1" />
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Scoring</span>
            <span className="font-digital text-sm font-bold text-[#A855F7]">Combo Streaks</span>
          </div>
        </div>

        {/* 3 Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg">
          {/* 1. START GAME (Large glowing neon cyan button with pulse) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-base tracking-wider uppercase flex items-center justify-center space-x-2.5 cursor-pointer shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] transition-all animate-pulse"
            style={{ animationDuration: '2.5s' }}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START GAME</span>
          </motion.button>

          {/* 2. VIEW LEADERBOARD (Glowing purple button) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLeaderboard}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#171127] border border-[#A855F7] text-[#A855F7] hover:text-[#FFFFFF] hover:bg-[#A855F7]/20 font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
          >
            <Trophy className="w-4 h-4 text-[#FFD43B]" />
            <span>LEADERBOARD</span>
          </motion.button>

          {/* 3. HOW TO PLAY (Cyan outlined button) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              setShowHowToPlay(true);
            }}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-[#171127] border border-[#35264D] hover:border-[#00E5FF] text-[#CBD5E1] hover:text-[#00E5FF] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>HOW TO PLAY</span>
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl text-center py-4 text-xs font-mono text-[#64748B] border-t border-[#35264D]/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>STANDALONE BROWSER TOURNAMENT • SINGLE-DEVICE KIOSK</span>
        </div>
        <div>
          DESIGNED FOR DATA SCIENCE SOCIETY STALL
        </div>
      </footer>

      {/* HOW TO PLAY MODAL */}
      <AnimatePresence>
        {showHowToPlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#171127] border border-[#00E5FF]/50 rounded-2xl p-6 max-w-lg w-full shadow-[0_0_40px_rgba(0,229,255,0.3)] text-left relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#35264D] mb-4">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-[#00E5FF]" />
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC] tracking-wider uppercase">
                    OPERATIONAL DIRECTIVES
                  </h3>
                </div>
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#35264D] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#CBD5E1]">
                <div className="p-3 rounded-xl bg-[#100B1D] border border-[#35264D]">
                  <div className="font-display font-bold text-sm text-[#00E5FF] mb-1">
                    MISSION 01: PHISHING HUNT
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Inspect 4 campus email transmissions. 3 are authentic operations; exactly 1 is deceptive phishing. Check sender domains, urgent deadlines, and payload links carefully.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#100B1D] border border-[#35264D]">
                  <div className="font-display font-bold text-sm text-[#A855F7] mb-1">
                    MISSION 02: OUTLIER HUNT
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Scan live digital telemetry. Identify and select statistical anomalies skewing the data stream, then click SUBMIT IDENTIFICATION. Target counts remain concealed.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#100B1D] border border-[#35264D]">
                  <div className="font-display font-bold text-sm text-[#39FF88] mb-1">
                    MISSION 03: CRACK THE CODE
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Decipher the 4-digit security code. You have 5 attempts. Green indicates correct digit and position. Yellow indicates correct digit in the wrong position.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#100B1D] border border-[#FF3CAC]/30">
                  <div className="font-display font-bold text-sm text-[#FF3CAC] mb-1">
                    CRITICAL SURVIVAL RULES
                  </div>
                  <ul className="text-xs text-[#94A3B8] space-y-1 list-disc list-inside">
                    <li>120 seconds total across all 3 missions. Timer never stops!</li>
                    <li>3 lives max. Erroneous selections subtract 1 life.</li>
                    <li>Speed and streaks earn massive combo multipliers.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#35264D] flex justify-end">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="px-5 py-2 rounded-xl bg-[#00E5FF] text-[#080611] font-display font-bold text-xs uppercase tracking-wider hover:bg-[#00E5FF]/90 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  ACKNOWLEDGE & CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
