import { CSSProperties, useMemo } from 'react';

const COLORS = [
  'rgba(0,102,255,1)', 'rgba(124,58,237,1)', 'rgba(255,184,0,1)',
  'rgba(255,107,53,0.8)', 'rgba(248,250,255,0.9)',
];

export function ParticleField({ count = 40 }: { count?: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 6,
      driftX: (Math.random() - 0.5) * 120,
      opacity: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
      {particles.map((p) => {
        const style: CSSProperties = {
          position: 'absolute', bottom: '-10px', left: `${p.x}%`,
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
          backgroundColor: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          opacity: 0,
          animation: `mc-particle ${p.duration}s linear ${p.delay}s infinite`,
          ['--dx' as string]: `${p.driftX}px`,
          willChange: 'transform, opacity',
        };
        return <div key={p.id} style={style} />;
      })}
    </div>
  );
}
