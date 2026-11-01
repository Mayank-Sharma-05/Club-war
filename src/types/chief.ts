export type ChiefEmotion =
  | "idle"
  | "speaking"
  | "happy"
  | "impressed"
  | "sarcastic"
  | "disappointed"
  | "celebrating"
  | "warning";

export type ChiefEventType =
  | "game_start"
  | "phishing_correct"
  | "phishing_flawless"
  | "phishing_wrong"
  | "phishing_life_lost"
  | "outlier_all_correct"
  | "outlier_partial"
  | "outlier_wrong"
  | "code_multiple_greens"
  | "code_no_match"
  | "code_last_attempt"
  | "code_unlocked"
  | "code_failed"
  | "combo_streak"
  | "timer_warning_60"
  | "timer_critical_30"
  | "game_victory"
  | "game_over_time"
  | "game_over_lives"
  | "high_score_achieved"
  | "comeback";

export interface ChiefDialogue {
  id: string;
  text: string;
  emotion: ChiefEmotion;
  priority: number; // Higher number = higher priority
}

export interface ChiefSettings {
  voiceEnabled: boolean;
  volume: number; // 0.0 to 1.0
  rate: number; // 0.8 to 1.3
}
