"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Terminal, Dices, ArrowLeft, Shield } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface PlayerRegistrationProps {
  onRegister: (gamerTag: string) => void;
  onBack: () => void;
}

const RANDOM_CALLSIGNS = [
  "NEON_GHOST",
  "CYBER_VIPER",
  "NULL_VECTOR",
  "DATA_SHADOW",
  "CIPHER_BLADE",
  "ZERO_DAY",
  "PACKET_SNIFFER",
  "ROOT_OVERRIDE",
  "QUANTUM_HACK",
  "BYTE_RUNNER",
  "NEXUS_OPERATOR",
  "GRID_PHANTOM"
];

export const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({
  onRegister,
  onBack,
}) => {
  const [tag, setTag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRandomize = () => {
    sound.playClick();
    const randomPick = RANDOM_CALLSIGNS[Math.floor(Math.random() * RANDOM_CALLSIGNS.length)];
    setTag(randomPick);
    if (error) setError(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const trimmed = tag.trim();
    if (!trimmed) {
      sound.playIncorrect();
      setError("Please input a valid agent callsign.");
      return;
    }
    if (trimmed.length > 16) {
      sound.playIncorrect();
      setError("Callsign cannot exceed 16 characters.");
      return;
    }

    setIsSubmitting(true);
    sound.playClick();
    onRegister(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#080611] text-[#F8FAFC] select-none relative overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.7)] relative z-10"
      >
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 mb-6 border-b border-[#35264D]">
          <div className="w-10 h-10 rounded-xl bg-[#100B1D] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Terminal className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">
              OPERATOR CALLSIGN
            </h2>
            <p className="text-xs font-mono text-[#94A3B8]">
              Terminal clearance required for tournament entry
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-medium text-[#CBD5E1] uppercase tracking-wider">
                Gamer Tag / Callsign
              </label>
              <button
                type="button"
                onClick={handleRandomize}
                className="text-[11px] font-mono text-[#00E5FF] hover:text-[#39FF88] flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={16}
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value.replace(/[^a-zA-Z0-9_\- ]/g, ""));
                  if (error) setError(null);
                }}
                placeholder="e.g. CYBER_NINJA"
                className="w-full px-4 py-3 bg-[#100B1D] border border-[#35264D] focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] focus:outline-none rounded-xl text-[#00E5FF] font-digital text-base tracking-wider placeholder:text-[#64748B] transition-all"
              />
              <span className="absolute right-3 top-3 text-[11px] font-mono text-[#64748B]">
                {tag.length}/16
              </span>
            </div>

            {error && (
              <div className="flex items-center space-x-1.5 text-xs font-mono text-[#FF365D] mt-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="w-full sm:w-1/3 py-3 rounded-xl bg-[#100B1D] border border-[#35264D] hover:border-[#64748B] text-xs font-display font-bold uppercase tracking-wider text-[#94A3B8] hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN</span>
            </button>

            <button
              disabled={isSubmitting || !tag.trim()}
              type="submit"
              className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] hover:from-[#00E5FF]/90 hover:to-[#3B82F6]/90 text-[#080611] font-display font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              <span>INITIALIZE OPERATOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#35264D] text-center text-xs font-mono text-[#64748B] flex items-center justify-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-[#39FF88]" />
          <span>Local Tournament Ledger • Standalone Security Station</span>
        </div>
      </motion.div>
    </div>
  );
};
