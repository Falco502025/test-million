import { useState, useCallback } from 'react';
import { AlertColor } from '@mui/material';

interface Alert {
  message: string;
  severity: AlertColor;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = useCallback((message: string, severity: AlertColor = 'info') => {
    setAlert({ message, severity });
    // Auto-dismiss after 6 seconds
    const timer = setTimeout(() => setAlert(null), 6000);
    return () => clearTimeout(timer);
  }, []);

  const hideAlert = useCallback(() => setAlert(null), []);

  return { alert, showAlert, hideAlert };
};
