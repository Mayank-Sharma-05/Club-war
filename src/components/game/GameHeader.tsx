"use client";

import React from "react";
import { Shield, ShieldAlert, Volume2, VolumeX, Clock, Settings, Zap, Terminal } from "lucide-react";
import { formatTime } from "@/lib/scoring";
import { MissionId } from "@/types/game";

interface GameHeaderProps {
  timeRemaining: number;
  totalTime: number;
  score: number;
  comboStreak: number;
  comboMultiplier: number;
  lives: number;
  maxLives: number;
  currentMission?: MissionId;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAdmin: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  timeRemaining,
  totalTime,
  score,
  comboStreak,
  comboMultiplier,
  lives,
  maxLives,
  currentMission,
  soundEnabled,
  onToggleSound,
  onOpenAdmin,
}) => {
  const isWarning = timeRemaining <= 60 && timeRemaining > 30;
  const isCritical = timeRemaining <= 30 && timeRemaining > 0;
  const isFinal10 = timeRemaining <= 10 && timeRemaining > 0;
  const progressPercent = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));

  const getMissionInfo = () => {
    switch (currentMission) {
      case "mission-1":
        return { label: "LEVEL 01", title: "Phishing Hunt", color: "text-[#00E5FF] border-[#00E5FF]/40" };
      case "mission-2":
        return { label: "LEVEL 02", title: "Outlier Hunt", color: "text-[#A855F7] border-[#A855F7]/40" };
      case "mission-3":
        return { label: "LEVEL 03", title: "Crack the Code", color: "text-[#39FF88] border-[#39FF88]/40" };
      default:
        return { label: "SYSTEM", title: "Active Breach", color: "text-[#00E5FF] border-[#00E5FF]/40" };
    }
  };

  const missionInfo = getMissionInfo();

  return (
    <header className="w-full bg-[#100B1D]/95 border-b border-[#35264D] backdrop-blur-md sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.6)] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
            <span className="font-display font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7] uppercase hidden sm:inline">
              DATA BREACH
            </span>
          </div>

          {currentMission && (
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#171127] border ${missionInfo.color}`}>
              <span className="text-[10px] font-mono font-bold">{missionInfo.label}:</span>
              <span className="text-xs font-display font-bold uppercase tracking-wide text-white">
                {missionInfo.title}
              </span>
            </div>
          )}
        </div>

        {/* Global Countdown Centerpiece */}
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1 rounded-xl border font-digital font-bold text-base sm:text-lg transition-all ${
              isFinal10
                ? "bg-[#FF365D]/20 border-[#FF365D] text-[#FF365D] shadow-[0_0_20px_#FF365D] animate-ping"
                : isCritical
                ? "bg-[#FF365D]/15 border-[#FF365D] text-[#FF365D] shadow-[0_0_15px_rgba(255,54,93,0.5)] animate-pulse"
                : isWarning
                ? "bg-[#FFD43B]/10 border-[#FFD43B] text-[#FFD43B] shadow-[0_0_12px_rgba(255,212,59,0.3)]"
                : "bg-[#171127] border-[#00E5FF]/50 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]"
            }`}
          >
            <Clock className="w-4 h-4 shrink-0 text-current" />
            <span className="tracking-widest">{formatTime(timeRemaining)}</span>
          </div>
          {/* Neon progress bar */}
          <div className="w-24 sm:w-32 bg-[#171127] border border-[#35264D] h-1.5 rounded-full overflow-hidden mt-1 shadow-inner">
            <div
              className={`h-full transition-all duration-1000 ${
                isCritical
                  ? "bg-[#FF365D] shadow-[0_0_10px_#FF365D]"
                  : isWarning
                  ? "bg-[#FFD43B] shadow-[0_0_8px_#FFD43B]"
                  : "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lives, Score & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Integrity Lives */}
          <div className="flex items-center space-x-1 bg-[#171127] px-2 sm:px-2.5 py-1.5 rounded-xl border border-[#35264D]">
            <span className="text-[10px] font-mono text-[#94A3B8] mr-1 hidden lg:inline">LIVES</span>
            {Array.from({ length: maxLives }).map((_, i) => {
              const active = i < lives;
              return (
                <div key={i} className="transition-all">
                  {active ? (
                    <Shield className="w-4 h-4 text-[#39FF88] fill-[#39FF88] drop-shadow-[0_0_6px_#39FF88]" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-[#35264D]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Combo */}
          <div className="flex items-center space-x-2 bg-[#171127] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#35264D]">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-[10px] font-mono text-[#94A3B8] hidden md:inline">SCORE</span>
              <span className="font-digital text-sm sm:text-base font-bold text-[#F8FAFC] tracking-wider">
                {score.toLocaleString()}
              </span>
            </div>

            {comboStreak >= 2 && (
              <div className="flex items-center space-x-0.5 bg-[#FF3CAC]/20 text-[#FF3CAC] border border-[#FF3CAC]/40 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold shadow-[0_0_8px_rgba(255,60,172,0.4)] animate-pulse">
                <Zap className="w-3 h-3 fill-current" />
                <span>{comboMultiplier}x</span>
              </div>
            )}
          </div>

          {/* Sound & Admin Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleSound}
              aria-label="Toggle Sound"
              className="p-1.5 rounded-lg bg-[#171127] border border-[#35264D] text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00E5FF]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#FF365D]" />
              )}
            </button>

            <button
              onClick={onOpenAdmin}
              aria-label="Admin Settings"
              className="p-1.5 rounded-lg bg-[#171127] border border-[#35264D] text-[#94A3B8] hover:text-[#A855F7] hover:border-[#A855F7]/40 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
