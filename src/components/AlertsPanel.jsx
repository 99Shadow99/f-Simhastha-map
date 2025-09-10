
import React from "react";

const nearbyAlerts = [
  "🚨 High crowd density at Ramghat",
  "⚠️ Narrow lane at Kalideh Road",
  "🚧 Temporary barricade near Mangalnath Temple",
  "🅿️ Vehicle parking full at Nanukheda Ground",
];

const allAlerts = [
  "🚨 Stampede risk at Shipra River Bank",
  "⚠️ Sudden heavy rain expected in next 1 hour",
  "🚧 Road closure Harsiddhi Mandir lane 3–5 PM",
  "🧒 Lost child reported near Mahakal Temple",
  "🔥 Fire safety check at Tower Chowk",
  "🔊 High noise level – processions arriving Freeganj Square",
  "🏥 Medical emergency at Kal Bhairav Mandir",
  "🚲 Two-wheeler movement restricted on bridge Mangalnath",
];

export default function AlertsPanel() {
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
          
      `}</style>

      {/* Sticky Navbar */}
      <header className="alerts-header">
        <h2>🚨 Alerts</h2>
      </header>

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
