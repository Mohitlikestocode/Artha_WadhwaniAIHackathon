export const Icon = ({ name, size = 18, color = 'currentColor', strokeWidth = 1.6, style }) => {
  const c = color, sw = strokeWidth;
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: c, strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'block', ...style },
    'aria-hidden': true,
  };
  switch (name) {
    case 'send':
      return <svg {...common}><path d="M3 12l18-9-7 18-3-8-8-1z" /></svg>;
    case 'mic':
      return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3M8 21h8" /></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case 'hash':
      return <svg {...common}><path d="M5 9h14M5 15h14M10 3l-2 18M16 3l-2 18" /></svg>;
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
    case 'arrow-left':
      return <svg {...common}><path d="M19 12H5m6 6-6-6 6-6" /></svg>;
    case 'sparkle':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>;
    case 'check':
      return <svg {...common}><path d="m5 12 5 5L20 7" /></svg>;
    case 'flame':
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={c} stroke="none" style={{ display: 'block', ...style }} aria-hidden><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-1 .5-2 .5-2S6 12 6 15a6 6 0 0 0 12 0c0-6-6-13-6-13z"/></svg>;
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'alert':
      return <svg {...common}><path d="M12 3 2 21h20L12 3z" /><path d="M12 10v5M12 18h0" /></svg>;
    case 'down':
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case 'up':
      return <svg {...common}><path d="m18 15-6-6-6 6" /></svg>;
    case 'close':
      return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case 'globe':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
    case 'people':
      return <svg {...common}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><circle cx="17" cy="9" r="2.5" /><path d="M15 14c3 0 5 1.6 5 4" /></svg>;
    case 'play':
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={c} stroke="none" style={{ display: 'block', ...style }} aria-hidden><path d="M7 4l13 8-13 8z"/></svg>;
    case 'share':
      return <svg {...common}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 11 16 7M8.2 13 16 17" /></svg>;
    case 'download':
      return <svg {...common}><path d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16" /></svg>;
    case 'reset':
      return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>;
    case 'gauge':
      return <svg {...common}><path d="M3 14a9 9 0 0 1 18 0" /><path d="M12 14l4-3" /></svg>;
    case 'bolt':
      return <svg width={size} height={size} viewBox="0 0 24 24" fill={c} stroke="none" style={{ display: 'block', ...style }} aria-hidden><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>;
    case 'logo':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', ...style }} aria-hidden>
          <path d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5S7.3 20.5 12 20.5c2.5 0 4.7-1 6.3-2.7"
                fill="none" stroke="url(#klg)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20.5 12c0-4.7-3.8-8.5-8.5-8.5-2.5 0-4.7 1-6.3 2.7"
                fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
          <defs>
            <linearGradient id="klg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
