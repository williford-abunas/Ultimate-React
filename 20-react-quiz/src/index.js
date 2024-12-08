// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main App component
import './index.css'; // Global styles

// Create the root element for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);