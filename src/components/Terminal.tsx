import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { resolvePath, getTree, filesystem, FSNode } from '@/data/filesystem';

interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'system';
  text: string;
  color?: string;
}

interface TerminalProps {
  onSwitchToGUI: () => void;
}

const NEOFETCH = `
  \x1b[green]    ___                    __     \x1b[reset]  arnab@portfolio
  \x1b[green]   /   |  _________  ____ / /_    \x1b[reset]  ─────────────────
  \x1b[green]  / /| | / ___/ __ \\/ __ '/ __ \\  \x1b[reset]  OS: ArnabOS v1.0
  \x1b[green] / ___ |/ /  / / / / /_/ / /_/ /  \x1b[reset]  Shell: arnab-sh
  \x1b[green]/_/  |_/_/  /_/ /_/\\__,_/_.___/   \x1b[reset]  Terminal: web-term
  \x1b[reset]                                    Uptime: since you arrived
                                     Packages: projects(3)
                                     Theme: hacker-dark
`;

const HELP_TEXT = `
Available commands:

  Navigation
  ──────────
  ls              List directory contents
  cd <dir>        Change directory
  pwd             Print working directory
  tree            Show directory tree
  clear           Clear terminal

  File Viewing
  ──────────
  cat <file>      Display file contents

  System
  ──────────
  help            Show this help message
  whoami          Display user info
  neofetch        System information
  history         Command history

  Portfolio
  ──────────
  projects        List all projects
  resume          Show resume
  skills          Display skills
  contact         Show contact info
  socials         Show social links

  Other
  ──────────
  gui             Switch to GUI mode
  theme <name>    Change theme (green/pink/hacker)
  sudo hire-arnab 😏
`;

const Terminal = ({ onSwitchToGUI }: TerminalProps) => {
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
          addOutput(NEOFETCH, 'output', 'green');
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
          addOutput(`Skills
══════

Programming:
  • Python
  • JavaScript
  • PowerShell
  • TypeScript

Infrastructure:
  • VMware vSphere
  • Windows Server
  • Active Directory
  • Linux

Automation & Tools:
  • PowerCLI
  • Ansible
  • Docker
  • Terraform
  • Git`);
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
→ arnab@email.com`, 'output', 'pink');
          } else {
            addOutput(`sudo: command not found: ${args.join(' ')}`, 'error');
          }
          break;

        case 'matrix':
          addOutput('🟩 Entering the Matrix... (just kidding, this is a portfolio)', 'system');
          break;

        case 'theme':
          if (args[0] === 'green' || args[0] === 'pink' || args[0] === 'hacker') {
            addOutput(`Theme set to: ${args[0]}`, 'system');
          } else {
            addOutput('Available themes: green, pink, hacker', 'system');
          }
          break;

        default:
          addOutput(`command not found: ${command}. Type "help" for available commands.`, 'error');
      }
    },
    [currentDir, commandHistory, addOutput, prompt, onSwitchToGUI]
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
    >
      {/* Title bar */}
      <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive inline-block" />
            <span className="w-3 h-3 rounded-full bg-[hsl(39,100%,50%)] inline-block" />
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
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
