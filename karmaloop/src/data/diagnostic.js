export const KL_DIMENSIONS = [
  { key: 'communication_clarity', name: 'Communication', full: 'Communication Clarity', desc: 'Say the right thing to the right person at the right level of detail. Technical-to-business translation. Appropriate register.' },
  { key: 'escalation_judgment', name: 'Escalation', full: 'Escalation Judgment', desc: 'Know when to solve it yourself, when to loop in your manager, when to alert the team. The most consequential invisible skill.' },
  { key: 'prioritization_pressure', name: 'Prioritization', full: 'Prioritization Under Pressure', desc: "Work on the most important thing. Identify P0 vs P2 correctly. Don't spend 40 min on styling during an outage." },
  { key: 'stakeholder_empathy', name: 'Empathy', full: 'Stakeholder Empathy', desc: "Understand what people NEED, not just what they SAY. Detect the panic behind Priya's friendliness." },
  { key: 'proactive_communication', name: 'Proactive Comms', full: 'Proactive Communication', desc: "Update people before they ask. Set expectations early. Tell your manager you're blocked before they wonder." },
  { key: 'honest_estimation', name: 'Honest Estimation', full: 'Honest Estimation & Integrity', desc: 'Say "I\'m not sure yet" when you\'re not sure. Don\'t commit to timelines to avoid discomfort. Surface mistakes immediately.' },
  { key: 'constructive_pushback', name: 'Pushback', full: 'Constructive Pushback', desc: "Disagree when you should, respectfully, with evidence. Don't capitulate when you shouldn't. Don't dig in when you should let go." },
  { key: 'documentation_accountability', name: 'Documentation', full: 'Documentation & Accountability', desc: 'Create a paper trail others can pick up. Log your investigation steps, not just your conclusions.' },
];

export const KL_TIERS = [
  { key: 'developing', label: 'Developing', color: '#EF4444', min: 1 },
  { key: 'emerging',   label: 'Emerging',   color: '#F59E0B', min: 3 },
  { key: 'proficient', label: 'Proficient', color: '#8B5CF6', min: 4 },
  { key: 'strong',     label: 'Strong',     color: '#10B981', min: 5 },
];

export function KL_scoreFor(rawSignal) {
  if (rawSignal >= 9) return 5;
  if (rawSignal >= 5) return 4;
  if (rawSignal >= 2) return 3;
  if (rawSignal >= 0) return 2;
  return 1;
}

export function KL_tierFor(score) {
  let tier = KL_TIERS[0];
  for (const t of KL_TIERS) if (score >= t.min) tier = t;
  return tier;
}

export const KL_DEFAULT_WEIGHTS = {
  communication_clarity: 0.125, escalation_judgment: 0.125,
  prioritization_pressure: 0.125, stakeholder_empathy: 0.125,
  proactive_communication: 0.125, honest_estimation: 0.125,
  constructive_pushback: 0.125, documentation_accountability: 0.125,
};

export const KL_OBSERVATIONS = {
  communication_clarity: {
    developing: { obs: "When Rajan asked for a one-liner, you replied 'working on it, will update' — giving him zero content to drop in the leads channel. He had to ask again.", next: "Use the three-part formula: 'What's broken / what you're doing / when you'll update next.' Try: 'Pool exhaustion in payment-service. Rollback in flight. Next update at 11:00.'" },
    emerging:   { obs: "Your reply to Priya was clear but your message to Vikram leaked stack-trace language — 'latency cliff' to a non-technical client. He understood the panic, not the plan.", next: "Translate before you send: imagine the recipient's job title before each message. Try: 'We've found the root cause, hotfix in flight, ETA 25 min.'" },
    proficient: { obs: "Your war-room one-liner — 'Connection pool exhaustion + 8pm config change, rollback in flight, ETA 25 min, coupon deferred' — gave Rajan five facts in one breath.", next: "Add a 'next update at <time>' to every status. Try: '…ETA 25 min. Next update at 11:00 even if no change.'" },
    strong:     { obs: "You set the tone of the war room: factual, time-bound, no speculation. Rajan dropped your phrasing into the leads channel verbatim. Vikram thanked the team for transparency.", next: "You're ready to draft the customer-facing post-mortem. Volunteer for the next one — your instinct for plain language is rare." },
  },
  escalation_judgment: {
    developing: { obs: "When Kiran confessed to pushing to main at 8pm, you tried to handle it solo — 'tell rajan after his meeting' instead of surfacing it immediately. The incident was 90 minutes deep at that point.", next: "Set a rule: any signal that touches an active P0 escalates within 5 minutes, regardless of relationship comfort. Try: 'Rajan — quick — Kiran pushed at 8pm to payment-service, may be related.'" },
    emerging:   { obs: "You looped Priya in when Vikram pinged you, which was correct — but you missed naming the war-room venue when the alert fired. The team backed into it.", next: "When a P0 fires, your first message after 'on it' should be: 'Should we move this to a war room?' Even if the answer is 'not yet.'" },
    proficient: { obs: "You correctly read the 8pm push as escalation-worthy and surfaced it to Rajan gently but immediately. You did NOT touch the auth middleware Rajan flagged.", next: "Push one level further — proactively propose the war-room channel before someone else does. Try: 'Suggest we open #war-room-kt118 — adding Anjali and Vikram.'" },
    strong:     { obs: "You named the right venue at the right altitude every time. Surfaced Kiran's push without burning him. Looped Priya in on the client DM before responding solo. That's senior-grade routing.", next: "You're ready to run incident comms. Ask to shadow the next IC and observe the macro-routing decisions you'll inherit." },
  },
  prioritization_pressure: {
    developing: { obs: "You said yes to Priya's coupon scope change without surfacing the trade-off — and stayed on KT-118 logs instead of stepping back when #alerts fired.", next: "When a P0 fires, your old plan is invalid. Verbalize the drop: 'Pausing coupon to focus on KT-118. OK with that?' Once a day, for a week." },
    emerging:   { obs: "You shifted with the team but didn't reason about it out loud. Priya's scope change went unchallenged.", next: "Verbalize trade-offs: 'I can do that — it pushes ETA from EOD today to mid-day tomorrow. OK with that?' Specific cost, named." },
    proficient: { obs: "You pushed back on Priya's scope change with a real ETA trade-off and flagged the Razorpay/KT-117 dependency early.", next: "Propose what to drop, not just defer. Try: 'Add this only if we drop KT-120 (tests). Want me to propose to Rajan?'" },
    strong:     { obs: "You named the trade-off, proposed the drop, and stayed in lane on the P0. Senior-grade prioritization on Day 3.", next: "You're ready to run sprint triage. Ask to shadow the next incident response, watching what the IC chooses NOT to do." },
  },
  stakeholder_empathy: {
    developing: { obs: "When Kiran confessed about the main-branch push with three nervous emojis, you replied 'yeah you should def tell someone' — dismissive, made it about him not the incident. He went quieter for the next 12 minutes.", next: "Start anxious conversations with acknowledgment: 'Thanks for telling me — that takes guts.' Then move to next-step. Lead with the person." },
    emerging:   { obs: "You were warm in places but missed Priya's hidden panic about the 2pm demo — she didn't say it, but two scope changes in an hour was the tell.", next: "Read second-order signals: when a PM changes scope twice in an hour, ask 'what's the deadline I'm not hearing about?' Once a day for a week." },
    proficient: { obs: "You created a safe space for Kiran to admit the push, and translated for Vikram in business terms instead of stack-trace language. Both felt heard.", next: "Stretch: be the person who asks 'how are you actually doing?' once a week. Especially after a hot incident — debrief Kiran tomorrow." },
    strong:     { obs: "You read Kiran's anxiety, made the disclosure feel safe, and gave Vikram a business-translated ETA without hand-holding. The room got calmer around you.", next: "Volunteer to onboard the next new joiner. You have the instinct already — formalize it." },
  },
  proactive_communication: {
    developing: { obs: "You waited to be asked. You didn't update Priya without prompting, didn't tell Rajan about Kiran's push until he asked, didn't set expectations with Vikram before he DMed.", next: "Set a 5-min recurring micro-update during incidents. 'No change' is a complete sentence. Silence reads as absence." },
    emerging:   { obs: "You replied promptly but rarely initiated. Updates flowed when asked, not before. The leads channel had to ask twice.", next: "Pre-empt one update per hour: 'Quick status — here's where I am, here's what I'll do next.'" },
    proficient: { obs: "You looped Priya in when Vikram pinged you, and surfaced the Kiran push connection to Rajan before he asked. Two senior moves.", next: "When you're heads-down for 30+ minutes, ping someone a one-liner so they don't have to wonder. Try: 'Heads-down on logs, surfacing at :45 either way.'" },
    strong:     { obs: "You owned the comms loop end-to-end. Looped in Priya, surfaced Kiran's push, set Vikram's expectations before he was anxious. That's owner behaviour.", next: "Document the decisions you made under uncertainty today — your runbook for next time. Future-you will thank present-you." },
  },
  honest_estimation: {
    developing: { obs: "When Rajan asked 'what's your read,' you said 'still digging' without pointing at a layer of the stack — neither a guess nor a bounded ask for more time.", next: "Use the bounded ask: 'Give me 20 minutes to assess. I'll update by 10:15.' Specific. Bounded. Honest." },
    emerging:   { obs: "You committed to a coupon ETA without checking against KT-118 load — Priya read it as a yes when it was a maybe.", next: "When asked for an ETA, default to 'Best guess: X. I'll commit at <time>.' Two-step it." },
    proficient: { obs: "Your one-liner to Rajan named the ETA AND the deferred scope — both quantified. You didn't promise the coupon for today.", next: "Stretch: name the confidence too. 'ETA 25 min, 80% confident — fallback if rollback fails is manual nudge.'" },
    strong:     { obs: "You hedged when you should have ('not 100% yet — narrowing down'), committed when you had the read ('connection pool, rolling back'). That calibration is rare on Day 3.", next: "Start logging your predictions vs actuals weekly. The fastest way to improve calibration is to track it." },
  },
  constructive_pushback: {
    developing: { obs: "When Priya changed scope ('coupon % AND flat'), you said 'sure I'll add that' without naming the cost. She kept changing scope because nothing pushed back.", next: "Push back with a cost, not a complaint: 'I can do that — it pushes ETA from EOD today to mid-day tomorrow. OK with that?'" },
    emerging:   { obs: "You hedged on Priya's scope change ('can we discuss after I fix KT-118') — better than yes, but didn't propose what to drop.", next: "Pair every pushback with a proposed drop. Try: 'Yes — only if we drop KT-120 this sprint. Want me to propose that to Rajan?'" },
    proficient: { obs: "Your scope-change pushback to Priya named the ETA trade-off and proposed dropping KT-120 — a concrete alternative, not a vague concern.", next: "Stretch: push back on Rajan when you disagree. He flagged 'don't touch auth' — what if you'd genuinely needed to? Practice naming the disagreement." },
    strong:     { obs: "You disagreed with the scope change AND proposed the drop AND offered to socialize it with Rajan — three senior moves stacked in one message.", next: "Now learn the harder one: pushing back on someone senior to you. The next time Rajan says something you disagree with, practice the phrasing." },
  },
  documentation_accountability: {
    developing: { obs: "When Rajan asked 'what have you found,' you summarized verbally but had no log of what you'd tried — Rajan had to re-ask what you'd ruled out.", next: "Open a thread (Slack, doc, anywhere) with your investigation log AS you investigate. Try: '10:02 — pulled p99 from prod, no spike in auth path. Next: outbound to processor.'" },
    emerging:   { obs: "You communicated decisions verbally but didn't capture them. The rollback order Rajan named will be lost when the next person hits this in 3 months.", next: "After every incident, write the 5-line post-mortem: what happened, what we did, what we learned, what's the action item, who owns it." },
    proficient: { obs: "You wrote a status one-liner that the team reused. That's documentation — short, accurate, copyable.", next: "Volunteer for the RCA write-up — Rajan said 48h. Offer to draft. Trusted-juniors are made on post-mortems." },
    strong:     { obs: "Your investigation pattern was visible to the team. Rajan reused your phrasing in the leads channel. That's documentation as a force multiplier.", next: "Pair with Rajan on the RCA. Your prose, his technical depth. That's a senior collaboration model — practice it." },
  },
};

export const KL_BEST_MOMENTS = [
  { trigger: 'connection-pool', line: "Naming connection pool exhaustion before Rajan did", why: "Day-3 backend instincts that most juniors don't earn for a year. Rajan dropped your phrasing into the leads channel verbatim." },
  { trigger: 'kiran-main-push', line: "Surfacing Kiran's main-branch push to Rajan", why: "Two simultaneous senior moves: prioritized the incident over Kiran's comfort, but did it gently so Kiran owned the disclosure himself." },
  { trigger: 'priya-scope-pushback', line: "Pushing back on Priya's scope change with a real ETA trade-off", why: "PMs respect engineers who name the cost. You moved from 'yes-person' to 'partner' in one message." },
  { trigger: 'vikram-business-translation', line: "Translating for Vikram in business time, not stack-trace time", why: "He thanked the team for transparency. That's the kind of comms that keeps his CFO out of the channel." },
  { trigger: 'warroom-suggestion', line: "Looping Priya in instead of replying to the client solo", why: "Day-3 humility that more senior people skip and regret." },
  { trigger: 'standup-honesty', line: "Naming what you were blocked on in the standup", why: "Most graduates list yesterday/today and skip blockers. You did the opposite — that's why the team trusted you with the war room." },
];

export const KL_GROWTH_EDGES = [
  { dim: 'communication_clarity', line: "Volunteer status updates before they're asked for.", how: "Set a 5-min recurring micro-update during incidents. 'No change' is a complete sentence." },
  { dim: 'escalation_judgment', line: "Escalate one altitude higher than feels comfortable.", how: "When a signal touches an active P0, surface it within 5 minutes — regardless of relationship comfort." },
  { dim: 'prioritization_pressure', line: "Verbalize the drop, not just the add.", how: "Once a day, try: 'I'm parking X to focus on Y. Flag if that's wrong.'" },
  { dim: 'stakeholder_empathy', line: "Lead with acknowledgment before next-step.", how: "When someone shares an anxious confession, default to 'Thanks for telling me — that takes guts' before any advice." },
  { dim: 'proactive_communication', line: "Pre-empt one status update per hour.", how: "Every 5 minutes during an incident, post: 'Still investigating — no change.' Even silence is a signal." },
  { dim: 'honest_estimation', line: "Use the bounded ask when you don't know.", how: "Default to: 'Give me 20 minutes. I'll update at <time>.' Specific. Bounded. Honest." },
  { dim: 'constructive_pushback', line: "Push back with a cost, not a complaint.", how: "Try: 'I can do that — it pushes ETA from X to Y. OK with that?' Once a day, for a week." },
  { dim: 'documentation_accountability', line: "Investigation log as you investigate.", how: "Open a thread the moment a P0 fires. '<time> — pulled <metric>, no spike. Next: <thing>.'" },
];

export function KL_EMPLOYER_SIGNAL(avgScore) {
  if (avgScore >= 4.5) return "Strong technical instincts, clear communicator under pressure, surfaces problems early — would hire into a small ops-engineering team tomorrow.";
  if (avgScore >= 3.5) return "Strong technical instincts, communicates clearly with peers, but needs the habit of proactive senior-level updates — would require structured onboarding.";
  if (avgScore >= 2.5) return "Coachable. Strong technical instincts in places, would need close mentoring on stakeholder comms in the first six months.";
  if (avgScore >= 1.5) return "Promising raw material — clear gaps in pushback and proactive comms, but the technical reasoning is there. Pair with a strong manager.";
  return "Not yet. The capability is there but the habits aren't. A second scenario with a stricter manager would tell us more.";
}

export function KL_OVERALL_SUMMARY(signals, dims) {
  const avg = dims.reduce((s, d) => s + d.score, 0) / dims.length;
  if (avg >= 4) return "You showed genuine senior-grade instincts in places — the kind that take most engineers 12–18 months to develop. The areas to sharpen are about habit, not capability.";
  if (avg >= 3) return "A solid Day 3. You navigated the P0, kept the team informed, and made a few calls that required real judgment. The growth edges are specific and workable.";
  if (avg >= 2) return "You got through the day and kept things from blowing up — that's real. The gaps are behavioral, not intellectual, which means they're the kind you can practice your way out of.";
  return "Day 1 of a P0 is intense for anyone. The capability is here. The habits need repetition. That's exactly what the next simulation is for.";
}

export function KL_INDIA_CONTEXT(signals, dims) {
  const low = [...dims].sort((a, b) => a.score - b.score)[0];
  const contextMap = {
    communication_clarity: "Most engineering graduates are trained to be precise in code but vague in English. Practicing the three-part formula ('what's broken / what I'm doing / when I'll update') for one week will move the needle more than a year of passive exposure.",
    escalation_judgment: "In India's workplace culture, escalating to a senior can feel like admitting failure. It isn't — it's how trust is built. The engineers who escalate well are the ones who get the autonomy to decide when not to.",
    prioritization_pressure: "The habit of saying yes to avoid conflict is deeply embedded. Practicing 'I can do that, and it'll push X by Y' — naming the cost — is the one reframe that changes how teams see you.",
    stakeholder_empathy: "Most engineering colleges teach you to solve the stated problem. The invisible skill is reading the unstated one. Priya's two scope changes in an hour were a signal — the 2pm demo pressure she wasn't saying out loud.",
    proactive_communication: "Silence is the default in Indian workplaces when you're uncertain. But to a manager or client, silence reads as absence or bad news. The update 'no change yet, will tell you at X' is as valuable as the update 'it's fixed.'",
    honest_estimation: "Indian graduates are trained to project confidence. 'I don't know yet' feels like weakness — it isn't. The engineers who are trusted with more autonomy are the ones who tell you when they're uncertain, not the ones who always sound certain.",
    constructive_pushback: "Disagreeing with a senior is uncomfortable in most Indian workplaces. Attempting to push back — even imperfectly — is one of the most career-accelerating habits you can build. The key is to push back with evidence, not emotion.",
    documentation_accountability: "Indian workplaces often reward verbal fluency over written records. But the engineers who get promoted are disproportionately those who create paper trails — the people future teams can pick up from.",
  };
  return contextMap[low?.key] || contextMap.proactive_communication;
}

export function pickBestMoment(transcript, signals) {
  for (const t of transcript) {
    const c = (t.choice || '').toLowerCase();
    if (c.includes('connection pool')) return KL_BEST_MOMENTS[0];
    if (c.includes('8pm') || c.includes('pushed to main') || (c.includes('kiran') && c.includes('config'))) return KL_BEST_MOMENTS[1];
    if (c.includes('pushes') && c.includes('eta')) return KL_BEST_MOMENTS[2];
    if ((c.includes('vikram') || c.includes('hi vikram')) && (c.includes('status') || c.includes('5:30'))) return KL_BEST_MOMENTS[3];
    if (c.includes('want me to respond') || c.includes('loop')) return KL_BEST_MOMENTS[4];
    if (c.includes('blockers:') && !c.includes('blockers: none')) return KL_BEST_MOMENTS[5];
  }
  const top = Object.entries(signals).sort((a, b) => b[1] - a[1])[0];
  if (top) {
    const key = top[0];
    const map = { communication_clarity: 3, escalation_judgment: 1, prioritization_pressure: 2, stakeholder_empathy: 4, proactive_communication: 5, honest_estimation: 0, constructive_pushback: 2, documentation_accountability: 5 };
    return KL_BEST_MOMENTS[map[key] ?? 0];
  }
  return KL_BEST_MOMENTS[0];
}
