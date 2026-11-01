"use client";

import React from "react";
import { Shield, ShieldAlert, Volume2, VolumeX, Clock, Zap } from "lucide-react";
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
}) => {
  const isWarning = timeRemaining <= 60 && timeRemaining > 30;
  const isCritical = timeRemaining <= 30 && timeRemaining > 0;
  const isFinal10 = timeRemaining <= 10 && timeRemaining > 0;
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
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 py-2.5 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-700" />
            <span className="font-heading font-semibold text-sm tracking-tight text-slate-900">
              DSS Security Labs
            </span>
          </div>

          {currentMission && (
            <div className="hidden sm:flex items-center space-x-2 border-l border-slate-200 pl-3">
              <span className="text-xs font-medium text-slate-600">
                {getMissionTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Global Timer Centerpiece */}
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1 rounded-lg border font-mono font-semibold text-base transition-colors ${
              isFinal10
                ? "bg-rose-50 border-rose-500 text-rose-600 animate-pulse"
                : isCritical
                ? "bg-rose-50 border-rose-400 text-rose-600"
                : isWarning
                ? "bg-amber-50 border-amber-400 text-amber-700"
                : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            <Clock className="w-4 h-4 text-current" />
            <span className="tracking-wide">{formatTime(timeRemaining)}</span>
          </div>
          {/* Subtle timer line */}
          <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full transition-all duration-1000 ${
                isCritical
                  ? "bg-rose-600"
                  : isWarning
                  ? "bg-amber-500"
                  : "bg-teal-700"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lives, Score & Utility Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Remaining Lives */}
          <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-500 mr-1 hidden md:inline font-medium">Lives</span>
            {Array.from({ length: maxLives }).map((_, i) => {
              const active = i < lives;
              return (
                <div key={i} className="transition-opacity">
                  {active ? (
                    <Shield className="w-4 h-4 text-emerald-600 fill-emerald-600/25" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-slate-300" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Score & Combo */}
          <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xs text-slate-500 font-medium hidden md:inline">Score</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-slate-900">
                {score.toLocaleString()}
              </span>
            </div>

            {comboStreak >= 2 && (
              <div className="flex items-center space-x-0.5 bg-teal-50 border border-teal-200/60 text-teal-700 px-1.5 py-0.5 rounded text-xs font-mono font-medium">
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
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
