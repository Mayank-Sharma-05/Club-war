"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuessRecord, CodeFeedbackType } from "@/types/game";
import { validateGuess, evaluateGuess, getCodeScoreForAttempt } from "@/lib/password-engine";
import { KeyRound, Lock, Unlock, Delete, AlertCircle, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface CodeMissionProps {
  secretCode: string;
  onComplete: (scoreEarned: number, attemptsUsed: number, unlocked: boolean) => void;
  onGuessEvaluated?: (greens: number, yellows: number, attemptNumber: number) => void;
}

export const CodeMission: React.FC<CodeMissionProps> = ({
  secretCode,
  onComplete,
  onGuessEvaluated,
}) => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [history, setHistory] = useState<GuessRecord[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const maxAttempts = 5;
  const attemptsUsed = history.length;
  const attemptsRemaining = maxAttempts - attemptsUsed;

  const handleInputDigit = useCallback((digit: string) => {
    if (isUnlocked || isFailed) return;
    if (currentGuess.length >= 4) return;

    if (currentGuess.includes(digit)) {
      sound.playIncorrect();
      setInputError("All 4 passcode digits must be unique.");
      return;
    }

    sound.playKeypad(digit);
    setInputError(null);
    setCurrentGuess((prev) => prev + digit);
  }, [currentGuess, isUnlocked, isFailed]);

  const handleDelete = useCallback(() => {
    if (isUnlocked || isFailed) return;
    sound.playClick();
    setInputError(null);
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [isUnlocked, isFailed]);

  const handleSubmit = useCallback(() => {
    if (isUnlocked || isFailed) return;

    const validation = validateGuess(currentGuess);
    if (!validation.valid) {
      sound.playIncorrect();
      setInputError(validation.error || "Invalid passcode format.");
      return;
    }

    const feedback = evaluateGuess(currentGuess, secretCode);
    const newRecord: GuessRecord = { guess: currentGuess, feedback };
    const newHistory = [...history, newRecord];
    setHistory(newHistory);
    setCurrentGuess("");

    const isAllGreen = feedback.every((f) => f === "green");
    const greenCount = feedback.filter((f) => f === "green").length;
    const yellowCount = feedback.filter((f) => f === "yellow").length;

    if (onGuessEvaluated) {
      onGuessEvaluated(greenCount, yellowCount, newHistory.length);
    }

    if (isAllGreen) {
      sound.playVaultUnlock();
      setIsUnlocked(true);
      const score = getCodeScoreForAttempt(newHistory.length);
      setTimeout(() => {
        onComplete(score, newHistory.length, true);
      }, 1600);
    } else if (newHistory.length >= maxAttempts) {
      sound.playGameOver();
      setIsFailed(true);
      setTimeout(() => {
        onComplete(0, maxAttempts, false);
      }, 1800);
    } else {
      sound.playKeypad("5");
    }
  }, [currentGuess, history, isUnlocked, isFailed, secretCode, onComplete, onGuessEvaluated]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked || isFailed) return;
      if (/^[0-9]$/.test(e.key)) {
        handleInputDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInputDigit, handleDelete, handleSubmit, isUnlocked, isFailed]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow items-center select-none">
      {/* Mission Subheader */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#35264D] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#39FF88] uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4 text-[#39FF88]" />
            <span>MISSION 03 — VAULT CIPHER DECRYPTION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#F8FAFC] tracking-wider uppercase">
            Crack the Code: Core Mainframe
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 bg-[#171127] px-4 py-2 rounded-xl border border-[#35264D] self-start sm:self-auto shadow-inner">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">Attempts:</span>
          <span
            className={`text-sm font-digital font-bold ${
              attemptsRemaining <= 1 ? "text-[#FF365D]" : "text-[#39FF88]"
            }`}
          >
            {attemptsRemaining} OF {maxAttempts} REMAINING
          </span>
        </div>
      </div>

      {/* Main 2-Column Stage */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Left Side: Attempt History & Color Guide */}
        <div className="bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#35264D]">
              <span className="text-xs font-mono font-semibold uppercase text-[#94A3B8]">
                VAULT CIPHER STATE
              </span>
              <div
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                  isUnlocked
                    ? "bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/40 shadow-[0_0_10px_rgba(57,255,136,0.3)]"
                    : isFailed
                    ? "bg-[#FF365D]/20 text-[#FF365D] border border-[#FF365D]/40"
                    : "bg-[#100B1D] text-[#CBD5E1] border border-[#35264D]"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>CIPHER OVERRIDDEN</span>
                  </>
                ) : isFailed ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>LOCKOUT ACTIVE</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>SECURED (4 UNIQUE DIGITS)</span>
                  </>
                )}
              </div>
            </div>

            {/* Past Attempts List */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-mono text-[#64748B] block mb-2 uppercase">
                Decryption Log (Max 5 Attempts)
              </span>

              {Array.from({ length: maxAttempts }).map((_, slotIdx) => {
                const record = history[slotIdx];

                return (
                  <div
                    key={slotIdx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      record
                        ? "bg-[#100B1D] border-[#35264D]"
                        : "bg-[#100B1D]/40 border-[#35264D]/40 opacity-40"
                    }`}
                  >
                    <span className="font-mono text-xs text-[#64748B] w-6">
                      #{slotIdx + 1}
                    </span>

                    {record ? (
                      <div className="flex space-x-2">
                        {record.guess.split("").map((digit, dIdx) => {
                          const feedback = record.feedback[dIdx];
                          let colorStyle = "bg-[#FF365D]/20 border-[#FF365D]/40 text-[#FF365D]"; // red
                          if (feedback === "green") colorStyle = "bg-[#39FF88]/20 border-[#39FF88] text-[#39FF88] shadow-[0_0_10px_rgba(57,255,136,0.4)]";
                          if (feedback === "yellow") colorStyle = "bg-[#FFD43B]/20 border-[#FFD43B] text-[#FFD43B] shadow-[0_0_10px_rgba(255,212,59,0.3)]";

                          return (
                            <div
                              key={dIdx}
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center font-digital text-sm font-bold ${colorStyle}`}
                            >
                              {digit}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        {[0, 1, 2, 3].map((emptyIdx) => (
                          <div
                            key={emptyIdx}
                            className="w-8 h-8 rounded-lg border border-dashed border-[#35264D] flex items-center justify-center text-[#64748B] font-mono text-xs"
                          >
                            ·
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-xs font-mono text-[#64748B] w-14 text-right">
                      {record
                        ? record.feedback.every((f) => f === "green")
                          ? "SOLVED"
                          : "EVAL"
                        : "EMPTY"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Guide Reference */}
          <div className="pt-3 border-t border-[#35264D] grid grid-cols-3 gap-2 text-[11px] text-center font-mono font-medium">
            <div className="flex items-center justify-center space-x-1.5 text-[#39FF88]">
              <div className="w-2.5 h-2.5 rounded bg-[#39FF88] shadow-[0_0_5px_#39FF88]" />
              <span>Correct Spot</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-[#FFD43B]">
              <div className="w-2.5 h-2.5 rounded bg-[#FFD43B] shadow-[0_0_5px_#FFD43B]" />
              <span>Misplaced</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-[#FF365D]">
              <div className="w-2.5 h-2.5 rounded bg-[#FF365D]" />
              <span>Not in Code</span>
            </div>
          </div>
        </div>

        {/* Right Side: Passcode Slots & Keypad */}
        <div className="bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div>
            <span className="text-xs font-mono font-semibold uppercase text-[#00E5FF] block mb-3">
              INPUT 4-DIGIT PASSCODE
            </span>

            {/* Input Slots */}
            <div className="flex justify-center space-x-3 mb-2">
              {[0, 1, 2, 3].map((pos) => {
                const char = currentGuess[pos];
                return (
                  <div
                    key={pos}
                    className={`w-14 h-16 rounded-xl border flex items-center justify-center font-digital font-bold text-2xl transition-all ${
                      char
                        ? "bg-[#100B1D] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                        : pos === currentGuess.length
                        ? "bg-[#100B1D] border-[#00E5FF]/60 shadow-[0_0_10px_rgba(0,229,255,0.2)] animate-pulse"
                        : "bg-[#100B1D] border-[#35264D] text-[#64748B]"
                    }`}
                  >
                    {char || ""}
                  </div>
                );
              })}
            </div>

            {/* Error message */}
            <div className="min-h-[22px] flex items-center justify-center">
              {inputError && (
                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#FF365D]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{inputError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 my-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => {
              const isUsed = currentGuess.includes(digit);
              return (
                <button
                  key={digit}
                  onClick={() => handleInputDigit(digit)}
                  disabled={isUnlocked || isFailed}
                  className={`py-3.5 rounded-xl border font-digital font-bold text-lg transition-all cursor-pointer ${
                    isUsed
                      ? "bg-[#100B1D]/50 border-[#35264D]/50 text-[#64748B] cursor-not-allowed"
                      : "bg-[#100B1D] border-[#35264D] hover:border-[#00E5FF] hover:bg-[#100B1D]/80 text-[#F8FAFC] hover:text-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                  }`}
                >
                  {digit}
                </button>
              );
            })}

            {/* Backspace */}
            <button
              onClick={handleDelete}
              disabled={isUnlocked || isFailed || currentGuess.length === 0}
              className="py-3.5 rounded-xl border border-[#35264D] bg-[#100B1D] hover:border-[#FF365D] hover:bg-[#FF365D]/10 text-[#94A3B8] hover:text-[#FF365D] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <Delete className="w-5 h-5" />
            </button>

            {/* 0 */}
            <button
              onClick={() => handleInputDigit("0")}
              disabled={isUnlocked || isFailed}
              className={`py-3.5 rounded-xl border font-digital font-bold text-lg transition-all cursor-pointer ${
                currentGuess.includes("0")
                  ? "bg-[#100B1D]/50 border-[#35264D]/50 text-[#64748B] cursor-not-allowed"
                  : "bg-[#100B1D] border-[#35264D] hover:border-[#00E5FF] hover:bg-[#100B1D]/80 text-[#F8FAFC] hover:text-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              }`}
            >
              0
            </button>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isUnlocked || isFailed || currentGuess.length !== 4}
              className="py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#39FF88] text-[#080611] font-display font-black text-xs uppercase tracking-wider flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              <span>SUBMIT</span>
            </button>
          </div>

          <div className="text-center pt-2 text-[11px] font-mono text-[#64748B]">
            KEYBOARD ENABLED: 0–9, BACKSPACE, ENTER
          </div>
        </div>
      </div>

      {/* Cyberpunk ACCESS GRANTED Overlay */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <div className="bg-[#171127] border border-[#39FF88] rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(57,255,136,0.6)]">
              <div className="w-16 h-16 rounded-2xl bg-[#39FF88]/20 border border-[#39FF88] text-[#39FF88] flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(57,255,136,0.5)]">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-display font-black text-[#39FF88] uppercase tracking-wider mb-1 drop-shadow-[0_0_10px_rgba(57,255,136,0.8)]">
                ACCESS GRANTED
              </h3>
              <p className="text-xs font-mono text-[#CBD5E1] mb-5">
                CIPHER CRACKED IN {attemptsUsed} ATTEMPT{attemptsUsed > 1 ? "S" : ""}. SYSTEM MAINFRAME RESTORED!
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-[#39FF88]/20 border border-[#39FF88]/40 text-[#39FF88] font-digital font-bold text-base shadow-[0_0_15px_rgba(57,255,136,0.3)]">
                +{getCodeScoreForAttempt(attemptsUsed)} POINTS EARNED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
