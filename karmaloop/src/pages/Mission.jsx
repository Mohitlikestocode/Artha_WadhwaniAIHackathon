import { SiteHeader } from '../components/SiteHeader';
import { GridBg } from '../components/GridBg';
import { Icon } from '../components/Icon';
import { SectionEyebrow, SiteFooter, JargonText } from '../components/shared';
import { KL_DIMENSIONS } from '../data/diagnostic';

const miH2 = { margin: '12px 0 8px', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', fontWeight: 700, lineHeight: 1.1 };
const miP = { margin: '12px 0 0', fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 720 };
const misPrimary = (accent) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '14px 22px', fontSize: 15, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 28px ${accent}55` });

function DiffCol({ label, examples, points, bg, highlight, accent }) {
  return (
    <div style={{ background: bg, padding: '24px 26px', position: 'relative', borderTop: highlight ? `2px solid ${accent}` : 'none' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: highlight ? accent : 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 12 }}>e.g. {examples.join(', ')}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {points.map((p, i) => (
          <li key={i} style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.5, paddingLeft: 18, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 6, borderRadius: '50%', background: highlight ? accent : 'var(--text-3)' }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

const WADHWANI_TABLE = [
  ['Impact-first, not research-first', 'Designed for first-gen learners. Deployment pathway via SWAYAM is real, not hypothetical.'],
  ['Human-in-the-loop', "The learner IS the human in the loop. The AI environment reacts to their actual judgment, not pre-defined branches."],
  ['Multimodal input', 'Text and voice. Future: screen recordings of coding decisions for richer signal.'],
  ['Multi-task diagnostic', "8-dimension evaluation from a single session — like NurtureNet's multi-task approach."],
  ['Low-resource environments', 'Works on 4G. Mobile-first. No laptop required. Compressed bandwidth for Tier-2/3 networks.'],
  ['Multilingual', 'Diagnostic delivered in user\'s language. Six Indian languages supported at launch.'],
  ['Government deployment pathway', 'SWAYAM has 75M+ students. Wadhwani AI already has Google-funded SWAYAM integration. We slot in as a module.'],
  ['Measurable impact', '% improvement in dimension scores across attempts. Employer signal tracks to real hiring outcomes (Phase 2).'],
];

export default function Mission({ accent = '#6366F1', onEnter, onBack, onNavigate, onDashboard }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text-1)' }}>
      <SiteHeader active="mission" accent={accent} onNavigate={onNavigate || (() => onBack?.())} onEnter={onEnter} onDashboard={onDashboard} />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GridBg accent={accent} density={64} pulse />
        <main style={{ position: 'relative', zIndex: 2, maxWidth: 1080, margin: '0 auto', padding: '60px 28px 100px' }}>

          {/* Hero */}
          <section>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: accent, marginRight: 8, verticalAlign: 'middle', boxShadow: `0 0 10px ${accent}` }} />
              Built for Wadhwani AI · Problem 3.2
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(40px, 6.5vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700, maxWidth: 980 }}>
              Capabilities,<br />
              <span style={{ background: `linear-gradient(120deg, ${accent} 0%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>not credentials.</span>
            </h1>
            <p style={{ marginTop: 28, fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 720 }}>
              India produces 1.5 million engineering graduates a year. <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>57.4% are job-ready.</span> The rest have credentials but not capabilities. KarmaLoop closes that gap — not with content, not with videos, not with model answers, but with a living AI workplace that watches you work and tells you exactly what you need to fix.
            </p>
          </section>

          {/* Problem Stats */}
          <section style={{ marginTop: 80 }}>
            <SectionEyebrow>The crisis · in three numbers</SectionEyebrow>
            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {[
                { kpi: '1.5M', label: 'engineering graduates every year', sub: '— AICTE, FY24 enrolment' },
                { kpi: '42.6%', label: 'are workplace-ready', sub: '— Mercer-Mettl Employability Report 2024' },
                { kpi: '₹0', label: 'training a Tier-3 grad receives in workplace skills', sub: 'between college and first interview' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', padding: '28px 28px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}>0{i + 1} / 03</div>
                  <div style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.kpi}</div>
                  <div style={{ marginTop: 12, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.45 }}>{s.label}</div>
                  <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section style={{ marginTop: 96 }}>
            <SectionEyebrow>Who it's for</SectionEyebrow>
            <h2 style={miH2}>Aanya, 22, Patna.<br />Computer Science degree. Never been in an office.</h2>
            <p style={miP}>Aanya is the median user. First-generation graduate. A ₹9,000 Android phone. A 4G connection that drops in the afternoon. She's technically trained, but she's never had to push back on a PM, never had to draft a client status update, never had to escalate. She doesn't need more tutorials. She needs reps in a real workplace — the kind that doesn't exist for her yet.</p>
            <p style={miP}>KarmaLoop is built mobile-first for ₹9,000 phones. Works on 4G. Diagnostic delivered in her language. No laptop required.</p>
          </section>

          {/* vs Forage */}
          <section style={{ marginTop: 96 }}>
            <SectionEyebrow>Why this isn't another Forage</SectionEyebrow>
            <h2 style={miH2}>Forage is content. KarmaLoop is a mirror.</h2>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <DiffCol label="Static content tools" examples={['Forage', 'edtech LMS']} bg="var(--surface)"
                points={['Pre-recorded scenarios with model answers', 'You watch, you read, you submit', 'Feedback is comparison to a fixed key', 'No memory, no reaction, no consequence']} />
              <DiffCol label="KarmaLoop" highlight examples={['this']} accent={accent} bg="var(--surface)"
                points={["Reactive AI environment — every reply changes what happens next", "Characters with hidden agendas (Priya hides a 2pm demo; Kiran hides yesterday's push)", 'Diagnostic is an 8-dimension gap taxonomy, not a score', 'Annotated transcript: every choice tagged to a dimension']} />
            </div>
          </section>

          {/* 8 Dimensions */}
          <section style={{ marginTop: 96 }}>
            <SectionEyebrow>The diagnostic · eight dimensions</SectionEyebrow>
            <h2 style={miH2}>We don't give a score. We give a mirror.</h2>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {KL_DIMENSIONS.map((d, i) => (
                <div key={d.key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>0{i + 1} · dimension</div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>{d.full}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55 }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Wadhwani alignment */}
          <section style={{ marginTop: 96 }}>
            <SectionEyebrow>Wadhwani principle alignment</SectionEyebrow>
            <h2 style={miH2}>Impact-first, not research-first.</h2>
            <p style={{ ...miP, maxWidth: 720 }}>Quoting Alpan Raval, Chief Scientist at Wadhwani AI: "Our approach has fundamentally transformed... to what is clearly an impact-first mindset." Every cell below is how we embody one of Wadhwani's stated principles.</p>
            <div style={{ marginTop: 24, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {WADHWANI_TABLE.map(([principle, how], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) 2fr', gap: 0, borderBottom: i < WADHWANI_TABLE.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--surface)' }}>
                  <div style={{ padding: '16px 20px', borderRight: '1px solid var(--border)', fontWeight: 600, fontSize: 14, color: 'var(--text-1)', display: 'flex', alignItems: 'center' }}>{principle}</div>
                  <div style={{ padding: '16px 20px', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>{how}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Deployment */}
          <section style={{ marginTop: 96 }}>
            <SectionEyebrow>Deployment</SectionEyebrow>
            <h2 style={miH2}>SWAYAM. 75 million students. Tomorrow.</h2>
            <p style={miP}>SWAYAM is India's national learning platform. Wadhwani AI's spoken English assessment is already deployed there with Google's support. KarmaLoop is a new module on existing infrastructure. We don't need to build distribution — it exists.</p>
            <p style={miP}>Samagra Shiksha can deploy this to every state-supported college. NSDC can embed it in Skill India pathways. Employer partners can use diagnostic scores as a screening signal with consent-based portability.</p>
          </section>

          {/* CTA */}
          <section style={{ marginTop: 96, padding: '40px 32px', background: `linear-gradient(135deg, ${accent}22, transparent 60%), var(--surface)`, border: `1px solid ${accent}55`, borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Your first job. Before your first job.</h2>
            <p style={{ margin: '14px auto 28px', maxWidth: 540, fontSize: 16, color: 'var(--text-2)', lineHeight: 1.55 }}>Spend a morning at a fake company. Walk out with a profile no resume can fake.</p>
            <button onClick={onEnter} style={misPrimary(accent)}>
              <span>Enter the Simulation</span>
              <Icon name="arrow-right" size={18} />
            </button>
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
