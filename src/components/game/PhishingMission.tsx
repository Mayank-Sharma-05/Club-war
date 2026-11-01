"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhishingChallengeSet, EmailCardData } from "@/types/game";
import { EmailCard } from "./EmailCard";
import { ShieldCheck, ShieldAlert, Info } from "lucide-react";
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
      const bonus = wrongCardIds.length === 0 ? 50 : 0;
      onCorrect(150 + bonus, wrongCardIds.length);
    } else {
      sound.playIncorrect();
      setWrongCardIds((prev) => [...prev, email.id]);
      onWrong();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-700 mb-1">
            <ShieldAlert className="w-4 h-4 text-teal-700" />
            <span>Mission 01 — Email Defense</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Phishing Hunt: {challengeSet.scenarioTitle}
          </h2>
        </div>

        <div className="inline-flex items-center space-x-2 text-xs text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start sm:self-auto shadow-2xs font-sans">
          <Info className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Read all 4 emails. Identify and flag the deceptive phishing attack.</span>
        </div>
      </div>

      {/* 2-Column by 2-Row Grid for Email Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {challengeSet.emails.map((email, idx) => {
          const isWrong = wrongCardIds.includes(email.id);
          const isRight = missionComplete && email.isPhishing;
          const status = isRight ? "correct" : isWrong ? "incorrect" : "idle";

          return (
            <EmailCard
              key={email.id}
              index={idx}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-full bg-white border border-emerald-300 rounded-2xl p-6 shadow-sm mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5 border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <span className="text-xs font-semibold text-emerald-700">
                    Threat Neutralized
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-xs font-mono font-medium">
                    +{wrongCardIds.length === 0 ? "200 (+50 Flawless Bonus)" : "150"} pts
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1">
                  {solvedPhishingEmail.phishingType || "Attack Analysis"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-4xl">
                  {solvedPhishingEmail.explanation}
                </p>
                <div className="text-xs font-medium text-teal-700 mt-3 font-sans">
                  Advancing to Mission 02: Outlier Hunt in 2 seconds...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
