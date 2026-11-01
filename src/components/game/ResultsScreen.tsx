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
  Zap,
  Target,
  Sparkles,
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
    // If completed all 3 missions or score >= 800, blast victory confetti
    if (missionsCompletedCount === 3 || finalScore >= 800) {
      sound.playMissionComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00E5FF", "#A855F7", "#00E676", "#F59E0B"],
        });
      } catch {}
    } else {
      sound.playGameOver();
    }
  }, [missionsCompletedCount, finalScore]);

  const getClassificationColor = (c: PerformanceClassification) => {
    switch (c) {
      case "LEGENDARY DEFENDER":
        return "text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/10 glow-cyan";
      case "ELITE HACKER":
        return "text-[#A855F7] border-[#A855F7] bg-[#A855F7]/10 glow-purple";
      case "SECURITY SPECIALIST":
        return "text-[#00E676] border-[#00E676] bg-[#00E676]/10 glow-green";
      case "CYBER EXPLORER":
        return "text-[#F59E0B] border-[#F59E0B] bg-[#F59E0B]/10";
      default:
        return "text-[#94A3B8] border-[#94A3B8]/40 bg-[#101827]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-cyber-grid bg-[#070B14] relative">
      <div className="absolute w-[600px] h-[300px] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Results Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[#111C2E]/95 border border-[#1E293B] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 my-auto"
      >
        {/* Top Header */}
        <div className="text-center pb-6 border-b border-[#1E293B]">
          <span className="text-[11px] font-cyber text-[#00E5FF] tracking-widest uppercase">
            OPERATION DEBRIEFING REPORT
          </span>

          <h1 className="font-cyber font-black text-2xl sm:text-4xl text-[#F8FAFC] tracking-wider mt-1 mb-3">
            {missionsCompletedCount === 3
              ? "NETWORK THREATS NEUTRALIZED!"
              : "OPERATION TERMINATED"}
          </h1>

          {/* Classification Pill */}
          <div className="inline-flex items-center space-x-2">
            <span className="text-xs font-mono text-[#94A3B8]">CALLSIGN:</span>
            <span className="font-mono font-bold text-sm text-[#F8FAFC]">{gamerTag}</span>
            <span className="text-[#94A3B8]">•</span>
            <div
              className={`px-3.5 py-1 rounded-full text-xs font-cyber font-extrabold tracking-widest border uppercase ${getClassificationColor(
                classification
              )}`}
            >
              {classification}
            </div>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#00E5FF] mb-1">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-cyber text-[#94A3B8] uppercase">FINAL SCORE</div>
            <div className="text-xl sm:text-2xl font-mono font-black text-[#F8FAFC]">
              {finalScore.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#A855F7] mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-cyber text-[#94A3B8] uppercase">ELAPSED TIME</div>
            <div className="text-xl sm:text-2xl font-mono font-black text-[#F8FAFC]">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>

          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#00E676] mb-1">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-cyber text-[#94A3B8] uppercase">ACCURACY</div>
            <div className="text-xl sm:text-2xl font-mono font-black text-[#F8FAFC]">
              {accuracy}%
            </div>
          </div>

          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center text-[#F59E0B] mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-cyber text-[#94A3B8] uppercase">LIVES REMAINING</div>
            <div className="text-xl sm:text-2xl font-mono font-black text-[#F8FAFC]">
              {remainingLives} / 3
            </div>
          </div>
        </div>

        {/* Mission-Wise Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-cyber text-[#94A3B8] uppercase tracking-wider mb-3">
            MISSION BREAKDOWN
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Mission 1 */}
            <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-cyber text-[#00E5FF] mb-1">
                  <span>M01: PHISHING</span>
                  {missionResults.mission1.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF334F]" />
                  )}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  Lives Lost: {missionResults.mission1.livesLost}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#1E293B] text-right font-mono font-bold text-sm text-[#F8FAFC]">
                +{missionResults.mission1.score} PTS
              </div>
            </div>

            {/* Mission 2 */}
            <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-cyber text-[#A855F7] mb-1">
                  <span>M02: OUTLIERS</span>
                  {missionResults.mission2.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF334F]" />
                  )}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  Found: {missionResults.mission2.correctOutliersFound} | Wrong: {missionResults.mission2.incorrectSelected}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#1E293B] text-right font-mono font-bold text-sm text-[#F8FAFC]">
                +{missionResults.mission2.score} PTS
              </div>
            </div>

            {/* Mission 3 */}
            <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-cyber text-[#00E676] mb-1">
                  <span>M03: DIGITAL VAULT</span>
                  {missionResults.mission3.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF334F]" />
                  )}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  Attempts: {missionResults.mission3.attemptsUsed}/5
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#1E293B] text-right font-mono font-bold text-sm text-[#F8FAFC]">
                +{missionResults.mission3.score} PTS
              </div>
            </div>
          </div>
        </div>

        {/* Badges / Achievements Earned */}
        <div className="mb-8">
          <h3 className="text-xs font-cyber text-[#94A3B8] uppercase tracking-wider mb-3">
            ACHIEVEMENT COMMENDATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                  ach.unlocked
                    ? "bg-[#101827] border-[#00E5FF]/60 text-[#F8FAFC] glow-cyan"
                    : "bg-[#070B14]/40 border-[#1E293B]/40 text-[#94A3B8]/30 opacity-40"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    ach.unlocked
                      ? "bg-[#00E5FF]/20 text-[#00E5FF]"
                      : "bg-[#101827] text-[#94A3B8]/30"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-cyber font-bold text-xs tracking-wider">
                    {ach.title}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] line-clamp-1">
                    {ach.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
          <button
            onClick={() => {
              sound.playClick();
              onViewLeaderboard();
            }}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#00E5FF]/50 text-[#F8FAFC] font-cyber font-bold text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <ListOrdered className="w-4 h-4 text-[#00E5FF]" />
            <span>VIEW LEADERBOARD</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-[#070B14] font-cyber font-black text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2 glow-cyan cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>NEXT PLAYER / REPLAY</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
