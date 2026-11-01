"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Clock,
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
  onBackToMain?: () => void;
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

  const top3 = filteredEntries.slice(0, 3);
  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];
  const remainingEntries = filteredEntries.slice(3, 10);

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

  const renderPodiumCard = (player: LeaderboardEntry, rank: 1 | 2 | 3) => {
    const isCurrentSession = player.id === highlightSessionId;

    if (rank === 1) {
      return (
        <div
          key={player.id}
          className={`relative flex flex-col justify-between p-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/20 shadow-md md:-translate-y-2 order-1 md:order-2 transition-all ${
            isCurrentSession ? "ring-2 ring-teal-600 ring-offset-2" : ""
          }`}
        >
          {/* Champion Crown / Header Badge */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs tracking-wider shadow-2xs font-sans">
                <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>RANK #01 / CHAMPION</span>
              </div>
              {isCurrentSession && (
                <span className="px-2 py-0.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-[10px] font-bold">
                  You
                </span>
              )}
            </div>

            {/* Icon Accent */}
            <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-700 flex items-center justify-center mb-3 shadow-2xs">
              <Trophy className="w-6 h-6 text-amber-600 fill-amber-500/20" />
            </div>

            {/* Player Name */}
            <div
              className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight truncate mb-1"
              title={player.gamerTag}
            >
              {player.gamerTag}
            </div>

            {/* Classification & Accuracy */}
            <div className="text-xs text-slate-500 font-sans mb-5 flex items-center space-x-2 flex-wrap">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-medium text-slate-700">{player.classification}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-emerald-700 font-semibold">{player.accuracy}% Acc</span>
            </div>
          </div>

          {/* Bottom Stats Footer */}
          <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-amber-200/80 mt-auto bg-amber-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
            <div>
              <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
                Final Score
              </div>
              <div className="flex items-baseline space-x-1 mt-0.5">
                <span className="text-2xl font-mono font-bold text-teal-700">
                  {player.score}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 300</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
                Total Time
              </div>
              <div className="text-sm sm:text-base font-mono font-bold text-slate-800 flex items-center space-x-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{formatTime(player.completionTimeSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (rank === 2) {
      return (
        <div
          key={player.id}
          className={`relative flex flex-col justify-between p-5 rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-50/80 via-white to-white shadow-2xs order-2 md:order-1 transition-all ${
            isCurrentSession ? "ring-2 ring-teal-600 ring-offset-2" : ""
          }`}
        >
          {/* Silver Badge */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs tracking-wider shadow-2xs font-sans">
                <Medal className="w-3.5 h-3.5 text-slate-500" />
                <span>RANK #02 / SILVER</span>
              </div>
              {isCurrentSession && (
                <span className="px-2 py-0.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-[10px] font-bold">
                  You
                </span>
              )}
            </div>

            {/* Icon Accent */}
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center mb-3 shadow-2xs">
              <Medal className="w-5 h-5 text-slate-500" />
            </div>

            {/* Player Name */}
            <div
              className="text-lg sm:text-xl font-heading font-bold text-slate-900 tracking-tight truncate mb-1"
              title={player.gamerTag}
            >
              {player.gamerTag}
            </div>

            {/* Classification & Accuracy */}
            <div className="text-xs text-slate-500 font-sans mb-4 flex items-center space-x-2 flex-wrap">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">{player.classification}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-slate-600 font-semibold">{player.accuracy}% Acc</span>
            </div>
          </div>

          {/* Bottom Stats Footer */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 mt-auto bg-slate-50/60 -mx-5 -mb-5 p-3.5 rounded-b-2xl">
            <div>
              <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
                Final Score
              </div>
              <div className="flex items-baseline space-x-1 mt-0.5">
                <span className="text-xl font-mono font-bold text-teal-700">
                  {player.score}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 300</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
                Total Time
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 flex items-center space-x-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{formatTime(player.completionTimeSeconds)}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Rank 3 (Bronze)
    return (
      <div
        key={player.id}
        className={`relative flex flex-col justify-between p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/40 via-white to-white shadow-2xs order-3 md:order-3 transition-all ${
          isCurrentSession ? "ring-2 ring-teal-600 ring-offset-2" : ""
        }`}
      >
        {/* Bronze Badge */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs tracking-wider shadow-2xs font-sans">
              <Medal className="w-3.5 h-3.5 text-amber-700" />
              <span>RANK #03 / BRONZE</span>
            </div>
            {isCurrentSession && (
              <span className="px-2 py-0.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-[10px] font-bold">
                You
              </span>
            )}
          </div>

          {/* Icon Accent */}
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-3 shadow-2xs">
            <Medal className="w-5 h-5 text-amber-700" />
          </div>

          {/* Player Name */}
          <div
            className="text-lg sm:text-xl font-heading font-bold text-slate-900 tracking-tight truncate mb-1"
            title={player.gamerTag}
          >
            {player.gamerTag}
          </div>

          {/* Classification & Accuracy */}
          <div className="text-xs text-slate-500 font-sans mb-4 flex items-center space-x-2 flex-wrap">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-600 shrink-0" />
            <span className="font-medium text-slate-700">{player.classification}</span>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-amber-800 font-semibold">{player.accuracy}% Acc</span>
          </div>
        </div>

        {/* Bottom Stats Footer */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-amber-100 mt-auto bg-amber-50/40 -mx-5 -mb-5 p-3.5 rounded-b-2xl">
          <div>
            <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
              Final Score
            </div>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-xl font-mono font-bold text-teal-700">
                {player.score}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 300</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 font-sans uppercase tracking-wider">
              Total Time
            </div>
            <div className="text-sm font-mono font-bold text-slate-800 flex items-center space-x-1 mt-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatTime(player.completionTimeSeconds)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-[#F8FAFC] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-5xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm my-auto flex flex-col"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-slate-900">
              Tournament Standings
            </h1>
            <p className="text-sm font-sans text-slate-500 mt-1">
              Ranked by highest final score (/300), fastest completion time, and submission order
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by callsign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 rounded-xl text-xs text-slate-900 focus:outline-none placeholder:text-slate-400 font-sans"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="my-6 flex-grow">
          {entries.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-slate-400">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-base text-slate-900 mb-1">
                No Leaderboard Records Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-sans">
                Complete the three missions to establish the top score on this tournament machine.
              </p>
            </div>
          ) : top3.length === 0 ? (
            /* Search filter with 0 matches */
            <div className="py-12 text-center text-xs text-slate-500 font-sans">
              No analysts found matching &quot;{search}&quot;.
            </div>
          ) : (
            <>
              {/* TOP 3 PODIUM SECTION */}
              <div className="mb-8">
                <div className="text-xs font-semibold text-slate-500 font-sans tracking-wider uppercase mb-4 flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Podium Leaders</span>
                </div>

                {top3.length === 3 ? (
                  /* 3-card horizontal layout on desktop, stacked on mobile */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
                    {/* Rank 2 (Silver): Left card on desktop (order-2 md:order-1) */}
                    {renderPodiumCard(rank2, 2)}
                    {/* Rank 1 (Champion): Center card, visually prominent and slightly larger (order-1 md:order-2) */}
                    {renderPodiumCard(rank1, 1)}
                    {/* Rank 3 (Bronze): Right card on desktop (order-3 md:order-3) */}
                    {renderPodiumCard(rank3, 3)}
                  </div>
                ) : top3.length === 2 ? (
                  /* 2-player layout */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end max-w-2xl mx-auto pt-2">
                    {renderPodiumCard(rank1, 1)}
                    {renderPodiumCard(rank2, 2)}
                  </div>
                ) : (
                  /* 1-player layout */
                  <div className="max-w-md mx-auto pt-2">
                    {renderPodiumCard(rank1, 1)}
                  </div>
                )}
              </div>

              {/* REMAINING LEADERBOARD: RANKS 4 TO 10 */}
              {remainingEntries.length > 0 && (
                <div className="overflow-x-auto pt-2">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <div className="text-xs font-semibold text-slate-600 font-sans tracking-wider uppercase">
                      Tournament Standings (Ranks #04 – #10)
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {remainingEntries.length} {remainingEntries.length === 1 ? "entry" : "entries"}
                    </span>
                  </div>

                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 font-sans">
                        <th className="py-3 px-3">Rank</th>
                        <th className="py-3 px-3">Callsign</th>
                        <th className="py-3 px-3">Final Score</th>
                        <th className="py-3 px-3">Completion Time</th>
                        <th className="py-3 px-3">Accuracy</th>
                        <th className="py-3 px-3">Classification</th>
                        <th className="py-3 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-sans">
                      {remainingEntries.map((entry, idx) => {
                        const actualRank = idx + 4;
                        const isCurrentSession = entry.id === highlightSessionId;

                        return (
                          <tr
                            key={entry.id}
                            className={`transition-colors ${
                              isCurrentSession
                                ? "bg-teal-50/70 text-teal-900 font-medium"
                                : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-mono text-xs font-medium text-slate-500 pl-1">
                                #{actualRank}
                              </span>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-900">
                              {entry.gamerTag}
                              {isCurrentSession && (
                                <span className="ml-2 px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-semibold">
                                  You
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex items-baseline space-x-1">
                                <span className="font-mono font-bold text-teal-700 text-sm">
                                  {entry.score}
                                </span>
                                <span className="font-mono text-xs text-slate-400">/ 300</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap font-mono font-medium text-slate-700">
                              {formatTime(entry.completionTimeSeconds)}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap font-mono font-semibold text-emerald-700">
                              {entry.accuracy}%
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap text-xs text-slate-600">
                              {entry.classification}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap text-xs text-slate-400">
                              {entry.date}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          {/* Left: Return to Menu & Clear Leaderboard */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-2xs font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Menu</span>
            </button>

            {/* Clear Leaderboard Button */}
            <button
              onClick={() => {
                sound.playClick();
                setPinInput("");
                setPinError(null);
                setIsClearModalOpen(true);
              }}
              className="px-3.5 py-2.5 rounded-xl border border-rose-300 hover:border-rose-400 text-rose-600 hover:bg-rose-50/50 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-2xs font-sans"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Leaderboard</span>
            </button>
          </div>

          {/* Right: New Game Session CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onNewGame();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs font-sans"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game Session</span>
          </button>
        </div>
      </motion.div>

      {/* Confirmation Dialog with Organizer PIN Verification */}
      <AnimatePresence>
        {isClearModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-xl text-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-slate-900">
                      Clear Tournament Leaderboard
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-sans">
                      Permanent deletion of current player rankings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsClearModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 text-xs font-sans">
                <p className="text-sm font-medium text-slate-900">
                  Are you sure you want to delete all leaderboard records?
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This will immediately erase all player scores from this machine. Game settings and system configurations will not be affected.
                </p>

                {/* Organizer PIN Authorization Step */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="flex items-center space-x-1.5 font-medium text-slate-700">
                    <Lock className="w-3.5 h-3.5 text-teal-700" />
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
                    className="w-full bg-white border border-slate-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 tracking-wider focus:outline-none"
                  />
                  {pinError && (
                    <p className="text-[11px] font-semibold text-rose-600">
                      {pinError}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Cancel and Confirm Clear */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-100 font-sans">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsClearModalOpen(false);
                    setPinInput("");
                    setPinError(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmClear}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Clear</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
