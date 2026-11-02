"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { LeaderboardEntry } from "@/types/game";
import { getLeaderboard, sortLeaderboardEntries } from "@/lib/storage";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { rowToLeaderboardEntry, LeaderboardRow } from "@/lib/supabase/types";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useLiveLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => {
    // Instant initial load from LocalStorage so UI renders without delay
    return getLeaderboard();
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const fetchSupabaseEntries = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard/list");
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      const data = await res.json();
      if (data.configured && Array.isArray(data.entries)) {
        setIsConfigured(true);
        // Merge or replace with authoritative Supabase records sorted by ranking rules
        const sorted = (data.entries as LeaderboardEntry[]).sort(sortLeaderboardEntries);
        setEntries(sorted);
      } else {
        setIsConfigured(false);
        setEntries(getLeaderboard());
      }
    } catch (err) {
      console.warn("Could not load Supabase leaderboard, using local fallback:", err);
      setEntries(getLeaderboard());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Initial fetch from API / LocalStorage
    fetchSupabaseEntries();

    // 2. Set up Supabase Realtime Subscription if configured in browser
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        setIsConfigured(true);

        const channel = supabase
          .channel("realtime:public:leaderboard")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "leaderboard",
            },
            (payload) => {
              if (payload.eventType === "INSERT") {
                const newEntry = rowToLeaderboardEntry(payload.new as LeaderboardRow);
                setEntries((prev) => {
                  // Deduplicate by ID
                  const filtered = prev.filter((e) => e.id !== newEntry.id);
                  return [...filtered, newEntry].sort(sortLeaderboardEntries);
                });
              } else if (payload.eventType === "UPDATE") {
                const updatedEntry = rowToLeaderboardEntry(payload.new as LeaderboardRow);
                setEntries((prev) => {
                  const filtered = prev.filter((e) => e.id !== updatedEntry.id);
                  return [...filtered, updatedEntry].sort(sortLeaderboardEntries);
                });
              } else if (payload.eventType === "DELETE") {
                const deletedId = (payload.old as { id?: string })?.id;
                if (deletedId) {
                  setEntries((prev) => prev.filter((e) => e.id !== deletedId));
                } else {
                  // Full clear occurred, refetch
                  fetchSupabaseEntries();
                }
              }
            }
          )
          .subscribe((status) => {
            if (status === "SUBSCRIBED") {
              setIsLiveConnected(true);
            } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
              setIsLiveConnected(false);
            }
          });

        channelRef.current = channel;

        // Cleanup on unmount
        return () => {
          if (channelRef.current && supabase) {
            supabase.removeChannel(channelRef.current);
            channelRef.current = null;
          }
        };
      }
    } else {
      setIsLoading(false);
      setIsConfigured(false);
    }
  }, [fetchSupabaseEntries]);

  const refresh = useCallback(() => {
    return fetchSupabaseEntries();
  }, [fetchSupabaseEntries]);

  return {
    entries,
    setEntries,
    isLoading,
    isLiveConnected,
    isConfigured,
    refresh,
  };
}
