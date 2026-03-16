import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import Terminal from '@/components/Terminal';
import GUIMode from '@/components/GUIMode';

type AppMode = 'boot' | 'terminal' | 'gui';

const Index = () => {
  const [mode, setMode] = useState<AppMode>('boot');

  return (
    <>
      {mode === 'boot' && <BootScreen onComplete={(m) => setMode(m)} />}
      {mode === 'terminal' && <Terminal onSwitchToGUI={() => setMode('gui')} />}
      {mode === 'gui' && <GUIMode onSwitchToTerminal={() => setMode('terminal')} />}
    </>
  );
};

export default Index;
