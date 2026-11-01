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
    <div className="fixed inset-0 bg-[#090D14]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex flex-col shadow-xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17212B]">
                Stall Operator Controls
              </h2>
              <p className="text-xs text-[#64748B]">
                Tournament Records & Stall Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:text-[#DC2626] text-[#64748B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Entry */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center mb-4 text-[#0F766E]">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-[#17212B] mb-1">
              Operator Access Lock
            </h3>
            <p className="text-xs text-[#64748B] mb-6">
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
                className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl text-[#17212B] focus:outline-none"
              />

              {pinError && (
                <div className="text-xs text-[#DC2626] font-medium">
                  Incorrect PIN. Please re-enter.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-xs tracking-wide transition-colors cursor-pointer shadow-xs"
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
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64748B]">Total Games</div>
                  <div className="text-lg font-mono font-bold text-[#17212B]">
                    {totalGames}
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#D97706]/10 text-[#D97706]">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64748B]">Highest Score</div>
                  <div className="text-lg font-mono font-bold text-[#17212B]">
                    {highScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64748B]">Average Score</div>
                  <div className="text-lg font-mono font-bold text-[#17212B]">
                    {avgScore.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0F766E] rounded-xl text-xs text-[#17212B] focus:outline-none placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#0F766E] disabled:opacity-40 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#DC2626]/30 text-xs font-semibold text-[#DC2626] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Records Table */}
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#FFFFFF]">
              <div className="max-h-60 overflow-y-auto">
                {records.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#64748B]">
                    No tournament records stored.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#F8FAFC] sticky top-0 border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Callsign</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Accuracy</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {filteredRecords.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-[#F8FAFC] text-[#17212B]">
                          <td className="py-2 px-3 text-[#64748B]">#{idx + 1}</td>
                          <td className="py-2 px-3 font-semibold">{r.gamerTag}</td>
                          <td className="py-2 px-3 text-[#0F766E] font-mono font-bold">{r.score}</td>
                          <td className="py-2 px-3 font-mono text-[#475569]">
                            {formatTime(r.completionTimeSeconds)}
                          </td>
                          <td className="py-2 px-3 font-mono font-semibold text-[#15803D]">{r.accuracy}%</td>
                          <td className="py-2 px-3 text-[#64748B]">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Change PIN Row */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-xs text-[#64748B] flex items-center space-x-1.5 font-medium">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Change PIN:</span>
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-8 digit PIN"
                  className="px-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0F766E] rounded-lg text-xs font-mono text-[#17212B] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newPin.trim().length < 4}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#0F766E] text-xs font-semibold text-[#0F766E] disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  Save PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-xs text-[#15803D] font-medium">
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
            <div className="absolute inset-0 bg-[#090D14]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-[#FFFFFF] border border-[#DC2626]/30 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
                <AlertTriangle className="w-9 h-9 text-[#DC2626] mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#17212B] mb-1.5">
                  Confirm Leaderboard Reset
                </h4>
                <p className="text-xs text-[#475569] mb-5">
                  This will permanently delete all {records.length} player records from this machine.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:text-[#17212B] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold text-[#FFFFFF] cursor-pointer shadow-xs"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#94A3B8] text-xs font-semibold text-[#17212B] transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
