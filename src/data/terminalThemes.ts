type TerminalCssVars = Record<`--${string}`, string>;

export interface TerminalThemeDefinition {
  label: string;
  description: string;
  vars: TerminalCssVars;
}

export const TERMINAL_THEME_STORAGE_KEY = 'arnab-terminal-theme';

export const terminalThemes = {
  default: {
    label: 'Default',
    description: 'Current default green terminal palette',
    vars: {
      '--background': '0 0% 17%',
      '--foreground': '0 0% 90%',
      '--card': '0 0% 14%',
      '--card-foreground': '0 0% 90%',
      '--popover': '0 0% 14%',
      '--popover-foreground': '0 0% 90%',
      '--primary': '95 38% 62%',
      '--primary-foreground': '0 0% 10%',
      '--secondary': '326 100% 74%',
      '--secondary-foreground': '0 0% 10%',
      '--muted': '0 0% 22%',
      '--muted-foreground': '0 0% 60%',
      '--accent': '207 90% 66%',
      '--accent-foreground': '0 0% 10%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 90%',
      '--border': '0 0% 25%',
      '--input': '0 0% 25%',
      '--ring': '95 38% 62%',
      '--terminal-green': '95 38% 62%',
      '--terminal-pink': '326 100% 74%',
      '--terminal-blue': '207 90% 66%',
      '--terminal-yellow': '39 100% 70%',
      '--terminal-red': '0 84% 60%',
      '--terminal-cyan': '187 80% 60%',
      '--terminal-prompt': '207 90% 66%',
    },
  },

  pink: {
    label: 'Pink',
    description: 'Pink prompt, keywords, and terminal accents',
    vars: {
      '--background': '332 35% 10%',
      '--foreground': '326 100% 86%',
      '--card': '332 34% 12%',
      '--card-foreground': '326 100% 86%',
      '--popover': '332 34% 12%',
      '--popover-foreground': '326 100% 86%',
      '--primary': '326 100% 74%',
      '--primary-foreground': '330 30% 8%',
      '--secondary': '334 65% 58%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '332 28% 18%',
      '--muted-foreground': '326 44% 72%',
      '--accent': '326 100% 74%',
      '--accent-foreground': '330 30% 8%',
      '--destructive': '348 89% 67%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '332 26% 24%',
      '--input': '332 26% 24%',
      '--ring': '326 100% 74%',
      '--terminal-green': '326 100% 74%',
      '--terminal-pink': '326 100% 74%',
      '--terminal-blue': '326 92% 80%',
      '--terminal-yellow': '336 100% 78%',
      '--terminal-red': '348 89% 67%',
      '--terminal-cyan': '312 85% 78%',
      '--terminal-prompt': '326 100% 74%',
    },
  },

  pinkPastel: {
    label: 'Pink Pastel',
    description: 'Soft pastel pink terminal with gentle contrast',
    vars: {
      '--background': '330 25% 92%',
      '--foreground': '330 30% 20%',
      '--card': '330 30% 96%',
      '--card-foreground': '330 30% 20%',
      '--popover': '330 30% 96%',
      '--popover-foreground': '330 30% 20%',
      '--primary': '330 70% 70%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '280 60% 75%',
      '--secondary-foreground': '0 0% 20%',
      '--muted': '330 20% 85%',
      '--muted-foreground': '330 15% 40%',
      '--accent': '200 70% 75%',
      '--accent-foreground': '0 0% 20%',
      '--destructive': '0 70% 65%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '330 20% 80%',
      '--input': '330 20% 80%',
      '--ring': '330 70% 70%',
      '--terminal-green': '140 50% 50%',
      '--terminal-pink': '330 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '40 90% 65%',
      '--terminal-red': '0 70% 65%',
      '--terminal-cyan': '180 60% 60%',
      '--terminal-prompt': '330 70% 60%',
    },
  },

  pinkDark: {
    label: 'Pink Dark',
    description: 'Dark pastel pink terminal with soft contrast',
    vars: {
      '--background': '330 20% 8%',
      '--foreground': '330 40% 85%',
      '--card': '330 20% 10%',
      '--card-foreground': '330 40% 85%',
      '--popover': '330 20% 10%',
      '--popover-foreground': '330 40% 85%',
      '--primary': '330 70% 70%',
      '--primary-foreground': '330 20% 10%',
      '--secondary': '300 50% 60%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '330 15% 18%',
      '--muted-foreground': '330 20% 60%',
      '--accent': '200 70% 65%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '330 15% 20%',
      '--input': '330 15% 20%',
      '--ring': '330 70% 70%',
      '--terminal-green': '140 50% 60%',
      '--terminal-pink': '330 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '40 90% 70%',
      '--terminal-red': '0 70% 60%',
      '--terminal-cyan': '180 60% 65%',
      '--terminal-prompt': '330 70% 75%',
    },
  },

  hacker: {
    label: 'Hacker',
    description: 'Classic green-on-black terminal',
    vars: {
      '--background': '120 100% 3%',
      '--foreground': '120 100% 68%',
      '--card': '120 100% 4%',
      '--card-foreground': '120 100% 68%',
      '--popover': '120 100% 4%',
      '--popover-foreground': '120 100% 68%',
      '--primary': '120 100% 60%',
      '--primary-foreground': '120 100% 5%',
      '--secondary': '120 65% 30%',
      '--secondary-foreground': '120 100% 75%',
      '--muted': '120 35% 8%',
      '--muted-foreground': '120 55% 45%',
      '--accent': '120 100% 60%',
      '--accent-foreground': '120 100% 5%',
      '--destructive': '120 100% 60%',
      '--destructive-foreground': '120 100% 5%',
      '--border': '120 40% 16%',
      '--input': '120 40% 16%',
      '--ring': '120 100% 60%',
      '--terminal-green': '120 100% 68%',
      '--terminal-prompt': '120 100% 68%',
    },
  },

  matrix: {
    label: 'Matrix',
    description: 'Deep black with glowing green text',
    vars: {
      '--background': '120 100% 2%',
      '--foreground': '120 100% 75%',
      '--card': '120 100% 3%',
      '--card-foreground': '120 100% 75%',
      '--popover': '120 100% 3%',
      '--popover-foreground': '120 100% 75%',
      '--primary': '120 100% 65%',
      '--primary-foreground': '120 100% 5%',
      '--secondary': '120 50% 25%',
      '--secondary-foreground': '120 100% 80%',
      '--muted': '120 30% 10%',
      '--muted-foreground': '120 40% 50%',
      '--accent': '120 100% 70%',
      '--accent-foreground': '120 100% 5%',
      '--destructive': '0 100% 50%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '120 40% 15%',
      '--input': '120 40% 15%',
      '--ring': '120 100% 65%',
      '--terminal-green': '120 100% 75%',
      '--terminal-red': '0 100% 60%',
      '--terminal-prompt': '120 100% 65%',
    },
  },

  nord: {
    label: 'Nord',
    description: 'Cool arctic blue minimal theme',
    vars: {
      '--background': '220 16% 12%',
      '--foreground': '220 20% 85%',
      '--card': '220 16% 14%',
      '--card-foreground': '220 20% 85%',
      '--popover': '220 16% 14%',
      '--popover-foreground': '220 20% 85%',
      '--primary': '200 60% 65%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 30% 50%',
      '--secondary-foreground': '0 0% 100%',
      '--muted': '220 12% 20%',
      '--muted-foreground': '220 15% 60%',
      '--accent': '180 40% 60%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '220 12% 22%',
      '--input': '220 12% 22%',
      '--ring': '200 60% 65%',
      '--terminal-green': '140 40% 55%',
      '--terminal-blue': '200 60% 65%',
      '--terminal-prompt': '200 60% 65%',
    },
  },
} satisfies Record<string, TerminalThemeDefinition>;

export type TerminalThemeName = keyof typeof terminalThemes;

export const DEFAULT_TERMINAL_THEME: TerminalThemeName = 'default';

export const terminalThemeNames = Object.keys(
  terminalThemes
) as TerminalThemeName[];

export const isTerminalTheme = (
  value?: string
): value is TerminalThemeName => Boolean(value && value in terminalThemes);

export const formatTerminalThemeMenu = (
  activeTheme: TerminalThemeName
) => {
  const entries = terminalThemeNames
    .map((themeName) => {
      const marker = themeName === activeTheme ? '>' : ' ';
      const theme = terminalThemes[themeName];
      return `  ${marker} ${themeName.padEnd(12)} ${theme.description}`;
    })
    .join('\n');

  return `
Theme Selector
──────────────
${entries}

Current theme: ${activeTheme}
Use "theme <name>" to switch.
`;
};