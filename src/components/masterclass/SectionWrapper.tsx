import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { sectionReveal } from './animations';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}

export function SectionWrapper({ children, id, dark = false, style }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 4rem)',
        background: dark ? 'linear-gradient(180deg, #050A14 0%, #080F22 100%)' : 'transparent',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>
    </motion.section>
  );
}
