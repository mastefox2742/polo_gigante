import { CSSProperties } from 'react';

interface GridBackgroundProps {
  animated?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function GridBackground({ animated = true, intensity = 'medium' }: GridBackgroundProps) {
  const op = { subtle: 0.08, medium: 0.14, strong: 0.24 }[intensity];

  const grid: CSSProperties = {
    position: 'absolute', inset: '-20%', width: '140%', height: '140%',
    backgroundImage: `linear-gradient(rgba(0,102,255,${op}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,102,255,${op}) 1px, transparent 1px)`,
    backgroundSize: '60px 60px', backgroundPosition: '0 0',
    animation: animated ? 'mc-grid 4s linear infinite' : 'none',
    transform: 'perspective(800px) rotateX(25deg) translateY(-10%)',
    transformOrigin: 'center top',
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
    willChange: animated ? 'background-position' : 'auto',
  };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
      <div style={grid} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,102,255,0.6) 30%, rgba(124,58,237,0.6) 70%, transparent 100%)',
        filter: 'blur(1px)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,10,20,0.7) 70%)',
      }} />
    </div>
  );
}
