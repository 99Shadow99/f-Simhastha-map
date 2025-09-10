import React from 'react';

export default function BottomNav({ active, setActive }) {
  const navItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'announcements', label: 'Announcements', icon: '📢' },
    { key: 'alerts', label: 'Alerts', icon: '🚨' },
    { key: 'help', label: 'Help', icon: '❓' }
  ];
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      background: '#fff',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 64,
      zIndex: 3000
    }}>
      {navItems.map(item => (
        <button
          key={item.key}
          onClick={() => setActive(item.key)}
          style={{
            background: active === item.key ? '#2563eb' : 'transparent',
            color: active === item.key ? '#fff' : '#374151',
            border: 'none',
            borderRadius: 12,
            padding: '8px 18px',
            fontSize: 22,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <span>{item.icon}</span>
          <span style={{ fontSize: 13 }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
