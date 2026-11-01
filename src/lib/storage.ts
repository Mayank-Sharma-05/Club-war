import { LeaderboardEntry, GameSettings } from "@/types/game";

const LEADERBOARD_KEY = "databreach_leaderboard_v1";
const SETTINGS_KEY = "databreach_settings_v1";

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  operatorPin: "1337",
};

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score; // Higher score first
        }
        return a.completionTimeSeconds - b.completionTimeSeconds; // Faster time first
      });
    }
  } catch (err) {
    console.error("Failed to read leaderboard from localStorage", err);
  }
  return [];
}

export function saveLeaderboardEntry(entry: LeaderboardEntry): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getLeaderboard();
    // Prevent accidental duplicate submission with identical ID
    if (current.some((e) => e.id === entry.id)) {
      return false;
    }
    const updated = [...current, entry];
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to save entry to leaderboard", err);
    return false;
  }
}

export function resetLeaderboard(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
    return true;
  } catch (err) {
    console.error("Failed to reset leaderboard", err);
    return false;
  }
}

export function getGameSettings(): GameSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveGameSettings(settings: Partial<GameSettings>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getGameSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save settings", err);
  }
}

export function exportLeaderboardCSV(entries: LeaderboardEntry[]): void {
  if (typeof window === "undefined" || entries.length === 0) return;

  const headers = [
    "Rank",
    "Gamer Tag",
    "Score",
    "Completion Time (s)",
    "Accuracy (%)",
    "Missions Completed",
    "Classification",
    "Badges",
    "Date & Time",
    "Session ID",
  ];

  const rows = entries.map((e, idx) => [
    (idx + 1).toString(),
    `"${e.gamerTag.replace(/"/g, '""')}"`,
    e.score.toString(),
    e.completionTimeSeconds.toString(),
    `${e.accuracy}%`,
    `${e.missionsCompleted}/3`,
    `"${e.classification}"`,
    `"${(e.badges || []).join("; ")}"`,
    `"${e.date}"`,
    `"${e.id}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `databreach_leaderboard_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
