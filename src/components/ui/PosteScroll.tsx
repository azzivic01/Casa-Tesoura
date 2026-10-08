import React, { useEffect, useRef } from 'react';
import { useScroll, useVelocity, useSpring } from 'motion/react';
import { useMotionPreference } from './MotionContext';

export function PosteScroll() {
  const { isReducedMotion } = useMotionPreference();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 150,
  });

  const barRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);

  useEffect(() => {
    if (isReducedMotion) {
      if (barRef.current) {
        barRef.current.style.backgroundPosition = '0px 0px';
      }
      return;
    }

    let animationFrameId: number;

    const updateStripe = () => {
      // Base idle drift (0.3px per frame) plus scroll velocity influence
      const currentVelocity = smoothVelocity.get();
      const velocityDelta = (currentVelocity || 0) * 0.05;
      
      // Advance position
      positionRef.current = (positionRef.current + 0.3 + velocityDelta) % 60;

      if (barRef.current) {
        barRef.current.style.backgroundPosition = `0px ${positionRef.current}px`;
      }

      animationFrameId = requestAnimationFrame(updateStripe);
    };

    animationFrameId = requestAnimationFrame(updateStripe);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion, smoothVelocity]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      tabIndex={-1}
      className="fixed z-50 pointer-events-none transition-opacity top-0 left-0 w-full h-[3px] md:w-[7px] md:h-screen"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          var(--tema-color-deco-2) 0px,
          var(--tema-color-deco-2) 10px,
          var(--tema-color-deco-1) 10px,
          var(--tema-color-deco-1) 20px,
          var(--tema-color-bg) 20px,
          var(--tema-color-bg) 30px
        )`,
        backgroundSize: '42px 42px',
        borderRight: 'var(--tema-border-width) solid var(--tema-color-border)',
        borderBottom: 'var(--tema-border-width) solid var(--tema-color-border)',
      }}
    />
  );
}
