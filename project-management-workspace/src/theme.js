import { createTheme } from '@mui/material/styles';
import { colorTokens } from './tokens/colors.js';
import { sizeTokens } from './tokens/sizes.js';

const semanticColors = {
  light: {
    canvas: colorTokens.neutral[100],
    surface: colorTokens.neutral.white,
    surfaceMuted: colorTokens.neutral[50],
    surfaceRaised: colorTokens.neutral.white,
    ink: colorTokens.neutral[900],
    inkMuted: colorTokens.neutral[600],
    inkFaint: colorTokens.neutral[500],
    onAccent: colorTokens.neutral.white,
    onStatus: colorTokens.neutral.white,
    line: colorTokens.neutral[200],
    lineStrong: colorTokens.neutral[300],
    accent: colorTokens.green[500],
    accentHover: colorTokens.green[600],
    accentSoft: colorTokens.green[100],
    coral: colorTokens.coral[500],
    coralSoft: colorTokens.coral[100],
    gold: colorTokens.gold[500],
    goldSoft: colorTokens.gold[100],
    blue: colorTokens.blue[500],
    blueSoft: colorTokens.blue[100],
    danger: colorTokens.red[500],
    overlayDialog: colorTokens.overlay.dialog,
    overlayNavigation: colorTokens.overlay.navigation,
    focus: colorTokens.focus.light,
    selection: colorTokens.neutral.lightSelection,
    shadow: colorTokens.shadow.light,
  },
  dark: {
    canvas: colorTokens.neutral.black,
    surface: colorTokens.neutral.darkSurface,
    surfaceMuted: colorTokens.neutral.darkSurfaceMuted,
    surfaceRaised: colorTokens.neutral.darkSurfaceRaised,
    ink: colorTokens.neutral.darkInk,
    inkMuted: colorTokens.neutral.darkInkMuted,
    inkFaint: colorTokens.neutral.darkInkFaint,
    onAccent: colorTokens.neutral[900],
    onStatus: colorTokens.neutral[900],
    line: colorTokens.neutral.darkLine,
    lineStrong: colorTokens.neutral.darkLineStrong,
    accent: colorTokens.green[300],
    accentHover: colorTokens.green[200],
    accentSoft: colorTokens.green[900],
    coral: colorTokens.coral[300],
    coralSoft: colorTokens.coral[900],
    gold: colorTokens.gold[300],
    goldSoft: colorTokens.gold[900],
    blue: colorTokens.blue[300],
    blueSoft: colorTokens.blue[900],
    danger: colorTokens.red[300],
    overlayDialog: colorTokens.overlay.dialog,
    overlayNavigation: colorTokens.overlay.navigation,
    focus: colorTokens.green[300],
    selection: colorTokens.neutral.darkSelection,
    shadow: colorTokens.shadow.dark,
  },
};

export const buttonVariants = {
  primary: {
    background: 'accent',
    foreground: 'onAccent',
    border: 'accent',
    hoverBackground: 'accentHover',
  },
  secondary: {
    background: 'surface',
    foreground: 'ink',
    border: 'line',
    hoverBackground: 'surfaceMuted',
  },
  danger: {
    background: 'danger',
    foreground: 'onAccent',
    border: 'danger',
    hoverBackground: 'danger',
  },
};

export const avatarVariants = {
  accent: 'accent',
  coral: 'coral',
  gold: 'gold',
  blue: 'blue',
};

export const themes = Object.fromEntries(
  Object.entries(semanticColors).map(([mode, colors]) => [mode, { colors, sizes: sizeTokens }]),
);

export const muiThemes = Object.fromEntries(
  Object.entries(semanticColors).map(([mode, colors]) => [
    mode,
    createTheme({
      palette: {
        mode,
        primary: { main: colors.accent, contrastText: colors.onAccent },
        error: { main: colors.danger },
        background: { default: colors.canvas, paper: colors.surface },
        text: { primary: colors.ink, secondary: colors.inkMuted },
        divider: colors.line,
      },
      shape: { borderRadius: Number.parseInt(sizeTokens.radius.md, 10) },
      typography: {
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        button: { fontWeight: 650, textTransform: 'none' },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              minHeight: sizeTokens.control.default,
              borderRadius: sizeTokens.radius.md,
              paddingInline: sizeTokens.space[4],
              boxShadow: 'none',
            },
            contained: { '&:hover': { boxShadow: 'none' } },
          },
        },
        MuiTooltip: { styleOverrides: { tooltip: { fontSize: sizeTokens.font.xs } } },
      },
    }),
  ]),
);
