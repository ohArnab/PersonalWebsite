import { useState, useRef, useEffect, useCallback, KeyboardEvent, type CSSProperties } from 'react';
import { resolvePath, getTree, filesystem, FSNode } from '@/data/filesystem';
import {
  DEFAULT_TERMINAL_THEME,
  TERMINAL_THEME_STORAGE_KEY,
  formatTerminalThemeMenu,
  isTerminalTheme,
  terminalThemeNames,
  terminalThemes,
  type TerminalThemeName,
} from '@/data/terminalThemes';

interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'system';
  text: string;
  color?: string;
}

interface TerminalProps {
  onSwitchToGUI: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onResetToBoot: () => void;
}

const buildNeofetch = (theme: TerminalThemeName) => `
  \x1b[green]    ___                    __     \x1b[reset]  arnab@portfolio
  \x1b[green]   /   |  _________  ____ / /_    \x1b[reset]  ─────────────────
  \x1b[green]  / /| | / ___/ __ \\/ __ '/ __ \\  \x1b[reset]  OS: ArnabOS v1.0
  \x1b[green] / ___ |/ /  / / / / /_/ / /_/ /  \x1b[reset]  Shell: arnab-sh
  \x1b[green]/_/  |_/_/  /_/ /_/\\__,_/_.___/   \x1b[reset]  Terminal: web-term
  \x1b[reset]                                    Uptime: since you arrived
                                     Packages: projects(3)
                                     Theme: ${theme}
`;

const HELP_TEXT = `
Available commands:

  🗂️  Navigation
  ──────────────
  ls              List directory contents
  cd <dir>        Change directory
  pwd             Print working directory
  tree            Show directory tree
  clear           Clear terminal

  📄  File Viewing
  ────────────────
  cat <file>      Display file contents

  ⚙️  System
  ──────────
  help            Show this help message
  whoami          Display user info
  neofetch        System information
  history         Command history

  🚀  Portfolio
  ─────────────
  projects        List all projects
  resume          Show resume
  skills          Display skills
  contact         Show contact info
  socials         Show social links

  🎨  Other
  ──────────
  gui             Switch to GUI mode
  theme [name]    List themes or change theme
  sudo hire-arnab 😏
`;

const Terminal = ({ onSwitchToGUI, onClose, onMinimize, onResetToBoot }: TerminalProps) => {
  const [theme, setTheme] = useState<TerminalThemeName>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_TERMINAL_THEME;
    }

    const savedTheme = window.localStorage.getItem(TERMINAL_THEME_STORAGE_KEY);
    return isTerminalTheme(savedTheme ?? undefined) ? (savedTheme as TerminalThemeName) : DEFAULT_TERMINAL_THEME;
  });
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'ArnabOS Terminal v1.0 — Type "help" for commands.' },
    { type: 'system', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabSuggestion, setTabSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = `arnab@portfolio:${currentDir === '/' ? '~' : '~' + currentDir}$ `;

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    window.localStorage.setItem(TERMINAL_THEME_STORAGE_KEY, theme);
  }, [theme]);

  const addOutput = useCallback((text: string, type: TerminalLine['type'] = 'output', color?: string) => {
    setLines((prev) => [...prev, { type, text, color }]);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      addOutput(prompt + trimmed, 'prompt');

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (command) {
        case 'help':
          addOutput(HELP_TEXT);
          break;

        case 'clear':
          setLines([]);
          break;

        case 'pwd':
          addOutput(currentDir === '/' ? '/' : currentDir);
          break;

        case 'whoami':
          addOutput('arnab — developer, sysadmin, tinkerer');
          break;

        case 'ls': {
          const target = args[0] || '.';
          const { node } = resolvePath(target, currentDir);
          if (!node || node.type !== 'dir') {
            addOutput(`ls: cannot access '${target}': No such directory`, 'error');
          } else {
            const children = node.children || {};
            const entries = Object.entries(children)
              .map(([name, n]) => {
                if (args.includes('-l')) {
                  return `${n.permissions || (n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--')}  ${name}${n.type === 'dir' ? '/' : ''}`;
                }
                return n.type === 'dir' ? name + '/' : name;
              })
              .join(args.includes('-l') ? '\n' : '  ');
            addOutput(entries || '(empty directory)');
          }
          break;
        }

        case 'cd': {
          const target = args[0] || '/';
          if (target === '~' || target === '/') {
            setCurrentDir('/');
          } else {
            const { node, absolutePath } = resolvePath(target, currentDir);
            if (!node || node.type !== 'dir') {
              addOutput(`cd: no such directory: ${target}`, 'error');
            } else {
              setCurrentDir(absolutePath);
            }
          }
          break;
        }

        case 'cat': {
          if (!args[0]) {
            addOutput('cat: missing file operand', 'error');
            break;
          }
          const { node } = resolvePath(args[0], currentDir);
          if (!node) {
            addOutput(`cat: ${args[0]}: No such file or directory`, 'error');
          } else if (node.type === 'dir') {
            addOutput(`cat: ${args[0]}: Is a directory`, 'error');
          } else {
            addOutput(node.content || '(empty file)');
          }
          break;
        }

        case 'open': {
          if (!args[0]) {
            addOutput('open: missing file operand', 'error');
            break;
          }
          const { node } = resolvePath(args[0], currentDir);
          if (!node) {
            addOutput(`open: ${args[0]}: No such file`, 'error');
          } else if (node.type === 'dir') {
            addOutput(`Hint: use "cd ${args[0]}" to enter directories`, 'system');
          } else {
            addOutput(node.content || '(empty file)');
          }
          break;
        }

        case 'tree': {
          const target = args[0] || '.';
          const { node, absolutePath } = resolvePath(target, currentDir);
          if (!node || node.type !== 'dir') {
            addOutput(`tree: '${target}': not a directory`, 'error');
          } else {
            const treeName = absolutePath === '/' ? '/' : absolutePath.split('/').pop() || '/';
            addOutput(getTree(node, '', treeName));
          }
          break;
        }

        case 'neofetch':
          addOutput(buildNeofetch(theme), 'output', 'green');
          break;

        case 'history':
          addOutput(commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n'));
          break;

        case 'projects': {
          const { node } = resolvePath('/projects', '/');
          if (node?.type === 'dir' && node.children) {
            const list = Object.keys(node.children)
              .map((p) => `  📁 ${p}`)
              .join('\n');
            addOutput(`Projects:\n${list}\n\nUse "cd projects/<name>" then "cat README.md" for details.`);
          }
          break;
        }

        case 'resume': {
          const { node } = resolvePath('/resume/resume.pdf', '/');
          if (node?.content) addOutput(node.content);
          break;
        }

        case 'skills':
          addOutput(`
🛠️  Skills
══════════

📝 Languages:
  • Python  • Java  • JavaScript  • TypeScript
  • SQL  • C  • Rust  • Bash  • PowerShell

⚛️  Frameworks & Libraries:
  • React  • Flask  • Express.js  • Node.js
  • REST  • GraphQL  • Bootstrap

🐳 DevOps & Tools:
  • Docker  • CI/CD  • Kubernetes  • PowerCLI
  • Ansible  • Git  • Agile  • Nginx

🧪 Testing:
  • PyTest  • Jest  • Mocha  • Selenium

🗄️  Databases:
  • Oracle SQL  • PostgreSQL  • MySQL  • MongoDB

☁️  Cloud & Infrastructure:
  • VMware vSphere/ESXi  • Windows Server (AD, WSUS)
  • Ubuntu  • CentOS  • Azure Fundamentals

🤖 Data & ML:
  • TensorFlow  • Scikit-learn  • Pandas  • NumPy
  • XGBoost  • Reinforcement Learning

🔧 Other Tools:
  • Salesforce CRM  • JIRA  • ServiceNow
  • Tableau  • Excel (VBA, Pivot Tables)`);
          break;

        case 'contact':
        case 'socials': {
          const { node } = resolvePath('/contact/socials.txt', '/');
          if (node?.content) addOutput(node.content);
          break;
        }

        case 'gui':
          addOutput('Switching to GUI mode...', 'system');
          setTimeout(onSwitchToGUI, 500);
          break;

        case 'sudo':
          if (args.join(' ') === 'hire-arnab') {
            addOutput(`
Password: ********

Access granted.
🎉 Recruitment sequence initiated.

Downloading resume...
Opening email client...
Preparing offer letter template...

Just kidding. But seriously, let's talk!
→ arnab.snath@gmail.com`, 'output', 'pink');
          } else {
            addOutput(`sudo: command not found: ${args.join(' ')}`, 'error');
          }
          break;

        case 'matrix':
          addOutput('🟩 Entering the Matrix... (just kidding, this is a portfolio)', 'system');
          break;

        case 'theme':
          if (!args[0]) {
            addOutput(formatTerminalThemeMenu(theme), 'system');
          } else if (isTerminalTheme(args[0])) {
            setTheme(args[0]);
            addOutput(`Theme set to: ${args[0]}`, 'system');
          } else {
            addOutput(`Unknown theme: ${args[0]}\n\n${formatTerminalThemeMenu(theme)}`, 'error');
          }
          break;

        default:
          addOutput(`command not found: ${command}. Type "help" for available commands.`, 'error');
      }
    },
    [currentDir, commandHistory, addOutput, prompt, onSwitchToGUI, theme]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setTabSuggestion('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['ls', 'cd', 'pwd', 'tree', 'clear', 'cat', 'open', 'help', 'whoami', 'neofetch', 'history', 'projects', 'resume', 'skills', 'contact', 'socials', 'gui', 'theme', 'sudo'];
      const parts = input.split(/\s+/);
      const lastPart = parts[parts.length - 1];

      if (parts.length === 1) {
        const matches = commands.filter((c) => c.startsWith(lastPart));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setTabSuggestion(matches.join('  '));
          addOutput(prompt + input, 'prompt');
          addOutput(matches.join('  '));
        }
      } else if (parts[0] === 'theme') {
        const matches = terminalThemeNames.filter((themeName) => themeName.startsWith(lastPart.toLowerCase()));

        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setInput(parts.join(' '));
        } else if (matches.length > 1) {
          addOutput(prompt + input, 'prompt');
          addOutput(matches.join('  '), 'system');
        }
      } else {
        // autocomplete paths
        const dir = lastPart.includes('/') ? lastPart.substring(0, lastPart.lastIndexOf('/') + 1) : '';
        const partial = lastPart.includes('/') ? lastPart.substring(lastPart.lastIndexOf('/') + 1) : lastPart;
        const { node } = resolvePath(dir || '.', currentDir);
        if (node?.type === 'dir' && node.children) {
          const matches = Object.keys(node.children).filter((n) => n.startsWith(partial));
          if (matches.length === 1) {
            parts[parts.length - 1] = dir + matches[0];
            setInput(parts.join(' '));
          } else if (matches.length > 1) {
            addOutput(prompt + input, 'prompt');
            addOutput(matches.join('  '));
          }
        }
      }
    }
  };

  const renderLine = (line: TerminalLine, i: number) => {
    let className = 'whitespace-pre-wrap break-all ';
    if (line.type === 'prompt') className += 'text-terminal-blue';
    else if (line.type === 'error') className += 'text-terminal-red';
    else if (line.type === 'system') className += 'text-terminal-yellow';
    else if (line.color === 'green') className += 'text-terminal-green';
    else if (line.color === 'pink') className += 'text-terminal-pink';
    else className += 'text-foreground';

    return (
      <div key={i} className={className}>
        {line.text}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col scanline"
      onClick={() => inputRef.current?.focus()}
      style={terminalThemes[theme].vars as CSSProperties}
      data-theme={theme}
    >
      {/* Title bar */}
      <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Close terminal"
              title="Close terminal"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-destructive inline-block transition-transform hover:scale-110"
            />
            <button
              type="button"
              aria-label="Minimize terminal"
              title="Minimize terminal"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="w-3 h-3 rounded-full bg-[hsl(39,100%,50%)] inline-block transition-transform hover:scale-110"
            />
            <button
              type="button"
              aria-label="Reset to boot screen"
              title="Reset to boot screen"
              onClick={(e) => {
                e.stopPropagation();
                onResetToBoot();
              }}
              className="w-3 h-3 rounded-full bg-primary inline-block transition-transform hover:scale-110"
            />
          </div>
          <span className="text-muted-foreground ml-3">arnab@portfolio: ~</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSwitchToGUI(); }}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          [GUI Mode]
        </button>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed"
      >
        {lines.map(renderLine)}

        {/* Input line */}
        <div className="flex items-center">
          <span className="text-terminal-blue whitespace-pre">{prompt}</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTabSuggestion('');
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-foreground caret-primary"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
