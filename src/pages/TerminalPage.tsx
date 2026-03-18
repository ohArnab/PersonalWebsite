import { useNavigate } from 'react-router-dom';
import Terminal from '@/components/Terminal';

const TerminalPage = () => {
  const navigate = useNavigate();

  const handleMinimize = () => {
    sessionStorage.setItem('terminalMinimized', 'true');
    navigate('/home');
  };

  const handleRestoreFromMinimized = () => {
    sessionStorage.removeItem('terminalMinimized');
  };

  return (
    <Terminal
      onSwitchToGUI={() => navigate('/home')}
      onClose={() => { sessionStorage.removeItem('terminalMinimized'); navigate('/home'); }}
      onMinimize={handleMinimize}
      onResetToBoot={() => { sessionStorage.removeItem('terminalMinimized'); navigate('/'); }}
    />
  );
};

export default TerminalPage;
