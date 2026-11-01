"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutlierDataset } from "@/types/game";
import { BarChart2, CheckCircle2, XCircle, AlertCircle, Sparkles, Info } from "lucide-react";
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#263244] gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">
            <BarChart2 className="w-4 h-4 text-[#A78BFA]" />
            <span>Mission 02 — Layer 2 Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F1F5F9] tracking-tight">
            Outlier Hunt: {dataset.title}
          </h2>
          <p className="text-sm text-[#A1AEC0] mt-1">{dataset.metricDescription}</p>
        </div>

        {/* Selection Status Badge */}
        <div className="inline-flex items-center space-x-2.5 bg-[#111827] px-4 py-2.5 rounded-xl border border-[#263244] self-start sm:self-auto">
          <span className="text-xs text-[#718096]">Selected:</span>
          <span className="text-xs font-mono font-semibold text-[#A78BFA]">
            {selectedIndices.length} / {dataset.targetOutlierCount} Anomalies
          </span>
        </div>
      </div>

      {/* Main Dataset Card */}
      <div className="bg-[#111827] border border-[#263244] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#263244]">
          <span className="text-xs font-medium text-[#A1AEC0]">
            Numerical Observations Stream ({dataset.unit})
          </span>
          <span className="text-xs text-[#718096]">
            Target: Identify {dataset.targetOutlierCount} statistical outliers
          </span>
        </div>

        {/* Numerical Observations Grid: 6 columns on desktop, 4 on tablet, 2 on small screens */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
          {dataset.values.map((val, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const isActualOutlier = dataset.outlierIndices.includes(idx);

            let borderStyle = "border-[#263244] bg-[#151F2E] text-[#F1F5F9] hover:border-[#334155]";

            if (isEvaluated) {
              if (isSelected && isActualOutlier) {
                borderStyle = "border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E]";
              } else if (isSelected && !isActualOutlier) {
                borderStyle = "border-[#EF4444] bg-[#EF4444]/15 text-[#EF4444]";
              } else if (!isSelected && isActualOutlier) {
                borderStyle = "border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]";
              } else {
                borderStyle = "border-[#263244]/40 bg-[#151F2E]/30 text-[#718096]/50";
              }
            } else if (isSelected) {
              borderStyle = "border-[#A78BFA] bg-[#A78BFA]/15 text-[#F1F5F9]";
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
                <span className="text-[11px] font-mono text-[#718096] self-start">
                  #{String(idx + 1).padStart(2, "0")}
                </span>

                {/* Primary Number Display */}
                <div className="font-mono font-semibold text-xl tracking-tight my-auto">
                  {val}
                  <span className="text-xs text-[#718096] ml-1 font-normal">
                    {dataset.unit}
                  </span>
                </div>

                {/* Feedback Marker */}
                {isEvaluated && (
                  <div className="absolute top-2 right-2">
                    {isSelected && isActualOutlier && (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    )}
                    {isSelected && !isActualOutlier && (
                      <XCircle className="w-4 h-4 text-[#EF4444]" />
                    )}
                    {!isSelected && isActualOutlier && (
                      <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Row */}
        {!isEvaluated ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#263244]">
            <div className="flex items-center space-x-2 text-xs text-[#718096]">
              <Info className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <span>Select {dataset.targetOutlierCount} anomalous values that deviate from the normal distribution.</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedIndices.length === 0}
              className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#A78BFA] hover:bg-[#A78BFA]/90 text-[#090D14] font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
            className={`w-full bg-[#111827] border rounded-xl p-5 sm:p-6 shadow-lg ${
              evaluationResult.allFound
                ? "border-[#22C55E]/40"
                : "border-[#A78BFA]/40"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2.5 rounded-lg bg-[#A78BFA]/15 text-[#A78BFA] shrink-0 mt-0.5">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1">
                  <span className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
                    Telemetry Analysis Complete
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
                      evaluationResult.score > 0
                        ? "bg-[#22C55E]/15 text-[#22C55E]"
                        : "bg-[#EF4444]/15 text-[#EF4444]"
                    }`}
                  >
                    +{evaluationResult.score} Pts
                  </span>
                  {evaluationResult.allFound && (
                    <span className="bg-[#22C55E]/15 text-[#22C55E] px-2 py-0.5 rounded text-xs font-mono font-medium">
                      All Outliers Found (+100 Bonus)
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#A1AEC0] leading-relaxed max-w-4xl">
                  {dataset.explanation}
                </p>
                <div className="text-xs text-[#718096] mt-2">
                  Advancing to Mission 03: Crack the Code...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
