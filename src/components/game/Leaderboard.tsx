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
  Crown,
  Sparkles
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
          <div className="flex items-center space-x-1.5 text-[#FFD43B] font-bold font-digital">
            <Crown className="w-4 h-4 text-[#FFD43B] fill-[#FFD43B]/20" />
            <span>#1</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-1.5 text-[#CBD5E1] font-bold font-digital">
            <Medal className="w-4 h-4 text-[#CBD5E1]" />
            <span>#2</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-1.5 text-[#F59E0B] font-bold font-digital">
            <Medal className="w-4 h-4 text-[#F59E0B]" />
            <span>#3</span>
          </div>
        );
      default:
        return (
          <span className="font-digital text-xs text-[#94A3B8]">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#080611] text-[#F8FAFC] select-none relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] my-auto flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#35264D] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#A855F7] uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-[#FFD43B]" />
              <span>OFFICIAL TOURNAMENT LEDGER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFD43B] via-[#00E5FF] to-[#A855F7]">
              TOURNAMENT STANDINGS
            </h1>
            <p className="text-xs font-mono text-[#94A3B8] mt-1">
              Top Cyber Operators ranked by score and speed
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search callsign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#100B1D] border border-[#35264D] focus:border-[#00E5FF] focus:shadow-[0_0_12px_rgba(0,229,255,0.3)] rounded-xl text-xs font-mono text-[#00E5FF] focus:outline-none placeholder:text-[#64748B] transition-all"
            />
          </div>
        </div>

        {/* Podium for Top 3 (if available) */}
        {entries.length >= 3 && !search && (
          <div className="grid grid-cols-3 gap-3 my-6">
            {/* Rank 2 */}
            <div className="bg-[#100B1D] border border-[#CBD5E1]/30 rounded-xl p-3 text-center flex flex-col justify-end">
              <Medal className="w-5 h-5 text-[#CBD5E1] mx-auto mb-1" />
              <div className="text-[10px] font-mono text-[#CBD5E1] uppercase font-bold">2ND PLACE</div>
              <div className="text-sm font-display font-bold text-white truncate">{entries[1].gamerTag}</div>
              <div className="text-xs font-digital text-[#00E5FF]">{entries[1].score.toLocaleString()} PTS</div>
            </div>

            {/* Rank 1 */}
            <div className="bg-[#100B1D] border border-[#FFD43B]/50 rounded-xl p-3.5 text-center flex flex-col justify-end shadow-[0_0_20px_rgba(255,212,59,0.2)]">
              <Crown className="w-6 h-6 text-[#FFD43B] mx-auto mb-1 animate-bounce" />
              <div className="text-[10px] font-mono text-[#FFD43B] uppercase font-bold">CHAMPION</div>
              <div className="text-base font-display font-black text-[#FFD43B] truncate">{entries[0].gamerTag}</div>
              <div className="text-sm font-digital font-bold text-[#FFD43B]">{entries[0].score.toLocaleString()} PTS</div>
            </div>

            {/* Rank 3 */}
            <div className="bg-[#100B1D] border border-[#F59E0B]/30 rounded-xl p-3 text-center flex flex-col justify-end">
              <Medal className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
              <div className="text-[10px] font-mono text-[#F59E0B] uppercase font-bold">3RD PLACE</div>
              <div className="text-sm font-display font-bold text-white truncate">{entries[2].gamerTag}</div>
              <div className="text-xs font-digital text-[#00E5FF]">{entries[2].score.toLocaleString()} PTS</div>
            </div>
          </div>
        )}

        {/* Table or Empty State */}
        <div className="my-6 flex-grow overflow-x-auto">
          {entries.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#100B1D] border border-[#35264D] flex items-center justify-center mb-4 text-[#00E5FF]">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F8FAFC] mb-1 uppercase tracking-wide">
                No Leaderboard Records Yet
              </h3>
              <p className="text-xs font-mono text-[#94A3B8] max-w-sm">
                Complete the three missions to establish the top score on this tournament machine.
              </p>
            </div>
          ) : top10.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#94A3B8]">
              No analysts found matching &quot;{search}&quot;.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#35264D] text-xs font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Callsign</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-3">Rank Class</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#35264D]/60 text-xs">
                {top10.map((entry, idx) => {
                  const isCurrentSession = entry.id === highlightSessionId;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrentSession
                          ? "bg-[#00E5FF]/10 text-[#00E5FF] font-medium"
                          : "hover:bg-[#100B1D] text-[#CBD5E1]"
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        {getRankBadge(idx + 1)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-display font-bold text-sm tracking-wide text-white">
                        {entry.gamerTag}
                        {isCurrentSession && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 text-[10px] font-mono font-bold">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-digital font-bold text-sm text-[#00E5FF]">
                        {entry.score.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-digital text-[#CBD5E1]">
                        {formatTime(entry.completionTimeSeconds)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-digital text-[#39FF88]">
                        {entry.accuracy}%
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-xs text-[#A855F7]">
                        {entry.classification}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-[#64748B]">
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#35264D]">
          {/* Left: Return to Menu & Clear Leaderboard */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#100B1D] hover:bg-[#100B1D]/80 border border-[#35264D] hover:border-[#64748B] text-xs font-display font-bold uppercase tracking-wider text-[#CBD5E1] hover:text-white flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MENU</span>
            </button>

            {/* Clearly Visible CLEAR LEADERBOARD Button (Subtle Red Outlined Style) */}
            <button
              onClick={() => {
                sound.playClick();
                setPinInput("");
                setPinError(null);
                setIsClearModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#FF365D]/50 hover:border-[#FF365D] text-[#FF365D] hover:bg-[#FF365D]/10 text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,54,93,0.15)]"
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
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>NEW GAME SESSION</span>
          </button>
        </div>
      </motion.div>

      {/* Confirmation Dialog with Organizer PIN Verification */}
      <AnimatePresence>
        {isClearModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-[#171127] border border-[#FF365D]/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,54,93,0.3)] text-[#F8FAFC]"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#35264D]">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#FF365D]/20 text-[#FF365D] border border-[#FF365D]/40">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#F8FAFC] uppercase tracking-wider">
                      CLEAR TOURNAMENT RECORDS
                    </h3>
                    <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                      Permanent deletion of current player rankings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsClearModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#35264D] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 text-xs font-mono">
                <p className="text-sm font-display font-bold text-[#FF365D] uppercase">
                  Are you sure you want to delete all leaderboard records?
                </p>
                <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                  This will immediately erase all player scores from this machine. Game settings and system configurations will not be affected.
                </p>

                {/* Organizer PIN Authorization Step */}
                <div className="p-3.5 rounded-xl bg-[#100B1D] border border-[#35264D] space-y-2">
                  <label className="flex items-center space-x-1.5 font-bold text-[#F8FAFC] uppercase">
                    <Lock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Organizer PIN Authorization (Default: 1337)</span>
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
                    className="w-full bg-[#171127] border border-[#35264D] focus:border-[#FF365D] focus:shadow-[0_0_12px_rgba(255,54,93,0.3)] rounded-xl px-3 py-2 text-xs font-digital text-[#FF365D] tracking-widest focus:outline-none"
                  />
                  {pinError && (
                    <p className="text-[11px] font-mono font-bold text-[#FF365D]">
                      {pinError}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: CANCEL and CONFIRM CLEAR */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-[#35264D]">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsClearModalOpen(false);
                    setPinInput("");
                    setPinError(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#100B1D] border border-[#35264D] text-[#CBD5E1] hover:text-white text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CANCEL
                </button>

                <button
                  onClick={handleConfirmClear}
                  className="px-5 py-2.5 rounded-xl bg-[#FF365D] hover:bg-[#FF365D]/90 text-white text-xs font-display font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,54,93,0.5)]"
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
