"use client";

import React from "react";
import { Shield, ShieldAlert, Volume2, VolumeX, Clock, Settings, Zap } from "lucide-react";
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

  const getMissionTitle = () => {
    switch (currentMission) {
      case "mission-1":
        return "Mission 01: Phishing Hunt";
      case "mission-2":
        return "Mission 02: Outlier Hunt";
      case "mission-3":
        return "Mission 03: Crack the Code";
      default:
        return "";
    }
  };

  return (
    <header className="w-full bg-[#111827] border-b border-[#263244] sticky top-0 z-40 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
            <span className="font-semibold text-sm tracking-tight text-[#F1F5F9]">
              DSS Security Labs
            </span>
          </div>

          {currentMission && (
            <div className="hidden sm:flex items-center space-x-2 border-l border-[#263244] pl-3">
              <span className="text-xs font-medium text-[#A1AEC0]">
                {getMissionTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Global Timer Centerpiece */}
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-md border font-mono font-semibold text-base transition-colors ${
              isCritical
                ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444] animate-pulse"
                : isWarning
                ? "bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]"
                : "bg-[#151F2E] border-[#263244] text-[#F1F5F9]"
            }`}
          >
            <Clock className="w-4 h-4 text-current" />
            <span className="tracking-wider">{formatTime(timeRemaining)}</span>
          </div>
          {/* Subtle timer line */}
          <div className="w-24 bg-[#151F2E] h-1 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full transition-all duration-1000 ${
                isCritical
                  ? "bg-[#EF4444]"
                  : isWarning
                  ? "bg-[#F59E0B]"
                  : "bg-[#22D3EE]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lives, Score & Utility Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Remaining Lives */}
          <div className="flex items-center space-x-1.5 bg-[#151F2E] px-2.5 py-1.5 rounded-lg border border-[#263244]">
            <span className="text-xs text-[#718096] mr-1 hidden md:inline font-medium">Lives</span>
            {Array.from({ length: maxLives }).map((_, i) => {
              const active = i < lives;
              return (
                <div key={i} className="transition-opacity">
                  {active ? (
                    <Shield className="w-4 h-4 text-[#22C55E] fill-[#22C55E]/30" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-[#718096]/40" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Combo */}
          <div className="flex items-center space-x-2 bg-[#151F2E] px-3 py-1.5 rounded-lg border border-[#263244]">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs text-[#718096] font-medium hidden md:inline">Score</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-[#F1F5F9]">
                {score.toLocaleString()}
              </span>
            </div>

            {comboStreak >= 2 && (
              <div className="flex items-center space-x-0.5 bg-[#22D3EE]/15 text-[#22D3EE] px-1.5 py-0.5 rounded text-xs font-mono font-medium">
                <Zap className="w-3 h-3 fill-current" />
                <span>{comboMultiplier}x</span>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            title={soundEnabled ? "Mute Sound FX" : "Unmute Sound FX"}
            className="p-2 rounded-lg bg-[#151F2E] border border-[#263244] text-[#A1AEC0] hover:text-[#F1F5F9] hover:border-[#334155] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#EF4444]" />}
          </button>

          {/* Discreet Operator Settings Button */}
          <button
            onClick={onOpenAdmin}
            aria-label="Stall Operator Admin"
            title="Operator Settings"
            className="p-2 rounded-lg bg-[#151F2E] border border-[#263244] text-[#718096] hover:text-[#A1AEC0] hover:border-[#334155] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
