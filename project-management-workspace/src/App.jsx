import { useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import WorkspacePage from './pages/WorkspacePage.jsx';
import { muiThemes, themes } from './theme.js';

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <StyledThemeProvider theme={dark ? themes.dark : themes.light}>
      <MuiThemeProvider theme={dark ? muiThemes.dark : muiThemes.light}>
        <GlobalStyle />
        <WorkspacePage dark={dark} onToggleTheme={() => setDark((current) => !current)} />
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { min-width: 320px; background: ${({ theme }) => theme.colors.canvas}; }
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.canvas};
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: ${({ theme }) => theme.sizes.font.md};
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
