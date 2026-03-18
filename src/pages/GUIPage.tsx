import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GUIMode, { type Section } from '@/components/GUIMode';

const PATH_TO_SECTION: Record<string, Section> = {
  '/home':     'Home',
  '/about':    'About',
  '/projects': 'Projects',
  '/resume':   'Resume',
  '/skills':   'Skills',
  '/contact':  'Contact',
};

const GUIPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [showMinimized, setShowMinimized] = useState(false);

  // Sync minimized-terminal badge from sessionStorage on every navigation
  useEffect(() => {
    setShowMinimized(sessionStorage.getItem('terminalMinimized') === 'true');
  }, [location.pathname]);

  const activeSection: Section = PATH_TO_SECTION[location.pathname] ?? 'Home';

  const handleSectionChange = (s: Section) => {
    navigate(`/${s.toLowerCase()}`);
  };

  const handleSwitchToTerminal = () => {
    sessionStorage.removeItem('terminalMinimized');
    navigate('/terminal');
  };

  return (
    <GUIMode
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      onSwitchToTerminal={handleSwitchToTerminal}
      showMinimizedTerminalTab={showMinimized}
    />
  );
};

export default GUIPage;
