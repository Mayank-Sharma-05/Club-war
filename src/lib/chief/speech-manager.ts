import { ChiefDialogue, ChiefEmotion, ChiefEventType, ChiefSettings } from "@/types/chief";
import { DIALOGUE_LIBRARY } from "./dialogue-library";

const SETTINGS_KEY = "databreach_chief_settings_v1";

const DEFAULT_SETTINGS: ChiefSettings = {
  voiceEnabled: true,
  volume: 0.9,
  rate: 1.05,
};

type Listener = (state: {
  isSpeaking: boolean;
  currentEmotion: ChiefEmotion;
  currentDialogue: ChiefDialogue | null;
  voiceEnabled: boolean;
  volume: number;
}) => void;

class SpeechManager {
  private settings: ChiefSettings = DEFAULT_SETTINGS;
  private currentDialogue: ChiefDialogue | null = null;
  private currentEmotion: ChiefEmotion = "idle";
  private isSpeaking: boolean = false;
  private listeners: Set<Listener> = new Set();
  private recentDialogueIds: string[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isInitialized: boolean = false;
  private currentPriority: number = 0;

  constructor() {
    this.loadSettings();
    if (typeof window !== "undefined") {
      this.initVoices();
    }
  }

  private loadSettings() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {
      this.settings = DEFAULT_SETTINGS;
    }
  }

  private saveSettings() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    } catch {}
  }

  public initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Prefer natural English voices (US, GB, Australia, Google, Microsoft, Natural)
        const preferred =
          voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Daniel") || v.name.includes("Arthur"))) ||
          voices.find((v) => v.lang.startsWith("en")) ||
          voices[0];
        this.selectedVoice = preferred || null;
      }
    };

    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
    this.isInitialized = true;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) =>
      listener({
        isSpeaking: this.isSpeaking,
        currentEmotion: this.currentEmotion,
        currentDialogue: this.currentDialogue,
        voiceEnabled: this.settings.voiceEnabled,
        volume: this.settings.volume,
      })
    );
  }

  public getSettings(): ChiefSettings {
    return { ...this.settings };
  }

  public setVoiceEnabled(enabled: boolean) {
    this.settings.voiceEnabled = enabled;
    this.saveSettings();
    if (!enabled) {
      this.cancelSpeech();
    }
    this.notify();
  }

  public setVolume(volume: number) {
    this.settings.volume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    this.notify();
  }

  public cancelSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isSpeaking = false;
    this.currentEmotion = "idle";
    this.currentPriority = 0;
    this.notify();
  }

  public trigger(eventType: ChiefEventType, overridePriority?: number) {
    const list = DIALOGUE_LIBRARY[eventType];
    if (!list || list.length === 0) return;

    // Pick from pool avoiding recent repeats if possible
    let candidates = list.filter((d) => !this.recentDialogueIds.includes(d.id));
    if (candidates.length === 0) candidates = list;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    const priority = overridePriority !== undefined ? overridePriority : chosen.priority;

    // If currently speaking a higher priority event, ignore lower priority
    if (this.isSpeaking && priority < this.currentPriority) {
      return;
    }

    // Cancel existing lower/equal speech and play new chosen dialogue
    this.cancelSpeech();

    // Record recent ID
    this.recentDialogueIds.push(chosen.id);
    if (this.recentDialogueIds.length > 5) {
      this.recentDialogueIds.shift();
    }

    this.currentDialogue = chosen;
    this.currentEmotion = chosen.emotion;
    this.currentPriority = priority;

    // Try Speech Synthesis if enabled
    if (
      this.settings.voiceEnabled &&
      this.settings.volume > 0 &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      try {
        const utterance = new SpeechSynthesisUtterance(chosen.text);
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }
        utterance.rate = this.settings.rate || 1.05;
        utterance.pitch = 0.95;
        utterance.volume = this.settings.volume;

        utterance.onstart = () => {
          this.isSpeaking = true;
          this.notify();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.currentEmotion = "idle";
          this.currentPriority = 0;
          this.notify();
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          this.currentEmotion = "idle";
          this.currentPriority = 0;
          this.notify();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
      }
    } else {
      // Just keep text visible for 4.5 seconds
      this.notify();
      setTimeout(() => {
        if (this.currentDialogue?.id === chosen.id) {
          this.currentEmotion = "idle";
          this.notify();
        }
      }, 4500);
    }

    this.notify();
  }

  public replayLast() {
    if (!this.currentDialogue) return;
    const last = this.currentDialogue;
    this.cancelSpeech();
    this.currentEmotion = last.emotion;

    if (
      this.settings.voiceEnabled &&
      this.settings.volume > 0 &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      try {
        const utterance = new SpeechSynthesisUtterance(last.text);
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }
        utterance.rate = this.settings.rate || 1.05;
        utterance.pitch = 0.95;
        utterance.volume = this.settings.volume;

        utterance.onstart = () => {
          this.isSpeaking = true;
          this.notify();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.currentEmotion = "idle";
          this.notify();
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          this.currentEmotion = "idle";
          this.notify();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
      }
    }
    this.notify();
  }
}

export const chiefSpeech = new SpeechManager();
