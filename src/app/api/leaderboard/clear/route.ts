import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";

    const expectedPin = (process.env.OPERATOR_PIN || "1337").trim();
    if (pin !== expectedPin) {
      return NextResponse.json({ error: "Invalid Organizer PIN. Authorization denied." }, { status: 401 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: false,
        warning: "Supabase not configured. Please clear LocalStorage directly.",
      });
    }

    // Delete all records from leaderboard table using server client
    const { error } = await supabase
      .from("leaderboard")
      .delete()
      .gte("score", 0);

    if (error) {
      console.error("Supabase clear leaderboard error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Leaderboard cleared successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Clear leaderboard error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
