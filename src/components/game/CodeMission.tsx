"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuessRecord } from "@/types/game";
import { validateGuess, evaluateGuess, getCodeScoreForAttempt } from "@/lib/password-engine";
import { KeyRound, Lock, Unlock, Delete, AlertCircle, CheckCircle2 } from "lucide-react";
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
      setInputError("All 4 digits must be unique.");
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
      setInputError(validation.error || "Invalid passcode.");
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
      }, 1500);
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow items-center">
      {/* Mission Subheader */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 mb-1">
            <KeyRound className="w-4 h-4 text-emerald-700" />
            <span>Mission 03 — Vault Decryption (Max 100 Pts)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Crack the Code: Digital Vault
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-200 self-start sm:self-auto shadow-2xs font-sans">
          <span className="text-xs font-medium text-slate-500">Attempts Remaining:</span>
          <span
            className={`text-xs font-mono font-semibold ${
              attemptsRemaining <= 1 ? "text-rose-600" : "text-emerald-700"
            }`}
          >
            {attemptsRemaining} of {maxAttempts}
          </span>
        </div>
      </div>

      {/* Main 2-Column Stage */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Left Side: Attempt History & Color Guide */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500 font-sans">
                Vault Status
              </span>
              <div
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium font-sans ${
                  isUnlocked
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : isFailed
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-slate-50 text-slate-600 border border-slate-200"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Vault Unlocked</span>
                  </>
                ) : isFailed ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Lockout Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Secured (4 Unique Digits)</span>
                  </>
                )}
              </div>
            </div>

            {/* Past Attempts List */}
            <div className="space-y-2 mb-4">
              <span className="text-xs text-slate-500 block mb-2 font-medium font-sans">
                Attempt History (Max 5)
              </span>

              {Array.from({ length: maxAttempts }).map((_, slotIdx) => {
                const record = history[slotIdx];

                return (
                  <div
                    key={slotIdx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                      record
                        ? "bg-slate-50/70 border-slate-200"
                        : "bg-slate-50/30 border-slate-100 opacity-40"
                    }`}
                  >
                    <span className="font-mono text-xs text-slate-400 w-6">
                      #{slotIdx + 1}
                    </span>

                    {record ? (
                      <div className="flex space-x-2">
                        {record.guess.split("").map((digit, dIdx) => {
                          const feedback = record.feedback[dIdx];
                          let colorStyle = "bg-rose-600 text-white"; // red
                          if (feedback === "green") colorStyle = "bg-emerald-600 text-white font-semibold";
                          if (feedback === "yellow") colorStyle = "bg-amber-500 text-white font-semibold";

                          return (
                            <div
                              key={dIdx}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm ${colorStyle}`}
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
                            className="w-8 h-8 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-300 font-mono text-xs"
                          >
                            ·
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-xs font-mono text-slate-500 w-12 text-right">
                      {record
                        ? record.feedback.every((f) => f === "green")
                          ? "Match"
                          : "Check"
                        : "Empty"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Guide Reference */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-center font-medium font-sans">
            <div className="flex items-center justify-center space-x-1.5 text-emerald-700">
              <div className="w-2.5 h-2.5 rounded bg-emerald-600" />
              <span>Correct Spot</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-amber-600">
              <div className="w-2.5 h-2.5 rounded bg-amber-500" />
              <span>Wrong Spot</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-rose-600">
              <div className="w-2.5 h-2.5 rounded bg-rose-600" />
              <span>Not in Code</span>
            </div>
          </div>
        </div>

        {/* Right Side: Passcode Slots & Keypad */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-xs font-medium text-slate-600 block mb-3 font-sans">
              Enter 4-Digit Passcode
            </span>

            {/* Input Slots */}
            <div className="flex justify-center space-x-3 mb-2">
              {[0, 1, 2, 3].map((pos) => {
                const char = currentGuess[pos];
                return (
                  <div
                    key={pos}
                    className={`w-14 h-16 rounded-xl border flex items-center justify-center font-mono font-bold text-2xl transition-colors ${
                      char
                        ? "bg-white border-teal-700 text-slate-900 ring-2 ring-teal-700/15"
                        : pos === currentGuess.length
                        ? "bg-slate-50 border-teal-700"
                        : "bg-slate-50 border-slate-200 text-slate-300"
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
                <div className="flex items-center space-x-1.5 text-xs text-rose-600 font-medium font-sans">
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
                  className={`py-3.5 rounded-xl border font-mono font-semibold text-lg transition-colors cursor-pointer ${
                    isUsed
                      ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                      : "bg-white border-slate-200 hover:border-teal-700 hover:bg-teal-50/50 text-slate-900 shadow-2xs"
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
              className="py-3.5 rounded-xl border border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/50 text-slate-600 hover:text-rose-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
            >
              <Delete className="w-5 h-5" />
            </button>

            {/* 0 */}
            <button
              onClick={() => handleInputDigit("0")}
              disabled={isUnlocked || isFailed}
              className={`py-3.5 rounded-xl border font-mono font-semibold text-lg transition-colors cursor-pointer ${
                currentGuess.includes("0")
                  ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                  : "bg-white border-slate-200 hover:border-teal-700 hover:bg-teal-50/50 text-slate-900 shadow-2xs"
              }`}
            >
              0
            </button>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isUnlocked || isFailed || currentGuess.length !== 4}
              className="py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-xs flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-xs"
            >
              <span>Submit</span>
            </button>
          </div>

          <div className="text-center pt-2 text-xs text-slate-500 font-sans">
            Supports keyboard entry (0–9, Backspace, Enter)
          </div>
        </div>
      </div>

      {/* Unlock Feedback Overlay */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white border border-emerald-300 rounded-2xl p-8 max-w-sm w-full text-center shadow-lg">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-1">
                Vault Unlocked
              </h3>
              <p className="text-sm font-sans text-slate-600 mb-4">
                Code verified in {attemptsUsed} attempt{attemptsUsed > 1 ? "s" : ""}. Core system secured!
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-semibold text-sm">
                +{getCodeScoreForAttempt(attemptsUsed)} / 100 Points Earned
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
