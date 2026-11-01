"use client";

import React from "react";
import { Shield, Volume2, VolumeX, ShieldAlert, Zap, Clock, Settings } from "lucide-react";
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
  const progressPercent = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));

  return (
    <header className="w-full bg-[#070B14]/90 backdrop-blur-md border-b border-[#1E293B] sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
            <span className="font-cyber font-bold text-xs tracking-widest text-[#00E5FF]">
              DSS :: INTELLIGENCE NET
            </span>
          </div>

          {currentMission && (
            <div className="hidden md:flex items-center space-x-1 border-l border-[#1E293B] pl-3 text-xs">
              <span className="text-[#94A3B8]">LAYER:</span>
              <span className="font-mono text-[#F8FAFC] font-semibold uppercase">
                {currentMission === "mission-1" && "01 // Phishing Hunt"}
                {currentMission === "mission-2" && "02 // Outlier Hunt"}
                {currentMission === "mission-3" && "03 // Crack The Code"}
              </span>
            </div>
          )}
        </div>

        {/* Global Timer Centerpiece */}
        <div className="flex flex-col items-center justify-center min-w-[180px]">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1 rounded-md border font-mono font-bold tracking-widest text-lg transition-all ${
              isCritical
                ? "bg-[#FF334F]/20 border-[#FF334F] text-[#FF334F] animate-pulse glow-red"
                : isWarning
                ? "bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]"
                : "bg-[#111C2E] border-[#1E293B] text-[#00E5FF] glow-cyan"
            }`}
          >
            <Clock className={`w-4 h-4 ${isCritical ? "animate-spin" : ""}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Mini progress line */}
          <div className="w-full bg-[#101827] h-1 rounded-full overflow-hidden mt-1.5 border border-[#1E293B]">
            <div
              className={`h-full transition-all duration-1000 ${
                isCritical
                  ? "bg-[#FF334F]"
                  : isWarning
                  ? "bg-[#F59E0B]"
                  : "bg-[#00E5FF]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stats: Lives, Score & Utility Controls */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Remaining Lives */}
          <div className="flex items-center space-x-1.5 bg-[#101827] px-3 py-1.5 rounded-lg border border-[#1E293B]">
            <span className="text-[11px] font-cyber text-[#94A3B8] mr-1 hidden sm:inline">LIVES</span>
            {Array.from({ length: maxLives }).map((_, i) => {
              const active = i < lives;
              return (
                <div key={i} className="transition-all duration-300">
                  {active ? (
                    <Shield className="w-4 h-4 text-[#00E676] fill-[#00E676]/30 drop-shadow-[0_0_6px_rgba(0,230,118,0.5)]" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-[#94A3B8]/30" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Combo */}
          <div className="flex items-center space-x-2 bg-[#101827] px-3 py-1.5 rounded-lg border border-[#1E293B]">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-cyber text-[#94A3B8] uppercase leading-none">SCORE</span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#F8FAFC]">
                {score.toLocaleString()}
              </span>
            </div>

            {comboStreak >= 2 && (
              <div className="flex items-center space-x-1 bg-[#A855F7]/20 border border-[#A855F7]/60 text-[#A855F7] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold animate-pulse">
                <Zap className="w-3 h-3 fill-current" />
                <span>{comboMultiplier}x</span>
              </div>
            )}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            title={soundEnabled ? "Mute Sound FX" : "Unmute Sound FX"}
            className="p-2 rounded-lg bg-[#101827] border border-[#1E293B] text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#FF334F]" />}
          </button>

          {/* Discreet Admin Button */}
          <button
            onClick={onOpenAdmin}
            aria-label="Stall Operator Admin"
            title="Stall Operator Control"
            className="p-2 rounded-lg bg-[#101827] border border-[#1E293B] text-[#94A3B8]/70 hover:text-[#A855F7] hover:border-[#A855F7]/40 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
