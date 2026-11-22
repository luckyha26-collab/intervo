import React from 'react';
import { motion, type Variants } from 'motion/react';

interface RevealTextProps {
  text: string;
  className?: string;
  gradientWords?: string[];
  gradientClass?: string;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  gradientWords = [],
  gradientClass = 'bg-gradient-to-r from-sky-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent',
  delay = 0.1
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay
      }
    }
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const isGradient = gradientWords.some(
          (gw) => gw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block ${isGradient ? gradientClass : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
