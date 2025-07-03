import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { AnimationProvider } from './contexts/AnimationContext.jsx';
import { LenisProvider } from "./contexts/LenisContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <LanguageProvider>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </LanguageProvider>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
);