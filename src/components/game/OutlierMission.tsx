"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutlierDataset } from "@/types/game";
import { BarChart2, CheckCircle2, XCircle, AlertCircle, Sparkles, Send } from "lucide-react";
import { sound } from "@/lib/sound-engine";

interface OutlierMissionProps {
  dataset: OutlierDataset;
  onSubmit: (scoreEarned: number, correctCount: number, incorrectCount: number) => void;
}

export const OutlierMission: React.FC<OutlierMissionProps> = ({
  dataset,
  onSubmit,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    correctCount: number;
    incorrectCount: number;
    score: number;
    allFound: boolean;
  } | null>(null);

  const toggleSelect = (index: number) => {
    if (isEvaluated) return;
    sound.playClick();
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    if (isEvaluated || selectedIndices.length === 0) return;

    let correctCount = 0;
    let incorrectCount = 0;

    selectedIndices.forEach((idx) => {
      if (dataset.outlierIndices.includes(idx)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const allFound =
      correctCount === dataset.targetOutlierCount && incorrectCount === 0;

    const baseScore = correctCount * 150 - incorrectCount * 25;
    const bonus = allFound ? 100 : 0;
    const finalScore = Math.max(0, baseScore + bonus);

    if (allFound) {
      sound.playCombo();
    } else if (correctCount > 0) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    setEvaluationResult({
      correctCount,
      incorrectCount,
      score: finalScore,
      allFound,
    });
    setIsEvaluated(true);

    onSubmit(finalScore, correctCount, incorrectCount);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow select-none">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#35264D] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#A855F7] uppercase tracking-wider mb-1">
            <BarChart2 className="w-4 h-4 text-[#A855F7]" />
            <span>MISSION 02 — TELEMETRY ANOMALY DETECTION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#F8FAFC] tracking-wider uppercase">
            {dataset.title}
          </h2>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">{dataset.metricDescription}</p>
        </div>

        {/* Selection Status Badge (Does NOT reveal target anomaly count) */}
        <div className="inline-flex items-center space-x-2.5 bg-[#171127] px-4 py-2 rounded-xl border border-[#A855F7]/40 self-start sm:self-auto shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <span className="text-xs font-mono text-[#94A3B8] uppercase">Selected:</span>
          <span className="text-sm font-digital font-bold text-[#A855F7]">
            {selectedIndices.length} {selectedIndices.length === 1 ? "VAL" : "VALS"}
          </span>
        </div>
      </div>

      {/* Main Dataset Card */}
      <div className="bg-[#171127] border border-[#35264D] rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.6)] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-[#35264D] gap-2">
          <span className="text-sm font-display font-bold uppercase tracking-wider text-[#00E5FF]">
            TELEMETRY SENSOR SAMPLES ({dataset.unit})
          </span>
          <span className="text-xs font-mono text-[#94A3B8]">
            Identify observations deviating from baseline distribution.
          </span>
        </div>

        {/* Cyberpunk Numerical Observation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5 mb-6">
          {dataset.values.map((val, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const isActualOutlier = dataset.outlierIndices.includes(idx);

            let borderStyle = "border-[#35264D] bg-[#100B1D] text-[#CBD5E1] hover:border-[#A855F7]/60 hover:text-white";

            if (isEvaluated) {
              if (isSelected && isActualOutlier) {
                borderStyle = "border-[#39FF88] bg-[#39FF88]/20 text-[#39FF88] shadow-[0_0_15px_rgba(57,255,136,0.3)]";
              } else if (isSelected && !isActualOutlier) {
                borderStyle = "border-[#FF365D] bg-[#FF365D]/20 text-[#FF365D] shadow-[0_0_15px_rgba(255,54,93,0.3)]";
              } else if (!isSelected && isActualOutlier) {
                borderStyle = "border-[#FFD43B] bg-[#FFD43B]/15 text-[#FFD43B]";
              } else {
                borderStyle = "border-[#35264D]/40 bg-[#100B1D]/40 text-[#64748B]";
              }
            } else if (isSelected) {
              borderStyle = "border-[#A855F7] bg-[#A855F7]/20 text-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-1 ring-[#A855F7]";
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleSelect(idx)}
                disabled={isEvaluated}
                className={`relative flex flex-col items-center justify-between p-4 rounded-xl border transition-all cursor-pointer h-24 ${borderStyle}`}
              >
                {/* Observation label */}
                <span className="text-[10px] font-mono text-[#64748B] self-start">
                  #{String(idx + 1).padStart(2, "0")}
                </span>

                {/* Primary Number Display */}
                <div className="font-digital font-bold text-xl tracking-wider my-auto">
                  {val}
                  <span className="text-[10px] text-[#94A3B8] ml-1 font-mono font-normal">
                    {dataset.unit}
                  </span>
                </div>

                {/* Feedback Marker */}
                {isEvaluated && (
                  <div className="absolute top-2 right-2">
                    {isSelected && isActualOutlier && (
                      <CheckCircle2 className="w-4 h-4 text-[#39FF88]" />
                    )}
                    {isSelected && !isActualOutlier && (
                      <XCircle className="w-4 h-4 text-[#FF365D]" />
                    )}
                    {!isSelected && isActualOutlier && (
                      <AlertCircle className="w-4 h-4 text-[#FFD43B]" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!isEvaluated ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            disabled={selectedIndices.length === 0}
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#00E5FF] hover:from-[#A855F7]/90 hover:to-[#00E5FF]/90 text-[#080611] font-display font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          >
            <Send className="w-4 h-4" />
            <span>SUBMIT ANOMALY IDENTIFICATION ({selectedIndices.length})</span>
          </motion.button>
        ) : (
          <div className="text-center py-2 text-xs font-mono text-[#00E5FF] flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#00E5FF] animate-spin" style={{ animationDuration: '4s' }} />
            <span>Telemetry calibrated. Transitioning to Mission 03 in 2 seconds...</span>
          </div>
        )}
      </div>

      {/* Anomaly Breakdown Report */}
      <AnimatePresence>
        {isEvaluated && evaluationResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`w-full rounded-2xl p-6 border shadow-[0_0_30px_rgba(0,0,0,0.8)] mb-6 ${
              evaluationResult.allFound
                ? "bg-[#171127] border-[#39FF88]/50 shadow-[0_0_25px_rgba(57,255,136,0.2)]"
                : "bg-[#171127] border-[#35264D]"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#35264D] gap-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    evaluationResult.allFound
                      ? "bg-[#39FF88]/20 text-[#39FF88] border-[#39FF88]/40"
                      : "bg-[#A855F7]/20 text-[#A855F7] border-[#A855F7]/40"
                  }`}
                >
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#F8FAFC] uppercase tracking-wide">
                    {evaluationResult.allFound
                      ? "PERFECT ANOMALY ISOLATION"
                      : "TELEMETRY SCAN COMPLETE"}
                  </h3>
                  <div className="text-xs font-mono text-[#94A3B8]">
                    Score Earned:{" "}
                    <span className="font-bold text-[#39FF88]">
                      +{evaluationResult.score} PTS
                    </span>
                    {evaluationResult.allFound && " (Includes +100 Clean Bonus)"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/40">
                  {evaluationResult.correctCount} Correct
                </span>
                {evaluationResult.incorrectCount > 0 && (
                  <span className="px-2.5 py-1 rounded bg-[#FF365D]/20 text-[#FF365D] border border-[#FF365D]/40">
                    {evaluationResult.incorrectCount} False Alarm
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs font-mono text-[#CBD5E1] leading-relaxed">
              {dataset.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
