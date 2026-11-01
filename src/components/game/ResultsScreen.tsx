"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Trophy,
  Clock,
  RotateCcw,
  ListOrdered,
  Award,
  CheckCircle2,
  XCircle,
  TimerReset,
  Medal,
} from "lucide-react";
import { MissionResults, Achievement, PerformanceClassification } from "@/types/game";
import { formatTime } from "@/lib/scoring";
import { sound } from "@/lib/sound-engine";
import { getLeaderboard } from "@/lib/storage";

interface ResultsScreenProps {
  gamerTag: string;
  finalScore: number;
  timeSpentSeconds: number;
  timeRemaining?: number;
  accuracy: number;
  missionsCompletedCount: number;
  remainingLives: number;
  classification: PerformanceClassification;
  missionResults: MissionResults;
  achievements: Achievement[];
  sessionId?: string;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  gamerTag,
  finalScore,
  timeSpentSeconds,
  timeRemaining = 0,
  missionsCompletedCount,
  classification,
  missionResults,
  achievements,
  sessionId,
  onPlayAgain,
  onViewLeaderboard,
}) => {
  const [leaderboardRank, setLeaderboardRank] = useState<number | null>(null);

  useEffect(() => {
    if (missionsCompletedCount === 3 || finalScore >= 240) {
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

  useEffect(() => {
    if (sessionId) {
      const list = getLeaderboard();
      const idx = list.findIndex((e) => e.id === sessionId);
      if (idx !== -1) {
        setLeaderboardRank(idx + 1);
      }
    }
  }, [sessionId]);

  const getClassificationBadge = (c: PerformanceClassification) => {
    switch (c) {
      case "LEGENDARY DEFENDER":
        return "text-teal-700 border-teal-200 bg-teal-50";
      case "ELITE HACKER":
        return "text-indigo-700 border-indigo-200 bg-indigo-50";
      case "SECURITY SPECIALIST":
        return "text-emerald-700 border-emerald-200 bg-emerald-50";
      case "CYBER EXPLORER":
        return "text-amber-700 border-amber-200 bg-amber-50";
      default:
        return "text-slate-600 border-slate-200 bg-slate-50";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F8FAFC] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-4xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm my-auto"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="text-xs font-semibold text-teal-700 mb-2 font-sans">
            Mission Debriefing
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight mb-3">
            {missionsCompletedCount === 3
              ? "All Systems Secured Successfully"
              : "Mission Terminated"}
          </h1>

          <div className="inline-flex items-center flex-wrap justify-center gap-2 text-xs font-sans">
            <span className="text-slate-500 font-medium">Analyst:</span>
            <span className="font-semibold text-slate-900">{gamerTag}</span>
            <span className="text-slate-300">•</span>
            <div
              className={`px-3 py-1 rounded-full font-medium border ${getClassificationBadge(
                classification
              )}`}
            >
              {classification}
            </div>
            {leaderboardRank !== null && (
              <>
                <span className="text-slate-300">•</span>
                <div className="px-3 py-1 rounded-full font-medium border border-amber-200 bg-amber-50 text-amber-800 flex items-center space-x-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>Leaderboard Rank #{leaderboardRank}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 4 Primary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {/* Final Score / 300 */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-teal-700 mb-1">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500 font-sans">Final Score</div>
            <div className="flex items-baseline justify-center space-x-1 text-slate-900 mt-0.5">
              <span className="text-xl sm:text-2xl font-mono font-bold">{finalScore}</span>
              <span className="text-xs font-mono text-slate-400">/ 300</span>
            </div>
          </div>

          {/* Completion Time */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-indigo-700 mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500 font-sans">Completion Time</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 mt-0.5">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>

          {/* Time Remaining */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-emerald-700 mb-1">
              <TimerReset className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500 font-sans">Time Remaining</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 mt-0.5">
              {formatTime(timeRemaining)}
            </div>
          </div>

          {/* Rank Position */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-amber-600 mb-1">
              <Medal className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500 font-sans">Standings Rank</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 mt-0.5">
              {leaderboardRank !== null ? `#${leaderboardRank}` : "—"}
            </div>
          </div>
        </div>

        {/* Mission Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-500 font-sans">
              Individual Mission Performance
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Total: {finalScore} / 300 pts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* M1 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-teal-700 mb-1 font-sans">
                  <span>Mission 01: Phishing</span>
                  {missionResults.mission1.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="text-xs text-slate-500 font-sans">
                  {missionResults.mission1.livesLost === 0
                    ? "Flawless — 0 incorrect selections"
                    : `${missionResults.mission1.livesLost} incorrect selection(s) (-${missionResults.mission1.livesLost * 25} pts)`}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/80 text-right font-mono font-bold text-sm text-slate-900">
                +{missionResults.mission1.score} / 100 pts
              </div>
            </div>

            {/* M2 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 mb-1 font-sans">
                  <span>Mission 02: Outliers</span>
                  {missionResults.mission2.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="text-xs text-slate-500 font-sans">
                  Found: {missionResults.mission2.correctOutliersFound} • False: {missionResults.mission2.incorrectSelected}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/80 text-right font-mono font-bold text-sm text-slate-900">
                +{missionResults.mission2.score} / 100 pts
              </div>
            </div>

            {/* M3 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1 font-sans">
                  <span>Mission 03: Digital Vault</span>
                  {missionResults.mission3.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="text-xs text-slate-500 font-sans">
                  {missionResults.mission3.unlocked
                    ? `Cracked in ${missionResults.mission3.attemptsUsed} attempt(s)`
                    : "Passcode decryption failed"}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200/80 text-right font-mono font-bold text-sm text-slate-900">
                +{missionResults.mission3.score} / 100 pts
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Earned */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-500 mb-3 font-sans">
            Earned Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition-colors ${
                  ach.unlocked
                    ? "bg-white border-slate-200 text-slate-900 shadow-2xs"
                    : "bg-slate-50/40 border-slate-100 text-slate-400 opacity-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    ach.unlocked
                      ? "bg-teal-50 border border-teal-100 text-teal-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-slate-900 font-sans">
                    {ach.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans line-clamp-1">
                    {ach.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              sound.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-1/2 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-2xs font-sans"
          >
            <ListOrdered className="w-4 h-4 text-teal-700" />
            <span>View Leaderboard</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs font-sans"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Player / Replay</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
