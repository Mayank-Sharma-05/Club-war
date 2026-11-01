import { Achievement, MissionResults } from "@/types/game";

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "phishing-expert",
    title: "PHISHING EXPERT",
    description: "Identified the phishing attack on the first try without losing any lives.",
    iconName: "ShieldCheck",
    unlocked: false,
  },
  {
    id: "data-detective",
    title: "DATA DETECTIVE",
    description: "Identified all dataset anomalies with zero false positives.",
    iconName: "Binary",
    unlocked: false,
  },
  {
    id: "code-breaker",
    title: "CODE BREAKER",
    description: "Cracked the 4-digit digital security vault in 1 or 2 attempts.",
    iconName: "KeyRound",
    unlocked: false,
  },
  {
    id: "perfect-run",
    title: "PERFECT RUN",
    description: "Finished all 3 missions with all 3 lives intact and cracked the digital vault.",
    iconName: "Award",
    unlocked: false,
  },
  {
    id: "elite-hacker",
    title: "ELITE HACKER",
    description: "Achieved an elite final performance score of 1200 points or higher.",
    iconName: "Cpu",
    unlocked: false,
  },
];

export function evaluateAchievements(
  results: MissionResults,
  totalScore: number,
  remainingLives: number
): Achievement[] {
  return ALL_ACHIEVEMENTS.map((ach) => {
    let unlocked = false;

    if (ach.id === "phishing-expert") {
      unlocked = results.mission1.completed && results.mission1.livesLost === 0;
    } else if (ach.id === "data-detective") {
      unlocked =
        results.mission2.completed &&
        results.mission2.incorrectSelected === 0 &&
        results.mission2.correctOutliersFound > 0;
    } else if (ach.id === "code-breaker") {
      unlocked = results.mission3.unlocked && results.mission3.attemptsUsed <= 2;
    } else if (ach.id === "perfect-run") {
      unlocked =
        results.mission1.completed &&
        results.mission2.completed &&
        results.mission3.unlocked &&
        remainingLives === 3;
    } else if (ach.id === "elite-hacker") {
      unlocked = totalScore >= 1200;
    }

    return {
      ...ach,
      unlocked,
    };
  });
}
