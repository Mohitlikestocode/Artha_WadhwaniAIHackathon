import { useState } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { KL_TRACK_BY_ID } from '../data/tracks';

const MODES = [
  { id: 'office',  label: 'The Office',  icon: '🏢', desc: 'Live AI workplace. Messaging, tickets, characters, chaos.', duration: '~25 min', tone: 'Most popular', available: true, accent: '#6366F1', new: false },
  { id: 'warroom', label: 'War Room',    icon: '🚨', desc: 'Crisis. Clock ticking. Multiple fires at once.', duration: '~5 min',  tone: 'High pressure', available: true, accent: '#EF4444', new: true },
  { id: 'branch',  label: 'The Branch',  icon: '🌿', desc: 'Every choice has consequences. Watch them unfold.', duration: '~10 min', tone: 'Reflective', available: true, accent: '#10B981', new: true },
  { id: 'inbox',   label: 'Inbox Zero',  icon: '📬', desc: 'Monday morning. 23 emails. 30 minutes before your first meeting. Go.', duration: '~15 min', tone: 'Unique', available: true, accent: '#F59E0B', new: true },
  { id: 'arena',   label: 'The Arena',   icon: '🤝', desc: 'Negotiation. One room. You vs. them. Relationship + deal value on the line.', duration: '~5 min',  tone: 'Intense', available: true, accent: '#A855F7', new: true },
  { id: 'stage',   label: 'The Stage',   icon: '🎙️', desc: 'Present. Defend. Handle questions. The audience is not on your side.', duration: '~5 min',  tone: 'Performance', available: true, accent: '#06B6D4', new: true },
];

function ModeCard({ mode, isNext, done, onPick }) {
  const c = mode.accent;
  return (
    <button onClick={onPick} disabled={!mode.available}
      style={{
        position: 'relative',
        background: 'var(--surface)',
        border: isNext && mode.available ? `2px solid ${c}` : '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 22px 20px',
        color: 'var(--text-1)',
        textAlign: 'left',
        cursor: mode.available ? 'pointer' : 'not-allowed',
        opacity: mode.available ? 1 : 0.65,
        transition: 'all .15s',
        overflow: 'hidden',
        boxShadow: isNext && mode.available ? `0 0 0 1px ${c}, 0 14px 36px ${c}33` : 'none',
      }}>
      {isNext && mode.available && (
        <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: c, color: '#fff', letterSpacing: '0.06em' }}>NEXT FOR YOU</span>
      )}
      {done && (
        <span style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={14} color="#fff" />
        </span>
      )}
      {!mode.available && !done && (
        <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'var(--surface-3)', color: 'var(--text-3)', letterSpacing: '0.06em' }}>SOON</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${c}1a`, border: `1px solid ${c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{mode.icon}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: c, letterSpacing: '0.1em', fontWeight: 700 }}>MODE {MODES.findIndex(m => m.id === mode.id) + 1}</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 2 }}>{mode.label}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55, minHeight: 60 }}>{mode.desc}</p>
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--border-2)', display: 'flex', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4, background: 'var(--surface-2)' }}>{mode.duration}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c, letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4, background: `${c}1a`, border: `1px solid ${c}33` }}>{mode.tone}</span>
      </div>
    </button>
  );
}

export default function ModeSelector({ user = {}, accent = '#6366F1', onPickMode, onBack }) {
  const [completed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('artha:modesCompleted') || localStorage.getItem('karmaloop:modesCompleted') || '{}'); }
    catch { return {}; }
  });

  const arcMap = {
    swe:       ['inbox', 'branch', 'office', 'warroom'],
    freelance: ['arena', 'inbox', 'branch', 'office'],
    founder:   ['stage', 'arena', 'warroom', 'branch'],
  };
  const recommended = arcMap[user?.track || 'swe'] || ['office', 'branch', 'inbox', 'warroom'];
  const nextRecommended = recommended.find(m => !completed[m]) || 'office';

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--bg)', overflow: 'hidden', color: 'var(--text-1)' }}>
      <GridBg accent={accent} density={64} pulse={false} />

      <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={14} /><span>Back</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="logo" size={20} color="#fff" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Artha</span>
          <span style={{ marginLeft: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', border: '1px solid var(--border)', padding: '3px 7px', borderRadius: 4, letterSpacing: '0.1em' }}>SIMULATION MODES</span>
        </div>
        <div style={{ width: 80 }} />
      </header>

      <main style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: accent, marginRight: 8, verticalAlign: 'middle', boxShadow: `0 0 10px ${accent}` }} />
            For {user?.name || 'you'} · {KL_TRACK_BY_ID[user?.track]?.label || 'Software Engineering'}
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em', fontWeight: 700, lineHeight: 1.05 }}>How do you want to practice today?</h1>
          <p style={{ marginTop: 14, fontSize: 16, color: 'var(--text-2)', maxWidth: 680, lineHeight: 1.55 }}>
            Real workplaces don't test you one way. Artha has six. Each tests a different kind of intelligence. Try them in any order — the recommended next one is highlighted.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {MODES.map(m => (
            <ModeCard key={m.id} mode={m} isNext={m.id === nextRecommended} done={!!completed[m.id]} onPick={() => m.available && onPickMode(m.id)} />
          ))}
        </div>

        <div style={{ marginTop: 36, padding: '16px 18px', background: 'var(--surface)', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', fontSize: 13, color: 'var(--text-2)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Icon name="sparkle" size={16} color={accent} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            Each mode produces its own diagnostic. After 3+ modes, Artha generates a <b style={{ color: 'var(--text-1)' }}>Cross-Mode Synthesis</b> — patterns that hold across context, where you grow vs. plateau, and the single highest-leverage habit to work on next.
          </div>
        </div>
      </main>
    </div>
  );
}
