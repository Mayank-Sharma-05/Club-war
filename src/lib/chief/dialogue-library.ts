import { ChiefEventType, ChiefDialogue } from "@/types/chief";

export const DIALOGUE_LIBRARY: Record<ChiefEventType, ChiefDialogue[]> = {
  game_start: [
    {
      id: "gs_1",
      text: "Welcome, Agent. Three compromised layers, three minutes, and one very anxious security team. Let's get to work.",
      emotion: "speaking",
      priority: 2,
    },
    {
      id: "gs_2",
      text: "Systems online. Try not to click on shady links, Agent. I have a reputation to protect here.",
      emotion: "sarcastic",
      priority: 2,
    },
    {
      id: "gs_3",
      text: "Alright, Analyst. Show me what you've got. The entire campus network is resting on your shoulders.",
      emotion: "speaking",
      priority: 2,
    },
    {
      id: "gs_4",
      text: "Countdown initiated. Keep calm, read carefully, and remember: if in doubt, don't trust the email from Nigeria.",
      emotion: "sarcastic",
      priority: 2,
    },
  ],

  phishing_correct: [
    {
      id: "pc_1",
      text: "Nice catch, Agent! That phishing attempt was never getting past your radar.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "pc_2",
      text: "Finally, someone on campus who actually reads before clicking! Respect.",
      emotion: "impressed",
      priority: 3,
    },
    {
      id: "pc_3",
      text: "Threat neutralized. Those cyber scammers are crying in a dark basement right now.",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "pc_4",
      text: "Spot on! The deceptive domain and fake urgency were classic red flags.",
      emotion: "speaking",
      priority: 3,
    },
    {
      id: "pc_5",
      text: "Look at you go! Security analyst of the year contender right here.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "pc_6",
      text: "Direct hit. You spotted the fake certificate immediately.",
      emotion: "impressed",
      priority: 3,
    },
    {
      id: "pc_7",
      text: "Clean deduction, Agent. Layer 1 perimeter is officially secure.",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "pc_8",
      text: "Beautiful! You saw through the bait without batting an eye.",
      emotion: "happy",
      priority: 3,
    },
  ],

  phishing_flawless: [
    {
      id: "pfl_1",
      text: "Flawless first pick! Zero lives lost and full bonus points in the bag.",
      emotion: "celebrating",
      priority: 4,
    },
    {
      id: "pfl_2",
      text: "First try perfection! Okay, maybe you do know what you're doing, Agent.",
      emotion: "impressed",
      priority: 4,
    },
    {
      id: "pfl_3",
      text: "One shot, one kill. The security division sends their heartfelt gratitude.",
      emotion: "celebrating",
      priority: 4,
    },
    {
      id: "pfl_4",
      text: "A clean sweep on the emails! Flawless intuition, Agent.",
      emotion: "happy",
      priority: 4,
    },
  ],

  phishing_wrong: [
    {
      id: "pw_1",
      text: "Seriously? You trusted that one? Interesting career choice, Agent.",
      emotion: "sarcastic",
      priority: 3,
    },
    {
      id: "pw_2",
      text: "That was a legitimate campus email. Even the sender is confused right now.",
      emotion: "disappointed",
      priority: 3,
    },
    {
      id: "pw_3",
      text: "Agent, the hackers are popping champagne in their chat room because of that click.",
      emotion: "sarcastic",
      priority: 3,
    },
    {
      id: "pw_4",
      text: "Ouch. That was totally harmless university administrative mail. Read closer!",
      emotion: "warning",
      priority: 3,
    },
    {
      id: "pw_5",
      text: "Not quite! You just flagged the Dean's harmless newsletter as malware.",
      emotion: "sarcastic",
      priority: 3,
    },
    {
      id: "pw_6",
      text: "Check the domain name next time, Agent! That one was innocent.",
      emotion: "warning",
      priority: 3,
    },
    {
      id: "pw_7",
      text: "Wrong email! Breathe, focus your eyes, and look for the suspicious indicators.",
      emotion: "speaking",
      priority: 3,
    },
    {
      id: "pw_8",
      text: "Nope. That was genuine course notification mail. Try another card!",
      emotion: "disappointed",
      priority: 3,
    },
  ],

  phishing_life_lost: [
    {
      id: "pl_1",
      text: "One life burned! We are running low on second chances, Agent.",
      emotion: "warning",
      priority: 4,
    },
    {
      id: "pl_2",
      text: "Integrity shield down! Two strikes left, let's make them count.",
      emotion: "warning",
      priority: 4,
    },
    {
      id: "pl_3",
      text: "Shield compromised! Focus up, Agent. The clock is still ticking.",
      emotion: "warning",
      priority: 4,
    },
  ],

  outlier_all_correct: [
    {
      id: "oac_1",
      text: "Beautiful analysis! Those anomalies didn't stand a chance against your eye.",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "oac_2",
      text: "Okay, Agent! Your statistical intuition is genuinely impressive. Flawless detection!",
      emotion: "impressed",
      priority: 3,
    },
    {
      id: "oac_3",
      text: "That's the kind of precision analysis I expect from my top operative.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "oac_4",
      text: "Nailed every single outlier with zero false alarms. Pure data science excellence.",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "oac_5",
      text: "Clean catch! Those numbers were deviating by miles and you spotted them all.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "oac_6",
      text: "Telemetry sanitized. The cluster nodes are running smooth and balanced again.",
      emotion: "speaking",
      priority: 3,
    },
    {
      id: "oac_7",
      text: "Textbook standard deviation detection. Your statistics professor would shed a tear.",
      emotion: "impressed",
      priority: 3,
    },
    {
      id: "oac_8",
      text: "Boom! All outliers isolated. Maximum bonus points locked in.",
      emotion: "celebrating",
      priority: 3,
    },
  ],

  outlier_partial: [
    {
      id: "op_1",
      text: "Partial detection, Agent. You got some points, but a couple of false alarms slipped in.",
      emotion: "speaking",
      priority: 2,
    },
    {
      id: "op_2",
      text: "Acceptable analysis. Not flawless, but enough to clear the telemetry gate.",
      emotion: "speaking",
      priority: 2,
    },
    {
      id: "op_3",
      text: "Some correct, some normal values flagged. We'll take the score and move forward.",
      emotion: "sarcastic",
      priority: 2,
    },
  ],

  outlier_wrong: [
    {
      id: "ow_1",
      text: "Agent, that's not an outlier. That's just an ordinary number living its best life.",
      emotion: "sarcastic",
      priority: 3,
    },
    {
      id: "ow_2",
      text: "Your statistics professor just felt a sudden, profound disturbance in the force.",
      emotion: "sarcastic",
      priority: 3,
    },
    {
      id: "ow_3",
      text: "I've seen random number generators make more accurate guesses, Agent.",
      emotion: "disappointed",
      priority: 3,
    },
    {
      id: "ow_4",
      text: "Negative points on false alarms! Be selective, look for the extreme spikes.",
      emotion: "warning",
      priority: 3,
    },
  ],

  code_multiple_greens: [
    {
      id: "cmg_1",
      text: "Now we're talking! Multiple green digits. You are dangerously close to breaking the vault.",
      emotion: "impressed",
      priority: 3,
    },
    {
      id: "cmg_2",
      text: "Excellent deduction, Agent! The vault tumblers are beginning to panic.",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "cmg_3",
      text: "Hot on the trail! Keep those green positions and shuffle the remaining possibilities.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "cmg_4",
      text: "Great progress! Lock in those green digits and crack this lock.",
      emotion: "speaking",
      priority: 3,
    },
  ],

  code_no_match: [
    {
      id: "cnm_1",
      text: "Four digits, four reds, zero progress. Bold exploratory strategy, Agent.",
      emotion: "sarcastic",
      priority: 2,
    },
    {
      id: "cnm_2",
      text: "Well, on the bright side, we've successfully eliminated four digits from the universe.",
      emotion: "sarcastic",
      priority: 2,
    },
    {
      id: "cnm_3",
      text: "Not a single matching digit! Time to pivot your numeric hypotheses.",
      emotion: "warning",
      priority: 2,
    },
  ],

  code_last_attempt: [
    {
      id: "cla_1",
      text: "Final attempt, Agent! No pressure... just the entire central mainframe on the line.",
      emotion: "warning",
      priority: 4,
    },
    {
      id: "cla_2",
      text: "Last attempt! Take a breath, review your yellow and green hints, and dial it in.",
      emotion: "speaking",
      priority: 4,
    },
    {
      id: "cla_3",
      text: "This is it. Fifth and final chance before complete security lockout. Make it count!",
      emotion: "warning",
      priority: 4,
    },
  ],

  code_unlocked: [
    {
      id: "cu_1",
      text: "ACCESS GRANTED! Agent, you are officially my favorite human operative today.",
      emotion: "celebrating",
      priority: 5,
    },
    {
      id: "cu_2",
      text: "VAULT UNLOCKED! Now that is how you execute a surgical security breach!",
      emotion: "celebrating",
      priority: 5,
    },
    {
      id: "cu_3",
      text: "The cryptographic core is open! Outstanding deductive reasoning, Agent.",
      emotion: "impressed",
      priority: 5,
    },
    {
      id: "cu_4",
      text: "Lock broken! All three security layers have been systematically restored.",
      emotion: "celebrating",
      priority: 5,
    },
  ],

  code_failed: [
    {
      id: "cf_1",
      text: "Five attempts exhausted and the vault is still sealed. Impressive, in the wrong direction.",
      emotion: "sarcastic",
      priority: 4,
    },
    {
      id: "cf_2",
      text: "The vault wins this round. We'll just pretend nobody saw that attempt history.",
      emotion: "disappointed",
      priority: 4,
    },
    {
      id: "cf_3",
      text: "Security lock engaged. The cryptographic vault proved too stubborn this time.",
      emotion: "speaking",
      priority: 4,
    },
  ],

  combo_streak: [
    {
      id: "cs_1",
      text: "Combo multiplier engaged! You're on fire, Agent!",
      emotion: "celebrating",
      priority: 3,
    },
    {
      id: "cs_2",
      text: "Multiplier active! Keep the momentum going for maximum score.",
      emotion: "happy",
      priority: 3,
    },
    {
      id: "cs_3",
      text: "Streak bonus! You're executing these tasks like a seasoned veteran.",
      emotion: "impressed",
      priority: 3,
    },
  ],

  timer_warning_60: [
    {
      id: "tw_1",
      text: "Sixty seconds on the global clock! Step on the gas, Agent.",
      emotion: "warning",
      priority: 4,
    },
    {
      id: "tw_2",
      text: "One minute remaining! Pick up the operational pace.",
      emotion: "warning",
      priority: 4,
    },
  ],

  timer_critical_30: [
    {
      id: "tc_1",
      text: "Thirty seconds remaining! Less overthinking, more saving the network!",
      emotion: "warning",
      priority: 5,
    },
    {
      id: "tc_2",
      text: "Critical time window! Thirty seconds left before total system collapse!",
      emotion: "warning",
      priority: 5,
    },
  ],

  game_victory: [
    {
      id: "gv_1",
      text: "Mission complete! The network is safe, threats are purged, and you're a legend.",
      emotion: "celebrating",
      priority: 5,
    },
    {
      id: "gv_2",
      text: "Three layers cleared before time expired. Take a bow, Agent. Excellent performance.",
      emotion: "impressed",
      priority: 5,
    },
    {
      id: "gv_3",
      text: "All threats neutralized with time to spare! Now let's check your tournament ranking.",
      emotion: "celebrating",
      priority: 5,
    },
  ],

  game_over_time: [
    {
      id: "got_1",
      text: "Time expired! The breach sealed itself... with us locked on the outside.",
      emotion: "disappointed",
      priority: 5,
    },
    {
      id: "got_2",
      text: "Countdown hit zero. Next time, less staring at the screen and faster decisions!",
      emotion: "sarcastic",
      priority: 5,
    },
  ],

  game_over_lives: [
    {
      id: "gol_1",
      text: "All three lives lost. Well, Agent, at least you gave the attackers a good laugh.",
      emotion: "sarcastic",
      priority: 5,
    },
    {
      id: "gol_2",
      text: "Defensive integrity collapsed. Reboot and give it another shot!",
      emotion: "disappointed",
      priority: 5,
    },
  ],

  high_score_achieved: [
    {
      id: "hsa_1",
      text: "NEW HIGH SCORE! Okay, Agent, I officially take back every sarcastic comment I ever made.",
      emotion: "celebrating",
      priority: 5,
    },
    {
      id: "hsa_2",
      text: "Look at that leaderboard! You just conquered the top spot on this tournament station.",
      emotion: "celebrating",
      priority: 5,
    },
  ],

  comeback: [
    {
      id: "cb_1",
      text: "After that email disaster earlier, I was worried. But this comeback? Absolute respect.",
      emotion: "impressed",
      priority: 4,
    },
    {
      id: "cb_2",
      text: "Clutch recovery, Agent! That's how true cyber champions bounce back from a rough start.",
      emotion: "happy",
      priority: 4,
    },
  ],
};
