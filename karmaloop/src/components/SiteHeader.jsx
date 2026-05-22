import { Icon } from './Icon';

export function SiteHeader({ active, accent = '#6366F1', onNavigate, onEnter, onDashboard }) {
  const links = [
    { id: 'mission',    label: 'Mission' },
    { id: 'howItWorks', label: 'How it works' },
    { id: 'scenarios',  label: 'Scenarios' },
    { id: 'employers',  label: 'For employers' },
  ];
  return (
    <header style={{
      position: 'relative', zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px',
      borderBottom: active ? '1px solid var(--border)' : 'none',
      background: 'rgba(15,15,15,0.78)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <button onClick={() => onNavigate?.('landing')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 0, padding: 0, cursor: 'pointer', color: 'var(--text-1)' }}>
        <Icon name="logo" size={24} color="#fff" />
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>KarmaLoop</span>
        <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: 4 }}>v0.3 · prototype</span>
      </button>

      <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {links.map((l) => (
          <button key={l.id} onClick={() => onNavigate?.(l.id)} style={{ background: 'transparent', border: 0, color: active === l.id ? 'var(--text-1)' : 'var(--text-2)', fontSize: 14, fontWeight: active === l.id ? 600 : 500, padding: '8px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', position: 'relative', transition: 'color .15s' }}>
            {l.label}
            {active === l.id && <span style={{ position: 'absolute', left: '50%', bottom: -1, transform: 'translateX(-50%)', width: 18, height: 2, background: accent, borderRadius: 999 }} />}
          </button>
        ))}
        <button onClick={onDashboard} style={{ marginLeft: 8, background: 'transparent', color: 'var(--text-1)', border: '1px solid var(--border-2)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Sign in</button>
        <button onClick={onEnter} style={{ marginLeft: 4, display: 'inline-flex', alignItems: 'center', gap: 6, background: accent, color: '#fff', border: 0, padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 6px 18px ${accent}55` }}>
          <span>Try a simulation</span>
          <Icon name="arrow-right" size={13} />
        </button>
      </nav>
    </header>
  );
}

export default SiteHeader;
