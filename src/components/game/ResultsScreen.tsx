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
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#22D3EE", "#A78BFA", "#22C55E", "#F59E0B"],
        });
      } catch {}
    } else {
      sound.playGameOver();
    }
  }, [missionsCompletedCount, finalScore]);

  const getClassificationBadge = (c: PerformanceClassification) => {
    switch (c) {
      case "LEGENDARY DEFENDER":
        return "text-[#22D3EE] border-[#22D3EE]/40 bg-[#22D3EE]/10";
      case "ELITE HACKER":
        return "text-[#A78BFA] border-[#A78BFA]/40 bg-[#A78BFA]/10";
      case "SECURITY SPECIALIST":
        return "text-[#22C55E] border-[#22C55E]/40 bg-[#22C55E]/10";
      case "CYBER EXPLORER":
        return "text-[#F59E0B] border-[#F59E0B]/40 bg-[#F59E0B]/10";
      default:
        return "text-[#A1AEC0] border-[#263244] bg-[#151F2E]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#090D14] bg-subtle-grid">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-[#111827] border border-[#263244] rounded-2xl p-6 sm:p-8 shadow-xl my-auto"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-[#263244]">
          <div className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider mb-2">
            Mission Debriefing
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#F1F5F9] tracking-tight mb-3">
            {missionsCompletedCount === 3
              ? "All Systems Secured Successfully"
              : "Mission Terminated"}
          </h1>

          <div className="inline-flex items-center space-x-2 text-xs">
            <span className="text-[#718096]">Analyst:</span>
            <span className="font-mono font-medium text-[#F1F5F9]">{gamerTag}</span>
            <span className="text-[#718096]">•</span>
            <div
              className={`px-3 py-0.5 rounded-full font-medium border ${getClassificationBadge(
                classification
              )}`}
            >
              {classification}
            </div>
          </div>
        </div>

        {/* 4 Primary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#22D3EE] mb-1">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#718096]">Final Score</div>
            <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F1F5F9]">
              {finalScore.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#A78BFA] mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#718096]">Elapsed Time</div>
            <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F1F5F9]">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>

          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#22C55E] mb-1">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#718096]">Accuracy</div>
            <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F1F5F9]">
              {accuracy}%
            </div>
          </div>

          <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#F59E0B] mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#718096]">Lives Remaining</div>
            <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F1F5F9]">
              {remainingLives} of 3
            </div>
          </div>
        </div>

        {/* Mission Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#718096] uppercase tracking-wider mb-3">
            Layer Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* M1 */}
            <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#22D3EE] mb-1">
                  <span>M01: Phishing</span>
                  {missionResults.mission1.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                  )}
                </div>
                <div className="text-xs text-[#718096]">
                  Lives Lost: {missionResults.mission1.livesLost}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#263244] text-right font-mono font-semibold text-sm text-[#F1F5F9]">
                +{missionResults.mission1.score} Pts
              </div>
            </div>

            {/* M2 */}
            <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#A78BFA] mb-1">
                  <span>M02: Outliers</span>
                  {missionResults.mission2.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                  )}
                </div>
                <div className="text-xs text-[#718096]">
                  Found: {missionResults.mission2.correctOutliersFound} • Wrong: {missionResults.mission2.incorrectSelected}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#263244] text-right font-mono font-semibold text-sm text-[#F1F5F9]">
                +{missionResults.mission2.score} Pts
              </div>
            </div>

            {/* M3 */}
            <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#22C55E] mb-1">
                  <span>M03: Digital Vault</span>
                  {missionResults.mission3.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                  )}
                </div>
                <div className="text-xs text-[#718096]">
                  Attempts: {missionResults.mission3.attemptsUsed}/5
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#263244] text-right font-mono font-semibold text-sm text-[#F1F5F9]">
                +{missionResults.mission3.score} Pts
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Earned */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#718096] uppercase tracking-wider mb-3">
            Earned Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition-colors ${
                  ach.unlocked
                    ? "bg-[#151F2E] border-[#334155] text-[#F1F5F9]"
                    : "bg-[#151F2E]/30 border-[#263244]/40 text-[#718096]/40 opacity-40"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    ach.unlocked
                      ? "bg-[#22D3EE]/15 text-[#22D3EE]"
                      : "bg-[#151F2E] text-[#718096]/40"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#F1F5F9]">
                    {ach.title}
                  </div>
                  <div className="text-[11px] text-[#718096] line-clamp-1">
                    {ach.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#263244]">
          <button
            onClick={() => {
              sound.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#151F2E] hover:bg-[#1A2638] border border-[#263244] hover:border-[#334155] text-xs font-medium text-[#F1F5F9] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <ListOrdered className="w-4 h-4 text-[#22D3EE]" />
            <span>View Leaderboard</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#090D14] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Player / Replay</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
