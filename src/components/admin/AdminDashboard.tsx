"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Download,
  Trash2,
  X,
  Search,
  Users,
  Trophy,
  Activity,
  AlertTriangle,
  Lock,
  KeyRound,
} from "lucide-react";
import { LeaderboardEntry } from "@/types/game";
import { getLeaderboard, resetLeaderboard, exportLeaderboardCSV, getGameSettings, saveGameSettings } from "@/lib/storage";
import { formatTime } from "@/lib/scoring";
import { sound } from "@/lib/sound-engine";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [records, setRecords] = useState<LeaderboardEntry[]>([]);
  const [search, setSearch] = useState("");
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRecords(getLeaderboard());
    } else {
      setIsAuthenticated(false);
      setPinInput("");
      setPinError(false);
      setShowConfirmReset(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const settings = getGameSettings();

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.operatorPin) {
      sound.playCorrect();
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      sound.playIncorrect();
      setPinError(true);
    }
  };

  const handleReset = () => {
    sound.playIncorrect();
    resetLeaderboard();
    setRecords([]);
    setShowConfirmReset(false);
  };

  const handleExportCSV = () => {
    sound.playClick();
    exportLeaderboardCSV(records);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      saveGameSettings({ operatorPin: newPin.trim() });
      setPinChangeSuccess(true);
      setNewPin("");
      setTimeout(() => setPinChangeSuccess(false), 2500);
    }
  };

  // Metrics
  const totalGames = records.length;
  const highScore = totalGames > 0 ? Math.max(...records.map((r) => r.score)) : 0;
  const avgScore =
    totalGames > 0
      ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / totalGames)
      : 0;

  const filteredRecords = records.filter((r) =>
    r.gamerTag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-[#090D14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#111827] border border-[#263244] rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#263244]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#151F2E] border border-[#263244] text-[#A78BFA]">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#F1F5F9]">
                Operator Controls
              </h2>
              <p className="text-xs text-[#718096]">
                Tournament Records & Stall Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#151F2E] border border-[#263244] hover:text-[#EF4444] text-[#718096] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Entry */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-[#151F2E] border border-[#263244] flex items-center justify-center mb-4 text-[#A78BFA]">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">
              Operator Authentication
            </h3>
            <p className="text-xs text-[#718096] mb-6">
              Enter operator PIN to manage tournament data (Default: 1337).
            </p>

            <form onSubmit={handleVerifyPin} className="w-full space-y-4">
              <input
                type="password"
                autoFocus
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN"
                className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 bg-[#151F2E] border border-[#263244] focus:border-[#A78BFA] rounded-xl text-[#F1F5F9] focus:outline-none"
              />

              {pinError && (
                <div className="text-xs text-[#EF4444]">
                  Incorrect PIN. Please re-enter.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#A78BFA] hover:bg-[#A78BFA]/90 text-[#090D14] font-semibold text-xs tracking-wide transition-colors cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Operator View */
          <div className="flex flex-col flex-grow overflow-y-auto pr-1 my-4 space-y-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#718096]">Total Games</div>
                  <div className="text-lg font-mono font-semibold text-[#F1F5F9]">
                    {totalGames}
                  </div>
                </div>
              </div>

              <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#718096]">Highest Score</div>
                  <div className="text-lg font-mono font-semibold text-[#F1F5F9]">
                    {highScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-[#151F2E] border border-[#263244] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#718096]">Average Score</div>
                  <div className="text-lg font-mono font-semibold text-[#F1F5F9]">
                    {avgScore.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#151F2E] border border-[#263244] focus:border-[#22D3EE] rounded-xl text-xs text-[#F1F5F9] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#151F2E] hover:bg-[#1A2638] border border-[#263244] text-xs font-medium text-[#22D3EE] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-xs font-medium text-[#EF4444] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Records Table */}
            <div className="border border-[#263244] rounded-xl overflow-hidden bg-[#151F2E]">
              <div className="max-h-60 overflow-y-auto">
                {records.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#718096]">
                    No tournament records stored.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#111827] sticky top-0 border-b border-[#263244] text-xs font-medium text-[#718096]">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Callsign</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Accuracy</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#263244]/60">
                      {filteredRecords.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-[#111827] text-[#F1F5F9]">
                          <td className="py-2 px-3 text-[#718096]">#{idx + 1}</td>
                          <td className="py-2 px-3 font-medium">{r.gamerTag}</td>
                          <td className="py-2 px-3 text-[#22D3EE] font-mono font-semibold">{r.score}</td>
                          <td className="py-2 px-3 font-mono text-[#A1AEC0]">
                            {formatTime(r.completionTimeSeconds)}
                          </td>
                          <td className="py-2 px-3 font-mono text-[#22C55E]">{r.accuracy}%</td>
                          <td className="py-2 px-3 text-[#718096]">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Change PIN Row */}
            <div className="pt-3 border-t border-[#263244]">
              <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-xs text-[#718096] flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Change PIN:</span>
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-8 digit PIN"
                  className="px-3 py-1.5 bg-[#151F2E] border border-[#263244] focus:border-[#22D3EE] rounded-lg text-xs font-mono text-[#F1F5F9] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newPin.trim().length < 4}
                  className="px-3 py-1.5 rounded-lg bg-[#151F2E] border border-[#263244] hover:border-[#A78BFA] text-xs text-[#A78BFA] disabled:opacity-40 cursor-pointer"
                >
                  Save PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-xs text-[#22C55E]">
                    ✓ PIN Updated
                  </span>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmReset && (
            <div className="absolute inset-0 bg-[#090D14]/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#111827] border border-[#EF4444]/40 rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
                <AlertTriangle className="w-8 h-8 text-[#EF4444] mx-auto mb-3" />
                <h4 className="text-base font-semibold text-[#F1F5F9] mb-1.5">
                  Reset Leaderboard
                </h4>
                <p className="text-xs text-[#A1AEC0] mb-5">
                  This will permanently clear all {records.length} player records from this machine.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2 rounded-xl bg-[#151F2E] border border-[#263244] text-xs text-[#A1AEC0] hover:text-[#F1F5F9] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 rounded-xl bg-[#EF4444] hover:bg-[#EF4444]/90 text-xs font-semibold text-[#090D14] cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263244] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#151F2E] border border-[#263244] hover:border-[#334155] text-xs text-[#F1F5F9] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
