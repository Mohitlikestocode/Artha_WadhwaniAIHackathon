import { useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { GridBg } from '../components/GridBg';
import { Icon } from '../components/Icon';
import { Eyebrow, CTACard, SiteFooter, JargonText } from '../components/shared';
import { KL_DIMENSIONS } from '../data/diagnostic';

const MODES = [
  { id: 'office',  icon: '🏢', label: 'The Office',  accent: '#6366F1', available: true, desc: 'Live AI workplace. Messaging, tickets, characters, chaos.' },
  { id: 'warroom', icon: '🚨', label: 'War Room',    accent: '#EF4444', available: true, desc: 'Crisis. Clock ticking. Multiple fires at once.' },
  { id: 'branch',  icon: '🌿', label: 'The Branch',  accent: '#10B981', available: true, desc: 'Every choice has consequences. Watch them unfold.' },
  { id: 'inbox',   icon: '📬', label: 'Inbox Zero',  accent: '#F59E0B', available: true, desc: 'Monday morning. 23 emails. 30 minutes. Go.' },
  { id: 'arena',   icon: '🤝', label: 'The Arena',   accent: '#A855F7', available: true, desc: 'Negotiation. One room. You vs. them. Relationship + deal value on the line.' },
  { id: 'stage',   icon: '🎙️', label: 'The Stage',   accent: '#06B6D4', available: true, desc: 'Present. Defend. Handle questions. The audience is not on your side.' },
];

const STEPS = [
  {
    badge: 'Step 1 · 90 seconds',
    title: 'Tell us where you are.',
    body: "Pick your career track. Tell us your background. Three sliders on technical skills, communication, and workplace experience calibrate everything that happens next. There is no wrong answer — lower self-ratings just mean warmer characters and more time to think.",
    detail: ["8 career tracks: SWE, Cybersecurity, Data Science, Marketing, UX, Pentest, Freelance, Founder", "6 Indian languages for the diagnostic (English-only at runtime — that's part of the training)", 'Calibration runs locally, no opaque AI scoring'],
  },
  {
    badge: 'Step 2 · choose your test',
    title: 'Pick a mode.',
    body: "Six simulation modes. Each tests a different kind of workplace intelligence. The Office (chat-driven workday). The Branch (cinematic 5-scene decisions). Inbox Zero (Monday morning, 23 emails, 30 minutes). War Room, The Arena, The Stage round out the platform. We recommend an arc — you can do them in any order.",
    detail: ['~10–25 minutes per mode', 'Each mode produces its own diagnostic', 'Cross-mode synthesis after 3 sessions identifies persistent patterns'],
  },
  {
    badge: 'Step 3 · be observed',
    title: 'A morning, observed.',
    body: "Characters have hidden agendas. The PM has a 2 PM demo she hasn't told you about. The junior pushed to main yesterday. The senior is gated behind the right question. A P0 alert fires. The client DMs you directly. You can pick from quick-reply chips or type freely. Every message is tagged to a capability.",
    detail: ['Reactive AI environment — every reply changes what happens next', 'Voice + text input', 'Hover any underlined term — universal jargon dictionary built in'],
  },
  {
    badge: 'Step 4 · the mirror',
    title: 'Walk out with a profile.',
    body: "Eight-dimension diagnostic. A radar chart. Severity-tiered cards with specific moments quoted back to you and specific phrases to try tomorrow. A best moment, a growth edge, and an India-context note tuned to your lowest dimension. A downloadable share badge for LinkedIn or WhatsApp.",
    detail: ['Annotated transcript — every choice you made, tagged to the invisible skill it tested', 'Cross-mode synthesis after 3+ sessions', 'Vocabulary tracker — words you learned through use, not flashcards'],
  },
];

const FAQ = [
  { q: "Is this just a quiz?", a: "No. There are no right answers. Characters react to your tone. Time pressure is real. The diagnostic is generated from your actual behaviour, not your score on a question bank." },
  { q: "Does this work on a ₹9,000 Android phone?", a: "Yes. Mobile-first design. Works on 4G. Single chat view collapses on small screens. We test on devices first-gen learners actually use." },
  { q: "Will employers see my profile?", a: "Only if you choose to share it. You own your Artha profile. Consent-based portability is the model — the badge is yours to send to LinkedIn or WhatsApp, no auto-publishing." },
  { q: "How is this different from Forage?", a: "Forage is content — pre-recorded scenarios with model answers. Artha is a reactive AI environment with hidden agendas, time pressure, and a diagnostic that names specific behaviours, not just scores." },
  { q: "Is the diagnostic honest, or is it just being nice?", a: "It is honest. If you fold under pressure, the report will say so — and tell you the phrase to use next time." },
  { q: "Can I retry?", a: "Yes, as often as you want. The same simulation runs differently each time — the characters react to your specific moves. Most learners do three runs to see their growth arc." },
];

function StepCard({ step, idx, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px 30px' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}22`, color: accent, border: `1px solid ${accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{String(idx + 1).padStart(2, '0')}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>{step.badge}</div>
        <h3 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{step.title}</h3>
        <p style={{ margin: '0 0 16px', fontSize: 15.5, color: 'var(--text-2)', lineHeight: 1.65 }}><JargonText>{step.body}</JargonText></p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {step.detail.map((d, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 8, width: 5, height: 5, borderRadius: '50%', background: accent }} />
              <JargonText>{d}</JargonText>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FAQItem({ q }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: 'var(--text-1)', width: '100%', transition: 'border-color .12s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{q.q}</span>
        <Icon name={open ? 'up' : 'down'} size={16} color="var(--text-3)" />
      </div>
      {open && <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}><JargonText>{q.a}</JargonText></p>}
    </button>
  );
}

const hwH1 = { margin: 0, fontSize: 'clamp(40px, 6.5vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700, maxWidth: 880 };
const hwH2 = { margin: '12px 0 0', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', fontWeight: 700, lineHeight: 1.1 };
const hwLede = { marginTop: 26, fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 720 };
const hwP = { margin: '14px 0 0', fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 720 };

export default function HowItWorks({ accent = '#6366F1', onNavigate, onEnter, onDashboard }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text-1)' }}>
      <SiteHeader active="howItWorks" accent={accent} onNavigate={onNavigate} onEnter={onEnter} onDashboard={onDashboard} />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GridBg accent={accent} density={64} pulse />
        <main style={{ position: 'relative', zIndex: 2, maxWidth: 1080, margin: '0 auto', padding: '64px 28px 100px' }}>

          <Eyebrow accent={accent}>How it works</Eyebrow>
          <h1 style={hwH1}>
            A simulated morning.<br />
            <span style={{ background: `linear-gradient(120deg, ${accent} 0%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>An honest mirror.</span>
          </h1>
          <p style={hwLede}><JargonText>You walk into a fake company. The people are AI characters with hidden agendas. Tickets fire. The client DMs you. A senior asks for an ETA you don't have. You spend twelve minutes inside it. Then we hand you back the part of the morning that mattered — eight dimensions, one mirror.</JargonText></p>

          {/* Steps */}
          <section style={{ marginTop: 80, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STEPS.map((s, i) => <StepCard key={i} step={s} idx={i} accent={accent} />)}
          </section>

          {/* Six modes */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>Six modes · six kinds of intelligence</Eyebrow>
            <h2 style={hwH2}>Real workplaces don't test you one way.</h2>
            <p style={hwP}><JargonText>Most platforms simulate one thing — typing replies in a chat. Real work tests you through a crisis on a Friday afternoon, an inbox you wake up to, a meeting you can't control, a negotiation you can't read, a presentation that loses the room. Artha simulates all six.</JargonText></p>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {MODES.map(m => (
                <div key={m.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${m.accent}`, borderRadius: 'var(--radius)', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, color: m.accent, letterSpacing: '0.08em' }}>{m.label.toUpperCase()}</span>
                    {!m.available && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>SOON</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What we measure */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>What we measure</Eyebrow>
            <h2 style={hwH2}>Eight invisible capabilities. One mirror.</h2>
            <p style={hwP}><JargonText>Communication clarity. Escalation judgment. Constructive pushback. Honest estimation. Stakeholder empathy. Proactive communication. Prioritization under pressure. Documentation and accountability. These are the skills that separate hires from non-hires in your first six months. We diagnose them from one morning, not eight years of resumes.</JargonText></p>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {KL_DIMENSIONS.map((d, i) => (
                <div key={d.key} style={{ background: 'var(--surface)', padding: '16px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>0{i + 1}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>{d.full}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.5 }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>Frequently asked</Eyebrow>
            <h2 style={hwH2}>The honest answers.</h2>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQ.map((q, i) => <FAQItem key={i} q={q} />)}
            </div>
          </section>

          <CTACard accent={accent} onEnter={onEnter} />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
