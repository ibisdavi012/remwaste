import React from 'react';
import SkipSelector from './components/SkipSelector';
import { SkipSelectionProvider } from './context/SkipSelectionContext';
import './styles/main.scss';

function App() {
  return (
    <SkipSelectionProvider>
      <SkipSelector />
    </SkipSelectionProvider>
  );
}

export default App;
