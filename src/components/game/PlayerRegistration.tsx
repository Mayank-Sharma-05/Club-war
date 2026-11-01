"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, ArrowRight, AlertCircle, Shield } from "lucide-react";
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
      setError("Please enter a callsign.");
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F4F6F8] bg-light-pattern">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 mb-6 border-b border-[#E2E8F0]">
          <div className="w-9 h-9 rounded-xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#17212B]">
              Analyst Registration
            </h2>
            <p className="text-xs text-[#64748B]">
              Enter your callsign for tournament score tracking
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-2">
              Gamer Tag / Callsign (Max 16 characters)
            </label>
            <input
              type="text"
              autoFocus
              maxLength={16}
              value={tag}
              onChange={(e) => {
                setTag(e.target.value.replace(/[^a-zA-Z0-9_\- ]/g, ""));
                if (error) setError(null);
              }}
              placeholder="e.g. Sentinel_42"
              className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#CBD5E1] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] focus:outline-none rounded-xl text-[#17212B] font-mono text-sm tracking-wide placeholder:text-[#94A3B8] transition-colors"
            />
            {error && (
              <div className="flex items-center space-x-1.5 text-xs text-[#DC2626] mt-2">
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
              className="w-full sm:w-1/3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] hover:border-[#94A3B8] text-xs font-semibold text-[#475569] hover:text-[#17212B] transition-colors cursor-pointer"
            >
              Back
            </button>

            <button
              disabled={isSubmitting || !tag.trim()}
              type="submit"
              className="w-full sm:w-2/3 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
            >
              <span>Confirm Callsign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
          Scores are saved locally to this laptop tournament station.
        </div>
      </motion.div>
    </div>
  );
};
