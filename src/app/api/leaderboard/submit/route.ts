import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { rowToLeaderboardEntry, ensureValidUuid } from "@/lib/supabase/types";

interface SubmitScorePayload {
  id: string;
  gamerTag: string;
  score: number;
  mission1Score?: number;
  mission2Score?: number;
  mission3Score?: number;
  completionTimeSeconds: number;
  timeRemaining?: number;
  accuracy: number;
  missionsCompleted: number;
  classification?: string;
  badges?: string[];
  createdAt?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitScorePayload;

    // 1. Server-side validation
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const id = ensureValidUuid(body.id);

    const gamerTag = typeof body.gamerTag === "string" && body.gamerTag.trim().length > 0
      ? body.gamerTag.trim().slice(0, 30)
      : "ANALYST";

    const score = Number(body.score);
    if (!Number.isFinite(score) || score < 0 || score > 300) {
      return NextResponse.json({ error: "Score must be an integer between 0 and 300" }, { status: 400 });
    }

    const m1 = Math.max(0, Math.min(100, Number(body.mission1Score ?? Math.min(100, score))));
    const m2 = Math.max(0, Math.min(100, Number(body.mission2Score ?? 0)));
    const m3 = Math.max(0, Math.min(100, Number(body.mission3Score ?? 0)));

    // Validate that the total score matches mission breakdown if provided
    if (body.mission1Score !== undefined && body.mission2Score !== undefined && body.mission3Score !== undefined) {
      if (score !== m1 + m2 + m3) {
        return NextResponse.json({ error: "Total score does not match mission score sum" }, { status: 400 });
      }
    }

    const completionTimeSeconds = Math.max(0, Math.min(120, Number(body.completionTimeSeconds ?? 120)));
    const timeRemaining = Math.max(0, Math.min(120, Number(body.timeRemaining ?? (120 - completionTimeSeconds))));
    const accuracy = Math.max(0, Math.min(100, Number(body.accuracy ?? 100)));
    const missionsCompleted = Math.max(0, Math.min(3, Number(body.missionsCompleted ?? 3)));
    const classification = typeof body.classification === "string" ? body.classification.slice(0, 50) : "CYBER EXPLORER";
    const badges = Array.isArray(body.badges) ? body.badges.filter((b) => typeof b === "string").slice(0, 20) : [];
    const createdAt = body.createdAt ? new Date(body.createdAt).toISOString() : new Date().toISOString();

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      // Supabase is not configured yet; return graceful acknowledgment so client can use LocalStorage
      return NextResponse.json({
        success: false,
        warning: "Supabase credentials not configured. Stored in local fallback.",
      });
    }

    // 2. Insert with idempotency (prevent duplicate submissions by id)
    const { data, error } = await supabase
      .from("leaderboard")
      .upsert(
        {
          id,
          gamer_tag: gamerTag,
          score,
          mission1_score: m1,
          mission2_score: m2,
          mission3_score: m3,
          completion_time_seconds: completionTimeSeconds,
          time_remaining: timeRemaining,
          accuracy,
          missions_completed: missionsCompleted,
          classification,
          badges,
          created_at: createdAt,
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      entry: rowToLeaderboardEntry(data),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Score submission error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
