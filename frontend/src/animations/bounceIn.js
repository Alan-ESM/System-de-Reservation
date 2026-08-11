// frontend/src/animations/bounceIn.js
export const bounceIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut'
    }
  }
};

export const bounceInUp = {
  hidden: { y: 100, opacity: 0, scale: 0.3 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut'
    }
  }
};

export const bounceInDown = {
  hidden: { y: -100, opacity: 0, scale: 0.3 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut'
    }
  }
};