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

type Listener = (state: {
  isSpeaking: boolean;
  currentEmotion: ChiefEmotion;
  currentDialogue: ChiefDialogue | null;
  voiceEnabled: boolean;
  volume: number;
  showText: boolean;
  selectedVoiceName: string | null;
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
        showText: this.settings.showText,
        selectedVoiceName: this.selectedVoice?.name || null,
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

  public setShowText(show: boolean) {
    this.settings.showText = show;
    this.saveSettings();
    this.notify();
  }

  public setVolume(volume: number) {
    this.settings.volume = Math.max(0, Math.min(1, volume));
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

    // Pick from pool avoiding the last 5 recent IDs
    let candidates = list.filter((d) => !this.recentDialogueIds.includes(d.id));
    if (candidates.length === 0) candidates = list;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    const priority = overridePriority !== undefined ? overridePriority : chosen.priority;

    // If currently speaking a strictly higher priority event, ignore lower priority
    if (this.isSpeaking && priority < this.currentPriority) {
      return;
    }

    // Cancel existing lower/equal speech and play new chosen dialogue
    this.cancelSpeech();

    // Record recent ID (keep last 6)
    this.recentDialogueIds.push(chosen.id);
    if (this.recentDialogueIds.length > 6) {
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
          this.notify();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.notify();
          // Keep dialogue bubble visible for 1.8 seconds after speech completes, then dismiss
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
    } else {
      // Voice muted or unavailable: display dialogue text for 4.5 seconds
      this.scheduleAutoDismiss(4500);
    }

    this.notify();
  }

  public testVoice() {
    this.cancelSpeech();
    const testLine = "Operations Commander CHIEF online and ready. Voice synthesis test successful.";
    this.currentDialogue = {
      id: "test_voice",
      text: testLine,
      emotion: "happy",
      priority: 10,
    };
    this.currentEmotion = "happy";
    this.currentPriority = 10;

    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      try {
        const utterance = new SpeechSynthesisUtterance(testLine);
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
          this.notify();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.notify();
          this.scheduleAutoDismiss(2000);
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          this.notify();
          this.scheduleAutoDismiss(2000);
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
        this.scheduleAutoDismiss(3000);
      }
    } else {
      this.scheduleAutoDismiss(3000);
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
      }
    }
    this.scheduleAutoDismiss(4500);
    this.notify();
  }
}

export const chiefSpeech = new SpeechManager();
