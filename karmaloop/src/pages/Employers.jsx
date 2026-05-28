import { useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { GridBg } from '../components/GridBg';
import { Icon } from '../components/Icon';
import { Radar } from '../components/Radar';
import { Eyebrow, CTACard, SiteFooter, JargonText } from '../components/shared';
import { KL_DIMENSIONS, KL_scoreFor, KL_tierFor } from '../data/diagnostic';

const STATS = [
  { kpi: '400',   label: 'resumes per opening · India tech',       sub: '— NASSCOM 2024' },
  { kpi: '8',     label: 'candidates actually interviewed',         sub: 'avg. per opening' },
  { kpi: '67%',   label: 'of new hires miss first-year goals',     sub: '— Society for HR Management' },
  { kpi: '₹4.2L', label: 'cost of a wrong hire in tech',           sub: 'replacement + ramp + opportunity' },
];

const WORKFLOW = [
  { title: 'Pre-screen replacement', body: 'Replace the 30-minute "tell me about yourself" call with a 25-minute Artha session. Candidates self-serve. You see their diagnostic before your first interview.' },
  { title: 'Interview prep companion', body: 'For shortlisted candidates, the diagnostic surfaces the specific behavioural questions to ask. "Their lowest dimension was constructive pushback — ask about a disagreement they had with their PM."' },
  { title: 'Onboarding signal', body: 'Once hired, the diagnostic becomes a 90-day development plan. Managers know exactly which capabilities to coach. Reduces six-month attrition in pilot.' },
];

const TIERS = [
  { label: 'Learners', price: 'Free', priceSub: 'Forever. Always.', featured: false, features: ['Unlimited simulations', 'Full diagnostic + replay', 'Cross-mode synthesis', 'Profile is yours — consent-based portability', 'Available in 6 Indian languages'] },
  { label: 'Employers', price: '₹999', priceSub: 'per candidate hired · pilot pricing', featured: true, features: ['Diagnostic profile per hired candidate', 'Interview-question generator from diagnostic', '90-day onboarding plan per hire', 'Anonymized aggregate dashboard', 'Free for first 50 candidates'] },
  { label: 'NSDC / Govt', price: 'Custom', priceSub: 'Per-state deployment', featured: false, features: ['Free for state-supported colleges', 'SWAYAM module integration', 'Per-college outcome tracking', 'Custom scenario authoring', 'Direct Wadhwani AI deployment pathway'] },
];

const SAMPLE_SIGNALS = { communication_clarity: 8, escalation_judgment: 5, prioritization_pressure: 4, stakeholder_empathy: 6, proactive_communication: 7, honest_estimation: 6, constructive_pushback: 3, documentation_accountability: 4 };

function SignalCard({ accent, title, body }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${accent}`, borderRadius: 'var(--radius-lg)', padding: '22px 24px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>signal</div>
      <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

function SampleProfile({ accent }) {
  const sampleDims = KL_DIMENSIONS.map(d => {
    const raw = SAMPLE_SIGNALS[d.key] || 0;
    const score = KL_scoreFor(raw);
    const tier = KL_tierFor(score);
    return { ...d, score, tier, value: score / 5 };
  });

  return (
    <div style={{ marginTop: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '32px 36px', display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: 32, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Candidate</div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>A.R. (anonymized)</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>SWE track · scenario completed Apr 12</div>
        <Radar data={sampleDims.map(d => ({ label: d.name, value: d.value }))} size={260} accent={accent} />
      </div>
      <div>
        <blockquote style={{ margin: 0, padding: '14px 18px', borderLeft: `3px solid ${accent}`, background: 'var(--surface-2)', borderRadius: '0 var(--radius) var(--radius) 0', fontStyle: 'italic', fontSize: 15.5, color: 'var(--text-1)', lineHeight: 1.55, marginBottom: 18 }}>
          "Strong technical instincts, clear communicator under pressure, surfaces problems early — would hire into a small ops-engineering team tomorrow."
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontStyle: 'normal', letterSpacing: '0.06em', textTransform: 'uppercase' }}>simulated_employer_signal</div>
        </blockquote>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Strongest moments</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {["Named connection-pool exhaustion before the senior did", "Pushed back on scope change with a quantified ETA trade-off", "Surfaced junior's main-branch push to senior, gently"].map((m, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-1)', paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                <span style={{ position: 'absolute', left: 0, top: 8, width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)' }} />
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Growth edge</div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>Constructive pushback was the lowest-scoring dimension. Candidate hedged on the second scope change. Worth a behavioural question in interview: "Tell me about a time you disagreed with your PM."</p>
        </div>
      </div>
    </div>
  );
}

function PricingTier({ tier, accent }) {
  return (
    <div style={{ background: tier.featured ? `linear-gradient(135deg, ${accent}22, transparent 60%), var(--surface)` : 'var(--surface)', border: tier.featured ? `1.5px solid ${accent}55` : '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 26px', boxShadow: tier.featured ? `0 0 0 1px ${accent}22` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: tier.featured ? accent : 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tier.label}</span>
        {tier.featured && <span style={{ padding: '2px 6px', borderRadius: 4, background: accent, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em' }}>RECOMMENDED</span>}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{tier.price}</div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>{tier.priceSub}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
            <Icon name="check" size={13} color={tier.featured ? accent : 'var(--emerald)'} style={{ flexShrink: 0, marginTop: 4 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', multiline = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em' }}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-1)', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', borderRadius: 'var(--radius)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-1)', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', borderRadius: 'var(--radius)', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
      )}
    </div>
  );
}

function ContactCard({ accent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const canSubmit = name && email && msg;

  return (
    <section style={{ marginTop: 64 }}>
      <Eyebrow accent={accent}>Talk to us</Eyebrow>
      <h2 style={{ margin: '12px 0 0', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', fontWeight: 700, lineHeight: 1.1 }}>Pilot Artha with your team.</h2>
      <p style={{ margin: '14px 0 0', fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 720 }}><JargonText>Hiring managers, HR leaders, NSDC partners — drop a note and we'll get back within 48 hours. Most pilots start with 50 candidates, free of charge, no commitment.</JargonText></p>
      <div style={{ marginTop: 28, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px 30px' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✉️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>Thanks, {name || 'friend'}.</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)' }}>We'll be in touch within 48 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 0 }}>
              <Field label="YOUR NAME" value={name} onChange={setName} placeholder="Aanya Sharma" />
              <Field label="EMAIL" value={email} onChange={setEmail} placeholder="aanya@company.com" type="email" />
            </div>
            <Field label="ORGANIZATION" value={org} onChange={setOrg} placeholder="Company / NSDC partner / University" />
            <Field label="WHAT ARE YOU TRYING TO SOLVE?" value={msg} onChange={setMsg} placeholder="We hire 40 grads a quarter and can't tell who'll thrive…" multiline />
            <button onClick={() => setSent(true)} disabled={!canSubmit} style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '12px 22px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: !canSubmit ? 'not-allowed' : 'pointer', opacity: !canSubmit ? 0.4 : 1, boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 6px 18px ${accent}55` }}>
              <span>Send</span><Icon name="send" size={13} />
            </button>
            <p style={{ marginTop: 12, fontSize: 11.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>We'll never share your details. No marketing emails. Promise.</p>
          </>
        )}
      </div>
    </section>
  );
}

const empH1 = { margin: 0, fontSize: 'clamp(40px, 6.5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700 };
const empH2 = { margin: '12px 0 0', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', fontWeight: 700, lineHeight: 1.1 };
const empLede = { marginTop: 26, fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 740 };
const empP = { margin: '14px 0 0', fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 720 };

export default function Employers({ accent = '#6366F1', onNavigate, onEnter, onDashboard }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text-1)' }}>
      <SiteHeader active="employers" accent={accent} onNavigate={onNavigate} onEnter={onEnter} onDashboard={onDashboard} />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GridBg accent={accent} density={64} pulse />
        <main style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '64px 28px 100px' }}>

          <Eyebrow accent={accent}>For employers · hiring managers · NSDC partners</Eyebrow>
          <h1 style={empH1}>
            Resumes are broken.<br />
            <span style={{ background: `linear-gradient(120deg, ${accent} 0%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>This is the signal.</span>
          </h1>
          <p style={empLede}><JargonText>You receive 400 resumes per opening. You can interview 8. The other 392 — including most of your future top performers — never make it past the keyword filter. Artha gives you a behavioural signal from one morning that no resume can fake: how a candidate communicates, escalates, prioritizes, and pushes back when work actually gets messy.</JargonText></p>

          {/* Stats */}
          <section style={{ marginTop: 64 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', padding: '28px 26px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}>0{i + 1} / 04</div>
                  <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.kpi}</div>
                  <div style={{ marginTop: 12, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.45 }}>{s.label}</div>
                  <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* The signal */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>The signal you get</Eyebrow>
            <h2 style={empH2}>Eight dimensions per candidate. No resume can fake it.</h2>
            <p style={empP}><JargonText>You see how a candidate handled a Friday-afternoon P0 with a deadline they didn't have all the information for. How they pushed back when scope changed mid-sprint. Whether they surfaced a junior's mistake or hid it. Whether they translated stack-trace language into business time for a client. Each dimension comes with quoted moments and specific phrases, not opaque scores.</JargonText></p>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <SignalCard accent="#10B981" title="Behavioural signal" body="Not a personality quiz. Not a multiple-choice test. The candidate spent 25 minutes inside a reactive AI environment, and we observed what they actually did. Recorded. Auditable." />
              <SignalCard accent="#6366F1" title="Specific moments" body="Every dimension is grounded in a moment from the transcript. 'Pushed back on PM's scope change at minute 14 with a real ETA trade-off' — not 'high agreeableness.'" />
              <SignalCard accent="#F59E0B" title="Diagnostic, not score" body="Hiring managers don't want a number. They want to know how this person will behave in their first six months. That's what we deliver." />
            </div>
          </section>

          {/* How you use it */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>How you use it</Eyebrow>
            <h2 style={empH2}>Drop into your hiring flow at three points.</h2>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {WORKFLOW.map((w, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 26px', position: 'relative' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}22`, color: accent, border: `1px solid ${accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{w.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}><JargonText>{w.body}</JargonText></p>
                </div>
              ))}
            </div>
          </section>

          {/* Sample profile */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>What you'd see</Eyebrow>
            <h2 style={empH2}>A real profile. Anonymized.</h2>
            <SampleProfile accent={accent} />
          </section>

          {/* Pilot logos */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>Pilot conversations underway</Eyebrow>
            <h2 style={empH2}>NSDC. SWAYAM. Three early-stage Bengaluru employers.</h2>
            <p style={empP}><JargonText>We're scoping integration pathways with the National Skill Development Corporation, Wadhwani AI's existing SWAYAM deployment, and three Bengaluru-based employers willing to pilot consent-based candidate sharing. If you're a hiring manager or HR partner, we'd love to talk.</JargonText></p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {['NSDC', 'SWAYAM', 'Samagra Shiksha', 'Wadhwani AI'].map((p, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', textAlign: 'center', fontSize: 13.5, color: 'var(--text-2)', fontWeight: 500 }}>{p}</div>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic', textAlign: 'center' }}>Logo lockups will land in v0.4 — partnership conversations are in motion now.</p>
          </section>

          {/* Pricing */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>Pricing</Eyebrow>
            <h2 style={empH2}>Free for learners. Always.</h2>
            <p style={empP}><JargonText>Learners never pay. Artha is funded by employer subscriptions and government partnerships. Candidates own their profile and consent to share — we never auto-publish. Employers see anonymized aggregate data for free; candidate-specific reports are licensed per-hire.</JargonText></p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {TIERS.map((t, i) => <PricingTier key={i} tier={t} accent={accent} />)}
            </div>
          </section>

          <CTACard accent={accent} onEnter={onEnter}
            headline="See a candidate's profile yourself."
            sub="Spend twelve minutes inside the SWE simulation as a candidate would. Walk out with the exact diagnostic you'd see as an employer."
            cta="Try a simulation" />

          <ContactCard accent={accent} />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
