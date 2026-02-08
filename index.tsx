
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initErrorMonitoring, startPeriodicHealthChecks } from './lib/monitoring';

// Initialize error monitoring
initErrorMonitoring();

// Start periodic health checks
startPeriodicHealthChecks();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
