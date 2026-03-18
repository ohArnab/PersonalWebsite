import { useState, useEffect, useCallback } from 'react';
import AsciiCube from './AsciiCube';

const bootMessages = [
  { text: 'Booting ArnabOS v1.0...', delay: 0 },
  { text: '', delay: 200 },
  { text: 'Initializing system modules...', delay: 400 },
  { text: 'Loading kernel...', delay: 800 },
  { text: 'Mounting /projects', delay: 1200 },
  { text: 'Mounting /photos', delay: 1400 },
  { text: 'Mounting /resume', delay: 1600 },
  { text: '', delay: 1800 },
  { text: 'Starting terminal service...', delay: 2000 },
  { text: '[  OK  ] All systems operational.', delay: 2400, color: 'green' },
];

interface BootScreenProps {
  onComplete: (mode: 'terminal' | 'gui') => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootMessages.forEach((msg, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          if (i === bootMessages.length - 1) {
            setTimeout(() => setBootDone(true), 400);
          }
        }, msg.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (bootDone && e.key === 'Enter') {
        onComplete('terminal');
      }
    },
    [bootDone, onComplete]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 scanline">
      <div className="max-w-2xl w-full space-y-6">
        {!bootDone && (
          <div className="flex justify-center mb-8">
            <AsciiCube />
          </div>
        )}

        <div className="space-y-1 text-sm">
          {bootMessages.slice(0, visibleLines).map((msg, i) => (
            <div
              key={i}
              className={`boot-line font-mono ${
                msg.color === 'green' ? 'text-terminal-green' : 'text-foreground'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {msg.text || '\u00A0'}
            </div>
          ))}
        </div>

        {bootDone && (
          <div className="mt-8 space-y-3 animate-[boot-line_0.3s_ease-out_forwards]">
            <div className="border border-border p-4 rounded-sm space-y-3">
              <button
                onClick={() => onComplete('terminal')}
                className="w-full text-left px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm text-sm"
              >
                <span className="text-terminal-green mr-2">▸</span>
                Press ENTER to open Terminal
              </button>
              <button
                onClick={() => onComplete('gui')}
                className="w-full text-left px-4 py-2 bg-muted hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-sm text-sm"
              >
                <span className="text-terminal-pink mr-2">▸</span>
                Click here for GUI Mode
              </button>
            </div>
            <p className="text-muted-foreground text-xs text-center">
              arnab@portfolio ~ system ready
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootScreen;
