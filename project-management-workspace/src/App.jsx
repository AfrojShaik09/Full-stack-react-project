import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import WorkspacePage from './pages/WorkspacePage.jsx';
import { themes } from './theme.js';

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <ThemeProvider theme={dark ? themes.dark : themes.light}>
      <WorkspacePage dark={dark} onToggleTheme={() => setDark((current) => !current)} />
    </ThemeProvider>
  );
}
