"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Trophy,
  Clock,
  Shield,
  RotateCcw,
  ListOrdered,
  Award,
  CheckCircle2,
  XCircle,
  Target,
  Sparkles,
  Zap
} from "lucide-react";
import { MissionResults, Achievement, PerformanceClassification } from "@/types/game";
import { formatTime } from "@/lib/scoring";
import { sound } from "@/lib/sound-engine";

interface ResultsScreenProps {
  gamerTag: string;
  finalScore: number;
  timeSpentSeconds: number;
  accuracy: number;
  missionsCompletedCount: number;
  remainingLives: number;
  classification: PerformanceClassification;
  missionResults: MissionResults;
  achievements: Achievement[];
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  gamerTag,
  finalScore,
  timeSpentSeconds,
  accuracy,
  missionsCompletedCount,
  remainingLives,
  classification,
  missionResults,
  achievements,
  onPlayAgain,
  onViewLeaderboard,
}) => {
  useEffect(() => {
    if (missionsCompletedCount === 3 || finalScore >= 800) {
      sound.playMissionComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00E5FF", "#A855F7", "#FF3CAC", "#39FF88"],
        });
      } catch {}
    } else {
      sound.playGameOver();
    }
  }, [missionsCompletedCount, finalScore]);

  const getClassificationBadge = (c: PerformanceClassification) => {
    switch (c) {
      case "CYBER LEGEND":
      case "LEGENDARY DEFENDER":
        return "text-[#FF3CAC] border-[#FF3CAC] bg-[#FF3CAC]/15 shadow-[0_0_15px_rgba(255,60,172,0.4)]";
      case "ELITE HACKER":
        return "text-[#A855F7] border-[#A855F7] bg-[#A855F7]/15 shadow-[0_0_15px_rgba(168,85,247,0.4)]";
      case "SECURITY SPECIALIST":
        return "text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/15 shadow-[0_0_15px_rgba(0,229,255,0.4)]";
      case "CYBER EXPLORER":
        return "text-[#39FF88] border-[#39FF88] bg-[#39FF88]/15 shadow-[0_0_12px_rgba(57,255,136,0.3)]";
      case "ROOKIE ANALYST":
      default:
        return "text-[#FFD43B] border-[#FFD43B] bg-[#FFD43B]/15 shadow-[0_0_12px_rgba(255,212,59,0.3)]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#080611] text-[#F8FAFC] select-none relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF3CAC]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] my-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-[#35264D]">
          <div className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>OPERATIONAL DEBRIEFING</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF3CAC] tracking-wider uppercase mb-3">
            {missionsCompletedCount === 3
              ? "ALL THREATS NEUTRALIZED"
              : "MAINFRAME LOCKOUT ACTIVE"}
          </h1>

          <div className="inline-flex items-center space-x-2 text-xs font-mono">
            <span className="text-[#94A3B8]">CALLSIGN:</span>
            <span className="font-digital font-bold text-[#00E5FF]">{gamerTag}</span>
            <span className="text-[#35264D]">•</span>
            <div
              className={`px-3 py-1 rounded-full font-digital font-bold uppercase tracking-wider border ${getClassificationBadge(
                classification
              )}`}
            >
              {classification}
            </div>
          </div>
        </div>

        {/* 4 Primary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#FFD43B] mb-1">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Final Score</div>
            <div className="text-xl sm:text-2xl font-digital font-bold text-[#FFD43B] tracking-wider">
              {finalScore.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#00E5FF] mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Elapsed Time</div>
            <div className="text-xl sm:text-2xl font-digital font-bold text-[#00E5FF] tracking-wider">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>

          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#39FF88] mb-1">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Accuracy</div>
            <div className="text-xl sm:text-2xl font-digital font-bold text-[#39FF88] tracking-wider">
              {accuracy}%
            </div>
          </div>

          <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#FF365D] mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Remaining Lives</div>
            <div className="text-xl sm:text-2xl font-digital font-bold text-[#FF365D] tracking-wider">
              {remainingLives} OF 3
            </div>
          </div>
        </div>

        {/* Mission Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">
            THREAT VECTOR BREAKDOWN
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* M1 */}
            <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#00E5FF] mb-1">
                  <span>M01: PHISHING</span>
                  {missionResults.mission1.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#39FF88]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF365D]" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  Lives Lost: {missionResults.mission1.livesLost}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#35264D] text-right font-digital font-bold text-sm text-[#00E5FF]">
                +{missionResults.mission1.score} PTS
              </div>
            </div>

            {/* M2 */}
            <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#A855F7] mb-1">
                  <span>M02: OUTLIERS</span>
                  {missionResults.mission2.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#39FF88]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF365D]" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  Found: {missionResults.mission2.correctOutliersFound} • Wrong: {missionResults.mission2.incorrectSelected}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#35264D] text-right font-digital font-bold text-sm text-[#A855F7]">
                +{missionResults.mission2.score} PTS
              </div>
            </div>

            {/* M3 */}
            <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#39FF88] mb-1">
                  <span>M03: CIPHER VAULT</span>
                  {missionResults.mission3.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#39FF88]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF365D]" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  Attempts: {missionResults.mission3.attemptsUsed}/5
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#35264D] text-right font-digital font-bold text-sm text-[#39FF88]">
                +{missionResults.mission3.score} PTS
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Earned */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">
            EARNED BADGES & HONORS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition-colors ${
                  ach.unlocked
                    ? "bg-[#100B1D] border-[#00E5FF]/40 text-[#F8FAFC] shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                    : "bg-[#100B1D]/40 border-[#35264D]/50 text-[#64748B] opacity-40"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    ach.unlocked
                      ? "bg-[#00E5FF]/20 text-[#00E5FF]"
                      : "bg-[#171127] text-[#64748B]"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs uppercase tracking-wide">
                    {ach.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8] line-clamp-1">
                    {ach.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#35264D]">
          <button
            onClick={() => {
              sound.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-[#100B1D] hover:bg-[#171127] border border-[#A855F7] text-[#A855F7] hover:text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ListOrdered className="w-4 h-4" />
            <span>VIEW STANDINGS</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>NEXT OPERATOR / REPLAY</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
