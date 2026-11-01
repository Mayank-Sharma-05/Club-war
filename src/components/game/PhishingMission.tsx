"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhishingChallengeSet, EmailCardData } from "@/types/game";
import { EmailCard } from "./EmailCard";
import { ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
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

  const initialLivesLost = wrongCardIds.length;

  const handleCardClick = (email: EmailCardData) => {
    if (missionComplete || wrongCardIds.includes(email.id)) return;

    setSelectedCardId(email.id);

    if (email.isPhishing) {
      // Correct!
      sound.playCorrect();
      setSolvedPhishingEmail(email);
      setMissionComplete(true);
      setShowExplanation(true);
      // Calculate score: 400 base + 100 if no lives were lost
      const bonus = wrongCardIds.length === 0 ? 100 : 0;
      onCorrect(400 + bonus, wrongCardIds.length);
    } else {
      // Incorrect!
      sound.playIncorrect();
      setWrongCardIds((prev) => [...prev, email.id]);
      onWrong();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-[#1E293B] gap-2">
        <div>
          <div className="flex items-center space-x-2 text-xs font-cyber text-[#00E5FF] tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-[#FF334F]" />
            <span>MISSION 01 OF 03 // LAYER 1: CYBERSECURITY PERIMETER</span>
          </div>
          <h2 className="font-cyber font-extrabold text-lg sm:text-2xl text-[#F8FAFC]">
            PHISHING HUNT: {challengeSet.scenarioTitle}
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8] bg-[#101827] px-3.5 py-1.5 rounded-lg border border-[#1E293B]">
          <span className="text-[#00E5FF] font-bold">TASK:</span>
          <span>Carefully analyze all 4 emails. Exactly 1 is malicious.</span>
        </div>
      </div>

      {/* 4 Email Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow mb-6">
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

      {/* Educational Explanation Drawer / Modal */}
      <AnimatePresence>
        {showExplanation && solvedPhishingEmail && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full bg-[#111C2E] border border-[#00E676]/60 rounded-2xl p-5 md:p-6 shadow-2xl glow-green relative z-30"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-[#00E676]/20 text-[#00E676] shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-cyber font-bold text-[#00E676] tracking-wider uppercase">
                      THREAT INTERCEPTED // LAYER 1 RESTORED
                    </span>
                    <span className="bg-[#00E676]/20 text-[#00E676] px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                      +{wrongCardIds.length === 0 ? "500 (FLAWLESS +100)" : "400"} PTS
                    </span>
                  </div>
                  <h3 className="font-cyber font-bold text-base sm:text-lg text-[#F8FAFC] mt-0.5 mb-1">
                    {solvedPhishingEmail.phishingType || "Phishing Vector Neutralized"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
                    {solvedPhishingEmail.explanation}
                  </p>
                </div>
              </div>

              {/* Continue button */}
              <button
                type="button"
                id="proceed-to-mission-2"
                className="hidden"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
