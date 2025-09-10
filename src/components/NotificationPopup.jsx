import React, { useEffect } from 'react';

export default function NotificationPopup({ message, type = 'info', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bg = type === 'alert' ? '#dc2626' : type === 'announcement' ? '#2563eb' : '#334155';
  const icon = type === 'alert' ? '🚨' : type === 'announcement' ? '📢' : '🔔';

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: bg,
      color: '#fff',
      borderRadius: 12,
      boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
      padding: '18px 32px',
      fontWeight: 700,
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      minWidth: 260,
      maxWidth: '90vw',
      textAlign: 'center',
      letterSpacing: 0.5,
      cursor: 'pointer',
      border: '2px solid #fff',
      animation: 'fadeInOut 0.4s',
    }}
    onClick={onClose}
    >
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
    </div>
  );
}
