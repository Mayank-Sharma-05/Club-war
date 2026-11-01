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
    missedCount: number;
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

    const missedCount = Math.max(0, dataset.targetOutlierCount - correctCount);
    const allFound = correctCount === dataset.targetOutlierCount && incorrectCount === 0;

    // Starting score: 100 points
    // Deduct 20 points for every incorrectly selected value
    // Deduct 20 points for every actual outlier missed
    // Minimum 0 points
    const finalScore = Math.max(0, 100 - (incorrectCount * 20) - (missedCount * 20));

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
      missedCount,
      score: finalScore,
      allFound,
    });
    setIsEvaluated(true);

    onSubmit(finalScore, correctCount, incorrectCount);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-36 flex flex-col flex-grow">
      {/* Mission Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-700 mb-1">
            <BarChart2 className="w-4 h-4 text-indigo-700" />
            <span>Mission 02 — Telemetry Anomaly (Max 100 Pts)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Outlier Hunt: {dataset.title}
          </h2>
          <p className="text-sm font-sans text-slate-600 mt-1">{dataset.metricDescription}</p>
        </div>

        {/* Selection Status Badge (Does NOT reveal target anomaly count) */}
        <div className="inline-flex items-center space-x-2.5 bg-white px-4 py-2 rounded-xl border border-slate-200 self-start sm:self-auto shadow-2xs font-sans">
          <span className="text-xs font-medium text-slate-500">Selected:</span>
          <span className="text-xs font-mono font-semibold text-indigo-700">
            {selectedIndices.length} {selectedIndices.length === 1 ? "value" : "values"}
          </span>
        </div>
      </div>

      {/* Main Dataset Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-slate-100 gap-2 font-sans">
          <span className="text-sm font-semibold text-slate-900">
            Observation Samples ({dataset.unit})
          </span>
          <span className="text-xs text-slate-500">
            Examine the dataset and select the values that deviate significantly from the normal pattern.
          </span>
        </div>

        {/* Clean Numerical Observation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5 mb-6">
          {dataset.values.map((val, idx) => {
            const isSelected = selectedIndices.includes(idx);
            const isActualOutlier = dataset.outlierIndices.includes(idx);

            let borderStyle = "border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-300 hover:bg-white";

            if (isEvaluated) {
              if (isSelected && isActualOutlier) {
                borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20";
              } else if (isSelected && !isActualOutlier) {
                borderStyle = "border-rose-400 bg-rose-50 text-rose-800 ring-2 ring-rose-400/20";
              } else if (!isSelected && isActualOutlier) {
                borderStyle = "border-amber-400 bg-amber-50 text-amber-800";
              } else {
                borderStyle = "border-slate-200/60 bg-slate-50/40 text-slate-400";
              }
            } else if (isSelected) {
              borderStyle = "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-600/20";
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
                <span className="text-[11px] font-mono text-slate-400 self-start">
                  #{String(idx + 1).padStart(2, "0")}
                </span>

                {/* Primary Number Display */}
                <div className="font-mono font-bold text-xl tracking-tight my-auto">
                  {val}
                  <span className="text-xs text-slate-500 ml-1 font-normal font-sans">
                    {dataset.unit}
                  </span>
                </div>

                {/* Feedback Marker */}
                {isEvaluated && (
                  <div className="absolute top-2 right-2">
                    {isSelected && isActualOutlier && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    {isSelected && !isActualOutlier && (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    {!isSelected && isActualOutlier && (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Row */}
        {!isEvaluated ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-sans">
              <Info className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Select all abnormal data points (-20 per incorrect selection, -20 per missed anomaly).</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedIndices.length === 0}
              className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-medium text-xs flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs hover:shadow"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full bg-white border rounded-2xl p-6 shadow-sm ${
              evaluationResult.allFound
                ? "border-emerald-300"
                : "border-indigo-300"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2.5 mb-1.5 flex-wrap gap-y-1">
                  <span className="text-xs font-semibold text-indigo-700">
                    Telemetry Analysis Complete
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
                      evaluationResult.score > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    +{evaluationResult.score} / 100 pts
                  </span>
                  {evaluationResult.incorrectCount > 0 && (
                    <span className="text-xs text-rose-600 font-sans">
                      (-{evaluationResult.incorrectCount * 20} for {evaluationResult.incorrectCount} false positive{evaluationResult.incorrectCount > 1 ? "s" : ""})
                    </span>
                  )}
                  {evaluationResult.missedCount > 0 && (
                    <span className="text-xs text-amber-700 font-sans">
                      (-{evaluationResult.missedCount * 20} for {evaluationResult.missedCount} missed anomaly)
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-4xl">
                  {dataset.explanation}
                </p>
                <div className="text-xs font-medium text-teal-700 mt-3 font-sans">
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
