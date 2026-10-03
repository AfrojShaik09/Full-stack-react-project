import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import { store } from './redux/store.js';
import { themes } from './theme.js';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { min-width: 320px; background: ${({ theme }) => theme.colors.canvas}; }
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.canvas};
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  button, input, select, textarea { font: inherit; }
  button { color: inherit; }
  button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
  ::selection { color: ${({ theme }) => theme.colors.ink}; background: ${({ theme }) => theme.colors.selection}; }
`;

function Root() {
  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
);
