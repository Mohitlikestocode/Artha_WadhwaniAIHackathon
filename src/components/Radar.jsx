import { useState, useEffect } from 'react';

export const Radar = ({ data, size = 360, max = 1, accent = '#6366F1' }) => {
  const cx = size / 2, cy = size / 2;
  const r = size * 0.36;
  const n = data.length;
  const ringValues = [0.25, 0.5, 0.75, 1];

  const angle = (i) => (-Math.PI / 2) + (i / n) * Math.PI * 2;
  const point = (i, v) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v];
  };

  const polygonPoints = data
    .map((d, i) => point(i, Math.min(1, d.value / max)).join(','))
    .join(' ');

  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <defs>
        <radialGradient id="kl-radar-fill" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.18" />
        </radialGradient>
      </defs>

      {ringValues.map((v, idx) => (
        <polygon
          key={idx}
          points={Array.from({ length: n }, (_, i) => point(i, v).join(',')).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {data.map((d, i) => {
        const [x, y] = point(i, 1.02);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        );
      })}

      <g style={{
        transform: drawn ? 'scale(1)' : 'scale(0.05)',
        transformOrigin: `${cx}px ${cy}px`,
        transition: 'transform 1500ms cubic-bezier(.2,.8,.25,1)',
        opacity: drawn ? 1 : 0,
      }}>
        <polygon
          points={polygonPoints}
          fill="url(#kl-radar-fill)"
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const [x, y] = point(i, Math.min(1, d.value / max));
          return (
            <circle key={i} cx={x} cy={y} r="3.5"
                    fill={accent}
                    stroke="var(--bg)" strokeWidth="2" />
          );
        })}
      </g>

      {data.map((d, i) => {
        const a = angle(i);
        const lr = r + 28;
        const x = cx + Math.cos(a) * lr;
        const y = cy + Math.sin(a) * lr;
        let anchor = 'middle';
        if (Math.cos(a) > 0.3) anchor = 'start';
        else if (Math.cos(a) < -0.3) anchor = 'end';
        return (
          <text key={i} x={x} y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="12"
                fontWeight="600"
                fill="#F9FAFB"
                style={{ letterSpacing: '0.02em' }}>
            {d.label}
          </text>
        );
      })}
    </svg>
  );
};

export default Radar;
