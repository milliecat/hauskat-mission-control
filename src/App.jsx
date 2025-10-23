import React from 'react';
import MissionControl from './MissionControl';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MissionControl />
    </ThemeProvider>
  );
}

export default App;
