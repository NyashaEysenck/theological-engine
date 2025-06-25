import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { apiClient } from '../../utils/apiClient';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const isHealthy = await apiClient.healthCheck();
        setBackendStatus(isHealthy ? 'connected' : 'disconnected');
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };

    // Check backend status on mount
    checkBackendStatus();

    // Check backend status every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      checkBackendStatus();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setBackendStatus('disconnected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Show status when offline or backend is disconnected
    const shouldShow = !isOnline || backendStatus === 'disconnected';
    setShowStatus(shouldShow);
  }, [isOnline, backendStatus]);

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="h-4 w-4" />,
        text: 'Offline - Using cached data',
        bgColor: 'bg-red-500',
        textColor: 'text-white'
      };
    }
    
    if (backendStatus === 'disconnected') {
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        text: 'Backend unavailable - Using local data',
        bgColor: 'bg-yellow-500',
        textColor: 'text-white'
      };
    }
    
    return {
      icon: <Wifi className="h-4 w-4" />,
      text: 'Connected',
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div className={`${statusInfo.bgColor} ${statusInfo.textColor} px-4 py-2 rounded-full shadow-medium flex items-center space-x-2 text-sm font-medium`}>
            {statusInfo.icon}
            <span>{statusInfo.text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectionStatus;