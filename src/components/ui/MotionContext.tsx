import React, { createContext, useContext, useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

interface MotionContextType {
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  isReducedMotion: false,
  toggleReducedMotion: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemPrefersReduced = useReducedMotion();
  const [manualReduced, setManualReduced] = useState<boolean | null>(null);

  // If user hasn't explicitly set manual override, follow system preference
  const isReducedMotion = manualReduced !== null ? manualReduced : !!systemPrefersReduced;

  useEffect(() => {
    if (systemPrefersReduced && manualReduced === null) {
      setManualReduced(true);
    }
  }, [systemPrefersReduced, manualReduced]);

  const toggleReducedMotion = () => {
    setManualReduced((prev) => (prev !== null ? !prev : !systemPrefersReduced));
  };

  return (
    <MotionContext.Provider value={{ isReducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}
