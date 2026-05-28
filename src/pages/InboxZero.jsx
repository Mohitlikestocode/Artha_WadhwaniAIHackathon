import { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/Avatar';

const EMAILS = [
  { id: 'e1', from: 'Priya Mehta', fromRole: 'PM', subject: 'Quick — did you check the prod logs this weekend?', body: "Hey, I know it's Sunday but a P0 alert pinged me about checkout. Did you look? I'm flying back tonight and want to triage Monday morning. Reply when you see this please 🙏", received: 'Sat 11:47 PM', category: 'urgent-important', optimal: ['reply'], signals: { reply: { proactive_communication: +3, stakeholder_empathy: +2 }, archive: { stakeholder_empathy: -3, proactive_communication: -2 }, flag: { stakeholder_empathy: +1 }, delegate: { escalation_judgment: -2 }, delay: { proactive_communication: -2 }, note: "Priya needed a Monday-morning ping more than she needed a perfect answer. 'On it now, will revert by 9:25' is the right move." } },
  { id: 'e2', from: 'Vikram (TechCorp)', fromRole: 'Client', subject: 'Following up on our Q re the checkout fix from Fri', body: "Hi — circling back on the question I sent Friday afternoon. Our campaign goes live Monday 2pm and the team is asking for an ETA. Apologies for the weekend message — totally understand if you reply Monday morning.", received: 'Sat 9:12 AM', category: 'urgent-important', optimal: ['reply'], signals: { reply: { stakeholder_empathy: +3, communication_clarity: +2, proactive_communication: +2 }, archive: { stakeholder_empathy: -3 }, flag: { proactive_communication: 0 }, note: "Client follow-ups on open commitments are P1. Even a 'reviewing this morning, will revert by 11am' moves their anxiety down." } },
  { id: 'e3', from: 'Rajan Krishnamurthy', fromRole: 'Senior Eng', subject: 'Review my PR when you get a chance — needs 2 reviewers by EOD', body: 'PR #2891 — the connection pool tuning we discussed Friday. Needs 2 sign-offs before I can merge. Kiran already approved. You have context on the issue so figured I\'d ask you. EOD Monday is the goal.', received: 'Fri 6:23 PM', category: 'important-not-urgent', optimal: ['flag', 'reply'], signals: { reply: { proactive_communication: +3, communication_clarity: +2 }, flag: { proactive_communication: +2, documentation_accountability: +2 }, archive: { documentation_accountability: -3 }, note: "'Will review by 4pm' acknowledges receipt and gives him a time he can plan around." } },
  { id: 'e4', from: 'Calendar', fromRole: 'System', subject: 'Meeting Wed 11am — Quarterly planning (pre-read attached)', body: 'Quarterly planning meeting, Wednesday 11am. Pre-read attached — please review before. RSVP required.', received: 'Mon 7:55 AM', category: 'important-not-urgent', optimal: ['flag'], signals: { flag: { documentation_accountability: +3, proactive_communication: +2 }, archive: { documentation_accountability: -2 }, note: "RSVP and block reading time for Tuesday afternoon. Reading the pre-read is the difference between contributing and lurking." } },
  { id: 'e5', from: 'Aakash Reddy', fromRole: 'Different team', subject: 'Help debug our React Native build? Broken for 2 days', body: "Hi — our mobile team is stuck on a build issue. I heard you've worked with React Native. Could you take a look this morning? It's blocking us. Thanks!", received: 'Sun 10:32 PM', category: 'urgent-not-yours', optimal: ['delegate', 'reply'], signals: { delegate: { escalation_judgment: +3, stakeholder_empathy: +2, proactive_communication: +2 }, reply: { escalation_judgment: +2, stakeholder_empathy: +2 }, archive: { stakeholder_empathy: -2 }, note: "Point him at the actual RN expert without taking ownership of someone else's blocker." } },
  { id: 'e6', from: 'HR', fromRole: 'System', subject: 'Reminder: Complete your compliance training by Friday', body: 'Your annual compliance training is due Friday. It\'s a 30-minute video + 10-question quiz. Please complete at your earliest convenience.', received: 'Mon 8:30 AM', category: 'urgent-not-yours', optimal: ['delay', 'flag'], signals: { delay: { documentation_accountability: +2 }, flag: { documentation_accountability: +2 }, archive: { documentation_accountability: -2 }, delegate: { escalation_judgment: -3 }, note: "Block 30 minutes Tuesday or Wednesday afternoon. Don't do it now during peak focus time." } },
  { id: 'e7', from: 'TechCrunch India', fromRole: 'Newsletter', subject: 'Top 10 React Native tips for 2026', body: "Don't miss our latest deep-dive on React Native performance tips...", received: 'Mon 7:45 AM', category: 'junk', optimal: ['archive'], signals: { archive: { prioritization_pressure: +2 }, flag: { prioritization_pressure: -1 }, note: "Process in 2 seconds and move on." } },
  { id: 'e8', from: 'Marketing Team', fromRole: 'Reply-all', subject: 'Great meeting today — sharing notes', body: "Hi all — sharing notes from this morning's marketing sync. Let me know if I missed anything. [12 people CC'd]", received: 'Mon 9:01 AM', category: 'junk', optimal: ['archive'], signals: { archive: { prioritization_pressure: +2 }, reply: { prioritization_pressure: -2, communication_clarity: -1 }, note: "Reply-all on a 12-person FYI thread is the canonical email mistake." } },
  { id: 'e9', from: 'Vivek Thakur', fromRole: 'Different team', subject: "Re: KT-104 — we still haven't received the spec", body: "It's been a week and we're still waiting on the spec for KT-104. I had to push back our Wednesday review because of this. Can we please get this today? Thanks.", received: 'Sun 6:14 PM', category: 'charged', optimal: ['reply'], signals: { reply: { stakeholder_empathy: +3, communication_clarity: +2 }, archive: { stakeholder_empathy: -3 }, note: "Don't be defensive. 'You're right to flag this. The spec is at Y% complete — I'll have it to you by Tuesday 11am.'" } },
  { id: 'e10', from: 'Anjali Rao', fromRole: 'VP Engineering', subject: 'Quick note', body: "Hi — I saw the war-room transcript from Friday. Your one-liner to Rajan was excellent. Crisp, factual, time-bound. Nice work.", received: 'Mon 8:14 AM', category: 'charged', optimal: ['reply'], signals: { reply: { proactive_communication: +3, communication_clarity: +2, stakeholder_empathy: +2 }, archive: { proactive_communication: -3 }, note: "Most Indian graduates don't reply to praise from senior leaders. Reply gracefully: 'Thanks so much — appreciate you noting it.'" } },
  { id: 'e11', from: 'Ops Team', fromRole: 'Different team', subject: 'URGENT: Decision needed — vendor renewal for AWS', body: "[Forwarded thread] Ops needs sign-off on the AWS vendor renewal. Decision required by 5pm. Adding everyone who has approval authority. - Sneha", received: 'Mon 7:11 AM', category: 'trap', optimal: ['delegate', 'archive'], signals: { delegate: { escalation_judgment: +3, prioritization_pressure: +2 }, archive: { escalation_judgment: +2 }, reply: { escalation_judgment: -3, communication_clarity: -2 }, note: "You're CC'd on this thread but you don't have AWS sign-off authority. 'Don't have authority on this — Rajan is the right approver.'" } },
  { id: 'e12', from: 'Pooja Sharma', fromRole: 'External', subject: 'Hi — would love to hop on a quick call to discuss [Vendor X]', body: "Hi! I noticed your team is using [competitor]. We'd love to show you a 15-min demo of how we're 30% faster. Available this week?", received: 'Mon 7:34 AM', category: 'trap', optimal: ['archive'], signals: { archive: { prioritization_pressure: +2 }, reply: { prioritization_pressure: -2 }, note: "Cold sales pitch. Archive in 2 seconds." } },
];

const ACTIONS = ['reply', 'flag', 'archive', 'delegate', 'delay'];
const ACTION_LABELS = { reply: 'Reply', flag: 'Flag for later', archive: 'Archive', delegate: 'Delegate / redirect', delay: 'Handle this week' };
const CATEGORY_BADGE = { 'urgent-important': { label: 'Urgent + Important', color: '#EF4444' }, 'important-not-urgent': { label: 'Important, not urgent', color: '#F59E0B' }, 'urgent-not-yours': { label: "Urgent — not yours", color: '#8B5CF6' }, 'junk': { label: 'Low value', color: '#64748B' }, 'charged': { label: 'Emotionally charged', color: '#06B6D4' }, 'trap': { label: 'Looks urgent — isn\'t yours', color: '#F97316' } };
const PERSONA_COLORS = { 'PM': '#A78BFA', 'Client': '#EF4444', 'Senior Eng': '#F59E0B', 'System': '#6B7280', 'Different team': '#10B981', 'Newsletter': '#6B7280', 'Reply-all': '#6B7280', 'VP Engineering': '#6366F1', 'External': '#64748B' };

export default function InboxZero({ user = {}, accent = '#6366F1', onComplete, onBack }) {
  const [selected, setSelected] = useState(null);
  const [handled, setHandled] = useState({});
  const [signals, setSignals] = useState({});
  const [transcript, setTranscript] = useState([]);
  const [timeLeft, setTimeLeft] = useState(27 * 60);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { clearInterval(id); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  }, []);

  const doAction = (emailId, action) => {
    const email = EMAILS.find(e => e.id === emailId);
    if (!email || handled[emailId]) return;
    const actionSignals = email.signals[action] || {};
    const newSignals = { ...signals };
    Object.entries(actionSignals).forEach(([k, v]) => { if (k !== 'note') newSignals[k] = (newSignals[k] || 0) + v; });
    setSignals(newSignals);
    setHandled(h => ({ ...h, [emailId]: action }));
    setTranscript(prev => [...prev, { prompt: email.subject, choice: `${ACTION_LABELS[action]}: ${email.subject}`, signals: actionSignals }]);
  };

  const finish = () => {
    setDone(true);
    onComplete?.({ signals, transcript, momentsFired: [], messages: {}, tickets: [], finishedAt: new Date().toISOString(), scenarioId: 'inbox-zero', scenarioTitle: 'Inbox Zero · Monday Morning', mode: 'inbox' });
  };

  const timeStr = (() => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  })();
  const timeColor = timeLeft < 300 ? '#EF4444' : timeLeft < 600 ? '#F59E0B' : 'var(--text-1)';
  const processed = Object.keys(handled).length;

  const selectedEmail = selected ? EMAILS.find(e => e.id === selected) : null;

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--bg)', overflow: 'hidden', color: 'var(--text-1)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer' }}>
          <Icon name="arrow-left" size={14} /><span>Back</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>📬 Inbox Zero</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="clock" size={14} color={timeColor} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: timeColor, letterSpacing: '0.05em' }}>{timeStr}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>until standup</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{processed}/{EMAILS.length} processed</span>
          <button onClick={finish} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: accent, color: '#fff', border: 0, padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>End session</button>
        </div>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>
        {/* Email list */}
        <div style={{ borderRight: '1px solid var(--border)', overflow: 'y-auto', background: '#0D0D0D' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>INBOX</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent }}>{EMAILS.length - processed} unhandled</span>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100dvh - 120px)' }}>
            {EMAILS.map(email => {
              const isHandled = !!handled[email.id];
              const isSelected = selected === email.id;
              const cat = CATEGORY_BADGE[email.category];
              return (
                <button key={email.id} onClick={() => setSelected(email.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: isSelected ? 'rgba(99,102,241,0.08)' : 'transparent', cursor: 'pointer', borderLeft: isSelected ? `3px solid ${accent}` : '3px solid transparent', opacity: isHandled ? 0.5 : 1, transition: 'all .12s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: isHandled ? 'transparent' : cat?.color || accent, flexShrink: 0, border: isHandled ? '1px solid var(--border)' : 'none' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.from}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', flexShrink: 0 }}>{email.received}</span>
                  </div>
                  <div style={{ fontSize: 12, color: isHandled ? 'var(--text-3)' : 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: 14 }}>{email.subject}</div>
                  {isHandled && (
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#10B981', paddingLeft: 14, marginTop: 2 }}>✓ {ACTION_LABELS[handled[email.id]]}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reading pane */}
        <div style={{ overflow: 'y-auto', display: 'flex', flexDirection: 'column' }}>
          {selectedEmail ? (
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {/* Email header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${PERSONA_COLORS[selectedEmail.fromRole] || accent}33`, border: `1px solid ${PERSONA_COLORS[selectedEmail.fromRole] || accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: PERSONA_COLORS[selectedEmail.fromRole] || accent }}>
                    {selectedEmail.from[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedEmail.from}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{selectedEmail.fromRole} · {selectedEmail.received}</div>
                  </div>
                  {(() => { const cat = CATEGORY_BADGE[selectedEmail.category]; return cat ? <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9.5, color: cat.color, background: `${cat.color}18`, border: `1px solid ${cat.color}44`, padding: '2px 8px', borderRadius: 999 }}>{cat.label}</span> : null; })()}
                </div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}>{selectedEmail.subject}</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>{selectedEmail.body}</p>
              </div>

              {/* Action bar */}
              {!handled[selectedEmail.id] ? (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>What do you do?</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ACTIONS.map(action => (
                      <button key={action} onClick={() => doAction(selectedEmail.id, action)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--text-1)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer', transition: 'all .12s', fontWeight: selectedEmail.optimal.includes(action) ? 600 : 400 }}>
                        {ACTION_LABELS[action]}
                        {selectedEmail.optimal.includes(action) && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, padding: '16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#10B981', marginBottom: 8 }}>✓ {ACTION_LABELS[handled[selectedEmail.id]]}</div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{selectedEmail.signals.note}</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', gap: 12 }}>
              <Icon name="search" size={32} color="var(--text-3)" />
              <div style={{ fontSize: 14 }}>Select an email to read</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{EMAILS.length - processed} unhandled · standup in {timeStr}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
