-- ==============================================================================
-- DATA BREACH: CRITICAL COUNTDOWN - SUPABASE LEADERBOARD SCHEMA
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).

-- 1. Create Leaderboard Table
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id TEXT PRIMARY KEY,
    gamer_tag TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 300),
    mission_1_score INTEGER NOT NULL DEFAULT 0 CHECK (mission_1_score >= 0 AND mission_1_score <= 100),
    mission_2_score INTEGER NOT NULL DEFAULT 0 CHECK (mission_2_score >= 0 AND mission_2_score <= 100),
    mission_3_score INTEGER NOT NULL DEFAULT 0 CHECK (mission_3_score >= 0 AND mission_3_score <= 100),
    completion_time_seconds INTEGER NOT NULL CHECK (completion_time_seconds >= 0 AND completion_time_seconds <= 120),
    time_remaining INTEGER NOT NULL DEFAULT 0 CHECK (time_remaining >= 0 AND time_remaining <= 120),
    accuracy INTEGER NOT NULL DEFAULT 0 CHECK (accuracy >= 0 AND accuracy <= 100),
    missions_completed INTEGER NOT NULL DEFAULT 0 CHECK (missions_completed >= 0 AND missions_completed <= 3),
    classification TEXT NOT NULL DEFAULT 'CYBER EXPLORER',
    badges TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for High-Performance Real-Time Ranking
-- Rank rule: Score DESC, Completion Time ASC, Submission Timestamp ASC
CREATE INDEX IF NOT EXISTS idx_leaderboard_ranking 
ON public.leaderboard (score DESC, completion_time_seconds ASC, created_at ASC);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow public read access to leaderboard for live updates
DROP POLICY IF EXISTS "Public can view leaderboard entries" ON public.leaderboard;
CREATE POLICY "Public can view leaderboard entries" 
ON public.leaderboard 
FOR SELECT 
USING (true);

-- Allow public insert through validated client/server
DROP POLICY IF EXISTS "Public can insert new completed games" ON public.leaderboard;
CREATE POLICY "Public can insert new completed games" 
ON public.leaderboard 
FOR INSERT 
WITH CHECK (
    score >= 0 AND score <= 300 AND
    score = (mission_1_score + mission_2_score + mission_3_score) AND
    completion_time_seconds >= 0 AND completion_time_seconds <= 120
);

-- Deny public direct DELETE/UPDATE (Admin operations must use service role key or API route with PIN)
DROP POLICY IF EXISTS "Deny direct public deletes" ON public.leaderboard;
CREATE POLICY "Deny direct public deletes" 
ON public.leaderboard 
FOR DELETE 
USING (false);

DROP POLICY IF EXISTS "Deny direct public updates" ON public.leaderboard;
CREATE POLICY "Deny direct public updates" 
ON public.leaderboard 
FOR UPDATE 
USING (false);

-- 4. Enable Supabase Realtime for the Leaderboard Table
-- This publishes INSERT, UPDATE, and DELETE changes to connected clients via WebSockets
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'leaderboard'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;
    END IF;
END $$;
