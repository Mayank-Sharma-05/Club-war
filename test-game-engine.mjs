import { PHISHING_CHALLENGE_SETS } from "./src/lib/phishing-data.ts";
import { OUTLIER_DATASETS } from "./src/lib/outlier-data.ts";
import {
  generateUniquePassword,
  validateGuess,
  evaluateGuess,
  getCodeScoreForAttempt,
} from "./src/lib/password-engine.ts";
import { getComboMultiplier, calculateClassification } from "./src/lib/scoring.ts";

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    passCount++;
    console.log(`  ✓ ${message}`);
  } else {
    failCount++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("=== RUNNING GAME ENGINE TEST SUITE ===");

// 1. Phishing Dataset Validation
console.log("\n[TEST 1] Phishing Challenge Sets Validation");
assert(PHISHING_CHALLENGE_SETS.length >= 16, `Found ${PHISHING_CHALLENGE_SETS.length} challenge sets (>= 16 required)`);

PHISHING_CHALLENGE_SETS.forEach((set, idx) => {
  assert(set.emails.length === 4, `Set #${idx + 1} (${set.id}) has exactly 4 emails`);
  const phishingEmails = set.emails.filter((e) => e.isPhishing);
  assert(phishingEmails.length === 1, `Set #${idx + 1} has exactly 1 phishing email`);
  const legitimateEmails = set.emails.filter((e) => !e.isPhishing);
  assert(legitimateEmails.length === 3, `Set #${idx + 1} has exactly 3 legitimate emails`);
  
  // Verify body word counts
  set.emails.forEach((email) => {
    const wordCount = email.body.trim().split(/\s+/).length;
    assert(wordCount >= 30 && wordCount <= 85, `Email "${email.subject}" word count (${wordCount}) is realistic`);
  });
});

// 2. Outlier Datasets Validation
console.log("\n[TEST 2] Outlier Datasets Validation");
assert(OUTLIER_DATASETS.length >= 8, `Found ${OUTLIER_DATASETS.length} datasets`);
OUTLIER_DATASETS.forEach((ds) => {
  assert(ds.values.length >= 10 && ds.values.length <= 12, `${ds.title} has 10-12 observations (${ds.values.length})`);
  assert(
    ds.outlierIndices.length === ds.targetOutlierCount,
    `${ds.title} outlier indices count (${ds.outlierIndices.length}) matches target (${ds.targetOutlierCount})`
  );
  ds.outlierIndices.forEach((idx) => {
    assert(idx >= 0 && idx < ds.values.length, `Outlier index ${idx} is within bounds for ${ds.title}`);
  });
});

// 3. Password Generator Validation
console.log("\n[TEST 3] Cryptographic Password Generator Validation");
let sawZeroPrefix = false;
for (let i = 0; i < 200; i++) {
  const pwd = generateUniquePassword();
  assert(pwd.length === 4, `Password "${pwd}" has length 4`);
  assert(/^\d{4}$/.test(pwd), `Password "${pwd}" contains only digits`);
  const uniqueChars = new Set(pwd.split(""));
  assert(uniqueChars.size === 4, `Password "${pwd}" has 4 distinct unique digits`);
  if (pwd.startsWith("0")) sawZeroPrefix = true;
}
assert(sawZeroPrefix, "Verified passwords can begin with '0'");

// 4. Wordle Feedback Logic Validation
console.log("\n[TEST 4] Vault Wordle Feedback Logic");
const secret = "5831";
const fb1 = evaluateGuess("1234", secret);
assert(fb1[0] === "yellow", "Digit '1' in '1234' is yellow (present in secret, wrong pos)");
assert(fb1[1] === "red", "Digit '2' in '1234' is red (not in secret)");
assert(fb1[2] === "green", "Digit '3' in '1234' is green (correct pos)");
assert(fb1[3] === "red", "Digit '4' in '1234' is red (not in secret)");

const fb2 = evaluateGuess("5834", secret);
assert(fb2[0] === "green" && fb2[1] === "green" && fb2[2] === "green" && fb2[3] === "red", "Guess '5834' gives 3 greens, 1 red");

const fb3 = evaluateGuess("5831", secret);
assert(fb3.every((f) => f === "green"), "Exact guess '5831' gives all 4 greens (unlocked)");

// 5. Guess Input Validation
console.log("\n[TEST 5] Input Validation");
assert(!validateGuess("123").valid, "Rejected 3-digit guess");
assert(!validateGuess("12345").valid, "Rejected 5-digit guess");
assert(!validateGuess("1123").valid, "Rejected duplicate digits '1123'");
assert(!validateGuess("12a4").valid, "Rejected non-digit '12a4'");
assert(validateGuess("0123").valid, "Accepted valid unique 4-digit guess starting with 0");

// 6. Attempt Scoring
console.log("\n[TEST 6] Code Attempt Scoring");
assert(getCodeScoreForAttempt(1) === 500, "1st attempt = 500");
assert(getCodeScoreForAttempt(2) === 400, "2nd attempt = 400");
assert(getCodeScoreForAttempt(3) === 300, "3rd attempt = 300");
assert(getCodeScoreForAttempt(4) === 200, "4th attempt = 200");
assert(getCodeScoreForAttempt(5) === 100, "5th attempt = 100");
assert(getCodeScoreForAttempt(6) === 0, "Failed attempt = 0");

// 7. Combo Multipliers
console.log("\n[TEST 7] Combo Multiplier Rules");
assert(getComboMultiplier(0) === 1.0, "0 streak = 1.0x");
assert(getComboMultiplier(1) === 1.0, "1 streak = 1.0x");
assert(getComboMultiplier(2) === 1.25, "2 streak = 1.25x");
assert(getComboMultiplier(3) === 1.5, "3 streak = 1.5x");
assert(getComboMultiplier(4) === 1.5, "4 streak = 1.5x");
assert(getComboMultiplier(5) === 2.0, "5 streak = 2.0x");
assert(getComboMultiplier(8) === 2.0, "8 streak = 2.0x");

// 8. Performance Classifications
console.log("\n[TEST 8] Performance Classifications");
assert(calculateClassification(350) === "ROOKIE ANALYST", "350 = ROOKIE ANALYST");
assert(calculateClassification(400) === "CYBER EXPLORER", "400 = CYBER EXPLORER");
assert(calculateClassification(799) === "CYBER EXPLORER", "799 = CYBER EXPLORER");
assert(calculateClassification(800) === "SECURITY SPECIALIST", "800 = SECURITY SPECIALIST");
assert(calculateClassification(1199) === "SECURITY SPECIALIST", "1199 = SECURITY SPECIALIST");
assert(calculateClassification(1200) === "ELITE HACKER", "1200 = ELITE HACKER");
assert(calculateClassification(1549) === "ELITE HACKER", "1549 = ELITE HACKER");
assert(calculateClassification(1550) === "LEGENDARY DEFENDER", "1550 = LEGENDARY DEFENDER");
assert(calculateClassification(1800) === "LEGENDARY DEFENDER", "1800 = LEGENDARY DEFENDER");

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
