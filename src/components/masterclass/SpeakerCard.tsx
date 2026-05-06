import { motion } from 'motion/react';
import { speakerHover } from './animations';

type Accent = 'electric' | 'gold' | 'violet' | 'fire';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  topic: string;
  photo?: string;
  initials?: string;
  accent: Accent;
  session: string;
}

const accentMap: Record<Accent, { primary: string; bg: string }> = {
  electric: { primary: '#0066FF', bg: 'rgba(0,102,255,0.15)' },
  gold:     { primary: '#FFB800', bg: 'rgba(255,184,0,0.15)' },
  violet:   { primary: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
  fire:     { primary: '#FF6B35', bg: 'rgba(255,107,53,0.15)' },
};

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const { primary, bg } = accentMap[speaker.accent];

  return (
    <motion.article
      variants={speakerHover}
      initial="idle"
      whileHover="hover"
      style={{
        background: 'rgba(13,26,58,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${bg}`, borderRadius: '1rem', overflow: 'hidden', cursor: 'default',
        willChange: 'transform', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${primary}, transparent)` }} />
      <div style={{ padding: '1.5rem', flex: 1 }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden',
          border: `2px solid ${bg}`, marginBottom: '1.25rem', flexShrink: 0,
        }}>
          {speaker.photo ? (
            <img src={speaker.photo} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `radial-gradient(circle at 30% 30%, ${primary}, ${primary}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', color: '#F8FAFF' }}>
              {speaker.initials ?? speaker.name[0]}
            </div>
          )}
        </div>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.7rem', fontWeight: 600, color: primary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          {speaker.session}
        </p>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFF', marginBottom: '0.2rem', lineHeight: 1.2 }}>
          {speaker.name}
        </h3>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.82rem', color: primary, fontWeight: 500, marginBottom: speaker.company ? '0.1rem' : '1rem' }}>
          {speaker.role}
        </p>
        {speaker.company && (
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.75rem', color: 'rgba(248,250,255,0.4)', marginBottom: '1rem' }}>{speaker.company}</p>
        )}
        <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: bg, border: `1px solid ${primary}44`, borderRadius: '2rem', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.72rem', fontWeight: 500, color: primary, letterSpacing: '0.04em' }}>
          {speaker.topic}
        </div>
      </div>
    </motion.article>
  );
}
