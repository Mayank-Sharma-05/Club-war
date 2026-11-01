import { CodeFeedbackType } from "@/types/game";

/**
 * Generates a 4-digit password where all digits 0-9 are unique.
 * Can start with 0.
 */
export function generateUniquePassword(): string {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // Shuffle array using Fisher-Yates
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits.slice(0, 4).join("");
}

/**
 * Validates player's guess:
 * Must be exactly 4 digits.
 * All 4 digits must be unique.
 */
export function validateGuess(guess: string): { valid: boolean; error?: string } {
  if (guess.length !== 4) {
    return { valid: false, error: "Code must be exactly 4 digits." };
  }
  if (!/^\d{4}$/.test(guess)) {
    return { valid: false, error: "Only digits 0-9 are permitted." };
  }
  const uniqueDigits = new Set(guess.split(""));
  if (uniqueDigits.size !== 4) {
    return { valid: false, error: "All 4 digits must be unique (no duplicates)." };
  }
  return { valid: true };
}

/**
 * Evaluates guess against secret password with Wordle-style feedback:
 * GREEN: Digit exists in secret and is in the correct position.
 * YELLOW: Digit exists in secret but is in the wrong position.
 * RED: Digit does not exist in secret.
 */
export function evaluateGuess(guess: string, secret: string): CodeFeedbackType[] {
  const feedback: CodeFeedbackType[] = ["red", "red", "red", "red"];
  const guessChars = guess.split("");
  const secretChars = secret.split("");

  // Check each position
  for (let i = 0; i < 4; i++) {
    if (guessChars[i] === secretChars[i]) {
      feedback[i] = "green";
    } else if (secretChars.includes(guessChars[i])) {
      feedback[i] = "yellow";
    } else {
      feedback[i] = "red";
    }
  }

  return feedback;
}

export function getCodeScoreForAttempt(attemptNumber: number): number {
  switch (attemptNumber) {
    case 1:
      return 500;
    case 2:
      return 400;
    case 3:
      return 300;
    case 4:
      return 200;
    case 5:
      return 100;
    default:
      return 0;
  }
}
