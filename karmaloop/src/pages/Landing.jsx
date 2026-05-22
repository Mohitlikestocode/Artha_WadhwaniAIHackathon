import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { SiteHeader } from '../components/SiteHeader';

const primaryBtn = (accent) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '14px 22px', fontSize: 15, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 28px ${accent}55`, transition: 'transform .12s, box-shadow .12s' });
const ghostBtn = { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface)', color: 'var(--text-1)', border: '1px solid var(--border-2)', padding: '14px 18px', fontSize: 15, fontWeight: 500, borderRadius: 'var(--radius-sm)', cursor: 'pointer' };

export default function Landing({ onEnter, accent = '#6366F1', onNavigate, onDashboard }) {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      <GridBg accent={accent} />
      <SiteHeader accent={accent} onNavigate={onNavigate} onEnter={onEnter} onDashboard={onDashboard} />

      <main style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px 64px', maxWidth: 1180, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'var(--indigo-fade)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--indigo-soft)', alignSelf: 'flex-start', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 12px ${accent}` }} />
          AI workplace simulation · Wadhwani AI hackathon · Problem 3.2
        </div>

        <h1 style={{ margin: 0, fontSize: 'clamp(40px, 7vw, 84px)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700 }}>
          Your first job.
          <br />
          <span style={{ background: `linear-gradient(120deg, ${accent} 20%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Before your first job.
          </span>
        </h1>

        <p style={{ marginTop: 28, maxWidth: 620, fontSize: 'clamp(16px, 1.7vw, 20px)', lineHeight: 1.5, color: 'var(--text-2)' }}>
          An AI workplace simulation that diagnoses your real capabilities — not just your technical skills.
          Spend a morning at a fake company. Walk out with a profile no resume can fake.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <button onClick={onEnter} style={primaryBtn(accent)}>
            <span>Enter the Simulation</span>
            <Icon name="arrow-right" size={18} />
          </button>
          <button onClick={() => onNavigate?.('mission')} style={ghostBtn}>
            <Icon name="sparkle" size={14} />
            <span>Why this matters</span>
          </button>
        </div>

        <p style={{ marginTop: 22, fontSize: 13, color: 'var(--text-3)', maxWidth: 580 }}>
          Built for the <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>42.6% of Indian graduates</span> who
          have the credentials but not the workplace texture. Eight career tracks. Eight Indian languages.
        </p>

        <section style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {[
            { kpi: '42.6%', label: 'of Indian graduates are workplace-ready', sub: '— Mercer-Mettl Employability Report 2024' },
            { kpi: '8',     label: 'career tracks · from SWE to founder',     sub: 'AI workplace simulation per track' },
            { kpi: '8-dim', label: 'capability diagnostic, not a score',       sub: 'reps + mirror, not a leaderboard' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '28px 28px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}>0{i + 1} / 03</div>
              <div style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text-1)' }}>{s.kpi}</div>
              <div style={{ marginTop: 12, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.45 }}>{s.label}</div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{s.sub}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {[
            { title: 'A workplace that reacts to you', desc: 'Characters with hidden agendas. Curveballs that fire on timers. Every reply changes what happens next.' },
            { title: 'The invisible skills', desc: 'Honest estimation. Constructive pushback. Escalation judgment. The things no Indian college teaches.' },
            { title: 'A diagnostic, not a score', desc: 'Eight dimensions. Specific moments. Specific phrases to try tomorrow. A mirror, not a leaderboard.' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>0{i + 1} · feature</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', color: 'var(--text-3)', fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <span style={{ color: 'var(--text-2)' }}>How a session runs →</span>
          {['01 · onboard (90 sec)', '02 · simulate (12 min)', '03 · diagnostic profile'].map((s, i) => (
            <span key={i} style={{ padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)' }}>{s}</span>
          ))}
        </section>
      </main>

      <footer style={{ position: 'relative', zIndex: 2, padding: '20px 32px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-3)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span>© 2026 KarmaLoop Labs · Built for Bengaluru, Bhopal, Bhubaneswar. Not just Bangalore.</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Available in हिन्दी · தமிழ் · ಕನ್ನಡ · తెలుగు · मराठी · English</span>
      </footer>
    </div>
  );
}
