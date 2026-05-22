import { useState } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { GridBg } from '../components/GridBg';
import { Icon } from '../components/Icon';
import { Eyebrow, CTACard, SiteFooter, JargonText } from '../components/shared';
import { KL_TRACKS, KL_TRACK_BY_ID } from '../data/tracks';

function TrackDetail({ track, accent, onEnter }) {
  const c = track.color || accent;
  return (
    <section style={{ marginTop: 32, background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${c}`, borderRadius: 'var(--radius-xl)', padding: '36px 36px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: c, color: '#fff', letterSpacing: '0.08em' }}>{track.short}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{track.location} · {track.role}</span>
            {track.available ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: 'var(--emerald-fade)', color: 'var(--emerald)', border: '1px solid rgba(16,185,129,0.4)', letterSpacing: '0.08em', fontWeight: 700 }}>● LIVE</span>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: 'var(--surface-3)', color: 'var(--text-3)', letterSpacing: '0.08em' }}>COMING SOON</span>
            )}
          </div>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em', fontWeight: 700, lineHeight: 1.15 }}>{track.label}</h2>
          <p style={{ margin: '10px 0 0', fontSize: 17, color: 'var(--text-2)', lineHeight: 1.55 }}>{track.pitch}</p>
        </div>
        {track.available && (
          <button onClick={onEnter} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c, color: '#fff', border: 0, padding: '12px 20px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 24px ${c}55`, flexShrink: 0 }}>
            <span>Try this track</span>
            <Icon name="arrow-right" size={14} />
          </button>
        )}
      </div>

      {/* The Gap */}
      {track.gap && (
        <div style={{ padding: '16px 20px', background: 'var(--surface-2)', borderLeft: `3px solid ${c}`, borderRadius: '0 var(--radius) var(--radius) 0', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>The gap</div>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-1)', lineHeight: 1.55, fontStyle: 'italic' }}><JargonText>{track.gap}</JargonText></p>
        </div>
      )}

      {/* Scenario */}
      {track.scenarioTitle && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>The scenario</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{track.scenarioTitle}</h3>
          {track.scenarioBlurb && <p style={{ margin: 0, fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.6 }}><JargonText>{track.scenarioBlurb}</JargonText></p>}
        </div>
      )}

      {/* Two columns: sim elements + invisible skills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {track.simElements && track.simElements.length > 0 && (
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Tools you'll use</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {track.simElements.map((el, i) => (
                <span key={i} style={{ fontSize: 12, color: 'var(--text-1)', padding: '5px 10px', background: 'var(--surface-2)', border: '1px solid var(--border-2)', borderRadius: 999 }}>{el}</span>
              ))}
            </div>
          </div>
        )}
        {track.invisibleSkills && track.invisibleSkills.length > 0 && (
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>What this scenario tests</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {track.invisibleSkills.map((sk, i) => (
                <li key={i} style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 5, height: 5, borderRadius: '50%', background: c }} />
                  <JargonText>{sk}</JargonText>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function TrackCard({ track, onClick, isActive }) {
  const c = track.color || '#6366F1';
  return (
    <button onClick={onClick} style={{ textAlign: 'left', background: isActive ? 'var(--surface-3)' : 'var(--surface)', border: isActive ? `1.5px solid ${c}` : '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', color: 'var(--text-1)', cursor: 'pointer', transition: 'all .15s', boxShadow: isActive ? `0 0 0 4px ${c}22` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: c, color: '#fff', letterSpacing: '0.08em' }}>{track.short}</span>
        {track.available ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--emerald)', letterSpacing: '0.08em' }}>● LIVE</span>
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-3)', letterSpacing: '0.08em' }}>SOON</span>
        )}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.01em' }}>{track.label}</div>
      <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 10 }}>{track.scenarioBlurb || track.pitch}</div>
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--border-2)', fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
        {track.location} · {track.role}
      </div>
    </button>
  );
}

const scH1 = { margin: 0, fontSize: 'clamp(40px, 6.5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700 };
const scH2 = { margin: '12px 0 0', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', fontWeight: 700, lineHeight: 1.1 };
const scLede = { marginTop: 26, fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 740 };

export default function Scenarios({ accent = '#6366F1', onNavigate, onEnter, onDashboard }) {
  const [activeTrackId, setActiveTrackId] = useState('swe');
  const active = KL_TRACK_BY_ID[activeTrackId] || KL_TRACKS[0];

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text-1)' }}>
      <SiteHeader active="scenarios" accent={accent} onNavigate={onNavigate} onEnter={onEnter} onDashboard={onDashboard} />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <GridBg accent={accent} density={64} pulse />
        <main style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '64px 28px 100px' }}>

          <Eyebrow accent={accent}>Scenarios · 8 career tracks</Eyebrow>
          <h1 style={scH1}>
            Every track. Every kind of work.<br />
            <span style={{ background: `linear-gradient(120deg, ${accent} 0%, #C7D2FE 60%, #fff 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every test the workplace runs.</span>
          </h1>
          <p style={scLede}><JargonText>India's career landscape isn't one path. KarmaLoop ships eight, each calibrated to the real workday of that role. SWE is live today. The other seven are designed, scoped, and queued — full UI, full diagnostic, full scenario library. Browse below.</JargonText></p>

          {/* Track switcher */}
          <div style={{ marginTop: 48, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {KL_TRACKS.map(tr => (
              <button key={tr.id} onClick={() => setActiveTrackId(tr.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: activeTrackId === tr.id ? 'var(--surface-3)' : 'var(--surface)', border: activeTrackId === tr.id ? `1.5px solid ${tr.color}` : '1px solid var(--border)', borderRadius: 999, color: 'var(--text-1)', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all .15s', boxShadow: activeTrackId === tr.id ? `0 0 0 4px ${tr.color}22` : 'none' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tr.color, boxShadow: `0 0 6px ${tr.color}` }} />
                {tr.label}
                {!tr.available && <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>SOON</span>}
              </button>
            ))}
          </div>

          <TrackDetail track={active} accent={accent} onEnter={onEnter} />

          {/* Full slate grid */}
          <section style={{ marginTop: 96 }}>
            <Eyebrow accent={accent}>The full slate</Eyebrow>
            <h2 style={scH2}>One platform. Eight career arcs.</h2>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {KL_TRACKS.map(tr => (
                <TrackCard key={tr.id} track={tr} accent={accent} onClick={() => setActiveTrackId(tr.id)} isActive={activeTrackId === tr.id} />
              ))}
            </div>
          </section>

          <CTACard accent={accent} onEnter={onEnter}
            headline="The SWE track is live."
            sub="Spend twelve minutes inside Day 3 at Kiran Technologies. Hit a P0. Get a diagnostic. Try it now."
            cta="Try the SWE track" />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
