"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhishingChallengeSet, EmailCardData } from "@/types/game";
import { EmailCard } from "./EmailCard";
import { ShieldCheck, ShieldAlert, Info, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface PhishingMissionProps {
  challengeSet: PhishingChallengeSet;
  onCorrect: (scoreEarned: number, livesLost: number) => void;
  onWrong: () => void;
  lives: number;
}

export const PhishingMission: React.FC<PhishingMissionProps> = ({
  challengeSet,
  onCorrect,
  onWrong,
  lives,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [solvedPhishingEmail, setSolvedPhishingEmail] = useState<EmailCardData | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);

  const handleCardClick = (email: EmailCardData) => {
    if (missionComplete || wrongCardIds.includes(email.id)) return;

    setSelectedCardId(email.id);

    if (email.isPhishing) {
      sound.playCorrect();
      setSolvedPhishingEmail(email);
      setMissionComplete(true);
      setShowExplanation(true);
      const bonus = wrongCardIds.length === 0 ? 100 : 0;
      onCorrect(400 + bonus, wrongCardIds.length);
    } else {
      sound.playIncorrect();
      setWrongCardIds((prev) => [...prev, email.id]);
      onWrong();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow select-none">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#35264D] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
            <span>MISSION 01 — THREAT VECTOR ANALYSIS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#F8FAFC] tracking-wider uppercase">
            {challengeSet.scenarioTitle}
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#CBD5E1] bg-[#171127] px-4 py-2 rounded-xl border border-[#35264D] self-start sm:self-auto shadow-inner">
          <Info className="w-4 h-4 text-[#00E5FF] shrink-0" />
          <span>Inspect 4 intercepted transmissions. Isolate the single malicious attack.</span>
        </div>
      </div>

      {/* 2-Column by 2-Row Grid for Maximum Horizontal Readability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {challengeSet.emails.map((email) => {
          const isWrong = wrongCardIds.includes(email.id);
          const isRight = missionComplete && email.isPhishing;
          const status = isRight ? "correct" : isWrong ? "incorrect" : "idle";

          return (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedCardId === email.id}
              status={status}
              disabled={missionComplete || lives <= 0}
              onSelect={() => handleCardClick(email)}
            />
          );
        })}
      </div>

      {/* Cyberpunk Threat Neutralized Breakdown Box */}
      <AnimatePresence>
        {showExplanation && solvedPhishingEmail && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full bg-[#171127] border border-[#39FF88]/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(57,255,136,0.25)] mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-[#39FF88]/15 text-[#39FF88] shrink-0 mt-0.5 border border-[#39FF88]/40 shadow-[0_0_15px_rgba(57,255,136,0.3)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#39FF88] uppercase tracking-wider">
                    THREAT VECTOR NEUTRALIZED
                  </span>
                  <span className="bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/40 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                    +{wrongCardIds.length === 0 ? "500 (+100 FLAWLESS BONUS)" : "400"} PTS
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC] mb-1 uppercase tracking-wide">
                  {solvedPhishingEmail.phishingType || "Deceptive Attack Vector"}
                </h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-4xl font-sans">
                  {solvedPhishingEmail.explanation}
                </p>
                <div className="text-xs font-mono font-semibold text-[#00E5FF] mt-3 flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Advancing to Mission 02: Outlier Hunt in 2 seconds...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
