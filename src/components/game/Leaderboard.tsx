"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Clock, Target, ArrowLeft, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { LeaderboardEntry } from "@/types/game";
import { getLeaderboard } from "@/lib/storage";
import { formatTime } from "@/lib/scoring";
import { sound } from "@/lib/sound-engine";

interface LeaderboardProps {
  onBack: () => void;
  onNewGame: () => void;
  highlightSessionId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  onBack,
  onNewGame,
  highlightSessionId,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  const filteredEntries = entries.filter((e) =>
    e.gamerTag.toLowerCase().includes(search.toLowerCase())
  );

  const top10 = filteredEntries.slice(0, 10);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center space-x-1 text-[#F59E0B] font-cyber font-black">
            <Trophy className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/30" />
            <span>#01</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-1 text-[#94A3B8] font-cyber font-black">
            <Medal className="w-4 h-4 text-[#94A3B8]" />
            <span>#02</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-1 text-[#D97706] font-cyber font-black">
            <Medal className="w-4 h-4 text-[#D97706]" />
            <span>#03</span>
          </div>
        );
      default:
        return (
          <span className="font-mono text-xs font-semibold text-[#94A3B8]">
            #{rank.toString().padStart(2, "0")}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-cyber-grid bg-[#070B14] relative">
      <div className="absolute w-[600px] h-[300px] bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-[#111C2E]/95 border border-[#1E293B] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 my-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1E293B] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-cyber text-[#00E5FF] tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span>DSS STALL TOURNAMENT // LAPTOP LEADERBOARD</span>
            </div>
            <h1 className="font-cyber font-black text-2xl sm:text-3xl text-[#F8FAFC]">
              HALL OF CYBER DEFENDERS
            </h1>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by gamer tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#101827] border border-[#1E293B] focus:border-[#00E5FF] rounded-xl text-xs font-mono text-[#F8FAFC] focus:outline-none"
            />
          </div>
        </div>

        {/* Content Table / Empty State */}
        <div className="my-6 flex-grow overflow-x-auto">
          {entries.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#101827] border border-[#1E293B] flex items-center justify-center mb-4 text-[#94A3B8]">
                <Trophy className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-cyber font-bold text-lg text-[#F8FAFC] mb-2">
                NO STANDINGS RECORDED YET
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
                Be the first Cyber Security Analyst to accept the mission and establish the high score on this laptop terminal.
              </p>
            </div>
          ) : top10.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#94A3B8] font-mono">
              No matching callsigns found for &quot;{search}&quot;.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E293B] text-[10px] font-cyber text-[#94A3B8] uppercase tracking-wider">
                  <th className="py-3 px-3">RANK</th>
                  <th className="py-3 px-3">GAMER TAG</th>
                  <th className="py-3 px-3">SCORE</th>
                  <th className="py-3 px-3">TIME</th>
                  <th className="py-3 px-3">ACCURACY</th>
                  <th className="py-3 px-3">CLASSIFICATION</th>
                  <th className="py-3 px-3">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/60 font-mono text-xs">
                {top10.map((entry, idx) => {
                  const isCurrentSession = entry.id === highlightSessionId;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrentSession
                          ? "bg-[#00E5FF]/10 text-[#00E5FF] font-bold"
                          : "hover:bg-[#101827]/70 text-[#F8FAFC]"
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        {getRankBadge(idx + 1)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-bold">
                        {entry.gamerTag}
                        {isCurrentSession && (
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] text-[9px] font-cyber">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-extrabold text-[#00E5FF]">
                        {entry.score.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[#94A3B8]">
                        {formatTime(entry.completionTimeSeconds)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[#00E676]">{entry.accuracy}%</span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[11px] font-cyber">
                        {entry.classification}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[10px] text-[#94A3B8]">
                        {entry.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#94A3B8]/40 text-[#94A3B8] hover:text-[#F8FAFC] font-cyber font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MENU</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              onNewGame();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-[#070B14] font-cyber font-black text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2 glow-cyan cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>NEW GAME SESSION</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
