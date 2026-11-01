"use client";

import { useSyncExternalStore, useCallback } from "react";
import { ChiefEventType, ChiefSettings } from "@/types/chief";
import { chiefSpeech } from "@/lib/chief/speech-manager";

export function useChief() {
  const state = useSyncExternalStore(
    chiefSpeech.subscribe,
    chiefSpeech.getSnapshot,
    chiefSpeech.getServerSnapshot
  );

  const trigger = useCallback((event: ChiefEventType, priority?: number) => {
    chiefSpeech.trigger(event, priority);
  }, []);

  const setVoiceEnabled = useCallback((enabled: boolean) => {
    chiefSpeech.setVoiceEnabled(enabled);
  }, []);

  const setShowText = useCallback((show: boolean) => {
    chiefSpeech.setShowText(show);
  }, []);

  const setVolume = useCallback((val: number) => {
    chiefSpeech.setVolume(val);
  }, []);

  const replayLast = useCallback(() => {
    chiefSpeech.replayLast();
  }, []);

  const testVoice = useCallback(() => {
    chiefSpeech.testVoice();
  }, []);

  const cancelSpeech = useCallback(() => {
    chiefSpeech.cancelSpeech();
  }, []);

  const dismissDialogue = useCallback(() => {
    chiefSpeech.dismissDialogue();
  }, []);

  const setPreferredVoice = useCallback((voiceURI: string) => {
    chiefSpeech.setPreferredVoice(voiceURI);
  }, []);

  const setPreferredEngine = useCallback((engine: "elevenlabs" | "speech_synthesis") => {
    chiefSpeech.setPreferredEngine(engine);
  }, []);

  const getAvailableVoices = useCallback(() => {
    return chiefSpeech.getAvailableVoices();
  }, []);

  const getSettings = useCallback((): ChiefSettings => {
    return chiefSpeech.getSettings();
  }, []);

  return {
    isSpeaking: state.isSpeaking,
    emotion: state.currentEmotion,
    dialogue: state.currentDialogue,
    voiceEnabled: state.voiceEnabled,
    volume: state.volume,
    showText: state.showText,
    selectedVoiceName: state.selectedVoiceName,
    activeEngine: state.activeEngine,
    elevenLabsConfigured: state.elevenLabsConfigured,
    trigger,
    setVoiceEnabled,
    setShowText,
    setVolume,
    replayLast,
    testVoice,
    cancelSpeech,
    dismissDialogue,
    setPreferredVoice,
    setPreferredEngine,
    getAvailableVoices,
    getSettings,
  };
}
