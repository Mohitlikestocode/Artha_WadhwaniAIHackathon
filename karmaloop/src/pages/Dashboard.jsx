import { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { Radar } from '../components/Radar';
import { KL_DIMENSIONS, KL_scoreFor, KL_tierFor } from '../data/diagnostic';

const primaryBig = (accent) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '12px 18px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 24px ${accent}55` });

function RunCard({ run, accent, onOpen }) {
  const dims = KL_DIMENSIONS.map(d => {
    const raw = run.signals?.[d.key] || 0;
    const score = KL_scoreFor(raw);
    const tier = KL_tierFor(score);
    return { ...d, score, tier, value: score / 5 };
  });
  const avg = dims.reduce((s, d) => s + d.score, 0) / dims.length;

  return (
    <button onClick={onOpen} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', cursor: 'pointer', transition: 'all .15s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{run.scenarioTitle || 'Simulation run'}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
            {run.mode ? `Mode: ${run.mode}` : ''}{run.finishedAt ? ` · ${new Date(run.finishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}` : ''}
            {run.isDemo ? ' · DEMO' : ''}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: avg >= 4 ? '#10B981' : avg >= 3 ? '#6366F1' : '#F59E0B' }}>{avg.toFixed(1)}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>avg / 5</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {dims.slice(0, 5).map(d => (
          <span key={d.key} style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: d.tier.color, background: `${d.tier.color}18`, border: `1px solid ${d.tier.color}33`, padding: '2px 7px', borderRadius: 4 }}>
            {d.name} {d.score}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function Dashboard({ user = {}, accent = '#6366F1', onNewSim, onOpenRun, onBackHome }) {
  const [runs, setRuns] = useState(() => {
    try { return JSON.parse(localStorage.getItem('karmaloop:runs') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    if (runs.length === 0) {
      const seeded = [{
        id: 'demo-1',
        finishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        user: { name: user?.name || 'You', lang: 'en' },
        scenarioId: 'kt-day3', scenarioTitle: 'Day 3 · Kiran Technologies', mode: 'office',
        signals: { communication_clarity: 4, escalation_judgment: 3, prioritization_pressure: 3, stakeholder_empathy: 5, proactive_communication: 4, honest_estimation: 3, constructive_pushback: 2, documentation_accountability: 3 },
        isDemo: true,
      }];
      setRuns(seeded);
    }
  }, []);

  const dims = KL_DIMENSIONS.map(d => {
    const vals = runs.map(r => r.signals?.[d.key] || 0);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const score = KL_scoreFor(avg);
    const tier = KL_tierFor(score);
    return { ...d, avg, score, tier, value: score / 5 };
  });
  const top = [...dims].sort((a, b) => b.avg - a.avg)[0];
  const bottom = [...dims].sort((a, b) => a.avg - b.avg)[0];
  const modesCompleted = (() => { try { return JSON.parse(localStorage.getItem('karmaloop:modesCompleted') || '{}'); } catch { return {}; } })();

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text-1)' }}>
      <GridBg accent={accent} density={64} pulse={false} />

      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="logo" size={22} color="#fff" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>KarmaLoop</span>
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', border: '1px solid var(--border)', padding: '3px 7px', borderRadius: 4, letterSpacing: '0.1em' }}>YOUR DASHBOARD</span>
        </div>
        <button onClick={onBackHome} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={14} /><span>Home</span>
        </button>
      </header>

      <main style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '40px 28px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Welcome back{user?.name ? `, ${user.name}` : ''}</div>
            <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em', fontWeight: 700, lineHeight: 1.05 }}>Your simulation history.</h1>
            <p style={{ marginTop: 12, fontSize: 16, color: 'var(--text-2)', maxWidth: 600 }}>Track how your capabilities shift across scenarios. Most learners see a measurable lift in one dimension within three runs.</p>
          </div>
          <button onClick={onNewSim} style={primaryBig(accent)}>
            <Icon name="plus" size={16} /><span>Start new scenario</span>
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 32 }}>
          {[
            { label: 'Runs completed', value: runs.length, sub: runs.length >= 1 ? 'Keep going' : 'Get started' },
            { label: 'Strongest dimension', value: top?.name || '—', sub: top ? `score: ${top.avg.toFixed(1)}` : '' },
            { label: 'Highest-leverage focus', value: bottom?.name || '—', sub: bottom ? `score: ${bottom.avg.toFixed(1)}` : '' },
            { label: 'Time invested', value: runs.length === 0 ? '0m' : `${runs.length * 14}m`, sub: 'across all sessions' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{stat.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6, lineHeight: 1.1 }}>{stat.value}</div>
              {stat.sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* Radar + run history */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>Capability profile</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Radar data={dims.map(d => ({ label: d.name, value: d.value }))} size={300} accent={accent} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Recent runs</h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{runs.length} runs · all scenarios</span>
            </div>
            {runs.length === 0 ? (
              <div style={{ padding: '40px', background: 'var(--surface)', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-3)' }}>
                <Icon name="sparkle" size={28} color="var(--text-3)" />
                <div style={{ marginTop: 12, fontSize: 14 }}>No runs yet. Complete a simulation to see your profile here.</div>
                <button onClick={onNewSim} style={{ ...primaryBig(accent), marginTop: 16, fontSize: 13 }}>Start your first simulation</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {runs.map(r => <RunCard key={r.id || r.finishedAt} run={r} accent={accent} onOpen={() => onOpenRun(r)} />)}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
