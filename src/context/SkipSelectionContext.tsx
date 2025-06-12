import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Skip } from '../utils/sortUtils';

type SkipSelectionContextType = {
  selectedSkip: Skip | null;
  setSelectedSkip: (skip: Skip | null) => void;
};

const SkipSelectionContext = createContext<SkipSelectionContextType | undefined>(undefined);

export const SkipSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const value = useMemo(() => ({
    selectedSkip,
    setSelectedSkip
  }), [selectedSkip]);

  return (
    <SkipSelectionContext.Provider value={value}>
      {children}
    </SkipSelectionContext.Provider>
  );
};

export const useSkipSelection = () => {
  const context = useContext(SkipSelectionContext);
  if (!context) {
    throw new Error('useSkipSelection must be used within a SkipSelectionProvider');
  }
  return context;
}; 