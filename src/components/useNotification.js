import { useState, useCallback } from 'react';

// Hook for managing notification popup state
export default function useNotification() {
  const [notification, setNotification] = useState(null);

  // Show notification with message and type
  const showNotification = useCallback((message, type = 'info', duration = 3500) => {
    setNotification({ message, type, duration });
  }, []);

  // Hide notification
  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return { notification, showNotification, hideNotification };
}
