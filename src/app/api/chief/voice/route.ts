import { NextRequest, NextResponse } from "next/server";

// In-memory cache for audio buffers to optimize latency and minimize API usage
const audioCache = new Map<string, { buffer: ArrayBuffer; timestamp: number }>();
const MAX_CACHE_SIZE = 60;

// Default ElevenLabs voice settings optimized for deep, confident, expressive male gaming commander
const DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // "Adam" - Pre-made deep, confident, narration/conversational male voice
const DEFAULT_MODEL_ID = "eleven_turbo_v2_5"; // Ultra-low latency, highly expressive turbo model

function getVoiceSettingsForEmotion(emotion?: string) {
  switch (emotion) {
    case "celebrating":
      return {
        stability: 0.30,
        similarity_boost: 0.80,
        style: 0.45,
        use_speaker_boost: true,
      };
    case "impressed":
      return {
        stability: 0.32,
        similarity_boost: 0.80,
        style: 0.40,
        use_speaker_boost: true,
      };
    case "warning":
      return {
        stability: 0.35,
        similarity_boost: 0.82,
        style: 0.40,
        use_speaker_boost: true,
      };
    case "sarcastic":
      return {
        stability: 0.38,
        similarity_boost: 0.80,
        style: 0.38,
        use_speaker_boost: true,
      };
    case "disappointed":
      return {
        stability: 0.40,
        similarity_boost: 0.80,
        style: 0.32,
        use_speaker_boost: true,
      };
    case "happy":
      return {
        stability: 0.42,
        similarity_boost: 0.80,
        style: 0.30,
        use_speaker_boost: true,
      };
    case "idle":
    default:
      return {
        stability: 0.45,
        similarity_boost: 0.80,
        style: 0.25,
        use_speaker_boost: true,
      };
  }
}

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;

  return NextResponse.json({
    configured: Boolean(apiKey && apiKey.trim().length > 0),
    voiceId,
    modelId,
    voiceName: "Adam (ElevenLabs AI - Confident Male Commander)",
  });
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
    const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;

    if (!apiKey || apiKey.trim().length === 0) {
      return NextResponse.json(
        {
          error: "ELEVENLABS_API_KEY is not configured",
          fallback: true,
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { text, emotion } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text parameter is required" },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();
    const voiceSettings = getVoiceSettingsForEmotion(emotion);
    const cacheKey = `${voiceId}:${modelId}:${emotion || "default"}:${trimmedText}`;

    // Return cached audio if available
    const cached = audioCache.get(cacheKey);
    if (cached) {
      return new Response(cached.buffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400",
          "X-Audio-Source": "cache",
        },
      });
    }

    // Call ElevenLabs Text-to-Speech API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
          },
          body: JSON.stringify({
            text: trimmedText,
            model_id: modelId,
            voice_settings: voiceSettings,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("ElevenLabs API Error:", response.status, errorText);
        return NextResponse.json(
          {
            error: `ElevenLabs API responded with status ${response.status}`,
            fallback: true,
          },
          { status: 502 }
        );
      }

      const audioBuffer = await response.arrayBuffer();

      // Manage cache size
      if (audioCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = audioCache.keys().next().value;
        if (oldestKey) audioCache.delete(oldestKey);
      }
      audioCache.set(cacheKey, { buffer: audioBuffer, timestamp: Date.now() });

      return new Response(audioBuffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400",
          "X-Audio-Source": "elevenlabs",
        },
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof Error && err.name === "AbortError";
      return NextResponse.json(
        {
          error: isAbort ? "ElevenLabs request timed out" : "Failed to reach ElevenLabs API",
          fallback: true,
        },
        { status: 504 }
      );
    }
  } catch (err: unknown) {
    console.error("Voice route error:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
