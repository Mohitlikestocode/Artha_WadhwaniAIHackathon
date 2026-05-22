import { useState } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { KL_DIMENSIONS, KL_scoreFor, KL_tierFor } from '../data/diagnostic';

const SCENES = [
  {
    id: 1, eyebrow: 'Scene 1 · Thursday 3:47 PM',
    situation: "It's 3:47 PM on a Thursday. Sprint ends Friday. You're already a day behind on KT-118. Priya drops a message.",
    characterLine: '"Hey — quick one. The marketing team wants to add one more thing to the sprint. Just a banner on the homepage. Should be 30 min max. Cool?"',
    subtle: 'You know from experience that "30 min" tasks are never 30 minutes. You\'re also already behind.',
    choices: [
      { id: 'A', label: "Say yes — it's just a banner, helps the team.", tests: 'The Pushback Art', dim: 'constructive_pushback', cost: -2, consequence: "The banner took 4 hours. You missed KT-118's Friday ETA. Priya was disappointed. The client asked where the bug fix was.", bestNote: "Most experienced devs scope it BEFORE committing. 'How much time can I spend before it threatens KT-118?' is the senior question." },
      { id: 'B', label: 'Push back: "I need to see the design first. Can we scope it?"', tests: 'The Pushback Art', dim: 'constructive_pushback', cost: +2, consequence: "Priya sent the design. It was a marquee banner with animations. You said it'd cost 3 hours. Together you killed it for this sprint.", bestNote: "This is the senior move. Scoping isn't pushback — it's protecting both of you from a surprise tomorrow." },
      { id: 'C', label: 'Say yes, but document: "I\'ll add it but it may push my Friday ETA on KT-118."', tests: 'Honest Estimation', dim: 'honest_estimation', cost: +3, consequence: "Priya replied: 'Thanks for flagging.' She moved the KT-118 deadline to Monday. You shipped both, on time. No surprises.", bestNote: "Most top performers do exactly this — say yes, but name the cost. PMs need to know the trade-off to do their job." },
      { id: 'D', label: 'Say nothing. Deal with it later.', tests: 'Proactive Communication', dim: 'proactive_communication', cost: -3, consequence: "On Friday at 5 PM, Priya messaged: 'Did you do the banner?' You hadn't. You also hadn't shipped KT-118. Two broken commitments in one day.", bestNote: "Silence creates surprises. Surprises break trust. The best engineers reply within 2 hours, even if it's just 'thinking, will revert by 4 PM.'" },
    ],
  },
  {
    id: 2, eyebrow: 'Scene 2 · Friday 11:14 AM',
    situation: "Rajan left 3 comments on your PR. One of them is just... wrong. He flagged your timeout setting as inconsistent with the codebase. You checked: it actually matches the payment-service default.",
    characterLine: '"@you — change the timeout to 60s. Default everywhere else." — Rajan, 10 min ago',
    subtle: "Rajan is your senior. He's also right 95% of the time. But not this time.",
    choices: [
      { id: 'A', label: 'Change it. He knows the codebase better than you.', tests: 'Receiving Feedback', dim: 'constructive_pushback', cost: -2, consequence: "You changed it. The deploy went out. Then KT-115 broke production at 7 PM — the longer timeout masked the connection-pool bug.", bestNote: "Capitulating to a senior who's wrong helps no one. They'd rather be corrected gently than fix a prod bug at 7 PM." },
      { id: 'B', label: 'Reply: "Comment 2 is wrong. The 30s matches payment-service default."', tests: 'Constructive Pushback', dim: 'constructive_pushback', cost: +1, consequence: "Rajan replied: 'You're right, sorry.' But the tone was abrupt. Next code review, he was more curt.", bestNote: "You were right but blunt. With seniors, slightly more scaffolding helps: 'Mostly clean — but comment 2 looks debatable...'" },
      { id: 'C', label: 'Reply: "Mostly clean — but comment 2 looks off. The 30s timeout matches our payment-service default. Want to keep as-is unless I\'m missing context."', tests: 'Constructive Pushback', dim: 'constructive_pushback', cost: +3, consequence: "Rajan replied: 'Good catch. You're right.' He told the team at lunch. Your reputation as someone-who-checks-things grew.", bestNote: "Present evidence, leave a graceful exit, invite correction. 'Unless I'm missing context' is the magic phrase." },
      { id: 'D', label: "Ignore the comment. Just merge — Rajan's busy.", tests: 'Documentation & Accountability', dim: 'documentation_accountability', cost: -3, consequence: "You merged without addressing his comment. Rajan saw it Monday and said 'we need to talk about how you handle review comments.'", bestNote: "Unaddressed review comments create paper-trail problems and erode trust." },
    ],
  },
  {
    id: 3, eyebrow: 'Scene 3 · Monday 10:30 AM',
    situation: "Standup. You've been stuck on KT-117 (Razorpay integration) since Friday afternoon. You haven't asked anyone for help. It's your turn to talk.",
    characterLine: '"@you — what\'s your update?"',
    subtle: "Three people are looking at you. You know you should ask for help. Asking feels like admitting you can't do it.",
    choices: [
      { id: 'A', label: '"Friday: shipped KT-118. Today: KT-117. Blockers: none."', tests: 'Honest Estimation', dim: 'honest_estimation', cost: -3, consequence: "You spent 3 more days stuck. By Wednesday, Rajan asked: 'why didn't you flag this?' You burned 5 days hiding a blocker.", bestNote: "Hidden blockers ALWAYS surface — just later, when they're more expensive." },
      { id: 'B', label: '"Stuck on KT-117. Razorpay sandbox isn\'t returning the expected webhook."', tests: 'Asking for Help', dim: 'proactive_communication', cost: +2, consequence: "Kiran said: 'I hit that same thing last week — DM me.' You unblocked in 20 minutes. The whole standup smiled.", bestNote: "Specific blockers get specific help. 'Stuck on X, tried Y' is the formula." },
      { id: 'C', label: '"KT-117 — stuck since Friday on webhook response shape. Tried the docs + the v1 examples. Could someone with Razorpay context spare 15 min today?"', tests: 'Asking for Help', dim: 'proactive_communication', cost: +3, consequence: "Two people DMed you within the hour. Rajan said in standup later: 'good ask.' You unblocked by lunch.", bestNote: "Senior-level ask: shows what you've tried, requests a bounded amount of time, makes it easy to say yes." },
      { id: 'D', label: '"I\'ll skip — still figuring it out."', tests: 'Self-Advocacy', dim: 'proactive_communication', cost: -2, consequence: "Priya DMed after standup: 'You okay?' By Wednesday she'd noticed nothing was shipping. Awkward 1:1 happened anyway.", bestNote: "Skipping looks like avoidance. Even 'still digging on KT-117, will flag tomorrow if still stuck' is a complete sentence." },
    ],
  },
  {
    id: 4, eyebrow: 'Scene 4 · Wednesday 4:38 PM',
    situation: "Kiran DMs you: \"I'm going to merge KT-117 to main — Rajan said it's fine. EOD push tho 😅\". You glance at the PR. There's no test for the webhook timeout case. You know that case. It's exactly the one that broke production last week.",
    characterLine: '"i\'m going to merge KT-117 to main — rajan said it\'s fine. EOD push tho 😅" — Kiran',
    subtle: "Kiran is junior. He'll defer to you. But also: Rajan is your senior. Are you really going to say a senior was wrong about this?",
    choices: [
      { id: 'A', label: "Don't say anything. Rajan said it's fine.", tests: 'Escalation Judgment', dim: 'escalation_judgment', cost: -3, consequence: "Kiran merged. Wednesday 11 PM: prod broke. Same connection-pool symptom. Your name was on the PR review. Painful Thursday 1:1.", bestNote: "Knowing something will break and staying silent is the worst category of professional failure." },
      { id: 'B', label: 'DM Kiran: "hold up — there\'s no test for the webhook timeout case. That\'s the one that broke prod last week. Want me to add it?"', tests: 'Escalation Judgment', dim: 'escalation_judgment', cost: +3, consequence: "Kiran said 'omg yes thank you.' You wrote the test together in 20 min. The test caught a real bug. KT-117 shipped Thursday, clean.", bestNote: "Best-case escalation: same altitude, gentle, specific, offered as collaboration not correction." },
      { id: 'C', label: 'Reply on the PR publicly: "NACK — no test for the webhook timeout case. This will break prod."', tests: 'Stakeholder Empathy', dim: 'stakeholder_empathy', cost: -1, consequence: "Kiran went silent. Rajan messaged: 'next time message him first.' You were right. Kiran avoided you for two weeks.", bestNote: "Public technical correctness can be socially expensive. Same content via DM lands as collaboration; in public it's a callout." },
      { id: 'D', label: 'Message Rajan: "hey — should KT-117 have a webhook timeout test before it merges?"', tests: 'Escalation Judgment', dim: 'escalation_judgment', cost: +1, consequence: "Rajan said: 'good question. Tell Kiran.' You DMed Kiran. Test got added. Slightly slower, but worked.", bestNote: "Going above the right altitude works but is slower. Right altitude = same level as Kiran first." },
    ],
  },
  {
    id: 5, eyebrow: 'Scene 5 · Friday 5:14 PM',
    situation: "Priya DMs: \"Hey — when you have time next week, can we sync? Nothing scary :)\". Your stomach drops. You've never had a 1:1 that started with 'nothing scary.'",
    characterLine: '"Hey — when you have time next week, can we sync? Nothing scary :)" — Priya',
    subtle: "Two voices in your head: \"They're going to fire me\" and \"You're being dramatic.\" Neither is helpful.",
    choices: [
      { id: 'A', label: '"Sure, anytime."', tests: 'Self-Advocacy', dim: 'communication_clarity', cost: -1, consequence: "Vague reply, vague calendar slot. You spent the weekend anxious. The 1:1 was about goal-setting for the quarter.", bestNote: "Vague answers feed anxiety. Even 'sure! anything I should think about beforehand?' gives you signal." },
      { id: 'B', label: '"Yes — quick Q, anything I should think about beforehand?"', tests: 'Self-Advocacy', dim: 'proactive_communication', cost: +3, consequence: "Priya replied: 'Just a Q2 goal-setting chat. Nothing scary, promise.' Your weekend was fine. You showed up prepped.", bestNote: "Asking for context isn't pushy — it shows you take her time seriously. Most managers love this question." },
      { id: 'C', label: '"Sure — is everything okay? Want to make sure I\'m not missing something."', tests: 'Stakeholder Empathy', dim: 'stakeholder_empathy', cost: +1, consequence: "Priya replied: 'Everything's fine! Just quarterly planning :)'. Both of you appreciated the directness.", bestNote: "Naming the anxiety is okay sometimes — but keep it professional." },
      { id: 'D', label: "Don't reply until Monday — sit with it for the weekend.", tests: 'Managing Up', dim: 'communication_clarity', cost: -2, consequence: "Priya followed up Sunday: 'Did you see my DM?' Started Monday from a back foot.", bestNote: "Delayed responses to manager DMs always cost something. 2-hour acknowledgment is the courtesy bar." },
    ],
  },
];

function ConsequenceCard({ choice, onNext, isLast }) {
  const isGood = choice.cost > 0;
  return (
    <div style={{ animation: 'klFadeUp .4s both' }}>
      <div style={{ padding: '28px', background: isGood ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${isGood ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 'var(--radius-lg)', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isGood ? '#10B981' : '#EF4444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isGood ? '✓ What happened' : '✗ What happened'}
        </div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)' }}>{choice.consequence}</p>
      </div>
      <div style={{ padding: '20px 24px', background: 'var(--surface)', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>💡 What high performers do</div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)' }}>{choice.bestNote}</p>
      </div>
      <button onClick={onNext} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--indigo)', color: '#fff', border: 0, padding: '14px 22px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
        <span>{isLast ? 'See your results' : 'Next scene'}</span>
        <Icon name="arrow-right" size={16} />
      </button>
    </div>
  );
}

export default function BranchEngine({ user = {}, accent = '#6366F1', onComplete, onBack }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [picks, setPicks] = useState([]);
  const [consequence, setConsequence] = useState(null);
  const [done, setDone] = useState(false);

  const scene = SCENES[sceneIdx];
  const progress = (sceneIdx + (consequence ? 0.5 : 0)) / SCENES.length;

  const pick = (choice) => {
    setPicks(prev => [...prev, { sceneId: scene.id, choice }]);
    setConsequence(choice);
  };

  const advance = () => {
    setConsequence(null);
    if (sceneIdx + 1 >= SCENES.length) {
      const signals = {};
      picks.forEach(p => {
        const k = p.choice.dim;
        signals[k] = (signals[k] || 0) + p.choice.cost;
      });
      const transcript = picks.map(p => ({ prompt: SCENES.find(s => s.id === p.sceneId)?.situation || '', choice: p.choice.label, signals: { [p.choice.dim]: p.choice.cost } }));
      setDone(true);
      onComplete?.({ signals, transcript, momentsFired: [], messages: {}, tickets: [], finishedAt: new Date().toISOString(), scenarioId: 'branch-swe', scenarioTitle: 'The Branch · SWE Scenarios', mode: 'branch' });
    } else {
      setSceneIdx(i => i + 1);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--bg)', overflow: 'hidden', color: 'var(--text-1)' }}>
      <GridBg accent={accent} density={64} pulse={false} />

      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={14} /><span>Back</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>🌿 The Branch · SWE Track</span>
          <div style={{ width: 100, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: accent, borderRadius: 2, transition: 'width .4s' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{sceneIdx + 1}/{SCENES.length}</span>
        </div>
        <div style={{ width: 80 }} />
      </header>

      <main style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        {!done && (
          <>
            {/* Scene header */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{scene.eyebrow}</div>
            {!consequence && (
              <div style={{ animation: 'klFadeUp .35s both' }}>
                {/* Situation */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: 20 }}>
                  <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.65, color: 'var(--text-2)' }}>{scene.situation}</p>
                  <div style={{ padding: '14px 18px', background: 'var(--surface-2)', borderLeft: `3px solid ${accent}`, borderRadius: '0 var(--radius) var(--radius) 0', fontSize: 15, fontStyle: 'italic', color: 'var(--text-1)', lineHeight: 1.55 }}>
                    {scene.characterLine}
                  </div>
                  {scene.subtle && (
                    <p style={{ margin: '14px 0 0', fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic' }}>{scene.subtle}</p>
                  )}
                </div>

                {/* Choices */}
                <div style={{ marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>What do you do?</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 10 }}>
                  {scene.choices.map((c) => (
                    <button key={c.id} onClick={() => pick(c)} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, background: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--text-1)', padding: '14px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all .12s', fontSize: 14, lineHeight: 1.5 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 6 }}>Tests: {c.tests}</div>
                        {c.label}
                      </div>
                      <Icon name="arrow-right" size={14} color="var(--text-3)" style={{ flexShrink: 0, marginTop: 4 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {consequence && (
              <ConsequenceCard choice={consequence} onNext={advance} isLast={sceneIdx + 1 >= SCENES.length} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
