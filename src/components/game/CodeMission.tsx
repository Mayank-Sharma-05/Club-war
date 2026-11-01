"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuessRecord, CodeFeedbackType } from "@/types/game";
import { validateGuess, evaluateGuess, getCodeScoreForAttempt } from "@/lib/password-engine";
import { KeyRound, Lock, Unlock, Delete, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface CodeMissionProps {
  secretCode: string; // generated 4 unique digits
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
      // Unlocked vault!
      sound.playVaultUnlock();
      setIsUnlocked(true);
      const score = getCodeScoreForAttempt(newHistory.length);
      setTimeout(() => {
        onComplete(score, newHistory.length, true);
      }, 1500);
    } else if (newHistory.length >= maxAttempts) {
      // Failed vault
      sound.playGameOver();
      setIsFailed(true);
      setTimeout(() => {
        onComplete(0, maxAttempts, false);
      }, 1800);
    } else {
      // Partial feedback chime
      sound.playKeypad("5");
    }
  }, [currentGuess, history, isUnlocked, isFailed, secretCode, onComplete]);

  // Physical keyboard support
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
    <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col flex-grow items-center">
      {/* Mission Subheader */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-[#1E293B] gap-2">
        <div>
          <div className="flex items-center space-x-2 text-xs font-cyber text-[#00E676] tracking-wider mb-1">
            <KeyRound className="w-4 h-4" />
            <span>MISSION 03 OF 03 // LAYER 3: CENTRAL CRYPTOGRAPHIC VAULT</span>
          </div>
          <h2 className="font-cyber font-extrabold text-lg sm:text-2xl text-[#F8FAFC]">
            CRACK THE CODE: 4-DIGIT VAULT
          </h2>
        </div>

        <div className="flex items-center space-x-3 bg-[#101827] px-4 py-2 rounded-xl border border-[#1E293B]">
          <div className="text-right">
            <div className="text-[10px] font-cyber text-[#94A3B8]">ATTEMPTS REMAINING</div>
            <div
              className={`text-xs font-mono font-bold ${
                attemptsRemaining <= 1 ? "text-[#FF334F]" : "text-[#00E676]"
              }`}
            >
              {attemptsRemaining} / {maxAttempts} ATTEMPTS
            </div>
          </div>
        </div>
      </div>

      {/* Main Vault Stage */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Left Side: Futuristic Vault Dial & Feedback History */}
        <div className="bg-[#111C2E]/90 border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          {/* Vault Status Graphic */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <span className="text-xs font-cyber text-[#94A3B8]">VAULT CYLINDER STATUS</span>
            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-cyber font-bold tracking-wider ${
                isUnlocked
                  ? "bg-[#00E676]/20 border border-[#00E676] text-[#00E676] glow-green"
                  : isFailed
                  ? "bg-[#FF334F]/20 border border-[#FF334F] text-[#FF334F] glow-red"
                  : "bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF]"
              }`}
            >
              {isUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>PERIMETER BREACHED</span>
                </>
              ) : isFailed ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>VAULT LOCKDOWN</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>ENCRYPTED (4 DIGITS)</span>
                </>
              )}
            </div>
          </div>

          {/* Past Attempts Visual List */}
          <div className="my-4 space-y-2 flex-grow">
            <span className="text-[10px] font-cyber text-[#94A3B8] uppercase">
              Attempt Logs (Max 5)
            </span>

            {Array.from({ length: maxAttempts }).map((_, slotIdx) => {
              const record = history[slotIdx];

              return (
                <div
                  key={slotIdx}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                    record
                      ? "bg-[#101827] border-[#1E293B]"
                      : "bg-[#070B14]/40 border-[#1E293B]/40 opacity-40"
                  }`}
                >
                  <span className="font-mono text-xs text-[#94A3B8] w-6">
                    #{slotIdx + 1}
                  </span>

                  {record ? (
                    <div className="flex space-x-2">
                      {record.guess.split("").map((digit, dIdx) => {
                        const feedback = record.feedback[dIdx];
                        let colorStyle = "bg-[#FF334F] text-[#F8FAFC]"; // red
                        if (feedback === "green") colorStyle = "bg-[#00E676] text-[#070B14] font-black glow-green";
                        if (feedback === "yellow") colorStyle = "bg-[#F59E0B] text-[#070B14] font-black";

                        return (
                          <div
                            key={dIdx}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-base shadow-sm ${colorStyle}`}
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
                          className="w-9 h-9 rounded-lg border border-dashed border-[#1E293B] flex items-center justify-center text-[#94A3B8]/30 font-mono text-xs"
                        >
                          -
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-[#94A3B8] w-12 text-right">
                    {record
                      ? record.feedback.every((f) => f === "green")
                        ? "MATCH"
                        : "CHECK"
                      : "EMPTY"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Color Key Reference */}
          <div className="pt-3 border-t border-[#1E293B] grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
            <div className="flex items-center justify-center space-x-1 text-[#00E676]">
              <div className="w-2.5 h-2.5 rounded bg-[#00E676]" />
              <span>CORRECT SPOT</span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[#F59E0B]">
              <div className="w-2.5 h-2.5 rounded bg-[#F59E0B]" />
              <span>WRONG SPOT</span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[#FF334F]">
              <div className="w-2.5 h-2.5 rounded bg-[#FF334F]" />
              <span>NOT IN CODE</span>
            </div>
          </div>
        </div>

        {/* Right Side: Active Passcode Input & Numeric Keypad */}
        <div className="bg-[#111C2E]/90 border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          {/* Current 4-digit input display */}
          <div className="mb-4">
            <span className="text-[10px] font-cyber text-[#94A3B8] uppercase block mb-2">
              ACTIVE ENCRYPTION INPUT
            </span>

            <div className="flex justify-center space-x-3 mb-2">
              {[0, 1, 2, 3].map((pos) => {
                const char = currentGuess[pos];
                return (
                  <motion.div
                    key={pos}
                    animate={char ? { scale: [1, 1.08, 1] } : {}}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl border flex items-center justify-center font-mono font-black text-2xl sm:text-3xl transition-all ${
                      char
                        ? "bg-[#101827] border-[#00E5FF] text-[#00E5FF] glow-cyan"
                        : pos === currentGuess.length
                        ? "bg-[#101827]/60 border-[#A855F7] animate-pulse"
                        : "bg-[#101827]/40 border-[#1E293B] text-[#94A3B8]/30"
                    }`}
                  >
                    {char || "_"}
                  </motion.div>
                );
              })}
            </div>

            {/* Input Error Warning */}
            <div className="min-h-[22px] flex items-center justify-center">
              {inputError && (
                <div className="flex items-center space-x-1.5 text-xs text-[#FF334F] font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{inputError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Futuristic Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 mb-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => {
              const isUsed = currentGuess.includes(digit);
              return (
                <motion.button
                  key={digit}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputDigit(digit)}
                  disabled={isUnlocked || isFailed}
                  className={`py-3.5 sm:py-4 rounded-xl border font-mono font-bold text-lg transition-all ${
                    isUsed
                      ? "bg-[#101827]/40 border-[#1E293B] text-[#94A3B8]/40 cursor-not-allowed"
                      : "bg-[#101827] border-[#1E293B] hover:border-[#00E5FF]/60 text-[#F8FAFC] hover:text-[#00E5FF] cursor-pointer"
                  }`}
                >
                  {digit}
                </motion.button>
              );
            })}

            {/* Backspace Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              disabled={isUnlocked || isFailed || currentGuess.length === 0}
              className="py-3.5 sm:py-4 rounded-xl border border-[#1E293B] bg-[#101827] hover:border-[#FF334F]/60 text-[#94A3B8] hover:text-[#FF334F] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Delete className="w-5 h-5" />
            </motion.button>

            {/* Digit 0 */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleInputDigit("0")}
              disabled={isUnlocked || isFailed}
              className={`py-3.5 sm:py-4 rounded-xl border font-mono font-bold text-lg transition-all ${
                currentGuess.includes("0")
                  ? "bg-[#101827]/40 border-[#1E293B] text-[#94A3B8]/40 cursor-not-allowed"
                  : "bg-[#101827] border-[#1E293B] hover:border-[#00E5FF]/60 text-[#F8FAFC] hover:text-[#00E5FF] cursor-pointer"
              }`}
            >
              0
            </motion.button>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isUnlocked || isFailed || currentGuess.length !== 4}
              className="py-3.5 sm:py-4 rounded-xl border border-[#00E676]/60 bg-[#00E676]/20 hover:bg-[#00E676]/30 text-[#00E676] font-cyber font-bold text-xs tracking-wider flex items-center justify-center space-x-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer glow-green"
            >
              <span>SUBMIT</span>
            </motion.button>
          </div>

          <div className="text-center pt-2 text-[10px] font-mono text-[#94A3B8]/60">
            Physical keypad & keyboard input supported (0-9, Backspace, Enter)
          </div>
        </div>
      </div>

      {/* Unlocked / Failed Notification Overlays */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-[#070B14]/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <div className="bg-[#111C2E] border-2 border-[#00E676] rounded-2xl p-8 max-w-md w-full text-center glow-green shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-[#00E676] animate-bounce" />
              </div>
              <h3 className="font-cyber font-extrabold text-2xl text-[#F8FAFC] mb-2">
                VAULT BREACHED!
              </h3>
              <p className="text-sm text-[#94A3B8] mb-4">
                Encryption unlocked in {attemptsUsed} attempt{attemptsUsed > 1 ? "s" : ""}. Central Intelligence Core secured!
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-[#00E676]/20 border border-[#00E676] text-[#00E676] font-mono font-bold text-lg">
                +{getCodeScoreForAttempt(attemptsUsed)} POINTS EARNED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
