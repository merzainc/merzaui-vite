import '@merzaui/react/dist/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/main.css';
import './css/fonts.css';

import { ThemeProvider } from './components/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark-theme' storageKey='merza-theme'>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
