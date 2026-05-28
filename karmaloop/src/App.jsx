import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Mission from './pages/Mission';
import HowItWorks from './pages/HowItWorks';
import Scenarios from './pages/Scenarios';
import Employers from './pages/Employers';
import Onboarding from './pages/Onboarding';
import ModeSelector from './pages/ModeSelector';
import SimulationRoom from './pages/SimulationRoom';
import BranchEngine from './pages/BranchEngine';
import ModeLite from './pages/ModeLite';
import InboxZero from './pages/InboxZero';
import DiagnosticCard from './pages/DiagnosticCard';
import Dashboard from './pages/Dashboard';

const ACCENT = '#6366F1';

function hexToFade(hex, alpha) {
  const h = hex.replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h;
  const r = parseInt(x.slice(0, 2), 16);
  const g = parseInt(x.slice(2, 4), 16);
  const b = parseInt(x.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [user, setUser] = useState({ name: '', lang: 'en', bg: '', track: 'swe', profile: null });
  const [result, setResult] = useState(null);
  const [currentMode, setCurrentMode] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', '#0F0F0F');
    document.documentElement.style.setProperty('--surface', '#1A1A1A');
    document.documentElement.style.setProperty('--surface-2', '#242424');
    document.documentElement.style.setProperty('--surface-3', '#2E2E2E');
    document.documentElement.style.setProperty('--border', '#2A2A2A');
    document.documentElement.style.setProperty('--border-2', '#353535');
    document.documentElement.style.setProperty('--indigo', ACCENT);
    document.documentElement.style.setProperty('--indigo-soft', '#818CF8');
    document.documentElement.style.setProperty('--indigo-fade', hexToFade(ACCENT, 0.16));
    document.documentElement.style.setProperty('--emerald', '#10B981');
    document.documentElement.style.setProperty('--emerald-fade', 'rgba(16,185,129,0.16)');
    document.documentElement.style.setProperty('--amber', '#F59E0B');
    document.documentElement.style.setProperty('--amber-fade', 'rgba(245,158,11,0.16)');
    document.documentElement.style.setProperty('--red', '#EF4444');
    document.documentElement.style.setProperty('--red-fade', 'rgba(239,68,68,0.18)');
    document.documentElement.style.setProperty('--text-1', '#F9FAFB');
    document.documentElement.style.setProperty('--text-2', '#9CA3AF');
    document.documentElement.style.setProperty('--text-3', '#6B7280');
    document.documentElement.style.setProperty('--radius-sm', '6px');
    document.documentElement.style.setProperty('--radius', '10px');
    document.documentElement.style.setProperty('--radius-lg', '14px');
    document.documentElement.style.setProperty('--radius-xl', '20px');
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [screen]);

  const goEnter = () => setScreen('onboarding');
  const goNavigate = (id) => setScreen(id);
  const goOnboardingDone = (u) => { setUser(u); setScreen('modeSelector'); };
  const goPickMode = (modeId) => {
    setCurrentMode(modeId);
    if (modeId === 'office') setScreen('simulation');
    else if (modeId === 'branch') setScreen('branch');
    else if (modeId === 'inbox') setScreen('inbox');
    else if (modeId === 'warroom') setScreen('warroom');
    else if (modeId === 'arena') setScreen('arena');
    else if (modeId === 'stage') setScreen('stage');
  };
  const goDiag = (r) => {
    setResult(r);
    setScreen('diagnostic');
    // Persist to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('artha:runs') || localStorage.getItem('karmaloop:runs') || '[]');
      stored.unshift({ id: 'run-' + Date.now(), finishedAt: r.finishedAt, scenarioId: r.scenarioId, scenarioTitle: r.scenarioTitle, mode: r.mode || currentMode || 'office', signals: r.signals, user: { name: user.name, lang: user.lang, track: user.track } });
      localStorage.setItem('artha:runs', JSON.stringify(stored.slice(0, 50)));
      const modeId = r.mode || currentMode || 'office';
      const completed = JSON.parse(localStorage.getItem('artha:modesCompleted') || localStorage.getItem('karmaloop:modesCompleted') || '{}');
      completed[modeId] = (completed[modeId] || 0) + 1;
      localStorage.setItem('artha:modesCompleted', JSON.stringify(completed));
    } catch {}
  };
  const goRestart = () => { setResult(null); setUser({ name: '', lang: 'en', bg: '', track: 'swe', profile: null }); setCurrentMode(null); setScreen('landing'); };
  const goBackToModes = () => setScreen('modeSelector');
  const goDashboard = () => setScreen('dashboard');
  const goHome = () => setScreen('landing');

  return (
    <div className="kl-app">
      {/* Marketing */}
      {screen === 'landing'     && <Landing     onEnter={goEnter} accent={ACCENT} onNavigate={goNavigate} onDashboard={goDashboard} />}
      {screen === 'mission'     && <Mission     accent={ACCENT} onEnter={goEnter} onBack={goHome} onNavigate={goNavigate} onDashboard={goDashboard} />}
      {screen === 'howItWorks'  && <HowItWorks  accent={ACCENT} onNavigate={goNavigate} onEnter={goEnter} onDashboard={goDashboard} />}
      {screen === 'scenarios'   && <Scenarios   accent={ACCENT} onNavigate={goNavigate} onEnter={goEnter} onDashboard={goDashboard} />}
      {screen === 'employers'   && <Employers   accent={ACCENT} onNavigate={goNavigate} onEnter={goEnter} onDashboard={goDashboard} />}

      {/* Onboarding + mode selection */}
      {screen === 'onboarding'  && <Onboarding  accent={ACCENT} onDone={goOnboardingDone} onBack={goHome} />}
      {screen === 'modeSelector'&& <ModeSelector user={user} accent={ACCENT} onPickMode={goPickMode} onBack={goHome} />}

      {/* All 6 modes */}
      {screen === 'simulation'  && <SimulationRoom user={user} onComplete={(r) => goDiag({ ...r, mode: 'office' })} />}
      {screen === 'branch'      && <BranchEngine   user={user} accent={ACCENT} onComplete={(r) => goDiag({ ...r, mode: 'branch' })} onBack={goBackToModes} />}
      {screen === 'inbox'       && <InboxZero      user={user} accent={ACCENT} onComplete={(r) => goDiag({ ...r, mode: 'inbox' })} onBack={goBackToModes} />}
      {screen === 'warroom'     && <ModeLite user={user} modeId="warroom" accent={ACCENT} onComplete={(r) => goDiag({ ...r, mode: 'warroom' })} onBack={goBackToModes} />}
      {screen === 'arena'       && <ModeLite user={user} modeId="arena"   accent={ACCENT} onComplete={(r) => goDiag({ ...r, mode: 'arena'   })} onBack={goBackToModes} />}
      {screen === 'stage'       && <ModeLite user={user} modeId="stage"   accent={ACCENT} onComplete={(r) => goDiag({ ...r, mode: 'stage'   })} onBack={goBackToModes} />}

      {/* Results */}
      {screen === 'diagnostic'  && <DiagnosticCard user={user} result={result} onRestart={goRestart} onDashboard={goDashboard} />}
      {screen === 'dashboard'   && <Dashboard user={user} accent={ACCENT} onNewSim={() => setScreen('modeSelector')} onOpenRun={(r) => { setResult(r); setScreen('diagnostic'); }} onBackHome={goHome} />}
    </div>
  );
}
