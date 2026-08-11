// frontend/src/animations/customAnimations.js
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity }
  }
};

export const glow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0)',
      '0 0 40px rgba(59, 130, 246, 0.5)',
      '0 0 20px rgba(59, 130, 246, 0)'
    ],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const rotateIn = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};