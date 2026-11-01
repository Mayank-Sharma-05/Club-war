"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Shield,
  Download,
  Trash2,
  X,
  Search,
  Users,
  Trophy,
  Activity,
  AlertTriangle,
  Lock,
  ArrowLeft,
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
      // Reset state on close
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
    <div className="fixed inset-0 bg-[#070B14]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#111C2E] border border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <div className="flex items-center space-x-2.5">
            <Settings className="w-5 h-5 text-[#A855F7]" />
            <div>
              <h2 className="font-cyber font-extrabold text-lg text-[#F8FAFC]">
                STALL OPERATOR DASHBOARD
              </h2>
              <p className="text-[11px] font-mono text-[#94A3B8]">
                DSS Stall Management & Tournament Records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#101827] border border-[#1E293B] hover:text-[#FF334F] text-[#94A3B8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-[#101827] border border-[#1E293B] flex items-center justify-center mb-4 text-[#A855F7]">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="font-cyber font-bold text-base text-[#F8FAFC] mb-1">
              OPERATOR LOCK
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              Enter the stall operator PIN to access tournament management (Default PIN: 1337).
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
                placeholder="Enter PIN..."
                className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 bg-[#101827] border border-[#1E293B] focus:border-[#A855F7] rounded-xl text-[#F8FAFC] focus:outline-none glow-purple"
              />

              {pinError && (
                <div className="text-xs font-mono text-[#FF334F]">
                  Invalid operator PIN. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#A855F7] hover:bg-[#A855F7]/90 text-[#070B14] font-cyber font-bold text-xs tracking-wider transition-colors cursor-pointer"
              >
                UNLOCK CONTROLS
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Operator Controls */
          <div className="flex flex-col flex-grow overflow-y-auto pr-1 my-4 space-y-6">
            {/* Operator Stat Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-cyber text-[#94A3B8]">TOTAL GAMES</div>
                  <div className="text-lg font-mono font-bold text-[#F8FAFC]">
                    {totalGames}
                  </div>
                </div>
              </div>

              <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-cyber text-[#94A3B8]">TOP SCORE</div>
                  <div className="text-lg font-mono font-bold text-[#F8FAFC]">
                    {highScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#00E676]/10 text-[#00E676]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-cyber text-[#94A3B8]">AVERAGE SCORE</div>
                  <div className="text-lg font-mono font-bold text-[#F8FAFC]">
                    {avgScore.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Operator Toolbar: Search, CSV, Reset */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#101827] border border-[#1E293B] focus:border-[#00E5FF] rounded-xl text-xs font-mono text-[#F8FAFC] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#00E5FF] text-xs font-mono text-[#00E5FF] disabled:opacity-40 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT CSV</span>
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#FF334F]/10 border border-[#FF334F]/40 hover:bg-[#FF334F]/20 text-xs font-mono text-[#FF334F] disabled:opacity-40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>RESET DATA</span>
                </button>
              </div>
            </div>

            {/* All Records Table */}
            <div className="border border-[#1E293B] rounded-xl overflow-hidden bg-[#101827]">
              <div className="max-h-60 overflow-y-auto">
                {records.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#94A3B8] font-mono">
                    No tournament records in local storage.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#070B14] sticky top-0 border-b border-[#1E293B] text-[10px] font-cyber text-[#94A3B8]">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">CALLSIGN</th>
                        <th className="py-2.5 px-3">SCORE</th>
                        <th className="py-2.5 px-3">TIME</th>
                        <th className="py-2.5 px-3">ACCURACY</th>
                        <th className="py-2.5 px-3">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]/60 font-mono">
                      {filteredRecords.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-[#111C2E] text-[#F8FAFC]">
                          <td className="py-2 px-3 text-[#94A3B8]">#{idx + 1}</td>
                          <td className="py-2 px-3 font-bold">{r.gamerTag}</td>
                          <td className="py-2 px-3 text-[#00E5FF] font-extrabold">{r.score}</td>
                          <td className="py-2 px-3 text-[#94A3B8]">
                            {formatTime(r.completionTimeSeconds)}
                          </td>
                          <td className="py-2 px-3 text-[#00E676]">{r.accuracy}%</td>
                          <td className="py-2 px-3 text-[10px] text-[#94A3B8]">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Change PIN Section */}
            <div className="pt-3 border-t border-[#1E293B]">
              <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-[11px] font-mono text-[#94A3B8] flex items-center space-x-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Update Operator PIN:</span>
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-8 digit PIN"
                  className="px-3 py-1.5 bg-[#101827] border border-[#1E293B] rounded-lg text-xs font-mono text-[#F8FAFC] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newPin.trim().length < 4}
                  className="px-3 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B] hover:border-[#A855F7] text-xs font-mono text-[#A855F7] disabled:opacity-40"
                >
                  Save PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-[11px] font-mono text-[#00E676]">
                    ✓ PIN Updated!
                  </span>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Reset */}
        <AnimatePresence>
          {showConfirmReset && (
            <div className="absolute inset-0 bg-[#070B14]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <div className="bg-[#111C2E] border border-[#FF334F] rounded-2xl p-6 max-w-sm w-full text-center glow-red">
                <AlertTriangle className="w-10 h-10 text-[#FF334F] mx-auto mb-3" />
                <h4 className="font-cyber font-bold text-base text-[#F8FAFC] mb-2">
                  CONFIRM LEADERBOARD PURGE
                </h4>
                <p className="text-xs text-[#94A3B8] mb-6">
                  Are you certain? This will permanently delete all {records.length} player records from this laptop. This action cannot be reversed.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2.5 rounded-xl bg-[#101827] border border-[#1E293B] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC]"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 rounded-xl bg-[#FF334F] hover:bg-[#FF334F]/90 text-xs font-cyber font-bold text-[#F8FAFC]"
                  >
                    DELETE ALL
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1E293B] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#94A3B8]/40 text-xs font-mono text-[#F8FAFC] transition-colors"
          >
            CLOSE DASHBOARD
          </button>
        </div>
      </motion.div>
    </div>
  );
};
