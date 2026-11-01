"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutlierDataset } from "@/types/game";
import { Database, CheckCircle2, XCircle, AlertCircle, Sparkles, BarChart3 } from "lucide-react";
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

    // Scoring: +150 per correct, -25 per incorrect, +100 bonus for finding all outliers
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

  // Find max value in dataset for mini bar chart visualization height
  const maxValue = Math.max(...dataset.values);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-6 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-[#1E293B] gap-2">
        <div>
          <div className="flex items-center space-x-2 text-xs font-cyber text-[#A855F7] tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>MISSION 02 OF 03 // LAYER 2: DATA SCIENCE TELEMETRY</span>
          </div>
          <h2 className="font-cyber font-extrabold text-lg sm:text-2xl text-[#F8FAFC]">
            OUTLIER HUNT: {dataset.title}
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">{dataset.metricDescription}</p>
        </div>

        {/* Target Badge */}
        <div className="flex items-center space-x-3 bg-[#101827] px-4 py-2 rounded-xl border border-[#1E293B]">
          <div className="text-right">
            <div className="text-[10px] font-cyber text-[#94A3B8]">TARGET ANOMALIES</div>
            <div className="text-xs font-mono font-bold text-[#A855F7]">
              {selectedIndices.length} / {dataset.targetOutlierCount} SELECTED
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Observations Grid & Chart */}
      <div className="bg-[#111C2E]/80 border border-[#1E293B] rounded-2xl p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
            <BarChart3 className="w-4 h-4 text-[#00E5FF]" />
            <span>SAMPLE OBSERVATIONS ({dataset.unit})</span>
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Select the values that deviate abnormally from the normal distribution
          </span>
        </div>

        {/* Observation Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {dataset.values.map((val, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const isActualOutlier = dataset.outlierIndices.includes(idx);

            let statusColor = "border-[#1E293B] bg-[#101827]/80 text-[#F8FAFC]";

            if (isEvaluated) {
              if (isSelected && isActualOutlier) {
                // Correctly picked outlier
                statusColor = "border-[#00E676] bg-[#00E676]/20 text-[#00E676] glow-green";
              } else if (isSelected && !isActualOutlier) {
                // False positive
                statusColor = "border-[#FF334F] bg-[#FF334F]/20 text-[#FF334F] glow-red";
              } else if (!isSelected && isActualOutlier) {
                // Missed outlier
                statusColor = "border-[#F59E0B] bg-[#F59E0B]/20 text-[#F59E0B]";
              } else {
                statusColor = "border-[#1E293B]/40 bg-[#101827]/40 text-[#94A3B8]/50";
              }
            } else if (isSelected) {
              statusColor = "border-[#A855F7] bg-[#A855F7]/20 text-[#A855F7] glow-purple";
            }

            // Height for mini relative bar
            const barHeightPercent = Math.max(12, Math.round((val / maxValue) * 100));

            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={!isEvaluated ? { y: -2 } : {}}
                onClick={() => toggleSelect(idx)}
                disabled={isEvaluated}
                className={`relative flex flex-col items-center justify-between p-3 rounded-xl border transition-all cursor-pointer h-28 ${statusColor}`}
              >
                {/* Index tag */}
                <span className="text-[10px] font-mono text-[#94A3B8] self-start">
                  #{idx + 1}
                </span>

                {/* Relative visual bar */}
                <div className="w-full flex items-end justify-center h-10 my-1">
                  <div
                    className={`w-3 rounded-t-sm transition-all duration-300 ${
                      isEvaluated && isActualOutlier
                        ? "bg-[#00E676]"
                        : isEvaluated && isSelected
                        ? "bg-[#FF334F]"
                        : isSelected
                        ? "bg-[#A855F7]"
                        : "bg-[#1E293B]"
                    }`}
                    style={{ height: `${barHeightPercent}%` }}
                  />
                </div>

                {/* Number display */}
                <div className="font-mono font-bold text-base sm:text-lg">
                  {val} <span className="text-[10px] text-[#94A3B8] font-normal">{dataset.unit}</span>
                </div>

                {/* Evaluation Marker */}
                {isEvaluated && (
                  <div className="absolute -top-2 -right-2">
                    {isSelected && isActualOutlier && (
                      <CheckCircle2 className="w-5 h-5 text-[#00E676] bg-[#070B14] rounded-full" />
                    )}
                    {isSelected && !isActualOutlier && (
                      <XCircle className="w-5 h-5 text-[#FF334F] bg-[#070B14] rounded-full" />
                    )}
                    {!isSelected && isActualOutlier && (
                      <AlertCircle className="w-5 h-5 text-[#F59E0B] bg-[#070B14] rounded-full" />
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Submit or Status Action */}
        {!isEvaluated ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
            <div className="text-xs font-mono text-[#94A3B8]">
              Select exactly {dataset.targetOutlierCount} anomalous data points before submitting.
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={selectedIndices.length === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#00E5FF] text-[#070B14] font-cyber font-bold text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed glow-purple cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>SUBMIT ANALYSIS</span>
            </motion.button>
          </div>
        ) : null}
      </div>

      {/* Educational Feedback Box */}
      <AnimatePresence>
        {isEvaluated && evaluationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full bg-[#111C2E] border rounded-2xl p-5 md:p-6 shadow-2xl ${
              evaluationResult.allFound
                ? "border-[#00E676] glow-green"
                : "border-[#A855F7] glow-purple"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-cyber font-bold text-[#A855F7] uppercase tracking-wider">
                    STATISTICAL TELEMETRY DECODED
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      evaluationResult.score > 0
                        ? "bg-[#00E676]/20 text-[#00E676]"
                        : "bg-[#FF334F]/20 text-[#FF334F]"
                    }`}
                  >
                    +{evaluationResult.score} PTS
                  </span>
                  {evaluationResult.allFound && (
                    <span className="bg-[#00E676]/20 text-[#00E676] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      FLAWLESS (+100 BONUS)
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
                  {dataset.explanation}
                </p>
              </div>

              {/* Continue button */}
              <button
                type="button"
                id="proceed-to-mission-3"
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
