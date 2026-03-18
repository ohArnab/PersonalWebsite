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
    description: 'Classic green terminal palette',
    vars: {
      '--background': '0 0% 10%',
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
    description: 'Soft pastel pink terminal',
    vars: {
      '--background': '330 25% 92%',
      '--foreground': '330 30% 20%',
      '--card': '330 30% 96%',
      '--card-foreground': '330 30% 20%',
      '--popover': '330 30% 96%',
      '--popover-foreground': '330 30% 20%',
      '--primary': '330 70% 70%',
      '--primary-foreground': '0 0% 10%',
      '--secondary': '280 60% 75%',
      '--secondary-foreground': '0 0% 20%',
      '--muted': '330 20% 85%',
      '--muted-foreground': '330 15% 40%',
      '--accent': '200 70% 75%',
      '--accent-foreground': '0 0% 20%',
      '--destructive': '0 70% 65%',
      '--destructive-foreground': '0 0% 10%',
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
    description: 'Dark pastel pink terminal',
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
      '--secondary-foreground': '0 0% 90%',
      '--muted': '330 15% 18%',
      '--muted-foreground': '330 20% 60%',
      '--accent': '200 70% 65%',
      '--accent-foreground': '0 0% 90%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '0 0% 90%',
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
    description: 'Classic 80s black + green terminal (all green, errors red)',
    vars: {
      '--background': '0 0% 10%',          // back to the previous dark background
      '--foreground': '120 100% 75%',      // green text
      '--card': '0 0% 10%',
      '--card-foreground': '120 100% 75%',
      '--popover': '0 0% 10%',
      '--popover-foreground': '120 100% 75%',
      '--primary': '120 100% 75%',
      '--primary-foreground': '120 100% 75%',
      '--secondary': '120 100% 75%',
      '--secondary-foreground': '120 100% 75%',
      '--muted': '120 100% 50%',
      '--muted-foreground': '120 100% 75%',
      '--accent': '120 100% 75%',
      '--accent-foreground': '120 100% 75%',
      '--destructive': '0 100% 60%',       // errors stay red
      '--destructive-foreground': '0 0% 100%',
      '--border': '120 100% 20%',
      '--input': '120 100% 75%',
      '--ring': '120 100% 75%',
      '--terminal-green': '120 100% 75%',
      '--terminal-pink': '120 100% 75%',
      '--terminal-blue': '120 100% 75%',
      '--terminal-yellow': '120 100% 75%',
      '--terminal-red': '120 100% 75%',
      '--terminal-cyan': '120 100% 75%',
      '--terminal-prompt': '120 100% 75%',
    },
  },
    solarizedDark: {
    label: 'Solarized Dark',
    description: 'Low-contrast dark theme with blue/yellow accents',
    vars: {
      '--background': '210 15% 15%',
      '--foreground': '210 10% 85%',
      '--card': '210 15% 18%',
      '--card-foreground': '210 10% 85%',
      '--popover': '210 15% 18%',
      '--popover-foreground': '210 10% 85%',
      '--primary': '40 90% 60%',
      '--primary-foreground': '210 15% 15%',
      '--secondary': '200 70% 65%',
      '--secondary-foreground': '210 15% 15%',
      '--muted': '210 15% 30%',
      '--muted-foreground': '210 10% 70%',
      '--accent': '160 60% 65%',
      '--accent-foreground': '210 15% 15%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '210 10% 85%',
      '--border': '210 15% 25%',
      '--input': '210 15% 25%',
      '--ring': '40 90% 60%',
      '--terminal-green': '160 60% 65%',
      '--terminal-pink': '330 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '40 90% 60%',
      '--terminal-red': '0 70% 60%',
      '--terminal-cyan': '180 60% 60%',
      '--terminal-prompt': '40 90% 60%',
    },
  },

  solarizedLight: {
    label: 'Solarized Light',
    description: 'Soft light theme with calm contrasts',
    vars: {
      '--background': '50 20% 95%',
      '--foreground': '210 10% 20%',
      '--card': '50 20% 92%',
      '--card-foreground': '210 10% 20%',
      '--popover': '50 20% 92%',
      '--popover-foreground': '210 10% 20%',
      '--primary': '40 90% 60%',
      '--primary-foreground': '50 20% 95%',
      '--secondary': '200 70% 65%',
      '--secondary-foreground': '50 20% 95%',
      '--muted': '50 20% 85%',
      '--muted-foreground': '210 10% 40%',
      '--accent': '160 60% 65%',
      '--accent-foreground': '50 20% 95%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '50 20% 95%',
      '--border': '50 20% 85%',
      '--input': '50 20% 85%',
      '--ring': '40 90% 60%',
      '--terminal-green': '160 60% 65%',
      '--terminal-pink': '330 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '40 90% 60%',
      '--terminal-red': '0 70% 60%',
      '--terminal-cyan': '180 60% 60%',
      '--terminal-prompt': '40 90% 60%',
    },
  },

  dracula: {
    label: 'Dracula',
    description: 'Purple/pink/green modern terminal',
    vars: {
      '--background': '260 20% 15%',
      '--foreground': '290 30% 85%',
      '--card': '260 20% 18%',
      '--card-foreground': '290 30% 85%',
      '--popover': '260 20% 18%',
      '--popover-foreground': '290 30% 85%',
      '--primary': '290 70% 70%',
      '--primary-foreground': '260 20% 15%',
      '--secondary': '200 60% 65%',
      '--secondary-foreground': '260 20% 15%',
      '--muted': '260 15% 30%',
      '--muted-foreground': '290 30% 65%',
      '--accent': '140 60% 65%',
      '--accent-foreground': '260 20% 15%',
      '--destructive': '0 80% 60%',
      '--destructive-foreground': '290 30% 85%',
      '--border': '260 15% 25%',
      '--input': '260 15% 25%',
      '--ring': '290 70% 70%',
      '--terminal-green': '140 60% 65%',
      '--terminal-pink': '290 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '50 90% 65%',
      '--terminal-red': '0 80% 60%',
      '--terminal-cyan': '180 60% 65%',
      '--terminal-prompt': '290 70% 70%',
    },
  },

  monokai: {
    label: 'Monokai',
    description: 'Bright high-contrast classic',
    vars: {
      '--background': '0 0% 10%',
      '--foreground': '40 90% 70%',
      '--card': '0 0% 12%',
      '--card-foreground': '40 90% 70%',
      '--popover': '0 0% 12%',
      '--popover-foreground': '40 90% 70%',
      '--primary': '40 90% 70%',
      '--primary-foreground': '0 0% 10%',
      '--secondary': '330 70% 70%',
      '--secondary-foreground': '0 0% 10%',
      '--muted': '0 0% 25%',
      '--muted-foreground': '40 90% 70%',
      '--accent': '200 80% 70%',
      '--accent-foreground': '0 0% 10%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '0 0% 90%',
      '--border': '0 0% 25%',
      '--input': '0 0% 25%',
      '--ring': '40 90% 70%',
      '--terminal-green': '40 90% 70%',
      '--terminal-pink': '330 70% 70%',
      '--terminal-blue': '200 80% 70%',
      '--terminal-yellow': '50 90% 65%',
      '--terminal-red': '0 70% 60%',
      '--terminal-cyan': '180 60% 60%',
      '--terminal-prompt': '40 90% 70%',
    },
  },

  c64: {
    label: 'C64',
    description: 'Retro Commodore 64 look',
    vars: {
      '--background': '210 20% 10%',
      '--foreground': '180 60% 70%',
      '--card': '210 20% 12%',
      '--card-foreground': '180 60% 70%',
      '--popover': '210 20% 12%',
      '--popover-foreground': '180 60% 70%',
      '--primary': '180 60% 70%',
      '--primary-foreground': '210 20% 10%',
      '--secondary': '50 90% 60%',
      '--secondary-foreground': '210 20% 10%',
      '--muted': '210 15% 25%',
      '--muted-foreground': '180 60% 70%',
      '--accent': '320 70% 70%',
      '--accent-foreground': '210 20% 10%',
      '--destructive': '0 70% 60%',
      '--destructive-foreground': '0 0% 90%',
      '--border': '210 15% 20%',
      '--input': '210 15% 20%',
      '--ring': '180 60% 70%',
      '--terminal-green': '180 60% 70%',
      '--terminal-pink': '320 70% 70%',
      '--terminal-blue': '200 70% 65%',
      '--terminal-yellow': '50 90% 60%',
      '--terminal-red': '0 70% 60%',
      '--terminal-cyan': '180 60% 60%',
      '--terminal-prompt': '180 60% 70%',
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