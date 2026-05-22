export const GridBg = ({ accent = '#6366F1', density = 56, pulse = true, style: extraStyle }) => {
  const gridStyle = {
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
    `,
    backgroundSize: `${density}px ${density}px`,
    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
    animation: pulse ? 'klBgPulse 9s ease-in-out infinite' : 'none',
    pointerEvents: 'none',
  };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, ...extraStyle }} aria-hidden>
      <div style={gridStyle} />
      <div style={{
        position: 'absolute',
        top: '-20%', left: '50%',
        width: '60vmax', height: '60vmax',
        transform: 'translateX(-50%)',
        background: `radial-gradient(circle at center, ${accent}33, transparent 60%)`,
        filter: 'blur(40px)',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default GridBg;
