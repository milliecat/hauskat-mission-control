import React from 'react';
import MissionControl from './MissionControl';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MissionControl />
    </ErrorBoundary>
  );
}

export default App;
