import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { AnimationProvider } from './contexts/AnimationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AnimationProvider>
          <App />
        </AnimationProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);