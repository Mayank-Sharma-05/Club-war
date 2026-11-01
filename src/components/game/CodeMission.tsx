"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuessRecord, CodeFeedbackType } from "@/types/game";
import { validateGuess, evaluateGuess, getCodeScoreForAttempt } from "@/lib/password-engine";
import { KeyRound, Lock, Unlock, Delete, AlertCircle, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface CodeMissionProps {
  secretCode: string;
  onComplete: (scoreEarned: number, attemptsUsed: number, unlocked: boolean) => void;
}

export const CodeMission: React.FC<CodeMissionProps> = ({
  secretCode,
  onComplete,
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
  }, [currentGuess, history, isUnlocked, isFailed, secretCode, onComplete]);

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col flex-grow items-center">
      {/* Mission Subheader */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#263244] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#22C55E] uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4 text-[#22C55E]" />
            <span>Mission 03 — Layer 3 Core Security</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F1F5F9] tracking-tight">
            Crack the Code: Security Vault
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 bg-[#111827] px-4 py-2 rounded-xl border border-[#263244] self-start sm:self-auto">
          <span className="text-xs text-[#718096]">Attempts Remaining:</span>
          <span
            className={`text-xs font-mono font-semibold ${
              attemptsRemaining <= 1 ? "text-[#EF4444]" : "text-[#22C55E]"
            }`}
          >
            {attemptsRemaining} of {maxAttempts}
          </span>
        </div>
      </div>

      {/* Main 2-Column Stage */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Left Side: Attempt History & Color Guide */}
        <div className="bg-[#111827] border border-[#263244] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#263244]">
              <span className="text-xs font-medium text-[#A1AEC0]">
                Vault Status
              </span>
              <div
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                  isUnlocked
                    ? "bg-[#22C55E]/15 text-[#22C55E]"
                    : isFailed
                    ? "bg-[#EF4444]/15 text-[#EF4444]"
                    : "bg-[#151F2E] text-[#A1AEC0]"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </>
                ) : isFailed ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked Out</span>
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
              <span className="text-xs text-[#718096] block mb-2 font-medium">
                Attempt History
              </span>

              {Array.from({ length: maxAttempts }).map((_, slotIdx) => {
                const record = history[slotIdx];

                return (
                  <div
                    key={slotIdx}
                    className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                      record
                        ? "bg-[#151F2E] border-[#263244]"
                        : "bg-[#151F2E]/30 border-[#263244]/40 opacity-40"
                    }`}
                  >
                    <span className="font-mono text-xs text-[#718096] w-6">
                      #{slotIdx + 1}
                    </span>

                    {record ? (
                      <div className="flex space-x-2">
                        {record.guess.split("").map((digit, dIdx) => {
                          const feedback = record.feedback[dIdx];
                          let colorStyle = "bg-[#EF4444] text-[#F1F5F9]"; // red
                          if (feedback === "green") colorStyle = "bg-[#22C55E] text-[#090D14] font-semibold";
                          if (feedback === "yellow") colorStyle = "bg-[#F59E0B] text-[#090D14] font-semibold";

                          return (
                            <div
                              key={dIdx}
                              className={`w-8 h-8 rounded-md flex items-center justify-center font-mono text-sm ${colorStyle}`}
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
                            className="w-8 h-8 rounded-md border border-dashed border-[#263244] flex items-center justify-center text-[#718096]/40 font-mono text-xs"
                          >
                            ·
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-xs font-mono text-[#718096] w-12 text-right">
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
          <div className="pt-3 border-t border-[#263244] grid grid-cols-3 gap-2 text-xs text-center font-medium">
            <div className="flex items-center justify-center space-x-1.5 text-[#22C55E]">
              <div className="w-2.5 h-2.5 rounded bg-[#22C55E]" />
              <span>Correct Spot</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-[#F59E0B]">
              <div className="w-2.5 h-2.5 rounded bg-[#F59E0B]" />
              <span>Wrong Spot</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-[#EF4444]">
              <div className="w-2.5 h-2.5 rounded bg-[#EF4444]" />
              <span>Not in Code</span>
            </div>
          </div>
        </div>

        {/* Right Side: Passcode Slots & Keypad */}
        <div className="bg-[#111827] border border-[#263244] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#A1AEC0] block mb-3">
              Enter 4-Digit Passcode
            </span>

            {/* Input Slots */}
            <div className="flex justify-center space-x-3 mb-2">
              {[0, 1, 2, 3].map((pos) => {
                const char = currentGuess[pos];
                return (
                  <div
                    key={pos}
                    className={`w-14 h-16 rounded-xl border flex items-center justify-center font-mono font-semibold text-2xl transition-colors ${
                      char
                        ? "bg-[#151F2E] border-[#22D3EE] text-[#F1F5F9]"
                        : pos === currentGuess.length
                        ? "bg-[#151F2E] border-[#334155]"
                        : "bg-[#151F2E]/40 border-[#263244] text-[#718096]/30"
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
                <div className="flex items-center space-x-1.5 text-xs text-[#EF4444]">
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
                      ? "bg-[#151F2E]/40 border-[#263244] text-[#718096]/40 cursor-not-allowed"
                      : "bg-[#151F2E] border-[#263244] hover:border-[#334155] hover:bg-[#1A2638] text-[#F1F5F9]"
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
              className="py-3.5 rounded-xl border border-[#263244] bg-[#151F2E] hover:border-[#334155] text-[#A1AEC0] hover:text-[#F1F5F9] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Delete className="w-5 h-5" />
            </button>

            {/* 0 */}
            <button
              onClick={() => handleInputDigit("0")}
              disabled={isUnlocked || isFailed}
              className={`py-3.5 rounded-xl border font-mono font-semibold text-lg transition-colors cursor-pointer ${
                currentGuess.includes("0")
                  ? "bg-[#151F2E]/40 border-[#263244] text-[#718096]/40 cursor-not-allowed"
                  : "bg-[#151F2E] border-[#263244] hover:border-[#334155] hover:bg-[#1A2638] text-[#F1F5F9]"
              }`}
            >
              0
            </button>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isUnlocked || isFailed || currentGuess.length !== 4}
              className="py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#22C55E]/90 text-[#090D14] font-semibold text-xs tracking-wide flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <span>Submit</span>
            </button>
          </div>

          <div className="text-center pt-2 text-xs text-[#718096]">
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
            className="fixed inset-0 bg-[#090D14]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <div className="bg-[#111827] border border-[#22C55E]/40 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-4 text-[#22C55E]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#F1F5F9] mb-1">
                Vault Unlocked
              </h3>
              <p className="text-sm text-[#A1AEC0] mb-4">
                Code verified in {attemptsUsed} attempt{attemptsUsed > 1 ? "s" : ""}. Core system secured!
              </p>
              <div className="inline-block px-4 py-2 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] font-mono font-semibold text-sm">
                +{getCodeScoreForAttempt(attemptsUsed)} Points Earned
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
