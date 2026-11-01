import { PerformanceClassification } from "@/types/game";

export function getComboMultiplier(streak: number): number {
  if (streak >= 5) return 2.0;
  if (streak >= 3) return 1.5;
  if (streak >= 2) return 1.25;
  return 1.0;
}

export function calculateClassification(score: number): PerformanceClassification {
  if (score >= 1550) return "LEGENDARY DEFENDER";
  if (score >= 1200) return "ELITE HACKER";
  if (score >= 800) return "SECURITY SPECIALIST";
  if (score >= 400) return "CYBER EXPLORER";
  return "ROOKIE ANALYST";
}

export function formatTime(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
