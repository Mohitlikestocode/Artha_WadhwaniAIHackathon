import { useState, useEffect, useRef } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { Radar } from '../components/Radar';
import { Avatar } from '../components/Avatar';
import { KL_DIMENSIONS, KL_scoreFor, KL_tierFor, KL_OBSERVATIONS, KL_BEST_MOMENTS, KL_GROWTH_EDGES, KL_EMPLOYER_SIGNAL, KL_OVERALL_SUMMARY, KL_INDIA_CONTEXT, pickBestMoment } from '../data/diagnostic';

const primaryBig = (accent) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '14px 22px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 24px ${accent}55` });
const ghostBig = { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface)', color: 'var(--text-1)', border: '1px solid var(--border-2)', padding: '14px 18px', fontSize: 14, fontWeight: 500, borderRadius: 'var(--radius-sm)', cursor: 'pointer' };

function DimensionCard({ d, i, revealed }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(12px) rotateX(-6deg)', transition: 'opacity .35s, transform .45s cubic-bezier(.2,.7,.3,1)', transformOrigin: 'top center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>0{i + 1} · {d.name}</div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px', background: `${d.tier.color}22`, color: d.tier.color, border: `1px solid ${d.tier.color}44`, borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: d.tier.color, boxShadow: `0 0 6px ${d.tier.color}` }} />
          {d.tier.label}
        </span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 10, lineHeight: 1.3 }}>{d.full}</div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
        {[1,2,3,4,5].map(n => (
          <span key={n} style={{ width: 9, height: 9, borderRadius: '50%', background: n <= d.score ? d.tier.color : 'var(--surface-3)', border: n <= d.score ? 'none' : '1px solid var(--border-2)', boxShadow: n <= d.score ? `0 0 6px ${d.tier.color}55` : 'none' }} />
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-2)' }}>{d.obs.obs}</p>
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--border-2)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Next step</div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-1)' }}>{d.obs.next}</p>
      </div>
    </div>
  );
}

export default function DiagnosticCard({ user = {}, result = {}, onRestart, onDashboard }) {
  const accent = '#6366F1';
  const signals = result.signals || { communication_clarity: 8, escalation_judgment: 5, prioritization_pressure: 4, stakeholder_empathy: 6, proactive_communication: 3, honest_estimation: 6, constructive_pushback: 7, documentation_accountability: 4 };
  const transcript = result.transcript || [];

  const dims = KL_DIMENSIONS.map(d => {
    const raw = signals[d.key] || 0;
    const score = KL_scoreFor(raw);
    const tier = KL_tierFor(score);
    const value = score / 5;
    const obs = KL_OBSERVATIONS[d.key][tier.key] || KL_OBSERVATIONS[d.key].emerging;
    return { ...d, raw, score, tier, value, obs };
  });

  const avgScore = dims.reduce((s, d) => s + d.score, 0) / dims.length;
  const employerLine = KL_EMPLOYER_SIGNAL(avgScore);
  const indiaContext = KL_INDIA_CONTEXT(signals, dims);
  const bestMoment = pickBestMoment(transcript, signals);
  const lowest = [...dims].sort((a, b) => a.score - b.score)[0];
  const growth = KL_GROWTH_EDGES.find(g => g.dim === lowest.key) || KL_GROWTH_EDGES[0];

  const [revealed, setRevealed] = useState(0);
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => { setTimeout(() => setHeroIn(true), 80); }, []);
  useEffect(() => {
    const id = setInterval(() => setRevealed(r => r >= dims.length ? r : r + 1), 150);
    return () => clearInterval(id);
  }, [dims.length]);

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--bg)', overflow: 'hidden', color: 'var(--text-1)' }}>
      <GridBg accent={accent} density={64} pulse={false} />

      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="logo" size={22} color="#fff" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Artha</span>
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', border: '1px solid var(--border)', padding: '3px 7px', borderRadius: 4, letterSpacing: '0.1em' }}>DAY 3 RECAP</span>
        </div>
        <button onClick={onRestart} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="reset" size={14} /><span>Try another scenario</span>
        </button>
      </header>

      <main style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '40px 28px 80px' }}>
        {/* Hero */}
        <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'none' : 'translateY(10px)', transition: 'opacity .6s, transform .6s' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            {result.scenarioTitle || 'Day 3 · Kiran Technologies'} · {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 700 }}>
            Here's how Day 3 went,<br />
            <span style={{ background: `linear-gradient(120deg, ${accent} 0%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user.name || 'there'}.</span>
          </h1>
          <blockquote style={{ margin: '28px 0 0', padding: '20px 24px', background: 'var(--surface)', borderLeft: `3px solid ${accent}`, borderRadius: '0 var(--radius-lg) var(--radius-lg) 0', fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.45, color: 'var(--text-1)', maxWidth: 760 }}>
            "{employerLine}"
            <footer style={{ marginTop: 12, fontSize: 12, fontStyle: 'normal', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>— simulated_employer_signal · v1</footer>
          </blockquote>
          <p style={{ margin: '24px 0 0', fontSize: 16, lineHeight: 1.65, color: 'var(--text-2)', maxWidth: 760 }}>{KL_OVERALL_SUMMARY(signals, dims)}</p>
        </div>

        {/* Radar + quick stats */}
        <section style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px 24px 28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>capability profile</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <Radar data={dims.map(d => ({ label: d.name, value: d.value }))} size={340} accent={accent} />
            </div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 24 }}>
              {dims.map(d => (
                <div key={d.key} style={{ background: 'var(--surface)', padding: '14px 12px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{d.name}</div>
                  <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: d.tier.color }}>{d.tier.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-2)', margin: 0, maxWidth: 540 }}>
              You navigated a P0 production incident on Day 3. Below is what showed up — what you led with, where you stretched, and where to focus next.{' '}
              <span style={{ color: 'var(--text-3)' }}>This profile is generated from your in-simulation behaviour, not a self-assessment.</span>
            </p>
          </div>
        </section>

        {/* Dimension cards */}
        <section style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {dims.map((d, i) => <DimensionCard key={d.key} d={d} i={i} revealed={i < revealed} />)}
        </section>

        {/* Standout + Growth */}
        <section style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.10), rgba(245,158,11,0.04))', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 'var(--radius-lg)', padding: '24px 26px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 160, height: 160, background: 'radial-gradient(circle, rgba(250,204,21,0.25), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FCD34D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>✦</span> Your best moment
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>{bestMoment.line}</div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>{bestMoment.why}</p>
          </div>

          <div style={{ background: 'var(--surface)', border: `1px solid ${accent}55`, borderRadius: 'var(--radius-lg)', padding: '24px 26px', boxShadow: `0 0 0 1px ${accent}22, 0 12px 32px ${accent}22`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bolt" size={11} color={accent} /> Your highest-leverage focus
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>{growth.line}</div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55 }}>
              <span style={{ color: 'var(--text-3)' }}>Try this →</span> {growth.how}
            </p>
          </div>
        </section>

        {/* India context */}
        <section style={{ marginTop: 16 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(99,102,241,0.03))', border: '1px dashed rgba(139,92,246,0.25)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, fontSize: 22, lineHeight: 1, filter: 'saturate(0.85)' }}>🇮🇳</div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#A78BFA', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>India context</div>
              <p style={{ margin: 0, fontSize: 14.5, color: 'var(--text-1)', lineHeight: 1.6 }}>{indiaContext}</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section style={{ marginTop: 56, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onRestart} style={primaryBig(accent)}>
            <span>Try another scenario</span><Icon name="arrow-right" size={16} />
          </button>
          {onDashboard && (
            <button onClick={onDashboard} style={ghostBig}>
              <Icon name="gauge" size={14} /><span>View dashboard</span>
            </button>
          )}
        </section>
      </main>

      <style>{`
        @media (max-width: 760px) {
          section[style*="grid-template-columns: minmax(280px"] { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
