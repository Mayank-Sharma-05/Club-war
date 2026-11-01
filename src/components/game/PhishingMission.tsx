"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhishingChallengeSet, EmailCardData } from "@/types/game";
import { EmailCard } from "./EmailCard";
import { ShieldCheck, ShieldAlert, ArrowRight, Info } from "lucide-react";
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#263244] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#22D3EE] uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-[#22D3EE]" />
            <span>Mission 01 — Layer 1 Defense</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F1F5F9] tracking-tight">
            Phishing Hunt: {challengeSet.scenarioTitle}
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 text-xs text-[#A1AEC0] bg-[#111827] px-3.5 py-2 rounded-xl border border-[#263244] self-start sm:self-auto">
          <Info className="w-4 h-4 text-[#22D3EE] shrink-0" />
          <span>Read all 4 emails. Flag the single deceptive phishing attack.</span>
        </div>
      </div>

      {/* 4 Email Cards Grid: responsive 4 columns on large screens, 2 on laptop/medium screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Educational Explanation Box */}
      <AnimatePresence>
        {showExplanation && solvedPhishingEmail && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full bg-[#111827] border border-[#22C55E]/40 rounded-xl p-5 sm:p-6 shadow-lg mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2.5 rounded-lg bg-[#22C55E]/15 text-[#22C55E] shrink-0 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1">
                  <span className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
                    Threat Neutralized
                  </span>
                  <span className="bg-[#22C55E]/15 text-[#22C55E] px-2 py-0.5 rounded text-xs font-mono font-medium">
                    +{wrongCardIds.length === 0 ? "500 (+100 Flawless Bonus)" : "400"} Pts
                  </span>
                </div>
                <h3 className="font-semibold text-base text-[#F1F5F9] mb-1">
                  {solvedPhishingEmail.phishingType || "Attack Analysis"}
                </h3>
                <p className="text-sm text-[#A1AEC0] leading-relaxed max-w-4xl">
                  {solvedPhishingEmail.explanation}
                </p>
                <div className="text-xs text-[#718096] mt-2 flex items-center space-x-1">
                  <span>Advancing to Mission 02: Outlier Hunt...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
