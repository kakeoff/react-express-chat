import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

const renderApp = () => {
  root.render(
    <Router>
      <App />
    </Router>
  );
};

if (container) {
  renderApp();
} else {
  console.error('Root container element not found');
}


export default renderApp;
