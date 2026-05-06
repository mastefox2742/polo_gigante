import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { countdownDigit } from './animations';

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function Digit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="mc-glass" style={{ padding: 'clamp(0.75rem,2.5vw,1.25rem)', minWidth: 'clamp(64px,11vw,90px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.6), transparent)', animation: 'mc-scan 3s linear infinite', opacity: 0.5 }} aria-hidden="true" />
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(2rem,5.5vw,3.5rem)' }}>
        <AnimatePresence mode="popLayout">
          <motion.div key={formatted} variants={countdownDigit} initial="enter" animate="center" exit="exit"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2rem,5.5vw,3.5rem)', lineHeight: 1, color: '#F8FAFF', position: 'absolute', width: '100%', textAlign: 'center' }}>
            {formatted}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,102,255,0.8)', marginTop: '0.4rem' }}>
        {label}
      </div>
    </div>
  );
}

export function CountdownTimer({ targetDate, title = "La masterclass commence dans" }: { targetDate: Date; title?: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const units = [
    { value: days, label: 'Jours' },
    { value: hours, label: 'Heures' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Sec' },
  ];
  return (
    <div style={{ textAlign: 'center' }}>
      {title && (
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.85rem', fontWeight: 400, color: 'rgba(248,250,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          {title}
        </p>
      )}
      <div style={{ display: 'flex', gap: 'clamp(0.5rem,2vw,1rem)', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {units.map((u, i) => (
          <div key={u.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem,2vw,1rem)' }}>
            <Digit value={u.value} label={u.label} />
            {i < 3 && (
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: 'rgba(0,102,255,0.6)', animation: 'mc-tick 1s ease-in-out infinite', userSelect: 'none' }} aria-hidden="true">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
