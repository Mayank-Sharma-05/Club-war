import { ChiefDialogue, ChiefEmotion, ChiefEventType, ChiefSettings } from "@/types/chief";
import { DIALOGUE_LIBRARY } from "./dialogue-library";

const SETTINGS_KEY = "databreach_chief_settings_v1";

const DEFAULT_SETTINGS: ChiefSettings = {
  voiceEnabled: true,
  volume: 1.0,
  rate: 0.95,
  pitch: 0.90,
  showText: true,
  preferredVoiceURI: undefined,
  preferredEngine: "elevenlabs",
};

// Indicators for identifying masculine vs feminine voice names across Chrome, Edge, Safari, Firefox, Windows
const MALE_VOICE_KEYWORDS = [
  "male",
  "david",
  "mark",
  "guy",
  "ravi",
  "prabhat",
  "george",
  "oliver",
  "ryan",
  "daniel",
  "arthur",
  "steffan",
  "christopher",
  "eric",
  "roger",
  "andrew",
  "brian",
  "reed",
  "matt",
  "james",
  "charles",
  "john",
  "paul",
  "richard",
  "michael",
  "william",
  "alex",
];

const FEMALE_VOICE_KEYWORDS = [
  "female",
  "zira",
  "eva",
  "jenny",
  "heera",
  "kalpana",
  "neerja",
  "samantha",
  "victoria",
  "karen",
  "hazel",
  "susan",
  "aria",
  "sonia",
  "ayanda",
  "catherine",
  "linda",
  "elizabeth",
  "mary",
  "sarah",
  "alice",
  "fiona",
  "veena",
];

export type Listener = (state: {
  isSpeaking: boolean;
  currentEmotion: ChiefEmotion;
  currentDialogue: ChiefDialogue | null;
  voiceEnabled: boolean;
  volume: number;
  showText: boolean;
  selectedVoiceName: string | null;
  activeEngine: "elevenlabs" | "speech_synthesis";
  elevenLabsConfigured: boolean;
}) => void;

class SpeechManager {
  private settings: ChiefSettings = DEFAULT_SETTINGS;
  private currentDialogue: ChiefDialogue | null = null;
  private currentEmotion: ChiefEmotion = "idle";
  private isSpeaking: boolean = false;
  private listeners: Set<Listener> = new Set();
  private recentDialogueIds: string[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private currentPriority: number = 0;
  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  // ElevenLabs integration state
  private currentAudio: HTMLAudioElement | null = null;
  private abortController: AbortController | null = null;
  private audioBlobCache: Map<string, string> = new Map();
  private activeEngine: "elevenlabs" | "speech_synthesis" = "elevenlabs";
  private elevenLabsConfigured: boolean = false;
  private elevenLabsAvailable: boolean = true;

  constructor() {
    this.loadSettings();
    if (typeof window !== "undefined") {
      this.initVoices();
      this.probeElevenLabs();
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

  public async probeElevenLabs() {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch("/api/chief/voice");
      if (res.ok) {
        const data = await res.json();
        this.elevenLabsConfigured = Boolean(data.configured);
        this.elevenLabsAvailable = Boolean(data.configured);
        this.notify();
      }
    } catch {
      this.elevenLabsConfigured = false;
    }
  }

  public initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        this.availableVoices = voices;
        this.resolveBestVoice();
        this.notify();
      }
    };

    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  /**
   * Resolves the best available voice according to priority:
   * 1. Explicit user choice if available
   * 2. Natural-sounding English (India) male voice
   * 3. Natural-sounding English (US) male voice
   * 4. Natural-sounding English (UK) male voice
   * 5. Best available English fallback
   */
  public resolveBestVoice(): SpeechSynthesisVoice | null {
    if (this.availableVoices.length === 0) return null;

    // Check user preference first
    if (this.settings.preferredVoiceURI) {
      const found = this.availableVoices.find(
        (v) => v.voiceURI === this.settings.preferredVoiceURI
      );
      if (found) {
        this.selectedVoice = found;
        return found;
      }
    }

    const isMaleName = (name: string): boolean => {
      const lower = name.toLowerCase();
      return MALE_VOICE_KEYWORDS.some((kw) => lower.includes(kw));
    };

    const isFemaleName = (name: string): boolean => {
      const lower = name.toLowerCase();
      return FEMALE_VOICE_KEYWORDS.some((kw) => lower.includes(kw));
    };

    const enVoices = this.availableVoices.filter((v) =>
      v.lang.toLowerCase().startsWith("en")
    );

    // 1. Natural-sounding English (India) male voice
    const inVoices = enVoices.filter((v) => {
      const l = v.lang.toLowerCase().replace("_", "-");
      return l.includes("en-in");
    });
    const inMale = inVoices.find((v) => isMaleName(v.name));
    if (inMale) {
      this.selectedVoice = inMale;
      return inMale;
    }
    const inNonFemale = inVoices.find((v) => !isFemaleName(v.name));
    if (inNonFemale) {
      this.selectedVoice = inNonFemale;
      return inNonFemale;
    }

    // 2. Natural-sounding English (US) male voice
    const usVoices = enVoices.filter((v) => {
      const l = v.lang.toLowerCase().replace("_", "-");
      return l.includes("en-us");
    });
    const usMale = usVoices.find((v) => isMaleName(v.name));
    if (usMale) {
      this.selectedVoice = usMale;
      return usMale;
    }
    const usNonFemale = usVoices.find((v) => !isFemaleName(v.name));
    if (usNonFemale) {
      this.selectedVoice = usNonFemale;
      return usNonFemale;
    }

    // 3. Natural-sounding English (UK) male voice
    const ukVoices = enVoices.filter((v) => {
      const l = v.lang.toLowerCase().replace("_", "-");
      return l.includes("en-gb");
    });
    const ukMale = ukVoices.find((v) => isMaleName(v.name));
    if (ukMale) {
      this.selectedVoice = ukMale;
      return ukMale;
    }
    const ukNonFemale = ukVoices.find((v) => !isFemaleName(v.name));
    if (ukNonFemale) {
      this.selectedVoice = ukNonFemale;
      return ukNonFemale;
    }

    // 4. Best available English fallback (prioritizing non-female, then any English)
    const anyMale = enVoices.find((v) => isMaleName(v.name));
    if (anyMale) {
      this.selectedVoice = anyMale;
      return anyMale;
    }
    const anyNonFemale = enVoices.find((v) => !isFemaleName(v.name));
    if (anyNonFemale) {
      this.selectedVoice = anyNonFemale;
      return anyNonFemale;
    }
    if (enVoices.length > 0) {
      this.selectedVoice = enVoices[0];
      return enVoices[0];
    }

    this.selectedVoice = this.availableVoices[0] || null;
    return this.selectedVoice;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices;
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    if (!this.selectedVoice && this.availableVoices.length > 0) {
      this.resolveBestVoice();
    }
    return this.selectedVoice;
  }

  public setPreferredVoice(voiceURI: string) {
    this.settings.preferredVoiceURI = voiceURI;
    this.saveSettings();
    const match = this.availableVoices.find((v) => v.voiceURI === voiceURI);
    if (match) {
      this.selectedVoice = match;
    }
    this.notify();
  }

  public setPreferredEngine(engine: "elevenlabs" | "speech_synthesis") {
    this.settings.preferredEngine = engine;
    this.saveSettings();
    this.notify();
  }

  public getSettings(): ChiefSettings {
    return { ...this.settings };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getState() {
    return {
      isSpeaking: this.isSpeaking,
      currentEmotion: this.currentEmotion,
      currentDialogue: this.currentDialogue,
      voiceEnabled: this.settings.voiceEnabled,
      volume: this.settings.volume,
      showText: this.settings.showText,
      selectedVoiceName: this.selectedVoice ? this.selectedVoice.name : null,
      activeEngine: this.activeEngine,
      elevenLabsConfigured: this.elevenLabsConfigured,
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public setVoiceEnabled(enabled: boolean) {
    this.settings.voiceEnabled = enabled;
    this.saveSettings();
    if (!enabled) {
      this.cancelSpeech();
    }
    this.notify();
  }

  public setShowText(show: boolean) {
    this.settings.showText = show;
    this.saveSettings();
    this.notify();
  }

  public setVolume(volume: number) {
    const val = Math.max(0, Math.min(1, volume));
    this.settings.volume = val;
    if (this.currentAudio) {
      this.currentAudio.volume = val;
    }
    this.saveSettings();
    this.notify();
  }

  public setRate(rate: number) {
    this.settings.rate = Math.max(0.7, Math.min(1.4, rate));
    this.saveSettings();
    this.notify();
  }

  public setPitch(pitch: number) {
    this.settings.pitch = Math.max(0.7, Math.min(1.3, pitch));
    this.saveSettings();
    this.notify();
  }

  public cancelSpeech() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio.onplay = null;
      this.currentAudio.onended = null;
      this.currentAudio.onerror = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isSpeaking = false;
    this.notify();
  }

  public dismissDialogue() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
    this.currentDialogue = null;
    this.currentEmotion = "idle";
    this.currentPriority = 0;
    this.notify();
  }

  private scheduleAutoDismiss(durationMs: number = 5000) {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
    this.dismissTimer = setTimeout(() => {
      if (!this.isSpeaking) {
        this.currentDialogue = null;
        this.currentEmotion = "idle";
        this.currentPriority = 0;
        this.notify();
      }
    }, durationMs);
  }

  public trigger(eventType: ChiefEventType, overridePriority?: number) {
    const list = DIALOGUE_LIBRARY[eventType];
    if (!list || list.length === 0) return;

    // Pick from pool avoiding recent IDs
    let candidates = list.filter((d) => !this.recentDialogueIds.includes(d.id));
    if (candidates.length === 0) candidates = list;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    const priority = overridePriority !== undefined ? overridePriority : chosen.priority;

    // If currently speaking a strictly higher priority event, ignore lower priority
    if (this.isSpeaking && priority < this.currentPriority) {
      return;
    }

    // Cancel existing lower/equal speech immediately to prevent overlaps
    this.cancelSpeech();

    // Record recent ID (keep last 6)
    this.recentDialogueIds.push(chosen.id);
    if (this.recentDialogueIds.length > 6) {
      this.recentDialogueIds.shift();
    }

    this.currentDialogue = chosen;
    this.currentEmotion = chosen.emotion;
    this.currentPriority = priority;
    this.notify();

    // Play via ElevenLabs AI voice or fallback
    this.playDialogue(chosen, eventType);
  }

  private async playDialogue(dialogue: ChiefDialogue, eventType?: ChiefEventType) {
    if (!this.settings.voiceEnabled || this.settings.volume <= 0) {
      this.scheduleAutoDismiss(4500);
      return;
    }

    // 1. Try ElevenLabs AI Voice if preferred and available
    if (this.settings.preferredEngine !== "speech_synthesis" && this.elevenLabsAvailable) {
      const played = await this.playWithElevenLabs(dialogue, eventType);
      if (played) return;
    }

    // 2. Fallback to Browser Speech Synthesis
    this.playWithSpeechSynthesis(dialogue);
  }

  private async playWithElevenLabs(
    dialogue: ChiefDialogue,
    eventType?: ChiefEventType
  ): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const controller = new AbortController();
    this.abortController = controller;

    try {
      const cacheKey = `${dialogue.id}:${dialogue.emotion}:${dialogue.text}`;
      let objectUrl = this.audioBlobCache.get(cacheKey);

      if (!objectUrl) {
        const res = await fetch("/api/chief/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: dialogue.text,
            emotion: dialogue.emotion,
            eventType,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 503) {
            this.elevenLabsAvailable = false;
          }
          return false;
        }

        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);

        // Keep cache manageable (max 50 cached audio clips)
        if (this.audioBlobCache.size >= 50) {
          const firstKey = this.audioBlobCache.keys().next().value;
          if (firstKey) {
            const oldUrl = this.audioBlobCache.get(firstKey);
            if (oldUrl) URL.revokeObjectURL(oldUrl);
            this.audioBlobCache.delete(firstKey);
          }
        }
        this.audioBlobCache.set(cacheKey, objectUrl);
      }

      if (controller.signal.aborted) {
        return true;
      }

      if (!this.currentAudio) {
        this.currentAudio = new Audio();
      }
      const audio = this.currentAudio;
      audio.src = objectUrl;
      audio.volume = this.settings.volume;

      return await new Promise<boolean>((resolve) => {
        audio.onplay = () => {
          this.isSpeaking = true;
          this.activeEngine = "elevenlabs";
          this.notify();
        };

        audio.onended = () => {
          this.isSpeaking = false;
          this.notify();
          this.scheduleAutoDismiss(1800);
          resolve(true);
        };

        audio.onerror = () => {
          resolve(false);
        };

        audio.play().catch(() => {
          resolve(false);
        });
      });
    } catch {
      if (controller.signal.aborted) return true;
      return false;
    } finally {
      if (this.abortController === controller) {
        this.abortController = null;
      }
    }
  }

  private playWithSpeechSynthesis(dialogue: ChiefDialogue) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.scheduleAutoDismiss(4500);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(dialogue.text);
      const voice = this.getSelectedVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
      utterance.rate = this.settings.rate || 0.95;
      utterance.pitch = this.settings.pitch || 0.90;
      utterance.volume = this.settings.volume;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.activeEngine = "speech_synthesis";
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.notify();
        this.scheduleAutoDismiss(1800);
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.notify();
        this.scheduleAutoDismiss(3000);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      this.scheduleAutoDismiss(4500);
    }
  }

  public async testVoice() {
    this.cancelSpeech();
    const testLine =
      "Operations Commander CHIEF online and ready. AI voice synthesis test successful.";
    const testDialogue: ChiefDialogue = {
      id: "test_voice",
      text: testLine,
      emotion: "happy",
      priority: 10,
    };
    this.currentDialogue = testDialogue;
    this.currentEmotion = "happy";
    this.currentPriority = 10;
    this.notify();

    await this.playDialogue(testDialogue);
    this.notify();
  }

  public async replayLast() {
    if (!this.currentDialogue) return;
    const last = this.currentDialogue;
    this.cancelSpeech();
    this.currentEmotion = last.emotion;
    this.notify();

    await this.playDialogue(last);
    this.notify();
  }
}

export const chiefSpeech = new SpeechManager();
