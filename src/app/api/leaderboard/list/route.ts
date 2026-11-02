import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { rowToLeaderboardEntry, LeaderboardRow } from "@/lib/supabase/types";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          configured: false,
          entries: [],
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    // Rank rules:
    // 1. Score descending
    // 2. Completion time ascending (lower is better)
    // 3. Created_at ascending (earlier submission wins ties)
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false })
      .order("completion_time_seconds", { ascending: true })
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Supabase leaderboard query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const entries = (data as LeaderboardRow[]).map(rowToLeaderboardEntry);
    return NextResponse.json(
      {
        configured: true,
        entries,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Leaderboard list error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
