import fs from "fs";
import path from "path";
import ts from "typescript";

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    passCount++;
  } else {
    failCount++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// Helper to dynamically load a TypeScript module using ts.transpileModule
function loadTsModule(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  // Replace type imports and relative imports for evaluation
  const js = ts.transpile(code, {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  });

  const module = { exports: {} };
  const wrapper = new Function("exports", "require", "module", "__filename", "__dirname", js);
  
  const fakeRequire = (reqPath) => {
    if (reqPath.includes("game") || reqPath.includes("chief")) {
      return {};
    }
    const resolved = path.resolve(path.dirname(filePath), reqPath + (reqPath.endsWith(".ts") ? "" : ".ts"));
    if (fs.existsSync(resolved)) {
      return loadTsModule(resolved);
    }
    return {};
  };

  wrapper(module.exports, fakeRequire, module, filePath, path.dirname(filePath));
  return module.exports;
}

console.log("=== COMPREHENSIVE DATA BREACH VERIFICATION SUITE ===\n");

// 1. Phishing Data
console.log("[1] Checking Phishing Scenarios...");
const phishingMod = loadTsModule("./src/lib/phishing-data.ts");
const sets = phishingMod.PHISHING_CHALLENGE_SETS;
assert(Array.isArray(sets) && sets.length >= 16, `Found ${sets?.length} challenge sets (>= 16 required)`);

sets.forEach((set, idx) => {
  assert(set.emails.length === 4, `Scenario #${idx + 1} (${set.id}) has exactly 4 emails`);
  const phishing = set.emails.filter((e) => e.isPhishing);
  assert(phishing.length === 1, `Scenario #${idx + 1} has exactly 1 phishing email`);
  const legit = set.emails.filter((e) => !e.isPhishing);
  assert(legit.length === 3, `Scenario #${idx + 1} has exactly 3 legitimate emails`);

  set.emails.forEach((email) => {
    const words = email.body.trim().split(/\s+/).length;
    assert(words >= 35 && words <= 70, `Email "${email.subject}" word count (${words}) is within optimal 35-70 range`);
    assert(email.senderEmail.length > 5 && email.senderEmail.includes("@"), `Email sender "${email.senderEmail}" is valid`);
  });
});

// 2. Outlier Datasets
console.log("[2] Checking Outlier Datasets...");
const outlierMod = loadTsModule("./src/lib/outlier-data.ts");
const datasets = outlierMod.OUTLIER_DATASETS;
assert(Array.isArray(datasets) && datasets.length >= 8, `Found ${datasets?.length} datasets (>= 8 required)`);

datasets.forEach((ds) => {
  assert(ds.values.length >= 10 && ds.values.length <= 12, `${ds.title} has 10-12 observations (${ds.values.length})`);
  assert(ds.targetOutlierCount === ds.outlierIndices.length, `${ds.title} targets match indices count`);
  assert(ds.targetOutlierCount >= 1 && ds.targetOutlierCount <= 3, `${ds.title} has 1-3 outliers`);
  ds.outlierIndices.forEach((idx) => {
    assert(idx >= 0 && idx < ds.values.length, `Outlier index ${idx} within valid bounds for ${ds.title}`);
  });
});

// 3. Password Engine
console.log("[3] Checking Password Engine & Vault Logic...");
const passMod = loadTsModule("./src/lib/password-engine.ts");
for (let i = 0; i < 20; i++) {
  const pwd = passMod.generateUniquePassword();
  assert(pwd.length === 4, `Generated code length is 4 (${pwd})`);
  assert(new Set(pwd).size === 4, `All 4 digits are unique (${pwd})`);
}

// Wordle evaluation tests
const target = "5831";
const guess1 = "5831";
const eval1 = passMod.evaluateGuess(guess1, target);
assert(eval1.every((f) => f === "green"), "Exact match yields all 4 green digits");

const guess2 = "1385";
const eval2 = passMod.evaluateGuess(guess2, target);
assert(eval2.every((f) => f === "yellow"), "Permutation of digits yields all 4 yellow/amber digits");

const guess3 = "0246";
const eval3 = passMod.evaluateGuess(guess3, target);
assert(eval3.every((f) => f === "red"), "Non-overlapping digits yields all 4 red/gray digits");

// 4. Scoring & Combos
console.log("[4] Checking Scoring & Combo Multipliers...");
const scoreMod = loadTsModule("./src/lib/scoring.ts");
assert(scoreMod.getComboMultiplier(0) === 1.0, "Streak 0 -> 1.0x");
assert(scoreMod.getComboMultiplier(1) === 1.0, "Streak 1 -> 1.0x");
assert(scoreMod.getComboMultiplier(2) === 1.25, "Streak 2 -> 1.25x");
assert(scoreMod.getComboMultiplier(3) === 1.5, "Streak 3 -> 1.5x");
assert(scoreMod.getComboMultiplier(5) === 2.0, "Streak 5 -> 2.0x");
assert(scoreMod.getComboMultiplier(10) === 2.0, "Streak 10 -> 2.0x");

assert(scoreMod.calculateClassification(1600) === "LEGENDARY DEFENDER", ">=1550 is LEGENDARY DEFENDER");
assert(scoreMod.calculateClassification(1250) === "ELITE HACKER", ">=1200 is ELITE HACKER");
assert(scoreMod.calculateClassification(850) === "SECURITY SPECIALIST", ">=800 is SECURITY SPECIALIST");
assert(scoreMod.calculateClassification(450) === "CYBER EXPLORER", ">=400 is CYBER EXPLORER");
assert(scoreMod.calculateClassification(200) === "ROOKIE ANALYST", "<400 is ROOKIE ANALYST");

// 5. CHIEF Dialogue Library
console.log("[5] Checking CHIEF Dialogue Library (10+ Variations per Event)...");
const chiefLibMod = loadTsModule("./src/lib/chief/dialogue-library.ts");
const lib = chiefLibMod.DIALOGUE_LIBRARY;

const REQUIRED_CATEGORIES = [
  "game_start",
  "phishing_correct",
  "phishing_flawless",
  "phishing_wrong",
  "phishing_life_lost",
  "outlier_all_correct",
  "outlier_partial",
  "outlier_wrong",
  "code_multiple_greens",
  "code_no_match",
  "code_last_attempt",
  "code_unlocked",
  "code_failed",
  "combo_streak",
  "timer_warning_60",
  "timer_critical_30",
  "game_victory",
  "game_over_time",
  "game_over_lives",
  "high_score_achieved",
  "comeback",
];

REQUIRED_CATEGORIES.forEach((cat) => {
  const items = lib[cat];
  assert(Array.isArray(items), `Category "${cat}" exists in DIALOGUE_LIBRARY`);
  assert(items && items.length >= 10, `Category "${cat}" has at least 10 variations (has ${items?.length})`);
  items.forEach((item, idx) => {
    assert(item.id && item.id.length > 0, `${cat}[${idx}] has an ID (${item.id})`);
    assert(item.text && item.text.trim().length > 10, `${cat}[${idx}] has meaningful text`);
    assert(item.priority >= 1 && item.priority <= 10, `${cat}[${idx}] priority is between 1-10 (${item.priority})`);
    assert(["idle", "speaking", "happy", "impressed", "sarcastic", "disappointed", "celebrating", "warning"].includes(item.emotion), `${cat}[${idx}] valid emotion: ${item.emotion}`);
  });
});

// Check specific requested lines
console.log("[6] Verifying user-requested signature dialogues...");
const allTexts = Object.values(lib).flat().map((d) => d.text);

const requestedSnippets = [
  "Alright Agent, let's see what you've got. Try not to embarrass the entire security department.",
  "Nice one! Okay, I see some talent here.",
  "Bro... seriously? Even I saw that coming.",
  "One life gone! Come on Agent, we've got a network to save.",
  "OH! Look who's suddenly becoming dangerous!",
  "Beautiful analysis! Your statistics professor would be proud.",
  "That isn't an outlier, Agent. That's just a normal number having a normal day.",
  "You're getting close! Don't start panicking now.",
  "LET'S GO! That's what I'm talking about, Agent!",
  "Well... let's call that a learning experience.",
  "Three missions, zero excuses, absolute domination. Respect!",
];

requestedSnippets.forEach((snippet) => {
  const exists = allTexts.some((t) => t.includes(snippet));
  assert(exists, `Required dialogue present: "${snippet}"`);
});

console.log("\n=======================================================");
console.log(`TOTAL PASSED: ${passCount}`);
console.log(`TOTAL FAILED: ${failCount}`);
console.log("=======================================================");

if (failCount > 0) {
  process.exit(1);
}
