import { useNavigate } from 'react-router-dom';
import BootScreen from '@/components/BootScreen';

const Index = () => {
  const navigate = useNavigate();

  return (
    <BootScreen
      onComplete={(nextMode) => {
        if (nextMode === 'terminal') {
          navigate('/terminal');
        } else {
          navigate('/home');
        }
      }}
    />
  );
};

export default Index;
