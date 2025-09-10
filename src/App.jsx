import { useState, useEffect } from 'react';
// ...existing code...
import ErrorBoundary from './components/ErrorBoundary';
import AdminLogin from './components/AdminLogin';

import DynamicRoadRouting from './components/DynamicRoadRouting';
import AnnouncementsPanel from './components/AnnouncementsPanel';
import AlertsPanel from './components/AlertsPanel';
import HelpPanel from './components/HelpPanel';
// import BottomNav from './components/BottomNav';

import { MapContainer, TileLayer, useMapEvents, Circle, Popup } from 'react-leaflet';
import AdminDashboard from './components/AdminDashboard';
import AdminAnnouncementsPanel from './components/AdminAnnouncementsPanel';
import AdminAlertsPanel from './components/AdminAlertsPanel';
import AdminTicketsPanel from './components/AdminTicketsPanel';
import AdminMap from './components/AdminMap';




// ...existing code...

function AdminPage() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Admin Dashboard</h2>
      <AdminMap />
    </div>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activePanel, setActivePanel] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Ensure correct panel when switching modes
  const handleModeSwitch = () => {
    if (!isAdmin) {
      setIsAdmin(true);
      setActivePanel('dashboard');
    } else {
      setIsAdmin(false);
      setActivePanel('home');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb', width: '100vw', overflow: 'hidden' }}>
      <Sidebar isAdmin={isAdmin} setIsAdmin={handleModeSwitch} activePanel={activePanel} setActivePanel={setActivePanel} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div style={{ flex: 1, minHeight: '100vh', height: '100vh', display: 'flex', background: '#fff', position: 'relative' }}>
        <PanelContent activePanel={activePanel} isAdmin={isAdmin} sidebarCollapsed={sidebarCollapsed} />
      </div>
    </div>
  );

function Sidebar({ isAdmin, setIsAdmin, activePanel, setActivePanel, sidebarCollapsed, setSidebarCollapsed }) {
  const userPanels = [
    { key: 'home', icon: '🏠', label: 'Home (Map)' },
    { key: 'announcements', icon: '📢', label: 'Announcements' },
    { key: 'alerts', icon: '🚨', label: 'Alerts' },
    { key: 'help', icon: '❓', label: 'Help & Support' }
  ];
  const adminPanels = [
    { key: 'dashboard', icon: '📊', label: 'Dashboard' },
    { key: 'map', icon: '🗺️', label: 'Live Map' },
    { key: 'announcements', icon: '📢', label: 'Announcements' },
    { key: 'alerts', icon: '🚨', label: 'Alerts Management' },
    { key: 'tickets', icon: '❓', label: 'Help & Support' }
  ];
  const panels = isAdmin ? adminPanels : userPanels;
  const sidebarWidth = sidebarCollapsed ? 60 : 180;
  return (
    <div style={{
      width: sidebarWidth,
      background: '#e0e7ef',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 8px rgba(0,0,0,0.07)',
      padding: 0,
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 2000,
      transition: 'width 0.2s',
      alignItems: 'stretch',
      overflow: 'hidden',
    }}>
      {/* Toggle at very top, always left-aligned */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 48, borderBottom: '1px solid #d1d5db', background: 'inherit' }}>
        <button
          onClick={() => setSidebarCollapsed(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: '#2563eb',
            cursor: 'pointer',
            marginLeft: 12,
            marginRight: 0,
            transition: 'all 0.2s',
            padding: 0,
            height: 40,
            width: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? '☰' : '✕'}
        </button>
      </div>
      {/* Heading below toggle, never overlaps */}
      <div style={{
        fontWeight: 700,
        fontSize: sidebarCollapsed ? 15 : 18,
        textAlign: 'center',
        margin: sidebarCollapsed ? '10px 0 10px 0' : '18px 0 18px 0',
        letterSpacing: 1,
        color: '#2563eb',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        minHeight: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {!sidebarCollapsed && 'Simhastha Map'}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
        {panels.map(panel => (
          <button
            key={panel.key}
            style={{
              background: activePanel === panel.key ? '#2563eb' : 'transparent',
              color: activePanel === panel.key ? 'white' : '#1f2937',
              border: activePanel === panel.key ? '2px solid #2563eb' : 'none',
              borderRadius: 8,
              padding: sidebarCollapsed ? '10px 0' : '10px 12px',
              margin: '0 6px 8px 6px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: activePanel === panel.key ? '0 2px 12px rgba(37,99,235,0.13)' : 'none',
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'center',
              gap: sidebarCollapsed ? 0 : 8,
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              textAlign: 'left',
              width: 'calc(100% - 12px)',
              minWidth: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onClick={() => setActivePanel(panel.key)}
          >
            <span style={{ fontSize: 20, display: 'inline-block', width: 24, textAlign: 'center' }}>{panel.icon}</span>
            {!sidebarCollapsed && <span style={{ marginLeft: 8, overflow: 'hidden', textOverflow: 'ellipsis' }}>{panel.label}</span>}
          </button>
        ))}
      </div>
      <div style={{ flexShrink: 0, marginBottom: 10 }}>
        <button
          style={{
            background: isAdmin ? '#059669' : '#f59e42',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: sidebarCollapsed ? '10px 0' : '10px 12px',
            margin: '0 6px 10px 6px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(5,150,105,0.13)',
            transition: 'all 0.18s',
            width: 'calc(100% - 12px)',
            minWidth: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {!sidebarCollapsed && (isAdmin ? 'Switch to User' : 'Switch to Admin')}
          {sidebarCollapsed && (isAdmin ? '👤' : '🧑‍💼')}
        </button>
      </div>
    </div>
  );
}

function PanelContent({ activePanel, isAdmin, sidebarCollapsed }) {
  const contentStyle = {
    padding: 0,
    width: '100%',
    boxSizing: 'border-box',
    flex: 1,
    minHeight: '100vh',
    background: '#fff',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginLeft: sidebarCollapsed ? 60 : 180
  };
  if (isAdmin) {
    if (activePanel === 'dashboard') return <div style={contentStyle}><AdminDashboard /></div>;
    if (activePanel === 'map') return <div style={contentStyle}><AdminMap /></div>;
    if (activePanel === 'announcements') return <div style={contentStyle}><AdminAnnouncementsPanel /></div>;
    if (activePanel === 'alerts') return <div style={contentStyle}><AdminAlertsPanel /></div>;
    if (activePanel === 'tickets') return <div style={contentStyle}><AdminTicketsPanel panelLabel="Help & Support" /></div>;
    return <div style={contentStyle}>Admin Panel</div>;
  } else {
    if (activePanel === 'home') return (
      <div style={contentStyle}>
        <DynamicRoadRouting />
      </div>
    );
    if (activePanel === 'announcements') return (
      <div style={contentStyle}>
        <AnnouncementsPanel />
      </div>
    );
    if (activePanel === 'alerts') return (
      <div style={contentStyle}>
        <AlertsPanel />
      </div>
    );
    if (activePanel === 'help') return (
      <div style={contentStyle}>
        <HelpPanel />
      </div>
    );
    // Fallback: show nothing for other panels
    return null;
  }
}
}

export default App;
