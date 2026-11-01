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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col shadow-xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-100 text-teal-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-semibold text-slate-900">
                Stall Operator Controls
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Tournament Records & Stall Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:text-rose-600 text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Entry */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center font-sans">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-teal-700">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-base font-heading font-semibold text-slate-900 mb-1">
              Operator Access Lock
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-sans">
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
                className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 bg-slate-50 border border-slate-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 rounded-xl text-slate-900 focus:outline-none"
              />

              {pinError && (
                <div className="text-xs text-rose-600 font-medium">
                  Incorrect PIN. Please re-enter.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Operator View */
          <div className="flex flex-col flex-grow overflow-y-auto pr-1 my-4 space-y-5 font-sans">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-teal-50 border border-teal-100 text-teal-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Total Games</div>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {totalGames}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-700">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Highest Score</div>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {highScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Average Score</div>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {avgScore.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-teal-700 rounded-xl text-xs text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-medium text-teal-700 disabled:opacity-40 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-medium text-rose-700 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Records Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="max-h-60 overflow-y-auto">
                {records.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No tournament records stored.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs font-sans">
                    <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-xs font-semibold text-slate-500">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Callsign</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Accuracy</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRecords.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-slate-50 text-slate-800">
                          <td className="py-2 px-3 text-slate-400">#{idx + 1}</td>
                          <td className="py-2 px-3 font-medium text-slate-900">{r.gamerTag}</td>
                          <td className="py-2 px-3 text-teal-700 font-mono font-bold">{r.score} / 300</td>
                          <td className="py-2 px-3 font-mono text-slate-600">
                            {formatTime(r.completionTimeSeconds)}
                          </td>
                          <td className="py-2 px-3 font-mono font-semibold text-emerald-700">{r.accuracy}%</td>
                          <td className="py-2 px-3 text-slate-400">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Change PIN Row */}
            <div className="pt-3 border-t border-slate-100">
              <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Change PIN:</span>
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-8 digit PIN"
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 focus:border-teal-700 rounded-lg text-xs font-mono text-slate-900 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newPin.trim().length < 4}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-teal-700 text-xs font-medium text-teal-700 disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  Save PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-xs text-emerald-700 font-medium">
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
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white border border-rose-200 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl font-sans">
                <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                <h4 className="text-base font-heading font-semibold text-slate-900 mb-1.5">
                  Confirm Leaderboard Reset
                </h4>
                <p className="text-xs text-slate-500 mb-5">
                  This will permanently delete all {records.length} player records from this machine.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-medium text-white cursor-pointer shadow-xs"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end font-sans">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
