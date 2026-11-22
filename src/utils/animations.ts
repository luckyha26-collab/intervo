/**
 * Reusable motion animation variants for INTERVO
 * Adheres to compositor-only transitions (opacity & transform) and 60fps performance
 */

export const transitionFast = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1]
};

export const transitionMedium = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1]
};

export const transitionSlow = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1]
};

// Fade In Up for section headings and hero elements
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionMedium
  }
};

// Subtle Fade for backdrop
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionFast
  }
};

// Scale in for modals and interactive cards
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionMedium
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: transitionFast
  }
};

// Staggered list container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

// Card hover micro-interaction
export const hoverCardVariant = {
  rest: { y: 0, transition: transitionFast },
  hover: {
    y: -4,
    transition: transitionFast
  }
};

// Interactive button tap feedback
export const tapButton = {
  scale: 0.98,
  transition: { duration: 0.08 }
};
