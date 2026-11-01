"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, ArrowRight, Shield, Terminal, AlertCircle } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface PlayerRegistrationProps {
  onRegister: (gamerTag: string) => void;
  onBack: () => void;
}

export const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({
  onRegister,
  onBack,
}) => {
  const [tag, setTag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const trimmed = tag.trim();
    if (!trimmed) {
      sound.playIncorrect();
      setError("Please enter a valid Analyst Gamer Tag.");
      return;
    }
    if (trimmed.length > 16) {
      sound.playIncorrect();
      setError("Gamer Tag cannot exceed 16 characters.");
      return;
    }

    setIsSubmitting(true);
    sound.playClick();
    onRegister(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-cyber-grid bg-[#070B14] relative">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[300px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#111C2E]/95 border border-[#1E293B] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#00E5FF]" />
            <span className="font-cyber font-bold text-xs tracking-widest text-[#00E5FF]">
              AGENT CREDENTIALS
            </span>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF334F]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E676]/40" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-cyber font-extrabold text-xl sm:text-2xl text-[#F8FAFC] tracking-wide mb-2">
            ANALYST SIGN-IN
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Register your operational callsign. This gamer tag will be permanently recorded on the stall tournament leaderboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-cyber tracking-wider text-[#94A3B8] mb-2 uppercase">
              Gamer Tag (1–16 chars)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <Terminal className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <input
                type="text"
                autoFocus
                maxLength={16}
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value.replace(/[^a-zA-Z0-9_\- ]/g, ""));
                  if (error) setError(null);
                }}
                placeholder="e.g. CIPHER_99"
                className="w-full pl-10 pr-4 py-3 bg-[#101827] border border-[#1E293B] focus:border-[#00E5FF] focus:outline-none focus:ring-1 focus:ring-[#00E5FF] rounded-xl text-[#F8FAFC] font-mono font-semibold text-sm tracking-wider placeholder:text-[#94A3B8]/40 transition-all glow-cyan"
              />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center space-x-1.5 text-xs text-[#FF334F] mt-2 font-mono"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="w-full sm:w-1/3 py-3 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#94A3B8]/40 text-[#94A3B8] hover:text-[#F8FAFC] font-mono text-xs font-semibold tracking-wider transition-all"
            >
              CANCEL
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || !tag.trim()}
              type="submit"
              className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-[#070B14] font-cyber font-bold text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed glow-cyan transition-all"
            >
              <UserCheck className="w-4 h-4 fill-current" />
              <span>CONFIRM CALLSIGN</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1E293B] text-center">
          <p className="text-[11px] font-mono text-[#94A3B8]/70">
            One laptop • Local session storage • Zero external cloud sync
          </p>
        </div>
      </motion.div>
    </div>
  );
};
