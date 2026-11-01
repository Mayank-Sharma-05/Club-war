"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, ArrowLeft, RotateCcw, Search } from "lucide-react";
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
          <div className="flex items-center space-x-1.5 text-[#F59E0B] font-semibold">
            <Trophy className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20" />
            <span>#1</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-1.5 text-[#A1AEC0] font-semibold">
            <Medal className="w-4 h-4 text-[#A1AEC0]" />
            <span>#2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-1.5 text-[#D97706] font-semibold">
            <Medal className="w-4 h-4 text-[#D97706]" />
            <span>#3</span>
          </div>
        );
      default:
        return (
          <span className="font-mono text-xs text-[#718096]">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#090D14] bg-subtle-grid">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-[#111827] border border-[#263244] rounded-2xl p-6 sm:p-8 shadow-xl my-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#263244] gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F1F5F9]">
              Tournament Leaderboard
            </h1>
            <p className="text-sm text-[#A1AEC0] mt-1">
              Top Cyber Analysts ranked by score and mission completion time
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by callsign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#151F2E] border border-[#263244] focus:border-[#22D3EE] rounded-xl text-xs text-[#F1F5F9] focus:outline-none"
            />
          </div>
        </div>

        {/* Table or Empty State */}
        <div className="my-6 flex-grow overflow-x-auto">
          {entries.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#151F2E] border border-[#263244] flex items-center justify-center mb-4 text-[#718096]">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-[#F1F5F9] mb-1">
                No Leaderboard Records Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#718096] max-w-sm">
                Complete the three missions to establish the top score on this tournament machine.
              </p>
            </div>
          ) : top10.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#718096]">
              No analysts found matching &quot;{search}&quot;.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#263244] text-xs font-semibold text-[#718096] uppercase tracking-wider">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Callsign</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#263244]/60 text-xs">
                {top10.map((entry, idx) => {
                  const isCurrentSession = entry.id === highlightSessionId;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrentSession
                          ? "bg-[#22D3EE]/10 text-[#22D3EE] font-medium"
                          : "hover:bg-[#151F2E] text-[#F1F5F9]"
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        {getRankBadge(idx + 1)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-medium">
                        {entry.gamerTag}
                        {isCurrentSession && (
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-[#22D3EE]/20 text-[#22D3EE] text-[10px]">
                            You
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-semibold text-[#22D3EE]">
                        {entry.score.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[#A1AEC0]">
                        {formatTime(entry.completionTimeSeconds)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[#22C55E]">
                        {entry.accuracy}%
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-[#A1AEC0]">
                        {entry.classification}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-[#718096]">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#263244]">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#151F2E] hover:bg-[#1A2638] border border-[#263244] hover:border-[#334155] text-xs font-medium text-[#A1AEC0] hover:text-[#F1F5F9] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Menu</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNewGame();
            }}
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-[#090D14] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game Session</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
