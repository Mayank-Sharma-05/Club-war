import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { LeaderboardEntry } from "@/types/game";
import { entryToLeaderboardRow } from "@/lib/supabase/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entries = Array.isArray(body?.entries) ? (body.entries as LeaderboardEntry[]) : [];

    if (entries.length === 0) {
      return NextResponse.json({ success: true, count: 0, message: "No entries to migrate." });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: false,
        warning: "Supabase not configured. Migration aborted.",
      });
    }

    // Convert entries to database rows
    const rows = entries.map((e) => entryToLeaderboardRow(e));

    // Upsert with ignoreDuplicates to safely import without overwriting or erroring
    const { data, error } = await supabase
      .from("leaderboard")
      .upsert(rows, { onConflict: "id", ignoreDuplicates: true })
      .select("id");

    if (error) {
      console.error("Supabase migration error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      migratedCount: data?.length || 0,
      totalReceived: entries.length,
      message: `Successfully migrated ${data?.length || 0} entries to Supabase.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Migration error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
