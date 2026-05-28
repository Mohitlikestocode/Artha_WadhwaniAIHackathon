import { Icon } from './Icon';
import { processMessageForJargon } from './jargon/JargonProcessor';

// Eyebrow label with glowing dot
export function Eyebrow({ accent = '#6366F1', children }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>
      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: accent, marginRight: 8, verticalAlign: 'middle', boxShadow: `0 0 10px ${accent}` }} />
      {children}
    </div>
  );
}

// Minimal section eyebrow (no dot)
export function SectionEyebrow({ children }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</div>
  );
}

// CTA section card
export function CTACard({ accent = '#6366F1', onEnter, headline = 'Your first job. Before your first job.', sub = 'Spend a morning at a fake company. Walk out with a profile no resume can fake.', cta = 'Enter the simulation' }) {
  return (
    <section style={{ marginTop: 96, padding: '40px 32px', background: `linear-gradient(135deg, ${accent}22, transparent 60%), var(--surface)`, border: `1px solid ${accent}55`, borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
      <h2 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{headline}</h2>
      <p style={{ margin: '14px auto 28px', maxWidth: 540, fontSize: 16, color: 'var(--text-2)', lineHeight: 1.55 }}>{sub}</p>
      <button onClick={onEnter} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: accent, color: '#fff', border: 0, padding: '16px 28px', fontSize: 15, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 12px 32px ${accent}55` }}>
        <span>{cta}</span>
        <Icon name="arrow-right" size={16} />
      </button>
    </section>
  );
}

// Site footer
export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 28px', fontSize: 12, color: 'var(--text-3)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <span>© 2026 Artha Labs · Built for Bengaluru, Bhopal, Bhubaneswar. Not just Bangalore.</span>
      <span style={{ fontFamily: 'var(--font-mono)' }}>Available in हिन्दी · தமிழ் · ಕನ್ನಡ · తెలుగు · मराठी · English</span>
    </footer>
  );
}

// JargonText — wraps text with jargon tooltips (uses existing processor)
export function JargonText({ children }) {
  if (typeof children !== 'string') return <>{children}</>;
  const processed = processMessageForJargon(children);
  return <>{processed}</>;
}
