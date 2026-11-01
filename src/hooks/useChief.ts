"use client";

import { useState, useEffect, useCallback } from "react";
import { ChiefDialogue, ChiefEmotion, ChiefEventType } from "@/types/chief";
import { chiefSpeech } from "@/lib/chief/speech-manager";

export function useChief() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [emotion, setEmotion] = useState<ChiefEmotion>("idle");
  const [dialogue, setDialogue] = useState<ChiefDialogue | null>(null);
  const [voiceEnabled, setVoiceEnabledState] = useState(true);
  const [volume, setVolumeState] = useState(0.9);

  useEffect(() => {
    const unsubscribe = chiefSpeech.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setEmotion(state.currentEmotion);
      setDialogue(state.currentDialogue);
      setVoiceEnabledState(state.voiceEnabled);
      setVolumeState(state.volume);
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

  const setVolume = useCallback((val: number) => {
    chiefSpeech.setVolume(val);
  }, []);

  const replayLast = useCallback(() => {
    chiefSpeech.replayLast();
  }, []);

  const cancelSpeech = useCallback(() => {
    chiefSpeech.cancelSpeech();
  }, []);

  return {
    isSpeaking,
    emotion,
    dialogue,
    voiceEnabled,
    volume,
    trigger,
    setVoiceEnabled,
    setVolume,
    replayLast,
    cancelSpeech,
  };
}
