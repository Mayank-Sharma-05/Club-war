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
    <header className="w-full bg-[#FFFFFF] border-b border-[#E2E8F0] sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
            <span className="font-semibold text-sm tracking-tight text-[#17212B]">
              DSS Security Labs
            </span>
          </div>

          {currentMission && (
            <div className="hidden sm:flex items-center space-x-2 border-l border-[#E2E8F0] pl-3">
              <span className="text-xs font-medium text-[#475569]">
                {getMissionTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Global Timer Centerpiece */}
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1 rounded-lg border font-mono font-semibold text-base transition-colors ${
              isCritical
                ? "bg-[#DC2626]/10 border-[#DC2626] text-[#DC2626] animate-pulse"
                : isWarning
                ? "bg-[#D97706]/10 border-[#D97706] text-[#D97706]"
                : "bg-[#F8FAFC] border-[#E2E8F0] text-[#17212B]"
            }`}
          >
            <Clock className="w-4 h-4 text-current" />
            <span className="tracking-wider">{formatTime(timeRemaining)}</span>
          </div>
          {/* Subtle timer line */}
          <div className="w-24 bg-[#E2E8F0] h-1 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full transition-all duration-1000 ${
                isCritical
                  ? "bg-[#DC2626]"
                  : isWarning
                  ? "bg-[#D97706]"
                  : "bg-[#0F766E]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lives, Score & Utility Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Remaining Lives */}
          <div className="flex items-center space-x-1.5 bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E2E8F0]">
            <span className="text-xs text-[#64748B] mr-1 hidden md:inline font-medium">Lives</span>
            {Array.from({ length: maxLives }).map((_, i) => {
              const active = i < lives;
              return (
                <div key={i} className="transition-opacity">
                  {active ? (
                    <Shield className="w-4 h-4 text-[#15803D] fill-[#15803D]/25" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-[#CBD5E1]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Combo */}
          <div className="flex items-center space-x-2 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs text-[#64748B] font-medium hidden md:inline">Score</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-[#17212B]">
                {score.toLocaleString()}
              </span>
            </div>

            {comboStreak >= 2 && (
              <div className="flex items-center space-x-0.5 bg-[#0F766E]/10 text-[#0F766E] px-1.5 py-0.5 rounded text-xs font-mono font-medium">
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
            className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#17212B] hover:border-[#CBD5E1] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#DC2626]" />}
          </button>

          {/* Operator Settings */}
          <button
            onClick={onOpenAdmin}
            aria-label="Stall Operator Admin"
            title="Operator Settings"
            className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#17212B] hover:border-[#CBD5E1] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
