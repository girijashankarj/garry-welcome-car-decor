/**
 * Theme variables (Tailwind-aligned). Used in globals.css.
 */
export const themeLight = {
  background: '#ffffff',
  foreground: '#0a0a0a',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  border: '#e4e4e7',
  primary: '#0d47a1',
  primaryForeground: '#fafafa',
  card: '#ffffff',
  cardForeground: '#0a0a0a',
} as const;

export const themeDark = {
  background: '#18181b',
  foreground: '#fafafa',
  muted: '#27272a',
  mutedForeground: '#a1a1aa',
  border: '#3f3f46',
  primary: '#60a5fa',
  primaryForeground: '#18181b',
  card: '#27272a',
  cardForeground: '#fafafa',
} as const;

export type ThemeVariables = typeof themeLight;
