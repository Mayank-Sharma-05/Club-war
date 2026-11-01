export type GameScreen =
  | "landing"
  | "registration"
  | "briefing"
  | "mission-1"
  | "mission-2"
  | "mission-3"
  | "results"
  | "leaderboard"
  | "game-over";

export type MissionId = "mission-1" | "mission-2" | "mission-3";

export interface EmailCardData {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  date: string;
  body: string;
  linkOrAttachment?: {
    type: "link" | "attachment";
    text?: string;
    url?: string;
    fileName?: string;
    fileSize?: string;
  };
  isPhishing: boolean;
  phishingType?: string;
  explanation: string;
}

export interface PhishingChallengeSet {
  id: string;
  scenarioTitle: string;
  emails: EmailCardData[];
}

export interface OutlierDataset {
  id: string;
  title: string;
  unit: string;
  metricDescription: string;
  values: number[];
  outlierIndices: number[];
  targetOutlierCount: number;
  explanation: string;
}

export type CodeFeedbackType = "green" | "yellow" | "red";

export interface GuessRecord {
  guess: string;
  feedback: CodeFeedbackType[];
}

export interface MissionResults {
  mission1: {
    completed: boolean;
    livesLost: number;
    score: number;
    selectedEmailId: string | null;
  };
  mission2: {
    completed: boolean;
    correctOutliersFound: number;
    incorrectSelected: number;
    score: number;
  };
  mission3: {
    completed: boolean;
    attemptsUsed: number;
    score: number;
    unlocked: boolean;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  id: string;
  gamerTag: string;
  score: number;
  completionTimeSeconds: number;
  accuracy: number;
  missionsCompleted: number;
  date: string;
  badges: string[];
  classification: string;
}

export type PerformanceClassification =
  | "ROOKIE ANALYST"
  | "CYBER EXPLORER"
  | "SECURITY SPECIALIST"
  | "ELITE HACKER"
  | "LEGENDARY DEFENDER";

export interface GameSettings {
  soundEnabled: boolean;
  operatorPin: string;
}
