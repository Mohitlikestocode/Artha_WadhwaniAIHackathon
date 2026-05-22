export const STATUS_COLOR = {
  online:  '#10B981',
  meeting: '#F59E0B',
  away:    '#6B7280',
  offline: '#3F3F3F',
};

export const Avatar = ({ persona, size = 32, showStatus = false, ring = false, style: extraStyle }) => {
  if (!persona) return null;
  const fontSize = Math.round(size * 0.4);
  const statusSize = Math.max(8, Math.round(size * 0.28));
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...extraStyle }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${persona.color}, ${persona.color}cc)`,
        color: '#0F0F0F',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize,
        letterSpacing: '-0.02em',
        boxShadow: ring ? `0 0 0 2px var(--bg), 0 0 0 3.5px ${persona.color}` : 'inset 0 0 0 1px rgba(255,255,255,.1)',
        userSelect: 'none',
      }}>
        {persona.initials}
      </div>
      {showStatus && persona.status && (
        <div style={{
          position: 'absolute', right: -1, bottom: -1,
          width: statusSize, height: statusSize,
          borderRadius: '50%',
          background: STATUS_COLOR[persona.status] || STATUS_COLOR.offline,
          border: '2px solid var(--bg)',
          animation: persona.status === 'online' ? 'klPulse 2.4s ease-in-out infinite' : 'none',
        }} />
      )}
    </div>
  );
};

export default Avatar;
