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
  Terminal
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden text-[#F8FAFC]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#35264D]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#100B1D] border border-[#00E5FF]/40 text-[#00E5FF]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold text-[#F8FAFC] uppercase tracking-wider">
                STALL OPERATOR CONSOLE
              </h2>
              <p className="text-xs font-mono text-[#94A3B8]">
                Tournament Records & Station Administration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#100B1D] border border-[#35264D] hover:text-[#FF365D] hover:border-[#FF365D] text-[#94A3B8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Entry */}
        {!isAuthenticated ? (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#100B1D] border border-[#00E5FF]/40 flex items-center justify-center mb-4 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-display font-bold text-[#F8FAFC] uppercase tracking-wider mb-1">
              OPERATOR AUTHORIZATION
            </h3>
            <p className="text-xs font-mono text-[#94A3B8] mb-6">
              Enter operator PIN to manage tournament data (Default: 1337)
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
                placeholder="PIN"
                className="w-full text-center tracking-[0.4em] font-digital text-xl py-3 bg-[#100B1D] border border-[#35264D] focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] rounded-xl text-[#00E5FF] focus:outline-none"
              />

              {pinError && (
                <div className="text-xs font-mono text-[#FF365D]">
                  Invalid Operator PIN. Please retry.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#080611] font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                UNLOCK CONSOLE
              </button>
            </form>
          </div>
        ) : (
          /* Operator View */
          <div className="flex flex-col flex-grow overflow-y-auto pr-1 my-4 space-y-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Total Runs</div>
                  <div className="text-lg font-digital font-bold text-[#F8FAFC]">
                    {totalGames}
                  </div>
                </div>
              </div>

              <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#FFD43B]/20 text-[#FFD43B] border border-[#FFD43B]/40">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">High Score</div>
                  <div className="text-lg font-digital font-bold text-[#FFD43B]">
                    {highScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-[#100B1D] border border-[#35264D] rounded-xl p-3.5 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/40">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Average Score</div>
                  <div className="text-lg font-digital font-bold text-[#39FF88]">
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
                  placeholder="Filter callsigns..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#100B1D] border border-[#35264D] focus:border-[#00E5FF] rounded-xl text-xs font-mono text-[#00E5FF] focus:outline-none placeholder:text-[#64748B]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#100B1D] hover:bg-[#100B1D]/80 border border-[#00E5FF]/40 text-xs font-mono font-bold text-[#00E5FF] disabled:opacity-40 transition-colors cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT CSV</span>
                </button>

                <button
                  onClick={() => setShowConfirmReset(true)}
                  disabled={records.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#FF365D]/20 hover:bg-[#FF365D]/30 border border-[#FF365D]/50 text-xs font-mono font-bold text-[#FF365D] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>WIPE ALL</span>
                </button>
              </div>
            </div>

            {/* Records Table */}
            <div className="border border-[#35264D] rounded-xl overflow-hidden bg-[#100B1D]">
              <div className="max-h-60 overflow-y-auto">
                {records.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono text-[#64748B]">
                    No tournament records stored.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead className="bg-[#171127] sticky top-0 border-b border-[#35264D] text-xs font-bold text-[#94A3B8] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Callsign</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Accuracy</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#35264D]/60">
                      {filteredRecords.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-[#171127] text-[#CBD5E1]">
                          <td className="py-2 px-3 text-[#64748B]">#{idx + 1}</td>
                          <td className="py-2 px-3 font-bold text-white font-display">{r.gamerTag}</td>
                          <td className="py-2 px-3 text-[#00E5FF] font-digital">{r.score}</td>
                          <td className="py-2 px-3 font-digital text-[#CBD5E1]">
                            {formatTime(r.completionTimeSeconds)}
                          </td>
                          <td className="py-2 px-3 font-digital text-[#39FF88]">{r.accuracy}%</td>
                          <td className="py-2 px-3 text-[#64748B] text-[11px]">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Change PIN Row */}
            <div className="pt-3 border-t border-[#35264D]">
              <form onSubmit={handleChangePin} className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-xs font-mono text-[#94A3B8] flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Update PIN:</span>
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="New 4-8 digit PIN"
                  className="px-3 py-1.5 bg-[#100B1D] border border-[#35264D] focus:border-[#00E5FF] rounded-lg text-xs font-digital text-[#00E5FF] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newPin.trim().length < 4}
                  className="px-3 py-1.5 rounded-lg bg-[#100B1D] border border-[#00E5FF]/40 text-xs font-mono font-bold text-[#00E5FF] hover:bg-[#00E5FF]/10 disabled:opacity-40 cursor-pointer"
                >
                  Save PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-xs font-mono text-[#39FF88]">
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <div className="bg-[#171127] border border-[#FF365D] rounded-2xl p-6 max-w-sm w-full text-center shadow-[0_0_30px_rgba(255,54,93,0.4)]">
                <AlertTriangle className="w-10 h-10 text-[#FF365D] mx-auto mb-3" />
                <h4 className="text-base font-display font-bold text-white uppercase tracking-wider mb-1.5">
                  CONFIRM LEADERBOARD PURGE
                </h4>
                <p className="text-xs font-mono text-[#94A3B8] mb-5">
                  Permanently delete all {records.length} tournament entries from this station?
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2.5 rounded-xl bg-[#100B1D] border border-[#35264D] text-xs font-display font-bold uppercase text-[#CBD5E1] cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 rounded-xl bg-[#FF365D] hover:bg-[#FF365D]/90 text-xs font-display font-black uppercase text-white cursor-pointer shadow-[0_0_15px_rgba(255,54,93,0.5)]"
                  >
                    PURGE ALL
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="pt-3 border-t border-[#35264D] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#100B1D] border border-[#35264D] hover:border-[#00E5FF] text-xs font-display font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </motion.div>
    </div>
  );
};
