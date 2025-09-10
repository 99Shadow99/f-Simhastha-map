

import React, { useState } from 'react';

const initialNearbyAlerts = [
  "🚨 High crowd density at Ramghat",
  "⚠️ Narrow lane at Kalideh Road",
  "🚧 Temporary barricade near Mangalnath Temple",
  "🅿️ Vehicle parking full at Nanukheda Ground",
];

const initialAllAlerts = [
  "🚨 Stampede risk at Shipra River Bank",
  "⚠️ Sudden heavy rain expected in next 1 hour",
  "🚧 Road closure Harsiddhi Mandir lane 3–5 PM",
  "🧒 Lost child reported near Mahakal Temple",
  "🔥 Fire safety check at Tower Chowk",
  "🔊 High noise level – processions arriving Freeganj Square",
  "🏥 Medical emergency at Kal Bhairav Mandir",
  "🚲 Two-wheeler movement restricted on bridge Mangalnath",
];

export default function AdminAlertsPanel() {
  const [nearbyAlerts, setNearbyAlerts] = useState(initialNearbyAlerts);
  const [allAlerts, setAllAlerts] = useState(initialAllAlerts);
  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState('');

  const handleAddAlert = (e) => {
    e.preventDefault();
    if (newAlert.trim()) {
      setAllAlerts([newAlert, ...allAlerts]);
      setNewAlert('');
      setShowModal(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(180deg, #FDEBD0 0%, #fff 100%)", minHeight: "100vh", margin: 0, fontFamily: "Arial, sans-serif" }}>
      {/* Inline CSS for demo, move to CSS file for production */}
      <style>{`
        .alerts-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background-color: #DC143C;
          position: sticky;
          top: 0;
          z-index: 999;
        }
        .alerts-header h2 {
          margin: 0;
          font-size: 24px;
          color: #fff;
          display: flex;
          align-items: center;
        }
        .alerts-container {
          display: flex;
          gap: 20px;
          padding: 20px;
          flex-wrap: wrap;
        }
        .alerts-column {
          flex: 1;
          min-width: 300px;
          background: #fff;
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(220,20,60,0.08);
          max-height: 500px;
          overflow-y: auto;
        }
        .alerts-column h3 {
          margin-top: 0;
          color: #DC143C;
        }
        .alert-card {
          background-color: #F7CAC9;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          font-size: 14px;
          border-left: 5px solid #F75270;
        }
          .add-alert-btn {
  background-color: #007bff; /* blue color */
  color: #fff;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}


      `}</style>

      {/* Sticky Navbar */}
      <header className="alerts-header">
        <h2>🚨 Alerts</h2>
        <button className="add-alert-btn" id="addAlertBtn" title="Add New Alert" onClick={() => setShowModal(true)}>+</button>
      </header>

      {/* Modal for adding alert */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddAlert} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(220,20,60,0.18)', padding: 32, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h3 style={{ margin: 0, color: '#DC143C', fontWeight: 700 }}>Add New Alert</h3>
            <input
              type="text"
              value={newAlert}
              onChange={e => setNewAlert(e.target.value)}
              placeholder="Enter alert message..."
              style={{ fontSize: 16, padding: 10, borderRadius: 8, border: '1px solid #F75270', marginBottom: 8 }}
              autoFocus
              required
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" style={{ background: '#eee', color: '#DC143C', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" style={{ background: '#DC143C', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
            </div>
          </form>
        </div>
      )}

      {/* Alerts Section */}
      <div className="alerts-container">
        <div className="alerts-column">
          <h3>Nearby Alerts</h3>
          {nearbyAlerts.map((msg, i) => (
            <div className="alert-card" key={i}>{msg}</div>
          ))}
        </div>
        <div className="alerts-column">
          <h3>All Alerts</h3>
          {allAlerts.map((msg, i) => (
            <div className="alert-card" key={i}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
