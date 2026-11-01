"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  ArrowLeft,
  RotateCcw,
  Search,
  Trash2,
  AlertTriangle,
  X,
  Lock,
} from "lucide-react";
import { LeaderboardEntry } from "@/types/game";
import { getLeaderboard, resetLeaderboard, getGameSettings } from "@/lib/storage";
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
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  const filteredEntries = entries.filter((e) =>
    e.gamerTag.toLowerCase().includes(search.toLowerCase())
  );

  const top10 = filteredEntries.slice(0, 10);

  const handleConfirmClear = () => {
    const settings = getGameSettings();
    const correctPin = settings.operatorPin || "1337";

    if (pinInput.trim() !== correctPin) {
      setPinError("Invalid Organizer PIN. Enter " + correctPin + " to authorize deletion.");
      sound.playIncorrect();
      return;
    }

    resetLeaderboard();
    setEntries([]);
    setIsClearModalOpen(false);
    setPinInput("");
    setPinError(null);
    sound.playClick();
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center space-x-1.5 text-[#D97706] font-bold">
            <Trophy className="w-4 h-4 text-[#D97706] fill-[#D97706]/20" />
            <span>#1</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-1.5 text-[#475569] font-bold">
            <Medal className="w-4 h-4 text-[#475569]" />
            <span>#2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-1.5 text-[#B45309] font-bold">
            <Medal className="w-4 h-4 text-[#B45309]" />
            <span>#3</span>
          </div>
        );
      default:
        return (
          <span className="font-mono text-xs text-[#64748B]">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F4F6F8] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm my-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17212B]">
              Tournament Standings
            </h1>
            <p className="text-sm text-[#475569] mt-1">
              Top Cyber Analysts ranked by score and completion time
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by callsign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl text-xs text-[#17212B] focus:outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Table or Empty State */}
        <div className="my-6 flex-grow overflow-x-auto">
          {entries.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center mb-4 text-[#64748B]">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-[#17212B] mb-1">
                No Leaderboard Records Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-sm">
                Complete the three missions to establish the top score on this tournament machine.
              </p>
            </div>
          ) : top10.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#64748B]">
              No analysts found matching &quot;{search}&quot;.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Callsign</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-3">Classification</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {top10.map((entry, idx) => {
                  const isCurrentSession = entry.id === highlightSessionId;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrentSession
                          ? "bg-[#F0FDFA] text-[#0F766E] font-medium"
                          : "hover:bg-[#F8FAFC] text-[#17212B]"
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        {getRankBadge(idx + 1)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-semibold">
                        {entry.gamerTag}
                        {isCurrentSession && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] text-[10px] font-bold">
                            You
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-[#0F766E]">
                        {entry.score.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[#475569]">
                        {formatTime(entry.completionTimeSeconds)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono font-semibold text-[#15803D]">
                        {entry.accuracy}%
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-[#475569]">
                        {entry.classification}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-[#64748B]">
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
          {/* Left: Return to Menu & Clear Leaderboard */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#94A3B8] text-xs font-semibold text-[#475569] hover:text-[#17212B] flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Menu</span>
            </button>

            {/* Clearly Visible CLEAR LEADERBOARD Button (Subtle Red Outlined Style) */}
            <button
              onClick={() => {
                sound.playClick();
                setPinInput("");
                setPinError(null);
                setIsClearModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#FCA5A5] hover:border-[#EF4444] text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR LEADERBOARD</span>
            </button>
          </div>

          {/* Right: New Game Session CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onNewGame();
            }}
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game Session</span>
          </button>
        </div>
      </motion.div>

      {/* Confirmation Dialog with Organizer PIN Verification */}
      <AnimatePresence>
        {isClearModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B14]/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-2xl text-[#17212B]"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#FEE2E2] text-[#DC2626]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#17212B]">
                      Clear Tournament Leaderboard
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Permanent deletion of current player rankings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsClearModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 text-xs">
                <p className="text-sm font-medium text-[#17212B]">
                  Are you sure you want to delete all leaderboard records?
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  This will immediately erase all player scores from this machine. Game settings and system configurations will not be affected.
                </p>

                {/* Organizer PIN Authorization Step */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <label className="flex items-center space-x-1.5 font-semibold text-[#17212B]">
                    <Lock className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>Organizer PIN Verification (Default: 1337)</span>
                  </label>
                  <input
                    type="password"
                    maxLength={8}
                    placeholder="Enter PIN to authorize"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleConfirmClear();
                    }}
                    className="w-full bg-[#FFFFFF] border border-[#CBD5E1] focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-xl px-3 py-2 text-xs font-mono text-[#17212B] tracking-wider focus:outline-none"
                  />
                  {pinError && (
                    <p className="text-[11px] font-semibold text-[#DC2626]">
                      {pinError}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: CANCEL and CONFIRM CLEAR */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsClearModalOpen(false);
                    setPinInput("");
                    setPinError(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#17212B] text-xs font-semibold transition-colors cursor-pointer"
                >
                  CANCEL
                </button>

                <button
                  onClick={handleConfirmClear}
                  className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-[#FFFFFF] text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CONFIRM CLEAR</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
