import '@merzaui/react/dist/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/fonts.css';
import './css/main.css';

import { NextThemeProvider } from '@merzaui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextThemeProvider
      attribute='class'
      themes={['light', 'dark-theme']}
      defaultTheme='light'
      enableSystem
      storageKey='merza-theme'
      disableTransitionOnChange
    >
      <App />
    </NextThemeProvider>
  </React.StrictMode>
);
