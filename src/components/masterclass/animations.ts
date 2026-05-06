import type { Variants } from 'motion/react';

const EXPO = [0.16, 1, 0.3, 1] as const;
const BACK = [0.34, 1.56, 0.64, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: BACK } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: BACK } },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO, staggerChildren: 0.1 } },
};

export const speakerHover: Variants = {
  idle: { scale: 1, y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  hover: {
    scale: 1.03, y: -8,
    boxShadow: '0 20px 60px rgba(0,102,255,0.25), 0 0 0 1px rgba(0,102,255,0.3)',
    transition: { duration: 0.3, ease: BACK },
  },
};

export const countdownDigit: Variants = {
  enter: { y: -30, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.35, ease: EXPO } },
  exit:  { y: 30, opacity: 0, transition: { duration: 0.25 } },
};

export const heroLetterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};

export const heroLetter: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: EXPO } },
};
