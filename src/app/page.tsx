"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { GameScreen, MissionId, PhishingChallengeSet, OutlierDataset, MissionResults, LeaderboardEntry } from "@/types/game";
import { PHISHING_CHALLENGE_SETS } from "@/lib/phishing-data";
import { OUTLIER_DATASETS } from "@/lib/outlier-data";
import { generateUniquePassword } from "@/lib/password-engine";
import { getComboMultiplier, calculateClassification } from "@/lib/scoring";
import { evaluateAchievements } from "@/lib/achievements";
import { saveLeaderboardEntry, getGameSettings, saveGameSettings } from "@/lib/storage";
import { sound } from "@/lib/sound-engine";

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

const TOTAL_GAME_SECONDS = 180;
const MAX_LIVES = 3;

export default function Home() {
  // Navigation / Screen State
  const [screen, setScreen] = useState<GameScreen>("landing");
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

  // Initialize Sound and Settings on mount
  useEffect(() => {
    const settings = getGameSettings();
    setSoundEnabled(settings.soundEnabled);
    sound.setMuted(!settings.soundEnabled);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setMuted(!nextState);
    saveGameSettings({ soundEnabled: nextState });
  };

  // Sound alert at 30 seconds
  const lastAlertTimeRef = useRef<number | null>(null);
  useEffect(() => {
    if (isTimerActive && timeRemaining <= 30 && timeRemaining > 0) {
      if (lastAlertTimeRef.current !== timeRemaining) {
        lastAlertTimeRef.current = timeRemaining;
        sound.playCountdownAlert();
      }
    }
  }, [isTimerActive, timeRemaining]);

  // Global Timer Loop
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time expired!
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
    // Pick random challenge set
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

      // Calculate missions completed
      let completedCount = 0;
      if (activeResults.mission1.completed) completedCount++;
      if (activeResults.mission2.completed) completedCount++;
      if (activeResults.mission3.unlocked) completedCount++;

      // Accuracy calculation
      let totalActions = 0;
      let correctActions = 0;

      // Mission 1: 1 action + lives lost
      totalActions += 1 + activeResults.mission1.livesLost;
      if (activeResults.mission1.completed) correctActions += 1;

      // Mission 2: Outliers
      totalActions +=
        activeResults.mission2.correctOutliersFound +
        activeResults.mission2.incorrectSelected;
      correctActions += activeResults.mission2.correctOutliersFound;

      // Mission 3: Code
      if (activeResults.mission3.attemptsUsed > 0) {
        totalActions += activeResults.mission3.attemptsUsed;
        if (activeResults.mission3.unlocked) correctActions += 1;
      }

      const rawAccuracy =
        totalActions > 0 ? Math.round((correctActions / totalActions) * 100) : 0;
      const accuracy = Math.min(100, Math.max(0, rawAccuracy));

      // Calculate time bonus: +2 pts per remaining second if all 3 missions completed
      let calculatedScore = score;
      if (completedCount === 3 && timeRemaining > 0) {
        calculatedScore += timeRemaining * 2;
        setScore(calculatedScore);
      }

      const classification = calculateClassification(calculatedScore);
      const achievements = evaluateAchievements(activeResults, calculatedScore, finalLives);
      const unlockedBadges = achievements.filter((a) => a.unlocked).map((a) => a.title);

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
    },
    [hasRecordedScore, missionResults, lives, timeRemaining, score, sessionId, gamerTag]
  );

  const handleGameOverDueToTime = useCallback(() => {
    sound.playGameOver();
    finalizeGameSession();
  }, [finalizeGameSession]);

  // Handle wrong selection in Phishing Mission
  const handlePhishingWrong = () => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setComboStreak(0);

    if (nextLives <= 0) {
      sound.playGameOver();
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
    }
  };

  // Handle correct selection in Phishing Mission
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

    // Auto proceed to Mission 2 after short pause so player sees explanation
    setTimeout(() => {
      setScreen("mission-2");
    }, 2400);
  };

  // Handle Outlier Mission Submit
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

    // Auto proceed to Mission 3
    setTimeout(() => {
      setScreen("mission-3");
    }, 2400);
  };

  // Handle Code Mission Complete
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
    } else {
      setComboStreak(0);
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

    // Finalize session and open results screen
    setTimeout(() => {
      finalizeGameSession(updated);
    }, 1200);
  };

  // Flow Navigation Handlers
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
  };

  const handlePlayAgain = () => {
    resetSession();
    setScreen("registration");
  };

  const handleViewLeaderboard = () => {
    setScreen("leaderboard");
  };

  // Calculate current achievements for Results Screen
  const currentAchievements = evaluateAchievements(missionResults, score, lives);
  const currentClassification = calculateClassification(score);
  const timeSpent = TOTAL_GAME_SECONDS - timeRemaining;

  // Compute accuracy for live results
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

  // Determine current active mission ID for header
  const activeMissionId: MissionId | undefined =
    screen === "mission-1"
      ? "mission-1"
      : screen === "mission-2"
      ? "mission-2"
      : screen === "mission-3"
      ? "mission-3"
      : undefined;

  return (
    <div className="min-h-screen bg-[#090D14] text-[#F1F5F9] flex flex-col font-sans select-none relative">
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
            onViewLeaderboard={handleViewLeaderboard}
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
            onViewLeaderboard={handleViewLeaderboard}
          />
        )}

        {screen === "leaderboard" && (
          <Leaderboard
            onBack={() => setScreen("landing")}
            onNewGame={handlePlayAgain}
            highlightSessionId={sessionId}
          />
        )}
      </main>

      {/* Stall Operator Admin Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
