"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { GameScreen, MissionId, PhishingChallengeSet, OutlierDataset, MissionResults, LeaderboardEntry } from "@/types/game";
import { PHISHING_CHALLENGE_SETS } from "@/lib/phishing-data";
import { OUTLIER_DATASETS } from "@/lib/outlier-data";
import { generateUniquePassword } from "@/lib/password-engine";
import { getComboMultiplier, calculateClassification } from "@/lib/scoring";
import { evaluateAchievements } from "@/lib/achievements";
import { saveLeaderboardEntry, getGameSettings, saveGameSettings, getLeaderboard } from "@/lib/storage";
import { sound } from "@/lib/sound-engine";
import { chiefSpeech } from "@/lib/chief/speech-manager";

// UI Components
import { GameHeader } from "@/components/game/GameHeader";
import { LandingScreen } from "@/components/game/LandingScreen";
import { PlayerRegistration } from "@/components/game/PlayerRegistration";
import { MissionBriefing } from "@/components/game/MissionBriefing";
import { PhishingMission } from "@/components/game/PhishingMission";
import { OutlierMission } from "@/components/game/OutlierMission";
import { CodeMission } from "@/components/game/CodeMission";
import { ResultsScreen } from "@/components/game/ResultsScreen";
import { Leaderboard } from "@/components/game/Leaderboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ChiefWidget } from "@/components/chief/ChiefWidget";

const TOTAL_GAME_SECONDS = 120;
const MAX_LIVES = 3;

export default function Home() {
  // Navigation / Screen State
  const [screen, setScreen] = useState<GameScreen>("landing");
  const [leaderboardReturnScreen, setLeaderboardReturnScreen] = useState<GameScreen>("landing");
  const [gamerTag, setGamerTag] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  // Game Engine State
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [score, setScore] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Global Timer State
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_GAME_SECONDS);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Track timer alerts to avoid duplicate voice triggers
  const hasTriggered60WarnRef = useRef(false);
  const hasTriggered30WarnRef = useRef(false);
  const hasTriggered10WarnRef = useRef(false);
  const lastAlertTimeRef = useRef<number | null>(null);

  // Challenges for active session
  const [currentPhishingSet, setCurrentPhishingSet] = useState<PhishingChallengeSet>(PHISHING_CHALLENGE_SETS[0]);
  const [currentOutlierSet, setCurrentOutlierSet] = useState<OutlierDataset>(OUTLIER_DATASETS[0]);
  const [secretVaultCode, setSecretVaultCode] = useState<string>("5831");

  // Mission Tracking Records
  const [missionResults, setMissionResults] = useState<MissionResults>({
    mission1: { completed: false, livesLost: 0, score: 0, selectedEmailId: null },
    mission2: { completed: false, correctOutliersFound: 0, incorrectSelected: 0, score: 0 },
    mission3: { completed: false, attemptsUsed: 0, score: 0, unlocked: false },
  });

  const [hasRecordedScore, setHasRecordedScore] = useState<boolean>(false);

  // Initialize Sound, Speech, and Settings on mount
  useEffect(() => {
    const settings = getGameSettings();
    setSoundEnabled(settings.soundEnabled);
    sound.setMuted(!settings.soundEnabled);
    chiefSpeech.initVoices();
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setMuted(!nextState);
    saveGameSettings({ soundEnabled: nextState });
  };

  // Timer warnings and sound alert at 30 seconds
  useEffect(() => {
    if (isTimerActive && timeRemaining <= 30 && timeRemaining > 0) {
      if (lastAlertTimeRef.current !== timeRemaining) {
        lastAlertTimeRef.current = timeRemaining;
        sound.playCountdownAlert();
      }
    }

    if (isTimerActive) {
      if (timeRemaining === 60 && !hasTriggered60WarnRef.current) {
        hasTriggered60WarnRef.current = true;
        chiefSpeech.trigger("timer_warning_60");
      }
      if (timeRemaining === 30 && !hasTriggered30WarnRef.current) {
        hasTriggered30WarnRef.current = true;
        chiefSpeech.trigger("timer_critical_30");
      }
      if (timeRemaining === 10 && !hasTriggered10WarnRef.current) {
        hasTriggered10WarnRef.current = true;
        chiefSpeech.trigger("timer_critical_10");
      }
    }
  }, [isTimerActive, timeRemaining]);

  // Global Timer Loop
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerActive(false);
            handleGameOverDueToTime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive]);

  // Reset Session / Start Fresh Game
  const resetSession = useCallback(() => {
    chiefSpeech.cancelSpeech();
    hasTriggered60WarnRef.current = false;
    hasTriggered30WarnRef.current = false;
    hasTriggered10WarnRef.current = false;

    const randomPhishing =
      PHISHING_CHALLENGE_SETS[Math.floor(Math.random() * PHISHING_CHALLENGE_SETS.length)];
    const randomOutlier =
      OUTLIER_DATASETS[Math.floor(Math.random() * OUTLIER_DATASETS.length)];
    const newCode = generateUniquePassword();

    setCurrentPhishingSet(randomPhishing);
    setCurrentOutlierSet(randomOutlier);
    setSecretVaultCode(newCode);

    setLives(MAX_LIVES);
    setScore(0);
    setComboStreak(0);
    setTimeRemaining(TOTAL_GAME_SECONDS);
    setIsTimerActive(false);
    setHasRecordedScore(false);

    setMissionResults({
      mission1: { completed: false, livesLost: 0, score: 0, selectedEmailId: null },
      mission2: { completed: false, correctOutliersFound: 0, incorrectSelected: 0, score: 0 },
      mission3: { completed: false, attemptsUsed: 0, score: 0, unlocked: false },
    });

    const newId = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setSessionId(newId);
  }, []);

  // Finish Game & Record Score to LocalStorage
  const finalizeGameSession = useCallback(
    (customResults?: MissionResults, customLives?: number) => {
      if (hasRecordedScore) return;
      setIsTimerActive(false);

      const activeResults = customResults || missionResults;
      const finalLives = customLives !== undefined ? customLives : lives;
      const timeSpent = TOTAL_GAME_SECONDS - timeRemaining;

      let completedCount = 0;
      if (activeResults.mission1.completed) completedCount++;
      if (activeResults.mission2.completed) completedCount++;
      if (activeResults.mission3.unlocked) completedCount++;

      let totalActions = 0;
      let correctActions = 0;
      totalActions += 1 + activeResults.mission1.livesLost;
      if (activeResults.mission1.completed) correctActions += 1;
      totalActions +=
        activeResults.mission2.correctOutliersFound +
        activeResults.mission2.incorrectSelected;
      correctActions += activeResults.mission2.correctOutliersFound;

      if (activeResults.mission3.attemptsUsed > 0) {
        totalActions += activeResults.mission3.attemptsUsed;
        if (activeResults.mission3.unlocked) correctActions += 1;
      }

      const rawAccuracy =
        totalActions > 0 ? Math.round((correctActions / totalActions) * 100) : 0;
      const accuracy = Math.min(100, Math.max(0, rawAccuracy));

      let calculatedScore = score;
      if (completedCount === 3 && timeRemaining > 0) {
        calculatedScore += timeRemaining * 2;
        setScore(calculatedScore);
      }

      const classification = calculateClassification(calculatedScore);
      const achievements = evaluateAchievements(activeResults, calculatedScore, finalLives);
      const unlockedBadges = achievements.filter((a) => a.unlocked).map((a) => a.title);

      // Check current leaderboard for high score
      const currentEntries = getLeaderboard();
      const previousHighScore =
        currentEntries.length > 0 ? Math.max(...currentEntries.map((e) => e.score)) : 0;

      const isNewHighScore =
        currentEntries.length > 0 && calculatedScore > previousHighScore;

      const entry: LeaderboardEntry = {
        id: sessionId || `session-${Date.now()}`,
        gamerTag: gamerTag || "ANALYST",
        score: calculatedScore,
        completionTimeSeconds: timeSpent,
        accuracy,
        missionsCompleted: completedCount,
        date: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        badges: unlockedBadges,
        classification,
      };

      saveLeaderboardEntry(entry);
      setHasRecordedScore(true);
      setScreen("results");

      // CHIEF commentary reaction
      setTimeout(() => {
        if (isNewHighScore) {
          chiefSpeech.trigger("high_score_achieved");
        } else if (completedCount === 3) {
          chiefSpeech.trigger("game_victory");
        }
      }, 500);
    },
    [hasRecordedScore, missionResults, lives, timeRemaining, score, sessionId, gamerTag]
  );

  const handleGameOverDueToTime = useCallback(() => {
    sound.playGameOver();
    chiefSpeech.trigger("game_over_time");
    finalizeGameSession();
  }, [finalizeGameSession]);

  const handlePhishingWrong = () => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setComboStreak(0);

    if (nextLives <= 0) {
      sound.playGameOver();
      chiefSpeech.trigger("game_over_lives");
      const updated = {
        ...missionResults,
        mission1: {
          ...missionResults.mission1,
          completed: false,
          livesLost: MAX_LIVES,
          score: 0,
          selectedEmailId: null,
        },
      };
      setMissionResults(updated);
      finalizeGameSession(updated, 0);
    } else {
      chiefSpeech.trigger("phishing_wrong");
    }
  };

  const handlePhishingCorrect = (scoreEarned: number, livesLost: number) => {
    const multiplier = getComboMultiplier(comboStreak + 1);
    const finalScoreEarned = Math.round(scoreEarned * multiplier);

    setScore((prev) => prev + finalScoreEarned);
    setComboStreak((prev) => prev + 1);

    const updated = {
      ...missionResults,
      mission1: {
        completed: true,
        livesLost,
        score: finalScoreEarned,
        selectedEmailId: currentPhishingSet.emails.find((e) => e.isPhishing)?.id || null,
      },
    };
    setMissionResults(updated);

    // CHIEF commentary
    if (livesLost === 0) {
      chiefSpeech.trigger("phishing_flawless");
    } else {
      chiefSpeech.trigger("phishing_correct");
    }

    setTimeout(() => {
      setScreen("mission-2");
    }, 2400);
  };

  const handleOutlierSubmit = (
    scoreEarned: number,
    correctCount: number,
    incorrectCount: number
  ) => {
    const isSuccess = correctCount > 0 && incorrectCount === 0;
    const multiplier = isSuccess ? getComboMultiplier(comboStreak + 1) : 1;
    const finalScoreEarned = Math.round(scoreEarned * multiplier);

    setScore((prev) => prev + finalScoreEarned);
    setComboStreak((prev) => (isSuccess ? prev + 1 : 0));

    const updated = {
      ...missionResults,
      mission2: {
        completed: correctCount > 0,
        correctOutliersFound: correctCount,
        incorrectSelected: incorrectCount,
        score: finalScoreEarned,
      },
    };
    setMissionResults(updated);

    // CHIEF commentary with context awareness
    if (correctCount === currentOutlierSet.targetOutlierCount && incorrectCount === 0) {
      if (missionResults.mission1.livesLost > 0) {
        chiefSpeech.trigger("comeback");
      } else {
        chiefSpeech.trigger("outlier_all_correct");
      }
    } else if (correctCount > 0) {
      chiefSpeech.trigger("outlier_partial");
    } else {
      chiefSpeech.trigger("outlier_wrong");
    }

    setTimeout(() => {
      setScreen("mission-3");
    }, 2400);
  };

  const handleCodeGuessEvaluated = (
    greens: number,
    yellows: number,
    attemptNumber: number
  ) => {
    if (attemptNumber === 4 && greens < 4) {
      chiefSpeech.trigger("code_last_attempt");
    } else if (greens >= 2 && greens < 4) {
      chiefSpeech.trigger("code_multiple_greens");
    } else if (greens === 0 && yellows === 0) {
      chiefSpeech.trigger("code_no_match");
    }
  };

  const handleCodeComplete = (
    scoreEarned: number,
    attemptsUsed: number,
    unlocked: boolean
  ) => {
    const multiplier = unlocked ? getComboMultiplier(comboStreak + 1) : 1;
    const finalScoreEarned = Math.round(scoreEarned * multiplier);

    setScore((prev) => prev + finalScoreEarned);
    if (unlocked) {
      setComboStreak((prev) => prev + 1);
      chiefSpeech.trigger("code_unlocked");
    } else {
      setComboStreak(0);
      chiefSpeech.trigger("code_failed");
    }

    const updated = {
      ...missionResults,
      mission3: {
        completed: true,
        attemptsUsed,
        score: finalScoreEarned,
        unlocked,
      },
    };
    setMissionResults(updated);

    setTimeout(() => {
      finalizeGameSession(updated);
    }, 1200);
  };

  const handleStartLanding = () => {
    resetSession();
    setScreen("registration");
  };

  const handleRegisterCallsign = (tag: string) => {
    setGamerTag(tag);
    setScreen("briefing");
  };

  const handleInitializeBriefing = () => {
    startTimeRef.current = Date.now();
    setIsTimerActive(true);
    setScreen("mission-1");
    chiefSpeech.trigger("game_start");
  };

  const handlePlayAgain = () => {
    resetSession();
    setScreen("registration");
  };

  const handleViewLeaderboardFromLanding = () => {
    setLeaderboardReturnScreen("landing");
    setScreen("leaderboard");
  };

  const handleViewLeaderboardFromBriefing = () => {
    setLeaderboardReturnScreen("briefing");
    setScreen("leaderboard");
  };

  const handleViewLeaderboardFromResults = () => {
    setLeaderboardReturnScreen("results");
    setScreen("leaderboard");
  };

  const currentAchievements = evaluateAchievements(missionResults, score, lives);
  const currentClassification = calculateClassification(score);
  const timeSpent = TOTAL_GAME_SECONDS - timeRemaining;

  let totalActions = 0;
  let correctActions = 0;
  totalActions += 1 + missionResults.mission1.livesLost;
  if (missionResults.mission1.completed) correctActions += 1;
  totalActions +=
    missionResults.mission2.correctOutliersFound +
    missionResults.mission2.incorrectSelected;
  correctActions += missionResults.mission2.correctOutliersFound;
  if (missionResults.mission3.attemptsUsed > 0) {
    totalActions += missionResults.mission3.attemptsUsed;
    if (missionResults.mission3.unlocked) correctActions += 1;
  }
  const liveAccuracy =
    totalActions > 0 ? Math.min(100, Math.round((correctActions / totalActions) * 100)) : 0;

  let completedMissionsCount = 0;
  if (missionResults.mission1.completed) completedMissionsCount++;
  if (missionResults.mission2.completed) completedMissionsCount++;
  if (missionResults.mission3.unlocked) completedMissionsCount++;

  const activeMissionId: MissionId | undefined =
    screen === "mission-1"
      ? "mission-1"
      : screen === "mission-2"
      ? "mission-2"
      : screen === "mission-3"
      ? "mission-3"
      : undefined;

  // Show CHIEF widget on active missions and results screens
  const showChiefWidget =
    screen === "mission-1" ||
    screen === "mission-2" ||
    screen === "mission-3" ||
    screen === "results";

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans select-none relative">
      {/* Sticky Header during Active Missions */}
      {(screen === "mission-1" || screen === "mission-2" || screen === "mission-3") && (
        <GameHeader
          timeRemaining={timeRemaining}
          totalTime={TOTAL_GAME_SECONDS}
          score={score}
          comboStreak={comboStreak}
          comboMultiplier={getComboMultiplier(comboStreak)}
          lives={lives}
          maxLives={MAX_LIVES}
          currentMission={activeMissionId}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {/* Screen Router */}
      <main className="flex-grow flex flex-col">
        {screen === "landing" && (
          <LandingScreen
            onStart={handleStartLanding}
            onViewLeaderboard={handleViewLeaderboardFromLanding}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}

        {screen === "registration" && (
          <PlayerRegistration
            onRegister={handleRegisterCallsign}
            onBack={() => setScreen("landing")}
          />
        )}

        {screen === "briefing" && (
          <MissionBriefing
            gamerTag={gamerTag}
            onInitialize={handleInitializeBriefing}
            onViewLeaderboard={handleViewLeaderboardFromBriefing}
          />
        )}

        {screen === "mission-1" && (
          <PhishingMission
            challengeSet={currentPhishingSet}
            onCorrect={handlePhishingCorrect}
            onWrong={handlePhishingWrong}
            lives={lives}
          />
        )}

        {screen === "mission-2" && (
          <OutlierMission
            dataset={currentOutlierSet}
            onSubmit={handleOutlierSubmit}
          />
        )}

        {screen === "mission-3" && (
          <CodeMission
            secretCode={secretVaultCode}
            onComplete={handleCodeComplete}
            onGuessEvaluated={handleCodeGuessEvaluated}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            gamerTag={gamerTag}
            finalScore={score}
            timeSpentSeconds={timeSpent}
            accuracy={liveAccuracy}
            missionsCompletedCount={completedMissionsCount}
            remainingLives={lives}
            classification={currentClassification}
            missionResults={missionResults}
            achievements={currentAchievements}
            onPlayAgain={handlePlayAgain}
            onViewLeaderboard={handleViewLeaderboardFromResults}
          />
        )}

        {screen === "leaderboard" && (
          <Leaderboard
            onBack={() => setScreen(leaderboardReturnScreen)}
            onNewGame={handlePlayAgain}
            highlightSessionId={sessionId}
          />
        )}
      </main>

      {/* Persistent CHIEF Interactive Companion Widget */}
      {showChiefWidget && <ChiefWidget />}

      {/* Stall Operator Admin Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
