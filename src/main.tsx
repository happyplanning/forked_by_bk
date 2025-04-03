import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import App from './App.tsx';
import './index.css';
import { resources } from './i18n/resources';

// Initialize i18next
i18next.init({
  resources,
  lng: 'ko', // Default language is Korean
  interpolation: {
    escapeValue: false
  },
  debug: true // Enable debug to help identify translation issues
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);