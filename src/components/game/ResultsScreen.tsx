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
          colors: ["#0F766E", "#4F46E5", "#15803D", "#D97706"],
        });
      } catch {}
    } else {
      sound.playGameOver();
    }
  }, [missionsCompletedCount, finalScore]);

  const getClassificationBadge = (c: PerformanceClassification) => {
    switch (c) {
      case "LEGENDARY DEFENDER":
        return "text-[#0F766E] border-[#0F766E]/40 bg-[#F0FDFA]";
      case "ELITE HACKER":
        return "text-[#4F46E5] border-[#4F46E5]/40 bg-[#EEF2FF]";
      case "SECURITY SPECIALIST":
        return "text-[#15803D] border-[#15803D]/40 bg-[#DCFCE7]";
      case "CYBER EXPLORER":
        return "text-[#D97706] border-[#D97706]/40 bg-[#FEF3C7]";
      default:
        return "text-[#475569] border-[#E2E8F0] bg-[#F8FAFC]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F4F6F8] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm my-auto"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-[#E2E8F0]">
          <div className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider mb-2">
            Mission Debriefing
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17212B] tracking-tight mb-3">
            {missionsCompletedCount === 3
              ? "All Systems Secured Successfully"
              : "Mission Terminated"}
          </h1>

          <div className="inline-flex items-center space-x-2 text-xs">
            <span className="text-[#64748B]">Analyst:</span>
            <span className="font-mono font-semibold text-[#17212B]">{gamerTag}</span>
            <span className="text-[#64748B]">•</span>
            <div
              className={`px-3 py-1 rounded-full font-semibold border ${getClassificationBadge(
                classification
              )}`}
            >
              {classification}
            </div>
          </div>
        </div>

        {/* 4 Primary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#0F766E] mb-1">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#64748B]">Final Score</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#17212B]">
              {finalScore.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#4F46E5] mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#64748B]">Elapsed Time</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#17212B]">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#15803D] mb-1">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#64748B]">Accuracy</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#17212B]">
              {accuracy}%
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#D97706] mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#64748B]">Lives Remaining</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#17212B]">
              {remainingLives} of 3
            </div>
          </div>
        </div>

        {/* Mission Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Layer Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* M1 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#0F766E] mb-1">
                  <span>M01: Phishing</span>
                  {missionResults.mission1.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#DC2626]" />
                  )}
                </div>
                <div className="text-xs text-[#64748B]">
                  Lives Lost: {missionResults.mission1.livesLost}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#E2E8F0] text-right font-mono font-bold text-sm text-[#17212B]">
                +{missionResults.mission1.score} Pts
              </div>
            </div>

            {/* M2 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#4F46E5] mb-1">
                  <span>M02: Outliers</span>
                  {missionResults.mission2.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#DC2626]" />
                  )}
                </div>
                <div className="text-xs text-[#64748B]">
                  Found: {missionResults.mission2.correctOutliersFound} • Wrong: {missionResults.mission2.incorrectSelected}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#E2E8F0] text-right font-mono font-bold text-sm text-[#17212B]">
                +{missionResults.mission2.score} Pts
              </div>
            </div>

            {/* M3 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#15803D] mb-1">
                  <span>M03: Digital Vault</span>
                  {missionResults.mission3.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#DC2626]" />
                  )}
                </div>
                <div className="text-xs text-[#64748B]">
                  Attempts: {missionResults.mission3.attemptsUsed}/5
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#E2E8F0] text-right font-mono font-bold text-sm text-[#17212B]">
                +{missionResults.mission3.score} Pts
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Earned */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Earned Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition-colors ${
                  ach.unlocked
                    ? "bg-[#FFFFFF] border-[#CBD5E1] text-[#17212B] shadow-2xs"
                    : "bg-[#F8FAFC]/50 border-[#E2E8F0] text-[#94A3B8] opacity-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    ach.unlocked
                      ? "bg-[#0F766E]/10 text-[#0F766E]"
                      : "bg-[#F1F5F9] text-[#94A3B8]"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#17212B]">
                    {ach.title}
                  </div>
                  <div className="text-[11px] text-[#64748B] line-clamp-1">
                    {ach.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
          <button
            onClick={() => {
              sound.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0F766E] text-xs font-semibold text-[#17212B] flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
          >
            <ListOrdered className="w-4 h-4 text-[#0F766E]" />
            <span>View Leaderboard</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Player / Replay</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
