import { useState } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';

const MODE_CONFIG = {
  warroom: {
    label: 'War Room', icon: '🚨', accent: '#EF4444',
    tagline: 'Crisis. Clock ticking. Every second counts.',
    beats: [
      { id: 'w1', clock: '4:47 PM', severity: 'critical', label: 'INCIDENT FIRED', situation: "🚨 Checkout-service 500 errors spiking — 12% of requests failing. Tier-2 weighted. Your team's #alerts channel just lit up. Your senior Rajan is in a vendor call until 5:15.", prompt: "First move?", choices: [
        { text: "Pull the staging logs, grep for the error pattern, no comms yet — facts first.", signals: { honest_estimation: +2, prioritization_pressure: +1 }, feedback: "Solid instinct. But silence in the first 60 seconds reads as absence. A 'on it, will surface in 5 min' to the channel costs nothing." },
        { text: "Post in #incidents: 'Investigating KT-118 — surfacing in 5 min.' Then open the logs.", signals: { proactive_communication: +3, communication_clarity: +2, honest_estimation: +2 }, feedback: "Senior move. You bought yourself the room to think without anyone wondering where you went." },
        { text: "DM Rajan immediately even though he's in a call.", signals: { escalation_judgment: -2, prioritization_pressure: -1 }, feedback: "Premature escalation. Senior engineers want surprise-free pings. Investigate first — 5 minutes is fine." },
        { text: "Wait until the senior is back — don't want to step on toes.", signals: { proactive_communication: -3, escalation_judgment: -2 }, feedback: "P0 fires don't wait for hierarchy. Your job in the first 5 min is to surface the right signal." },
      ]},
      { id: 'w2', clock: '4:52 PM', severity: 'critical', label: 'CLIENT DMs YOU', situation: "💬 Vikram (TechCorp client): 'Hi — heard there's a checkout issue? Our campaign launches at 2 PM Monday. ETA please?'", prompt: "How do you reply?", choices: [
        { text: "Hi Vikram — we're investigating, root cause area identified. I'll send a status update by 5:30 PM. Updating again at 6 regardless.", signals: { stakeholder_empathy: +3, communication_clarity: +2, proactive_communication: +2 }, feedback: "Textbook. Time-bound. Even-keeled. Vikram now has a thing to tell HIS team." },
        { text: "We're aware. Working on it.", signals: { stakeholder_empathy: -2, communication_clarity: -1 }, feedback: "Reads as dismissive to an anxious stakeholder. He needs a time, not an acknowledgement." },
        { text: "There's a latency cliff in payment-service outbound on Tier-2 routes, possibly connection-pool exhaustion.", signals: { communication_clarity: -2, stakeholder_empathy: -2 }, feedback: "Jargon at a non-technical client. He doesn't know what a connection pool is — he knows his CFO is watching." },
        { text: "DM your PM Priya: 'Vikram just pinged me directly — should I respond or do you want to handle?'", signals: { escalation_judgment: +3, proactive_communication: +2, stakeholder_empathy: +1 }, feedback: "Best move. PMs own client comms — looping her in is the senior signal." },
      ]},
      { id: 'w3', clock: '4:58 PM', severity: 'critical', label: 'SECOND WAVE', situation: "🚨 Auth-service now throwing 401s. Kiran DMs: 'i think it might be related to the config change i pushed last night? 😬 should i revert?'", prompt: "What's the call?", choices: [
        { text: "Yes — revert immediately.", signals: { escalation_judgment: -1 }, feedback: "Speed is good but acting on a junior's hunch in prod without checking is risky. Senior would ask 'what specifically changed?' first." },
        { text: "Kiran — hold. Tell me exactly what you changed yesterday. While you write that, I'll check if Rajan's free now.", signals: { escalation_judgment: +3, honest_estimation: +3, documentation_accountability: +2, stakeholder_empathy: +1 }, feedback: "Senior-grade move. You bought 90 seconds of clarity, escalated to the right altitude, and protected Kiran from blame." },
        { text: "Don't revert. Wait for Rajan.", signals: { honest_estimation: +1, proactive_communication: -1 }, feedback: "Safe but inert. If Rajan's still 15 minutes out, the 401s compound. You needed motion AND control." },
        { text: "Revert it yourself silently — no one needs to know.", signals: { documentation_accountability: -3, honest_estimation: -3, escalation_judgment: -3 }, feedback: "Hiding a rollback is the worst category of professional failure." },
      ]},
      { id: 'w4', clock: '5:04 PM', severity: 'high', label: 'DECISION REQUIRED', situation: "⚡ Rajan: 'Confirmed — connection-pool exhaustion. Hotfix tested in staging for 4 minutes. Client campaign live Monday 2 PM. Deploy now or wait for more testing?'", prompt: "Your read?", choices: [
        { text: "Deploy now. Every minute costs conversions.", signals: { prioritization_pressure: +1, honest_estimation: -1 }, feedback: "Aggressive — sometimes correct, but 4 minutes of testing is thin." },
        { text: "Wait 10 more minutes — testing isn't long enough.", signals: { honest_estimation: +2, prioritization_pressure: +1 }, feedback: "Reasonable. You named the trade-off, but didn't propose what to tell the client during those 10 minutes." },
        { text: "Rajan — you have the context. What's your call? I'll back it.", signals: { escalation_judgment: +2, stakeholder_empathy: +1 }, feedback: "Honest deference to the senior. Slightly under-delivers — you could have helped him think." },
        { text: "Deploy now AND send the client a heads-up: 'Hotfix deploying, monitoring closely, will update at 5:30.' Risk is bounded.", signals: { proactive_communication: +3, prioritization_pressure: +3, communication_clarity: +2, escalation_judgment: +1 }, feedback: "Senior-grade. Named the risk, owned the comms, bounded the next decision." },
      ]},
    ],
  },
  arena: {
    label: 'The Arena', icon: '🤝', accent: '#A855F7',
    tagline: 'One negotiation. Relationship + deal value on the line.',
    beats: [
      { id: 'a1', clock: 'Move 1 of 4', severity: 'normal', label: 'OPENING', situation: "🤝 Nandini (potential client): 'We love your portfolio. Our budget is tight — ₹25,000 max for the project. Can we make it work?' Your rate is ₹40,000. Your floor is ₹30,000.", prompt: "Your opening move?", choices: [
        { text: "₹25k works — happy to start there.", signals: { constructive_pushback: -3, honest_estimation: -2 }, feedback: "You folded in the first move. Junior negotiator move." },
        { text: "Thanks Nandini. My rate for this scope is ₹40,000. Want to walk me through your budget constraints before we land on a number?", signals: { constructive_pushback: +3, communication_clarity: +2, stakeholder_empathy: +1 }, feedback: "Anchor + curiosity. You set the number, didn't apologize, and bought information. Senior move." },
        { text: "₹25k is below my floor. I'm at ₹40k — that's the price.", signals: { constructive_pushback: +1, stakeholder_empathy: -1 }, feedback: "Honest, but you closed the door without learning anything." },
        { text: "What's the actual scope? Hard to commit to a number without knowing what's involved.", signals: { stakeholder_empathy: +2, prioritization_pressure: +1 }, feedback: "Smart — clarify scope before pricing. Slightly soft — you avoided naming your number." },
      ]},
      { id: 'a2', clock: 'Move 2 of 4', severity: 'normal', label: 'COUNTER', situation: "💬 Nandini: 'I appreciate that. We have one other vendor at ₹28k. Quality isn't as good but the price is real. Where does ₹30k land for you?'", prompt: "She revealed her alternative AND a number. Your move?", choices: [
        { text: "₹30k works. Let's lock it.", signals: { constructive_pushback: -2 }, feedback: "You hit your floor without testing whether ₹32-35k was on the table." },
        { text: "₹30k is my floor — but if you can do milestone payments instead of net-30, I can make it work at ₹32k.", signals: { constructive_pushback: +3, communication_clarity: +2, prioritization_pressure: +2 }, feedback: "Brilliant. You traded a non-price variable for price. Cashflow timing matters for freelancers." },
        { text: "₹35k — split the difference.", signals: { constructive_pushback: +2, honest_estimation: +1 }, feedback: "Reasonable counter, but 'stretch for me' is begging language. Name a number and a reason." },
        { text: "If your other vendor is ₹28k, take them. Your call.", signals: { constructive_pushback: +2, stakeholder_empathy: -2 }, feedback: "Walk-away is a real move — but you used it too early." },
      ]},
      { id: 'a3', clock: 'Move 3 of 4', severity: 'normal', label: 'SCOPE CREEP', situation: "💬 Nandini: '₹32k works. Quick add — could you also do social-media graphics? 4-5 of them. Small thing, you have the brand context.' (Original scope: just the landing page.)", prompt: "She's adding scope mid-negotiation.", choices: [
        { text: "Sure, I can add that.", signals: { constructive_pushback: -3, prioritization_pressure: -2 }, feedback: "Classic scope-creep yes. You'll spend 4 hours on graphics for free." },
        { text: "Happy to — that's a separate scope. ₹8k for 4 graphics, ₹2k each additional. Want to bundle?", signals: { constructive_pushback: +3, communication_clarity: +2, honest_estimation: +2 }, feedback: "Senior. You said yes-with-a-price. Scope changes get priced, not absorbed." },
        { text: "Let's lock the landing page first. We can talk graphics next week — different conversation.", signals: { prioritization_pressure: +3, constructive_pushback: +2, communication_clarity: +1 }, feedback: "Smart prioritization. Protected the deal and parked the new scope." },
        { text: "I'd love to but my plate is full right now.", signals: { honest_estimation: -1, constructive_pushback: +1 }, feedback: "Honest no but lost the upsell opportunity." },
      ]},
      { id: 'a4', clock: 'Move 4 of 4', severity: 'normal', label: 'CLOSE', situation: "💬 Nandini: 'OK — landing page at ₹32k, milestone payments, graphics as separate. When can you start?'", prompt: "You're closing the deal. Last move.", choices: [
        { text: "I can start Monday. I'll send the contract today.", signals: { proactive_communication: +2, communication_clarity: +1 }, feedback: "Clean close. You committed to specifics and named the next step." },
        { text: "Monday works. Sending over a 1-pager with scope, timeline, milestones, and payment terms today — review by EOD tomorrow?", signals: { proactive_communication: +3, documentation_accountability: +3, communication_clarity: +2 }, feedback: "Senior-grade. You turned a verbal yes into a paper trail." },
        { text: "Soon — I'll let you know when.", signals: { proactive_communication: -2, honest_estimation: -2 }, feedback: "You just unsold yourself. Closing requires a date and a next action." },
        { text: "Send me a contract and I'll start when it's signed.", signals: { documentation_accountability: +2, stakeholder_empathy: -1 }, feedback: "Correct, but you put the work on her shoulders. Freelancers send the contract first." },
      ]},
    ],
  },
  stage: {
    label: 'The Stage', icon: '🎙️', accent: '#06B6D4',
    tagline: 'Present. Defend. Handle the room.',
    beats: [
      { id: 's1', clock: 'Slide 1 of 3', severity: 'normal', label: 'OPENING', situation: "🎙️ You're presenting onboarding-flow v1.2. CEO (Krishnamurthy), Senior Dev (Aakash), Design Lead (Divya). Your first words.", prompt: "How do you open?", choices: [
        { text: "Hi everyone — so today I'll walk through the new onboarding flow. It has four steps and I think you'll see the user research backs up most of the choices…", signals: { communication_clarity: 0 }, feedback: "Safe but flat. 'I think' and 'most of' are hedging language. Name the headline." },
        { text: "Quick context: 38% of users dropped off in the old onboarding. The new flow lands at 12% drop-off in user testing. Three changes drove that. Walking through each.", signals: { communication_clarity: +3, proactive_communication: +1 }, feedback: "Senior. Headline first. Data behind it. Promise of structure. You earned the room in 15 seconds." },
        { text: "Thanks for making time. I know everyone is busy so I'll be quick…", signals: { communication_clarity: -2, stakeholder_empathy: -1 }, feedback: "Apology opening. Drops your status in the room before you've made an argument." },
        { text: "I want to show you something I think is going to change how we think about onboarding entirely.", signals: { communication_clarity: +1 }, feedback: "Hook-y but unfocused. Hooks land better paired with one piece of data." },
      ]},
      { id: 's2', clock: 'Slide 2 of 3', severity: 'high', label: 'CEO INTERRUPTS', situation: "💬 CEO Krishnamurthy looks up: 'Stop — this feels cold. Our users are anxious patients. Doesn't this make that worse?'", prompt: "She's challenged your work. The room is watching.", choices: [
        { text: "I disagree — the research shows users prefer the streamlined flow.", signals: { constructive_pushback: -1, stakeholder_empathy: -2 }, feedback: "Defensive. 'I disagree' before acknowledging her concern signals you're not listening." },
        { text: "That's a fair concern. Let me show you what users said when we asked specifically about anxiety — slide 3 has the quotes. Quick?", signals: { stakeholder_empathy: +3, constructive_pushback: +2, communication_clarity: +2 }, feedback: "Senior. Acknowledged the concern, redirected to evidence, asked permission to proceed." },
        { text: "You're right — let me rethink this section.", signals: { constructive_pushback: -2, stakeholder_empathy: -1 }, feedback: "Capitulating to a CEO gut reaction without checking the evidence is how bad product decisions get made." },
        { text: "Interesting — can you say more about what feels cold to you?", signals: { stakeholder_empathy: +3, communication_clarity: +2 }, feedback: "Brilliant. You bought yourself evidence from the most powerful person in the room." },
      ]},
      { id: 's3', clock: 'Slide 3 of 3', severity: 'normal', label: 'CLOSE', situation: "Divya (Design Lead): 'Before you close — the research finding on screen 2. What was your sample size? I want to know if we can draw conclusions from this.'", prompt: "Direct challenge to your methodology. Last slide.", choices: [
        { text: "Um — I'll have to check. I think it was around 12 users.", signals: { honest_estimation: -1, communication_clarity: -2 }, feedback: "'I think' in your closing slide is the death of authority. Know your sample size before you go in." },
        { text: "12 interviews — qualitative, not representative. The finding is directional, not definitive. Our CTA hypothesis comes from the quantitative A/B in parallel.", signals: { honest_estimation: +3, communication_clarity: +3, constructive_pushback: +2 }, feedback: "Perfect. You named the limitation, framed it correctly, and pointed to complementary data. That's senior researcher energy." },
        { text: "It was enough to be statistically significant.", signals: { communication_clarity: -1, honest_estimation: -2 }, feedback: "12 qualitative interviews are never 'statistically significant.' This answer will erode her trust." },
        { text: "I'll follow up with the full methodology doc after the meeting.", signals: { honest_estimation: +1, proactive_communication: +2 }, feedback: "Reasonable save — but if Divya suspects the sample size is small, you've left a doubt in the room." },
      ]},
    ],
  },
};

export default function ModeLite({ user = {}, modeId = 'warroom', accent = '#6366F1', onComplete, onBack }) {
  const config = MODE_CONFIG[modeId] || MODE_CONFIG.warroom;
  const modeAccent = config.accent;
  const beats = config.beats;

  const [beatIdx, setBeatIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [signals, setSignals] = useState({});
  const [transcript, setTranscript] = useState([]);

  const beat = beats[beatIdx];
  const progress = (beatIdx + (chosen ? 0.5 : 0)) / beats.length;

  const choose = (choice) => {
    setChosen(choice);
    const newSignals = { ...signals };
    Object.entries(choice.signals || {}).forEach(([k, v]) => { newSignals[k] = (newSignals[k] || 0) + v; });
    setSignals(newSignals);
    setTranscript(prev => [...prev, { prompt: beat.situation, choice: choice.text, signals: choice.signals || {} }]);
  };

  const next = () => {
    setChosen(null);
    if (beatIdx + 1 >= beats.length) {
      onComplete?.({ signals, transcript, momentsFired: [], messages: {}, tickets: [], finishedAt: new Date().toISOString(), scenarioId: `${modeId}-lite`, scenarioTitle: `${config.label} · ${user?.track || 'SWE'} Track`, mode: modeId });
    } else {
      setBeatIdx(i => i + 1);
    }
  };

  const severityColors = { critical: '#EF4444', high: '#F59E0B', normal: 'var(--text-3)' };
  const severityBg = { critical: 'rgba(239,68,68,0.08)', high: 'rgba(245,158,11,0.06)', normal: 'transparent' };

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--bg)', overflow: 'hidden', color: 'var(--text-1)' }}>
      <GridBg accent={modeAccent} density={64} pulse={false} />

      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={14} /><span>Back</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: modeAccent }}>{config.icon} {config.label}</span>
          <div style={{ width: 100, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: modeAccent, borderRadius: 2, transition: 'width .4s' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{beatIdx + 1}/{beats.length}</span>
        </div>
        <div style={{ width: 80 }} />
      </header>

      <main style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* Beat header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: modeAccent, letterSpacing: '0.1em', textTransform: 'uppercase', background: `${modeAccent}18`, border: `1px solid ${modeAccent}44`, padding: '3px 8px', borderRadius: 4 }}>{beat.clock}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: severityColors[beat.severity], letterSpacing: '0.1em', textTransform: 'uppercase' }}>{beat.label}</span>
        </div>

        {/* Situation */}
        <div style={{ background: severityBg[beat.severity] || 'var(--surface)', border: `1px solid ${beat.severity === 'critical' ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '22px 24px', marginBottom: 20, fontSize: 15, lineHeight: 1.65, color: 'var(--text-1)', animation: 'klFadeUp .35s both' }}>
          {beat.situation}
        </div>

        {!chosen ? (
          <div style={{ animation: 'klFadeUp .35s both' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{beat.prompt}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {beat.choices.map((c, i) => (
                <button key={i} onClick={() => choose(c)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--text-1)', padding: '14px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all .12s', fontSize: 14, lineHeight: 1.5 }}>
                  <span>{c.text}</span>
                  <Icon name="arrow-right" size={14} color="var(--text-3)" style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ animation: 'klFadeUp .35s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: modeAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={12} color="#fff" />
              </div>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>You chose:</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{chosen.text}</span>
            </div>
            <div style={{ padding: '20px 24px', background: 'var(--surface)', border: `1px solid ${modeAccent}44`, borderLeft: `3px solid ${modeAccent}`, borderRadius: 'var(--radius-lg)', marginBottom: 16, fontSize: 14, lineHeight: 1.65, color: 'var(--text-2)' }}>
              {chosen.feedback}
            </div>
            <button onClick={next} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: modeAccent, color: '#fff', border: 0, padding: '12px 20px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <span>{beatIdx + 1 >= beats.length ? 'See your results' : 'Next situation'}</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
