import { LeaderboardEntry, MissionResults } from "@/types/game";

export interface LeaderboardRow {
  id: string;
  gamer_tag: string;
  score: number;
  mission1_score?: number;
  mission2_score?: number;
  mission3_score?: number;
  mission_1_score?: number;
  mission_2_score?: number;
  mission_3_score?: number;
  completion_time_seconds: number;
  time_remaining: number;
  accuracy: number;
  missions_completed: number;
  classification: string;
  badges: string[];
  created_at: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(id?: string): boolean {
  return typeof id === "string" && UUID_REGEX.test(id);
}

/**
 * Ensures an ID is a valid RFC 4122 UUID.
 * Converts legacy string IDs (e.g. 'session-12345') to a valid UUID format.
 */
export function ensureValidUuid(id?: string): string {
  if (id && isValidUuid(id)) {
    return id;
  }
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function rowToLeaderboardEntry(row: LeaderboardRow): LeaderboardEntry {
  const timestamp = new Date(row.created_at).getTime();
  return {
    id: row.id,
    gamerTag: row.gamer_tag,
    score: row.score,
    completionTimeSeconds: row.completion_time_seconds,
    timeRemaining: row.time_remaining ?? Math.max(0, 120 - row.completion_time_seconds),
    accuracy: row.accuracy,
    missionsCompleted: row.missions_completed,
    classification: row.classification,
    badges: Array.isArray(row.badges) ? row.badges : [],
    date: new Date(row.created_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    createdAt: isNaN(timestamp) ? Date.now() : timestamp,
  };
}

export function entryToLeaderboardRow(
  entry: LeaderboardEntry,
  missionResults?: MissionResults
): Omit<LeaderboardRow, "created_at"> & { created_at?: string } {
  return {
    id: ensureValidUuid(entry.id),
    gamer_tag: entry.gamerTag,
    score: entry.score,
    mission1_score: missionResults?.mission1?.score ?? Math.min(100, entry.score),
    mission2_score: missionResults?.mission2?.score ?? 0,
    mission3_score: missionResults?.mission3?.score ?? 0,
    completion_time_seconds: entry.completionTimeSeconds,
    time_remaining: entry.timeRemaining ?? Math.max(0, 120 - entry.completionTimeSeconds),
    accuracy: entry.accuracy,
    missions_completed: entry.missionsCompleted,
    classification: entry.classification,
    badges: entry.badges || [],
    created_at: entry.createdAt ? new Date(entry.createdAt).toISOString() : undefined,
  };
}
