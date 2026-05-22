import { useState } from 'react';
import { Icon } from '../components/Icon';
import { GridBg } from '../components/GridBg';
import { KL_TRACKS, KL_TRACK_BY_ID } from '../data/tracks';

const BACKGROUNDS = [
  { code: 'current_student', label: 'Currently studying', sub: 'In college now' },
  { code: 'fresh_graduate', label: 'Fresh graduate', sub: '0–1 years out' },
  { code: 'career_switcher', label: 'Career switcher', sub: 'Pivoting into tech' },
  { code: 'working_professional', label: 'Already working', sub: 'Want to grow' },
];
const YEARS = ['0', '1', '2', '3+'];
const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

function OnbStepper({ step, total = 5, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ width: i === step ? 24 : 8, height: 4, borderRadius: 2, background: i <= step ? accent : 'var(--border-2)', transition: 'width .25s, background .25s' }} />
      ))}
    </div>
  );
}

function Slider5({ label, leftLabel, rightLabel, value, onChange, accent }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent }}>{value}/5</span>
      </div>
      <input type="range" min="1" max="5" step="1" value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${accent} ${(value - 1) * 25}%, var(--border-2) ${(value - 1) * 25}%)`, outline: 'none', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  );
}

function StepBriefing({ name, track, accent, onEnter }) {
  const tr = KL_TRACK_BY_ID[track];
  const lines = [
    `Good morning, ${name || 'friend'}.`,
    `It's Day 3 at ${tr ? 'Kiran Technologies, Bengaluru' : 'your workplace'}.`,
    `You joined as a Junior ${tr?.role?.replace('Junior ', '') || 'Software Engineer'} on Monday.`,
    'Your inbox has 2 unread messages.',
    'One of them is from your manager.',
    'One of them is from the client.',
    'The production alert fired 8 minutes ago.',
  ];
  const [shown, setShown] = useState(0);
  const [buttonIn, setButtonIn] = useState(false);

  useState(() => {
    let cancelled = false;
    const reveal = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, i === 0 ? 280 : 580));
        if (!cancelled) setShown(i + 1);
      }
      await new Promise((r) => setTimeout(r, 900));
      if (!cancelled) setButtonIn(true);
    };
    reveal();
    return () => { cancelled = true; };
  });

  // Use effect instead
  const [started, setStarted] = useState(false);
  if (!started) {
    setStarted(true);
    let cancelled = false;
    const go = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        await new Promise(r => setTimeout(r, i === 0 ? 280 : 580));
        if (!cancelled) setShown(i + 1);
      }
      await new Promise(r => setTimeout(r, 900));
      if (!cancelled) setButtonIn(true);
    };
    go();
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 28 }}>
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: accent, marginRight: 8, verticalAlign: 'middle', boxShadow: `0 0 10px ${accent}` }} />
        Pre-briefing
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontSize: i === 0 ? 'clamp(28px, 4vw, 40px)' : 'clamp(15px, 2vw, 18px)', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--text-1)' : 'var(--text-2)', letterSpacing: i === 0 ? '-0.02em' : 'normal', lineHeight: 1.4, opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateY(6px)', transition: 'opacity .6s, transform .6s' }}>{line}</div>
        ))}
      </div>
      <div style={{ margin: '40px auto 12px', width: 80, height: 1, background: 'var(--border-2)' }} />
      <p style={{ fontSize: 16, color: 'var(--text-2)', opacity: buttonIn ? 1 : 0, transition: 'opacity .6s', marginBottom: 24 }}>Your team is ready. Are you?</p>
      <button onClick={onEnter} disabled={!buttonIn} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: accent, color: '#fff', border: 0, padding: '18px 32px', fontSize: 16, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: buttonIn ? 'pointer' : 'not-allowed', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 12px 32px ${accent}66`, letterSpacing: '0.01em', opacity: buttonIn ? 1 : 0, transform: buttonIn ? 'none' : 'translateY(8px)', transition: 'opacity .5s, transform .5s', pointerEvents: buttonIn ? 'auto' : 'none' }}>
        <span>Enter the office</span>
        <Icon name="arrow-right" size={18} />
      </button>
    </div>
  );
}

export default function Onboarding({ accent = '#6366F1', onDone, onBack }) {
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState('swe');
  const [bg, setBg] = useState('');
  const [years, setYears] = useState('');
  const [selfRated, setSelfRated] = useState({ technical: 3, communication: 3, workplace: 2 });
  const [lang, setLang] = useState('en');
  const [name, setName] = useState('');

  const next = () => setStep(s => Math.min(4, s + 1));
  const prev = () => step === 0 ? onBack() : setStep(s => s - 1);

  const canAdvance = (step === 0 && track) || (step === 1 && bg && years && name.trim().length > 0) || step === 2 || (step === 3 && lang) || step === 4;

  const finish = () => {
    onDone({ name: name.trim() || 'You', track, bg, yearsExperience: years, selfRated, language: lang, profile: {} });
  };

  const cardStyle = (active, accent) => ({ background: active ? 'var(--surface-3)' : 'var(--surface-2)', border: active ? `1.5px solid ${accent}` : '1px solid var(--border)', color: 'var(--text-1)', padding: '16px 14px', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all .15s', boxShadow: active ? `0 0 0 4px ${accent}22, 0 8px 20px ${accent}33` : 'none', opacity: 1 });

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      <GridBg accent={accent} density={72} pulse={step !== 4} />
      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px' }}>
        <button onClick={prev} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={16} /><span>{step === 0 ? 'Home' : 'Back'}</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="logo" size={20} color="#fff" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>KarmaLoop</span>
        </div>
        <OnbStepper step={step} total={5} accent={accent} />
      </header>

      <main style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: step === 4 ? 'center' : 'flex-start', justifyContent: 'center', padding: '40px 24px' }}>
        <div key={step} style={{ width: '100%', maxWidth: step === 0 ? 980 : step === 4 ? 720 : 640, background: step === 4 ? 'transparent' : 'var(--surface)', border: step === 4 ? 'none' : '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: step === 4 ? '24px 16px' : '36px 32px', boxShadow: step === 4 ? 'none' : '0 24px 60px rgba(0,0,0,0.4)', animation: 'klFadeUp .35s cubic-bezier(.2,.7,.3,1) both' }}>

          {/* STEP 0 — Track selection */}
          {step === 0 && (
            <>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>What kind of work makes you come alive?</h2>
              <p style={{ margin: '10px 0 24px', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>Choose the path you're building toward. You can try other tracks later.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 8 }}>
                {KL_TRACKS.map(tr => (
                  <button key={tr.id} onClick={() => tr.available && setTrack(tr.id)} disabled={!tr.available} style={{ ...cardStyle(track === tr.id, accent), opacity: tr.available ? 1 : 0.55, position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: tr.available ? (track === tr.id ? accent : 'var(--surface-3)') : 'var(--surface-3)', color: tr.available ? (track === tr.id ? '#fff' : 'var(--text-2)') : 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em' }}>{tr.short}</span>
                      {!tr.available && <span style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>SOON</span>}
                      {track === tr.id && tr.available && <Icon name="check" size={14} color={accent} />}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: tr.available ? 'var(--text-1)' : 'var(--text-2)', letterSpacing: '-0.01em' }}>{tr.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.45 }}>{tr.pitch}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 1 — Background + name */}
          {step === 1 && (
            <>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Where are you right now?</h2>
              <p style={{ margin: '10px 0 24px', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>This calibrates how the characters in your simulation will treat you.</p>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 8 }}>YOUR NAME</label>
              <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aanya, Vikram, Priya…"
                style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-1)', padding: '14px 16px', fontSize: 16, borderRadius: 'var(--radius)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 8, marginTop: 24 }}>BACKGROUND</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {BACKGROUNDS.map(b => (
                  <button key={b.code} onClick={() => setBg(b.code)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: bg === b.code ? 'var(--surface-3)' : 'var(--surface-2)', border: bg === b.code ? `1.5px solid ${accent}` : '1px solid var(--border)', color: 'var(--text-1)', padding: '14px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all .15s' }}>
                    <div><div style={{ fontSize: 15, fontWeight: 600 }}>{b.label}</div><div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{b.sub}</div></div>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: bg === b.code ? `2px solid ${accent}` : '1.5px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {bg === b.code && <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />}
                    </div>
                  </button>
                ))}
              </div>
              <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 8, marginTop: 24 }}>YEARS OF EXPERIENCE</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {YEARS.map(y => (
                  <button key={y} onClick={() => setYears(y)} style={{ flex: 1, background: years === y ? accent : 'var(--surface-2)', border: years === y ? `1px solid ${accent}` : '1px solid var(--border)', color: years === y ? '#fff' : 'var(--text-1)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}>{y}</button>
                ))}
              </div>
            </>
          )}

          {/* STEP 2 — Self assessment */}
          {step === 2 && (
            <>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Be honest. This calibrates your simulation.</h2>
              <p style={{ margin: '10px 0 24px', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>Lower ratings = more supportive simulation. Higher ratings = more challenge. There is no wrong answer.</p>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Slider5 label="Technical skills" leftLabel="Novice" rightLabel="Expert" value={selfRated.technical} accent={accent} onChange={v => setSelfRated({ ...selfRated, technical: v })} />
                <Slider5 label="Professional communication" leftLabel="Uncomfortable" rightLabel="Confident" value={selfRated.communication} accent={accent} onChange={v => setSelfRated({ ...selfRated, communication: v })} />
                <Slider5 label="Workplace experience" leftLabel="Never worked" rightLabel="Experienced" value={selfRated.workplace} accent={accent} onChange={v => setSelfRated({ ...selfRated, workplace: v })} />
              </div>
              <div style={{ marginTop: 24, padding: '12px 16px', background: 'var(--surface-2)', border: `1px solid ${accent}55`, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="sparkle" size={16} color={accent} />
                <div style={{ fontSize: 13, color: 'var(--text-2)', flex: 1 }}>
                  Calibrated for: <b style={{ color: 'var(--text-1)' }}>{selfRated.workplace <= 2 ? 'Supportive' : selfRated.workplace <= 3 ? 'Realistic' : 'Demanding'}</b> difficulty · {Math.max(selfRated.communication, selfRated.workplace) <= 2 ? 'warm' : Math.max(selfRated.communication, selfRated.workplace) >= 4 ? 'demanding' : 'neutral'} characters
                </div>
              </div>
            </>
          )}

          {/* STEP 3 — Language */}
          {step === 3 && (
            <>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Your diagnostic, in your language.</h2>
              <p style={{ margin: '10px 0 24px', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>The simulation runs in English — that's part of the training. Your results will come in your chosen language.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginTop: 8 }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => setLang(l.code)} style={{ background: lang === l.code ? 'var(--surface-3)' : 'var(--surface-2)', border: lang === l.code ? `1.5px solid ${accent}` : '1px solid var(--border)', color: 'var(--text-1)', padding: '12px 8px', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'center', transition: 'all .15s', boxShadow: lang === l.code ? `0 0 0 4px ${accent}22` : 'none' }}>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{l.native}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{l.label}</div>
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic' }}>(Demo: all copy is in English. Localized diagnostics ship in v0.2.)</p>
            </>
          )}

          {/* STEP 4 — Briefing */}
          {step === 4 && <StepBriefing name={name} track={track} accent={accent} onEnter={finish} />}

          {step < 4 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>STEP {step + 1} OF 5 · ~60 seconds</span>
              <button onClick={next} disabled={!canAdvance} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: accent, color: '#fff', border: 0, padding: '12px 18px', fontSize: 14, fontWeight: 600, borderRadius: 'var(--radius-sm)', cursor: canAdvance ? 'pointer' : 'not-allowed', boxShadow: `0 0 0 1px rgba(255,255,255,0.06) inset, 0 6px 20px ${accent}55`, opacity: canAdvance ? 1 : 0.4 }}>
                <span>Continue</span><Icon name="arrow-right" size={16} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
