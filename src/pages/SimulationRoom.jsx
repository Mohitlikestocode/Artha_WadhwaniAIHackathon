import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { KL_PERSONAS, KL_TICKETS, KL_SCRIPT_START_TIME } from '../data/personas';
import { KL_SCRIPT } from '../data/script';

const accent = '#6366F1';

function cryptoId() { return Math.random().toString(36).slice(2, 10); }

function getStartMinutes() {
  const [h, m] = (KL_SCRIPT_START_TIME || '16:47').split(':').map(Number);
  return h * 60 + m;
}
function simTimeLabel(totalMin) {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}
function formatElapsed(s) {
  const total = Math.floor(s);
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function makeRichCard(beat) {
  if (beat.type === 'standup-bot') {
    return { channel: 'priya', title: 'EOD Standup · Friday', bot: 'standup-bot', sections: [{ label: 'YESTERDAY', placeholder: 'What did you finish?' }, { label: 'TODAY', placeholder: 'What are you working on?' }, { label: 'BLOCKERS', placeholder: "What's in your way?" }] };
  }
  if (beat.type === 'code-review') {
    return { channel: 'rajan', title: 'PR #2891 · KT-115 · refactor auth middleware', bot: 'github', lines: [{ n: 47, add: false, code: 'const authTimeout = 60_000;' }, { n: 48, add: true, code: 'const authTimeout = 30_000; // tighter for incident-response' }, { n: 49, add: false, code: '' }, { n: 92, add: false, code: 'if (req.user.role === "admin") return next();' }, { n: 93, add: true, code: 'if (req.user?.role === "admin") return next();' }, { n: 110, add: true, code: 'const POOL_SIZE = 10;' }], comments: [{ line: 93, author: 'rajan', label: 'CONSTRUCTIVE', text: 'Good — optional chain prevents the crash we saw last month.' }, { line: 48, author: 'rajan', label: 'WRONG', text: 'Why 30s? Should match the rest of the codebase — bump back to 60s.' }, { line: 110, author: 'rajan', label: 'TERSE', text: 'Pool size in app code? Move to config.' }] };
  }
  if (beat.type === 'one-on-one') {
    return { channel: 'priya', title: '1:1 · Priya is asking for 5 minutes', bot: 'calendar', time: 'now, or 5:45 PM', note: '"Nothing scary — just wanted to check in on how the week\'s going."' };
  }
  return { channel: 'priya', title: 'Event' };
}

function SectionLabel({ children }) {
  return <div className="kl-sectlabel">{children}</div>;
}

function Message({ m, grouped, persona }) {
  if (m.kind === 'rich-card') return <RichCard card={m.card} type={m.cardType} time={m.time} />;
  if (m.kind === 'system') return <div className="kl-sys"><span>{m.text}</span><span className="kl-sys-time">{m.time}</span></div>;
  const mine = m.kind === 'outgoing';
  return (
    <div className={`kl-msg ${mine ? 'is-out' : 'is-in'} ${grouped ? 'is-grouped' : ''}`}>
      {!mine && !grouped && persona && (
        <div className="kl-msg-hd">
          <Avatar persona={persona} size={24} />
          <span className="kl-msg-name">{persona.name}</span>
          <span className="kl-msg-time">{m.time}</span>
        </div>
      )}
      {!mine && grouped && <div className="kl-msg-spacer" />}
      <div className="kl-bubble">{m.text}</div>
    </div>
  );
}

function RichCard({ card, type, time }) {
  const accentMap = { 'standup-bot': '#8B5CF6', 'code-review': '#10B981', 'one-on-one': '#F59E0B' };
  const a = accentMap[type] || accent;
  const botLabel = { 'standup-bot': 'STANDUP BOT', 'code-review': 'GITHUB · PR REVIEW', 'one-on-one': 'CALENDAR · 1:1' }[type];
  return (
    <div className="kl-rich" style={{ borderLeft: `3px solid ${a}` }}>
      <div className="kl-rich-hd">
        <span className="kl-rich-bot" style={{ background: a + '22', color: a }}>{botLabel}</span>
        <span className="kl-rich-time">{time}</span>
      </div>
      <div className="kl-rich-title">{card.title}</div>
      {type === 'standup-bot' && (
        <div className="kl-rich-standup">
          {card.sections.map(s => (
            <div key={s.label} className="kl-rich-standup-row">
              <span className="kl-rich-standup-lbl">{s.label}</span>
              <span className="kl-rich-standup-ph">{s.placeholder}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'code-review' && (
        <>
          <div className="kl-rich-diff">
            {card.lines.map((l, i) => (
              <div key={i} className={`kl-diff-line ${l.add ? 'is-add' : ''}`}>
                <span className="kl-diff-n">{l.n}</span>
                <span className="kl-diff-mark">{l.add ? '+' : ' '}</span>
                <span>{l.code || ' '}</span>
              </div>
            ))}
          </div>
          <div className="kl-rich-comments">
            {card.comments.map((c, i) => (
              <div key={i} className="kl-rich-comment">
                <div className="kl-rich-comment-hd">
                  <span className="kl-rich-comment-line">line {c.line}</span>
                  <span className={`kl-rich-comment-tag kl-tag-${c.label.toLowerCase()}`}>{c.label}</span>
                  <span className="kl-rich-comment-author">@rajan</span>
                </div>
                <div className="kl-rich-comment-text">{c.text}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {type === 'one-on-one' && (
        <div className="kl-rich-oneonone">
          <div className="kl-rich-oneonone-row"><span className="kl-rich-oneonone-lbl">WHEN</span><span>{card.time}</span></div>
          <div className="kl-rich-oneonone-note">{card.note}</div>
        </div>
      )}
    </div>
  );
}

function TypingIndicator({ persona }) {
  return (
    <div className="kl-typing">
      <Avatar persona={persona} size={20} />
      <div className="kl-typing-bubble">
        <span style={{ animationDelay: '0ms' }} />
        <span style={{ animationDelay: '150ms' }} />
        <span style={{ animationDelay: '300ms' }} />
      </div>
      <span className="kl-typing-text">{persona.name.split(' ')[0]} is typing</span>
    </div>
  );
}

const simStyles = (acc) => `
.kl-sim { display: grid; grid-template-columns: 240px 1fr 300px; height: 100dvh; background: var(--bg); color: var(--text-1); overflow: hidden; }
.kl-left { position: relative; background: #131313; border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
.kl-wordmark { display: flex; align-items: center; gap: 10px; padding: 16px 16px 14px; border-bottom: 1px solid var(--border); }
.kl-wm-mark { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, ${acc}, #4F46E5); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 19px; letter-spacing: -0.02em; box-shadow: 0 0 0 1px rgba(255,255,255,0.06) inset, 0 4px 12px ${acc}66; }
.kl-wm-name { font-size: 11px; font-weight: 700; line-height: 1.1; letter-spacing: 0.06em; color: var(--text-1); }
.kl-wm-sub { font-size: 11px; color: var(--text-3); margin-top: 3px; font-family: var(--font-mono); }
.kl-sectlabel { padding: 14px 16px 8px; font-size: 10px; font-family: var(--font-mono); color: var(--text-3); letter-spacing: 0.1em; text-transform: uppercase; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.kl-sl-pill { text-transform: none; letter-spacing: 0.02em; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2); padding: 2px 6px; border-radius: 4px; font-size: 10px; }
.kl-roster { padding: 0 8px; display: flex; flex-direction: column; gap: 2px; }
.kl-roster-item { display: flex; align-items: center; gap: 10px; background: transparent; border: 0; color: var(--text-1); padding: 8px 10px; border-radius: 8px; cursor: pointer; width: 100%; text-align: left; transition: background .12s; }
.kl-roster-item:hover { background: var(--surface-2); }
.kl-roster-item.is-active { background: var(--surface-2); box-shadow: inset 2px 0 0 ${acc}; }
.kl-roster-meta { flex: 1; min-width: 0; }
.kl-roster-name { font-size: 13px; font-weight: 600; }
.kl-roster-last { color: var(--text-3); font-weight: 500; }
.kl-roster-role { font-size: 11px; color: var(--text-3); margin-top: 1px; }
.kl-unread { background: ${acc}; color: #fff; font-size: 10px; font-weight: 700; min-width: 18px; height: 18px; padding: 0 6px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; }
.kl-jira-mini { padding: 0 12px; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; min-height: 0; }
.kl-tkt { text-align: left; background: var(--surface); border: 1px solid var(--border); color: var(--text-1); border-radius: 8px; padding: 8px 10px; cursor: pointer; transition: background .12s, border-color .12s; }
.kl-tkt:hover { background: var(--surface-2); border-color: var(--border-2); }
.kl-tkt.is-active { border-color: ${acc}; box-shadow: 0 0 0 1px ${acc}55; }
.kl-tkt.is-fire { background: linear-gradient(180deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02)); border-color: rgba(239,68,68,0.35); animation: klPulseRed 2s ease-in-out infinite; }
.kl-tkt-row1 { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.kl-tkt-id { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-2); }
.kl-tkt-title { font-size: 12.5px; line-height: 1.35; font-weight: 500; }
.kl-tkt-status { margin-top: 4px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; }
.kl-tkt-fire { margin-left: auto; display: inline-flex; }
.kl-prio { display: inline-block; font-family: var(--font-mono); font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.04em; }
.kl-prio-P0 { background: var(--red-fade); color: #FCA5A5; border: 1px solid rgba(239,68,68,0.4); }
.kl-prio-P1 { background: var(--amber-fade); color: #FCD34D; border: 1px solid rgba(245,158,11,0.4); }
.kl-prio-P2 { background: var(--surface-3); color: var(--text-2); border: 1px solid var(--border-2); }
.kl-ticker { margin: 10px 12px 4px; padding: 10px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; }
.kl-ticker-label { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase; }
.kl-ticker-time { font-family: var(--font-mono); font-size: 26px; font-weight: 600; letter-spacing: 0.04em; color: var(--text-1); margin: 3px 0 1px; font-variant-numeric: tabular-nums; transition: color .3s; }
.kl-ticker-time.is-hot { color: #FCA5A5; text-shadow: 0 0 12px rgba(239,68,68,0.4); }
.kl-ticker-sub { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); }
.kl-me { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
.kl-me-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, ${acc}, #4F46E5); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
.kl-me-name { font-size: 13px; font-weight: 600; }
.kl-me-role { font-size: 11px; color: var(--text-3); }
.kl-main { display: flex; flex-direction: column; background: var(--bg); min-width: 0; overflow: hidden; }
.kl-thread-hd { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid var(--border); background: var(--bg); flex-shrink: 0; }
.kl-thread-hd-left { display: flex; align-items: center; gap: 12px; }
.kl-thread-name { font-size: 15px; font-weight: 600; }
.kl-thread-role { font-size: 12px; color: var(--text-3); margin-top: 2px; }
.kl-thread-hd-right { display: flex; gap: 4px; }
.kl-icon-btn { background: transparent; color: var(--text-2); border: 1px solid transparent; width: 30px; height: 30px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: background .12s, color .12s; }
.kl-icon-btn:hover { background: var(--surface-2); color: var(--text-1); border-color: var(--border); }
.kl-rich { align-self: stretch; background: var(--surface); border: 1px solid var(--border); border-left-width: 3px; border-radius: 8px; padding: 12px 14px; animation: klSpring .4s cubic-bezier(.2,.7,.3,1) both; max-width: 640px; }
.kl-rich-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.kl-rich-bot { font-family: var(--font-mono); font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; padding: 2px 6px; border-radius: 4px; }
.kl-rich-time { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-3); }
.kl-rich-title { font-size: 13.5px; font-weight: 600; color: var(--text-1); margin-bottom: 10px; }
.kl-rich-standup { display: flex; flex-direction: column; gap: 6px; }
.kl-rich-standup-row { display: grid; grid-template-columns: 90px 1fr; align-items: center; gap: 10px; padding: 8px 10px; background: var(--surface-2); border: 1px dashed var(--border-2); border-radius: 6px; }
.kl-rich-standup-lbl { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; }
.kl-rich-standup-ph { font-size: 12.5px; color: var(--text-3); font-style: italic; }
.kl-rich-diff { font-family: var(--font-mono); font-size: 12px; background: #0a0a0a; border: 1px solid var(--border); border-radius: 6px; padding: 8px 0; overflow-x: auto; line-height: 1.55; }
.kl-diff-line { display: grid; grid-template-columns: 36px 16px 1fr; gap: 8px; padding: 1px 12px; color: var(--text-2); }
.kl-diff-line.is-add { background: rgba(16,185,129,0.08); color: var(--text-1); }
.kl-diff-n { color: var(--text-3); text-align: right; }
.kl-diff-mark { color: #10B981; font-weight: 600; }
.kl-rich-comments { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
.kl-rich-comment { background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; }
.kl-rich-comment-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-family: var(--font-mono); font-size: 10px; color: var(--text-3); }
.kl-rich-comment-line { color: var(--text-2); }
.kl-rich-comment-tag { font-weight: 700; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.04em; }
.kl-tag-constructive { background: rgba(16,185,129,0.18); color: #6EE7B7; }
.kl-tag-wrong { background: rgba(239,68,68,0.18); color: #FCA5A5; }
.kl-tag-terse { background: rgba(245,158,11,0.18); color: #FCD34D; }
.kl-rich-comment-author { color: var(--text-3); }
.kl-rich-comment-text { font-size: 12.5px; color: var(--text-1); line-height: 1.45; }
.kl-rich-oneonone { display: flex; flex-direction: column; gap: 8px; }
.kl-rich-oneonone-row { display: flex; align-items: center; gap: 12px; padding: 8px 10px; background: var(--surface-2); border-radius: 6px; font-size: 13px; }
.kl-rich-oneonone-lbl { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; }
.kl-rich-oneonone-note { padding: 8px 10px; background: var(--surface-2); border-left: 2px solid ${acc}; border-radius: 0 6px 6px 0; font-size: 13px; color: var(--text-2); font-style: italic; }
.kl-alerts { display: flex; flex-direction: column; gap: 6px; padding: 10px 18px 0; flex-shrink: 0; }
.kl-alert { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); border-left-width: 3px; animation: klSlideDown .4s cubic-bezier(.2,.7,.3,1) both, klShake .35s ease-out 0.4s 1; }
.kl-alert-warning { border-left-color: var(--amber); background: linear-gradient(90deg, rgba(245,158,11,0.06), transparent 40%); }
.kl-alert-danger { border-left-color: var(--red); background: linear-gradient(90deg, rgba(239,68,68,0.08), transparent 40%); }
.kl-alert-body { flex: 1; min-width: 0; }
.kl-alert-title { font-family: var(--font-mono); font-size: 11.5px; color: var(--text-1); font-weight: 600; margin-bottom: 2px; }
.kl-alert-text { font-size: 13px; color: var(--text-2); line-height: 1.45; }
.kl-alert-time { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-3); flex-shrink: 0; }
.kl-msgs { flex: 1; overflow-y: auto; padding: 16px 18px 8px; display: flex; flex-direction: column; gap: 12px; }
.kl-msgs-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-3); font-size: 13px; padding: 80px 20px; text-align: center; }
.kl-sys { display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 11.5px; color: var(--text-3); padding: 4px 0; }
.kl-sys::before, .kl-sys::after { content: ''; flex: 1; border-top: 1px solid var(--border); max-width: 80px; }
.kl-sys-time { font-family: var(--font-mono); font-size: 10px; }
.kl-msg { display: flex; flex-direction: column; max-width: min(640px, 78%); animation: klSpring .35s cubic-bezier(.2,.7,.3,1) both; }
.kl-msg.is-in { align-self: flex-start; }
.kl-msg.is-out { align-self: flex-end; align-items: flex-end; }
.kl-msg.is-grouped { margin-top: -6px; }
.kl-msg-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 12px; }
.kl-msg-name { font-weight: 600; color: var(--text-1); }
.kl-msg-time { color: var(--text-3); font-family: var(--font-mono); font-size: 10.5px; }
.kl-msg-spacer { height: 0; }
.kl-bubble { padding: 10px 14px; background: var(--surface-2); color: var(--text-1); border-radius: 14px; border-top-left-radius: 4px; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
.kl-msg.is-out .kl-bubble { background: ${acc}; color: #fff; border-top-left-radius: 14px; border-top-right-radius: 4px; box-shadow: 0 4px 12px ${acc}33; }
.kl-typing { display: flex; align-items: center; gap: 8px; align-self: flex-start; animation: klFadeUp .2s both; }
.kl-typing-bubble { background: var(--surface-2); padding: 10px 14px; border-radius: 14px; border-top-left-radius: 4px; display: inline-flex; gap: 4px; align-items: center; }
.kl-typing-bubble span { width: 6px; height: 6px; border-radius: 50%; background: var(--text-3); animation: klTypingDot 1.2s ease-in-out infinite; }
.kl-typing-text { font-size: 11px; color: var(--text-3); font-style: italic; }
.kl-decision { border-top: 1px solid var(--border); background: linear-gradient(180deg, rgba(99,102,241,0.04), transparent); padding: 12px 18px 14px; flex-shrink: 0; animation: klFadeUp .3s both; }
.kl-decision-label { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-family: var(--font-mono); color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
.kl-decision-options { display: flex; flex-direction: column; gap: 6px; }
.kl-chip { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--surface-2); border: 1px solid var(--border-2); color: var(--text-1); padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; text-align: left; transition: background .12s, border-color .12s, transform .12s; }
.kl-chip:hover { background: var(--surface-3); border-color: ${acc}; transform: translateY(-1px); }
.kl-composer { display: flex; align-items: center; gap: 8px; padding: 12px 18px max(12px, env(safe-area-inset-bottom)); border-top: 1px solid var(--border); background: var(--bg); flex-shrink: 0; }
.kl-mic { width: 38px; height: 38px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all .12s; }
.kl-composer input { flex: 1; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-1); padding: 12px 16px; font-size: 14px; border-radius: 10px; outline: none; font-family: inherit; transition: border-color .12s; min-width: 0; }
.kl-composer input:focus { border-color: ${acc}; }
.kl-send { width: 38px; height: 38px; background: ${acc}; border: 0; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity .12s, transform .12s; box-shadow: 0 4px 14px ${acc}55; }
.kl-send:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
.kl-send:not(:disabled):hover { transform: translateY(-1px); }
.kl-right { position: relative; background: #131313; border-left: 1px solid var(--border); overflow-y: auto; display: flex; flex-direction: column; }
.kl-jira-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 0 12px; }
.kl-jira-col { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 6px; min-height: 50px; }
.kl-jira-col-hd { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; padding: 0 4px 4px; border-bottom: 1px dashed var(--border); margin-bottom: 2px; }
.kl-jira-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 8px; text-align: left; cursor: pointer; transition: all .12s; color: var(--text-1); }
.kl-jira-card:hover { border-color: var(--border-2); transform: translateY(-1px); }
.kl-jira-card.is-active { border-color: ${acc}; box-shadow: 0 0 0 1px ${acc}55; }
.kl-jira-card.is-fire { background: linear-gradient(180deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02)); border-color: rgba(239,68,68,0.4); }
.kl-jira-card-hd { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.kl-jira-card-title { font-size: 11.5px; line-height: 1.35; }
.kl-tdetail { padding-bottom: 16px; }
.kl-tdetail-card { margin: 0 12px; padding: 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; }
.kl-tdetail-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.kl-tdetail-title { font-size: 14px; font-weight: 600; line-height: 1.4; margin-bottom: 6px; }
.kl-tdetail-desc { font-size: 12.5px; color: var(--text-2); line-height: 1.5; margin-bottom: 12px; }
.kl-tdetail-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.kl-tdetail-assignee { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-2); }
.kl-tag { font-family: var(--font-mono); font-size: 10px; color: var(--text-2); background: var(--surface-3); border: 1px solid var(--border-2); padding: 1px 6px; border-radius: 4px; letter-spacing: 0.02em; }
.kl-mob-top { display: none; }
.kl-mob-close { display: none; }
@media (max-width: 980px) {
  .kl-sim { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .kl-mob-top { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--border); background: var(--bg); gap: 12px; }
  .kl-mob-title { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .kl-left, .kl-right { position: fixed; inset: 0; z-index: 50; transform: translateX(-100%); transition: transform .25s cubic-bezier(.2,.7,.3,1); width: min(320px, 88vw); border-right: 1px solid var(--border); border-left: none; }
  .kl-right { left: auto; right: 0; transform: translateX(100%); border-right: none; border-left: 1px solid var(--border); }
  .kl-mob-show { transform: translateX(0); }
  .kl-thread-hd { display: none; }
  .kl-mob-close { display: inline-flex; position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; color: var(--text-2); align-items: center; justify-content: center; cursor: pointer; z-index: 1; }
}
`;

export default function SimulationRoom({ user = {}, onComplete }) {
  const personas = KL_PERSONAS;
  const [tickets, setTickets] = useState(() => KL_TICKETS.map(t => ({ ...t })));
  const [statuses, setStatuses] = useState(() => { const m = {}; for (const p of Object.values(personas)) m[p.id] = p.status; return m; });
  const [revealed, setRevealed] = useState(() => { const m = {}; for (const p of Object.values(personas)) m[p.id] = !p.hidden; return m; });
  const [messages, setMessages] = useState({ priya: [], rajan: [], kiran: [], client: [], alerts: [] });
  const [typing, setTyping] = useState({});
  const [activeChannel, setActiveChannel] = useState('priya');
  const [unread, setUnread] = useState({});
  const [activeTicketId, setActiveTicketId] = useState('KT-118');
  const [decision, setDecision] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [momentsFired, setMomentsFired] = useState([]);
  const [signals, setSignals] = useState({ communication_clarity: 0, escalation_judgment: 0, prioritization_pressure: 0, stakeholder_empathy: 0, proactive_communication: 0, honest_estimation: 0, constructive_pushback: 0, documentation_accountability: 0 });
  const [elapsedSec, setElapsedSec] = useState(0);
  const [tickerHot, setTickerHot] = useState(false);
  const [draft, setDraft] = useState('');
  const [voiceOn, setVoiceOn] = useState(false);
  const [mobileTab, setMobileTab] = useState('chat');

  const runnerRef = useRef({ idx: 0, paused: false, timer: null });
  const decisionRef = useRef(null);
  const activeChannelRef = useRef(activeChannel);
  activeChannelRef.current = activeChannel;
  const elapsedRef = useRef(elapsedSec);
  elapsedRef.current = elapsedSec;
  const msgsEndRef = useRef(null);
  const messageListRef = useRef(null);

  const speedMult = 1;

  useEffect(() => {
    const el = messageListRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, activeChannel]);

  // RAF-based sim timer: 1 real second = 15 sim-seconds (matches design)
  useEffect(() => {
    let prev = performance.now();
    let raf;
    const tick = (now) => {
      const dt = (now - prev) / 1000;
      prev = now;
      const simRatePerSec = tickerHot ? 24 : 15;
      setElapsedSec(s => s + dt * simRatePerSec);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tickerHot]);

  useEffect(() => { setUnread(u => ({ ...u, [activeChannel]: 0 })); }, [activeChannel]);

  const elapsedNow = () => elapsedRef.current;

  const execBeat = useCallback((beat, done) => {
    const now = simTimeLabel(getStartMinutes() + Math.floor(elapsedNow() / 60));
    if (beat.type === 'message') {
      setMessages(m => ({ ...m, [beat.channel]: [...(m[beat.channel] || []), { id: cryptoId(), from: beat.channel, text: beat.text, time: now, kind: 'incoming' }] }));
      setUnread(u => activeChannelRef.current === beat.channel ? u : { ...u, [beat.channel]: (u[beat.channel] || 0) + 1 });
      setTyping(t => ({ ...t, [beat.channel]: null }));
      done?.();
    } else if (beat.type === 'typing') {
      setTyping(t => ({ ...t, [beat.channel]: true }));
      setTimeout(() => setTyping(t => ({ ...t, [beat.channel]: null })), (beat.dur || 1500) * speedMult);
      done?.();
    } else if (beat.type === 'alert') {
      setMessages(m => ({ ...m, alerts: [...(m.alerts || []), { id: cryptoId(), severity: beat.severity, title: beat.title, text: beat.text, time: now }] }));
      done?.();
    } else if (beat.type === 'system') {
      setMessages(m => ({ ...m, [beat.channel]: [...(m[beat.channel] || []), { id: cryptoId(), kind: 'system', text: beat.text, time: now }] }));
      done?.();
    } else if (beat.type === 'ticket-update') {
      setTickets(ts => ts.map(t => t.id === beat.ticketId ? { ...t, ...beat.patch } : t));
      done?.();
    } else if (beat.type === 'character-on') {
      setStatuses(s => ({ ...s, [beat.channel]: beat.status || 'online' }));
      if (beat.reveal) setRevealed(r => ({ ...r, [beat.channel]: true }));
      done?.();
    } else if (beat.type === 'ticker-accel') {
      setTickerHot(true); done?.();
    } else if (beat.type === 'standup-bot' || beat.type === 'code-review' || beat.type === 'one-on-one') {
      const card = makeRichCard(beat);
      const now2 = simTimeLabel(getStartMinutes() + Math.floor(elapsedNow() / 60));
      setMessages(m => ({ ...m, [card.channel]: [...(m[card.channel] || []), { id: cryptoId(), kind: 'rich-card', cardType: beat.type, card, time: now2 }] }));
      done?.();
    } else if (beat.type === 'user-decision') {
      if (beat.channel) setActiveChannel(beat.channel);
      setDecision(beat); decisionRef.current = beat;
      runnerRef.current.paused = true;
    } else if (beat.type === 'end') {
      runnerRef.current.paused = true;
      onComplete?.({ signals, transcript, momentsFired, messages, tickets, finishedAt: new Date().toISOString(), scenarioId: 'kt-day3', scenarioTitle: 'Day 3 · Kiran Technologies' });
    } else { done?.(); }
  }, [signals, transcript, momentsFired, messages, tickets, onComplete]);

  useEffect(() => {
    const r = runnerRef.current;
    const step = () => {
      if (r.paused) return;
      const beat = KL_SCRIPT[r.idx];
      if (!beat) return;
      const wait = Math.max(50, (beat.t || 0) * speedMult);
      r.timer = setTimeout(() => {
        execBeat(beat, () => { r.idx += 1; step(); });
      }, wait);
    };
    step();
    return () => clearTimeout(r.timer);
  }, []);

  const submitReply = (text, signalsDelta) => {
    if (!text?.trim()) return;
    const now = simTimeLabel(getStartMinutes() + Math.floor(elapsedNow() / 60));
    setMessages(m => ({ ...m, [activeChannelRef.current]: [...(m[activeChannelRef.current] || []), { id: cryptoId(), from: 'me', kind: 'outgoing', text: text.trim(), time: now }] }));
    setDraft('');
    const dec = decisionRef.current;
    if (dec) {
      setTranscript(t => [...t, { prompt: dec.prompt, choice: text.trim(), signals: signalsDelta || {}, momentId: dec.momentId }]);
      if (dec.momentId) setMomentsFired(m => m.includes(dec.momentId) ? m : [...m, dec.momentId]);
      if (signalsDelta) setSignals(s => { const ns = { ...s }; for (const k in signalsDelta) ns[k] = (ns[k] || 0) + signalsDelta[k]; return ns; });
      setDecision(null); decisionRef.current = null;
      const r = runnerRef.current; r.idx += 1; r.paused = false;
      const nextBeat = KL_SCRIPT[r.idx];
      if (nextBeat) r.timer = setTimeout(() => { execBeat(nextBeat, () => { r.idx += 1; }); }, Math.max(50, (nextBeat.t || 0) * speedMult));
    }
  };

  const visiblePersonas = Object.values(personas).filter(p => revealed[p.id]);
  const activePersona = personas[activeChannel];
  const channelMsgs = messages[activeChannel] || [];
  const alerts = messages.alerts || [];

  const clockStr = (() => {
    const [sh, sm] = (KL_SCRIPT_START_TIME || '16:47').split(':').map(Number);
    const base = sh * 3600 + sm * 60;
    const total = base + elapsedSec;
    const h = Math.floor(total / 3600) % 24;
    const m = Math.floor((total % 3600) / 60);
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  })();

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  return (
    <div className="kl-sim">
      <style>{simStyles(accent)}</style>

      {/* MOBILE TOP BAR */}
      <div className="kl-mob-top">
        <button className="kl-icon-btn" onClick={() => setMobileTab('left')}><Icon name="people" size={18} /></button>
        <div className="kl-mob-title">
          {activePersona && <Avatar persona={{ ...activePersona, status: statuses[activePersona.id] }} size={26} showStatus />}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{activePersona?.name}</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{activePersona?.role}</span>
          </div>
        </div>
        <button className="kl-icon-btn" onClick={() => setMobileTab('right')}><Icon name="hash" size={18} /></button>
      </div>

      {/* LEFT PANEL */}
      <aside className={`kl-left ${mobileTab === 'left' ? 'kl-mob-show' : ''}`}>
        <button className="kl-mob-close" onClick={() => setMobileTab('chat')}><Icon name="close" size={18} /></button>
        <div className="kl-wordmark">
          <div className="kl-wm-mark">K</div>
          <div><div className="kl-wm-name">KIRAN<br/>TECHNOLOGIES</div><div className="kl-wm-sub">Lokal Pay Squad</div></div>
        </div>

        <SectionLabel>Team</SectionLabel>
        <div className="kl-roster">
          {visiblePersonas.map(p => {
            const status = statuses[p.id];
            return (
              <button key={p.id} onClick={() => { setActiveChannel(p.id); setMobileTab('chat'); }} className={`kl-roster-item ${activeChannel === p.id ? 'is-active' : ''}`}>
                <Avatar persona={{ ...p, status }} size={28} showStatus />
                <div className="kl-roster-meta">
                  <div className="kl-roster-name">{p.name.split(' ')[0]} <span className="kl-roster-last">{p.name.split(' ').slice(1).join(' ')}</span></div>
                  <div className="kl-roster-role">{p.role}</div>
                </div>
                {unread[p.id] > 0 && <span className="kl-unread">{unread[p.id]}</span>}
              </button>
            );
          })}
        </div>

        <SectionLabel>Mini Jira · sprint 24 <span className="kl-sl-pill">{tickets.filter(t => t.onFire).length} on fire</span></SectionLabel>
        <div className="kl-jira-mini">
          {tickets.map(t => (
            <button key={t.id} onClick={() => { setActiveTicketId(t.id); setMobileTab('right'); }} className={`kl-tkt ${activeTicketId === t.id ? 'is-active' : ''} ${t.onFire ? 'is-fire' : ''}`}>
              <div className="kl-tkt-row1">
                <span className={`kl-prio kl-prio-${t.priority}`}>{t.priority}</span>
                <span className="kl-tkt-id">{t.id}</span>
                {t.onFire && <span className="kl-tkt-fire"><Icon name="flame" size={12} color="#EF4444" /></span>}
              </div>
              <div className="kl-tkt-title">{t.title}</div>
              <div className="kl-tkt-status">{t.status}</div>
            </button>
          ))}
        </div>

        <div className="kl-ticker">
          <div className="kl-ticker-label"><Icon name="clock" size={12} /><span>ELAPSED · DAY 3</span></div>
          <div className={`kl-ticker-time ${tickerHot ? 'is-hot' : ''}`}>{formatElapsed(elapsedSec)}</div>
          <div className="kl-ticker-sub">sim time: {simTimeLabel(getStartMinutes() + Math.floor(elapsedSec / 60))}</div>
        </div>

        <div className="kl-me">
          <div className="kl-me-avatar">{(user.name || 'Y')[0]}</div>
          <div><div className="kl-me-name">{user.name || 'You'}</div><div className="kl-me-role">Junior SWE · Day 3</div></div>
        </div>
      </aside>

      {/* MAIN PANEL */}
      <main className="kl-main">
        <div className="kl-thread-hd">
          <div className="kl-thread-hd-left">
            {activePersona && <Avatar persona={{ ...activePersona, status: statuses[activePersona.id] }} size={32} showStatus />}
            <div>
              <div className="kl-thread-name">{activePersona?.name}</div>
              <div className="kl-thread-role">{activePersona?.role}</div>
            </div>
          </div>
          <div className="kl-thread-hd-right">
            <button className="kl-icon-btn"><Icon name="search" size={16} /></button>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="kl-alerts">
            {alerts.map(a => (
              <div key={a.id} className={`kl-alert kl-alert-${a.severity}`}>
                <Icon name="alert" size={15} color={a.severity === 'danger' ? '#EF4444' : '#F59E0B'} />
                <div className="kl-alert-body">
                  <div className="kl-alert-title">{a.title}</div>
                  <div className="kl-alert-text">{a.text}</div>
                </div>
                <span className="kl-alert-time">{a.time}</span>
              </div>
            ))}
          </div>
        )}

        <div className="kl-msgs" ref={messageListRef}>
          {channelMsgs.length === 0 && (
            <div className="kl-msgs-empty">
              <Icon name="people" size={28} color="var(--text-3)" />
              <span>Waiting for messages…</span>
            </div>
          )}
          {channelMsgs.map((m, i) => {
            const prev = channelMsgs[i - 1];
            const grouped = prev && prev.from === m.from && m.kind !== 'system' && m.kind !== 'rich-card';
            return <Message key={m.id} m={m} grouped={grouped} persona={m.from !== 'me' ? personas[m.from] : null} />;
          })}
          {Object.entries(typing).map(([ch, isTyping]) => isTyping && ch === activeChannel && personas[ch] ? (
            <TypingIndicator key={ch} persona={{ ...personas[ch], status: statuses[ch] }} />
          ) : null)}
          <div ref={msgsEndRef} />
        </div>

        {decision ? (
          <div className="kl-decision">
            <div className="kl-decision-label">
              <Icon name="sparkle" size={12} color="var(--indigo)" />
              <span>{decision.prompt}</span>
            </div>
            <div className="kl-decision-options">
              {decision.options.map((opt, i) => (
                <button key={i} className="kl-chip" onClick={() => submitReply(opt.label, opt.signals)}>
                  <span>{opt.label}</span>
                  <Icon name="arrow-right" size={14} color="var(--text-3)" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="kl-composer">
          <button className={`kl-mic ${voiceOn ? 'is-on' : ''}`} onClick={() => setVoiceOn(v => !v)} title="Voice reply">
            <Icon name="mic" size={16} />
          </button>
          <input
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) { submitReply(draft, decision ? {} : null); } }}
            placeholder={activePersona ? `Message ${activePersona.name.split(' ')[0]}…` : 'Message…'}
          />
          <button className="kl-send" disabled={!draft.trim()} onClick={() => submitReply(draft, decision ? {} : null)}>
            <Icon name="send" size={15} color="#fff" />
          </button>
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside className={`kl-right ${mobileTab === 'right' ? 'kl-mob-show' : ''}`}>
        <button className="kl-mob-close" onClick={() => setMobileTab('chat')}><Icon name="close" size={18} /></button>

        <SectionLabel>Jira Board <span className="kl-sl-pill">KT · sprint 24</span></SectionLabel>

        <div className="kl-jira-cols">
          {['Triaging', 'In Progress', 'Monitoring', 'Resolved'].map(col => (
            <div key={col} className="kl-jira-col">
              <div className="kl-jira-col-hd">{col}</div>
              {tickets.filter(t => t.status === col).map(t => (
                <button key={t.id} onClick={() => setActiveTicketId(t.id)} className={`kl-jira-card ${activeTicketId === t.id ? 'is-active' : ''} ${t.onFire ? 'is-fire' : ''}`}>
                  <div className="kl-jira-card-hd">
                    <span className={`kl-prio kl-prio-${t.priority}`}>{t.priority}</span>
                    <span className="kl-tkt-id">{t.id}</span>
                  </div>
                  <div className="kl-jira-card-title">{t.title}</div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {activeTicket && (() => {
          const assignee = personas[activeTicket.assignee];
          return (
            <div className="kl-tdetail">
              <SectionLabel>Active ticket</SectionLabel>
              <div className="kl-tdetail-card">
                <div className="kl-tdetail-row">
                  <span className={`kl-prio kl-prio-${activeTicket.priority}`}>{activeTicket.priority}</span>
                  <span className="kl-tkt-id">{activeTicket.id}</span>
                  <span className={`kl-tag kl-tag-${activeTicket.status.replace(/\s/g, '-').toLowerCase()}`}>{activeTicket.status}</span>
                </div>
                <div className="kl-tdetail-title">{activeTicket.title}</div>
                <div className="kl-tdetail-desc">{activeTicket.description}</div>
                <div className="kl-tdetail-foot">
                  {assignee ? (
                    <div className="kl-tdetail-assignee"><Avatar persona={assignee} size={20} /><span>{assignee.name}</span></div>
                  ) : (
                    <div className="kl-tdetail-assignee">
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, #4F46E5)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{(user.name || 'Y')[0]}</div>
                      <span>{user.name || 'You'}</span>
                    </div>
                  )}
                  <span className="kl-tdetail-tags"><span className="kl-tag">payments</span><span className="kl-tag">refunds</span></span>
                </div>
              </div>
            </div>
          );
        })()}
      </aside>
    </div>
  );
}
