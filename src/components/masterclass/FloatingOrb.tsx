import { CSSProperties } from 'react';

type OrbColor = 'electric' | 'violet' | 'gold' | 'fire';

interface FloatingOrbProps {
  size?: number;
  color?: OrbColor;
  top?: string; left?: string; right?: string; bottom?: string;
  opacity?: number; delay?: number; blur?: number;
}

const colorMap: Record<OrbColor, { outer: string; inner: string; glow: string }> = {
  electric: {
    outer: 'radial-gradient(circle at 30% 30%, #4D94FF 0%, #0066FF 40%, #003D99 75%, #050A14 100%)',
    inner: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.35) 0%, transparent 50%)',
    glow: 'rgba(0,102,255,0.5)',
  },
  violet: {
    outer: 'radial-gradient(circle at 30% 30%, #A855F7 0%, #7C3AED 40%, #4C1D95 75%, #050A14 100%)',
    inner: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.3) 0%, transparent 50%)',
    glow: 'rgba(124,58,237,0.5)',
  },
  gold: {
    outer: 'radial-gradient(circle at 30% 30%, #FFD54F 0%, #FFB800 40%, #996D00 75%, #050A14 100%)',
    inner: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.4) 0%, transparent 50%)',
    glow: 'rgba(255,184,0,0.5)',
  },
  fire: {
    outer: 'radial-gradient(circle at 30% 30%, #FF9A6B 0%, #FF6B35 40%, #CC4400 75%, #050A14 100%)',
    inner: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.3) 0%, transparent 50%)',
    glow: 'rgba(255,107,53,0.5)',
  },
};

export function FloatingOrb({
  size = 300, color = 'electric', top, left, right, bottom,
  opacity = 0.7, delay = 0, blur = 0,
}: FloatingOrbProps) {
  const { outer, inner, glow } = colorMap[color];

  const container: CSSProperties = {
    position: 'absolute', top, left, right, bottom,
    width: size, height: size, opacity,
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    animation: `mc-float ${6 + delay * 0.5}s ease-in-out ${delay}s infinite`,
    willChange: 'transform', pointerEvents: 'none', zIndex: 0,
  };

  const sphere: CSSProperties = {
    width: '100%', height: '100%', borderRadius: '50%', background: outer,
    boxShadow: `0 0 ${size * 0.3}px ${glow}, 0 0 ${size * 0.6}px ${glow.replace('0.5', '0.2')},
      inset 0 ${size * 0.05}px ${size * 0.15}px rgba(255,255,255,0.15),
      inset 0 -${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.4)`,
    position: 'relative', overflow: 'hidden',
  };

  return (
    <div style={container} aria-hidden="true">
      <div style={sphere}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: inner }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />
      </div>
    </div>
  );
}
