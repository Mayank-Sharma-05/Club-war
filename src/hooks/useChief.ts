"use client";

import { useState, useEffect, useCallback } from "react";
import { ChiefDialogue, ChiefEmotion, ChiefEventType, ChiefSettings } from "@/types/chief";
import { chiefSpeech } from "@/lib/chief/speech-manager";

export function useChief() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [emotion, setEmotion] = useState<ChiefEmotion>("idle");
  const [dialogue, setDialogue] = useState<ChiefDialogue | null>(null);
  const [voiceEnabled, setVoiceEnabledState] = useState(true);
  const [volume, setVolumeState] = useState(1.0);
  const [showText, setShowTextState] = useState(true);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = chiefSpeech.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setEmotion(state.currentEmotion);
      setDialogue(state.currentDialogue);
      setVoiceEnabledState(state.voiceEnabled);
      setVolumeState(state.volume);
      setShowTextState(state.showText);
      setSelectedVoiceName(state.selectedVoiceName);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const getAvailableVoices = useCallback(() => {
    return chiefSpeech.getAvailableVoices();
  }, []);

  const getSettings = useCallback((): ChiefSettings => {
    return chiefSpeech.getSettings();
  }, []);

  return {
    isSpeaking,
    emotion,
    dialogue,
    voiceEnabled,
    volume,
    showText,
    selectedVoiceName,
    trigger,
    setVoiceEnabled,
    setShowText,
    setVolume,
    replayLast,
    testVoice,
    cancelSpeech,
    dismissDialogue,
    setPreferredVoice,
    getAvailableVoices,
    getSettings,
  };
}
