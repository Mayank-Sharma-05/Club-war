"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutlierDataset } from "@/types/game";
import { BarChart2, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#4F46E5] uppercase tracking-wider mb-1">
            <BarChart2 className="w-4 h-4 text-[#4F46E5]" />
            <span>Mission 02 — Layer 2 Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] tracking-tight">
            Outlier Hunt: {dataset.title}
          </h2>
          <p className="text-sm text-[#475569] mt-1">{dataset.metricDescription}</p>
        </div>

        {/* Selection Status Badge (Does NOT reveal target anomaly count) */}
        <div className="inline-flex items-center space-x-2.5 bg-[#FFFFFF] px-4 py-2 rounded-xl border border-[#E2E8F0] self-start sm:self-auto shadow-xs">
          <span className="text-xs font-medium text-[#64748B]">Selected:</span>
          <span className="text-xs font-mono font-bold text-[#4F46E5]">
            {selectedIndices.length} {selectedIndices.length === 1 ? "value" : "values"}
          </span>
        </div>
      </div>

      {/* Main Dataset Card */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-[#E2E8F0] gap-2">
          <span className="text-sm font-semibold text-[#17212B]">
            Observation Samples ({dataset.unit})
          </span>
          <span className="text-xs text-[#64748B] font-medium">
            Examine the dataset and select the values that deviate significantly from the normal pattern.
          </span>
        </div>

        {/* Clean Numerical Observation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5 mb-6">
          {dataset.values.map((val, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const isActualOutlier = dataset.outlierIndices.includes(idx);

            let borderStyle = "border-[#E2E8F0] bg-[#F8FAFC] text-[#17212B] hover:border-[#CBD5E1] hover:bg-[#FFFFFF]";

            if (isEvaluated) {
              if (isSelected && isActualOutlier) {
                borderStyle = "border-[#15803D] bg-[#DCFCE7] text-[#15803D] ring-2 ring-[#15803D]/20";
              } else if (isSelected && !isActualOutlier) {
                borderStyle = "border-[#DC2626] bg-[#FEE2E2] text-[#DC2626] ring-2 ring-[#DC2626]/20";
              } else if (!isSelected && isActualOutlier) {
                borderStyle = "border-[#D97706] bg-[#FEF3C7] text-[#D97706]";
              } else {
                borderStyle = "border-[#E2E8F0]/60 bg-[#F8FAFC]/50 text-[#94A3B8]";
              }
            } else if (isSelected) {
              borderStyle = "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] ring-2 ring-[#4F46E5]/20";
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
                <span className="text-[11px] font-mono text-[#64748B] self-start">
                  #{String(idx + 1).padStart(2, "0")}
                </span>

                {/* Primary Number Display */}
                <div className="font-mono font-bold text-xl tracking-tight my-auto">
                  {val}
                  <span className="text-xs text-[#64748B] ml-1 font-normal">
                    {dataset.unit}
                  </span>
                </div>

                {/* Feedback Marker */}
                {isEvaluated && (
                  <div className="absolute top-2 right-2">
                    {isSelected && isActualOutlier && (
                      <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    )}
                    {isSelected && !isActualOutlier && (
                      <XCircle className="w-4 h-4 text-[#DC2626]" />
                    )}
                    {!isSelected && isActualOutlier && (
                      <AlertCircle className="w-4 h-4 text-[#D97706]" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Row */}
        {!isEvaluated ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center space-x-2 text-xs text-[#64748B]">
              <Info className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>Analyze the observations and select the values that deviate significantly from the baseline.</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedIndices.length === 0}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-[#FFFFFF] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
            >
              <span>Submit Analysis</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Educational Feedback Box */}
      <AnimatePresence>
        {isEvaluated && evaluationResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full bg-[#FFFFFF] border rounded-2xl p-6 shadow-sm ${
              evaluationResult.allFound
                ? "border-[#15803D]/40"
                : "border-[#4F46E5]/40"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-[#EEF2FF] text-[#4F46E5] shrink-0 mt-0.5">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                    Telemetry Analysis Complete
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                      evaluationResult.score > 0
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-[#FEE2E2] text-[#DC2626]"
                    }`}
                  >
                    +{evaluationResult.score} Pts
                  </span>
                  {evaluationResult.allFound && (
                    <span className="bg-[#DCFCE7] text-[#15803D] px-2.5 py-0.5 rounded text-xs font-mono font-semibold">
                      All Outliers Identified (+100 Bonus)
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#475569] leading-relaxed max-w-4xl">
                  {dataset.explanation}
                </p>
                <div className="text-xs font-medium text-[#0F766E] mt-3">
                  Advancing to Mission 03: Crack the Code in 2 seconds...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
