import React from 'react';
import { motion } from 'motion/react';

interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  amplitude = 8,
  duration = 4,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
