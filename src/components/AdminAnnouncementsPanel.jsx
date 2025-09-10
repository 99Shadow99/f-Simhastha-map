

import React, { useState } from 'react';

const initialNearYou = [
  "🚧 Kalideh Road temporarily closed for crowd management (10 AM–2 PM)",
  "⚠️ Heavy crowd near Ramghat, please use alternate route",
  "✅ Free medical camp set up near Mahakal Temple",
  "🚌 Shuttle service from Railway Station increased to every 10 minutes",
  "🚧 Approach road to Mangalnath Temple under maintenance, expect delay",
  "💧 Drinking water kiosk opened near Kal Bhairav Mandir",
  "🛑 Vehicle parking full at Nanukheda, use Kothi Road parking",
  "🩺 Emergency helpline 108 active in your area",
  "⚠️ Security check ongoing at Mahakal Gate No.2",
  "🚧 Road closure near Harsiddhi Mandir 3–5 PM",
  "✅ Lost & Found helpdesk near Ramghat main entry",
  "🚌 Additional buses to Free Camp from Bus Stand",
  "⚠️ Heavy footfall near Shipra River Bank, caution advised",
  "💧 Mobile drinking water van stationed at Triveni Ghat",
  "🛑 Parking restriction near Kalideh Road till evening",
  "🚧 Barricading near Gopal Mandir for crowd management",
  "✅ Volunteer information desk near Tower Chowk",
  "🩺 First-aid booth available at Harsiddhi Square",
];

const initialAllAnnouncements = [
  "🚌 Special shuttle buses running every 15 min from Railway Station",
  "💧 Drinking water kiosks available near major ghats",
  "🛑 Parking at Kothi Road full, please park at Nanukheda ground",
  "🩺 Emergency helpline: 108 | Lost & Found helpdesk: near main entrance",
  "⚠️ Crowd expected at Ramghat 4–6 PM",
  "🚧 Bridge towards Mangalnath Temple closed for maintenance",
  "✅ Free Wi-Fi zone active at Mahakal Temple area",
  "🚌 New shuttle route opened from Bus Stand to Mahakal Mandir",
  "🛑 Two-wheeler parking restricted near Triveni Ghat",
  "💧 Water bottles available at subsidised rates at kiosks",
  "🚧 Diversion via Freeganj Square due to rally",
  "⚠️ Checkpoint security increased at all entry points",
  "🩺 Temporary medical unit opened near Kal Bhairav Mandir",
  "🚌 Free electric rickshaws for senior citizens",
  "✅ Volunteer support counter at Railway Station exit",
  "🚧 Barricading near Mahakal Bypass 5–8 PM",
  "⚠️ High footfall at Harsiddhi Mandir, plan visit accordingly",
  "💧 Mobile drinking water van at Tower Chowk",
  "🛑 Vehicles above 4-wheelers restricted near Gopal Mandir road",
  "✅ Public information centre at Nanukheda bus stand",
];

export default function AdminAnnouncementsPanel() {
  const [nearYou, setNearYou] = useState(initialNearYou);
  const [allAnnouncements, setAllAnnouncements] = useState(initialAllAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      setAllAnnouncements([newAnnouncement, ...allAnnouncements]);
      setNewAnnouncement('');
      setShowModal(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg,#c4e1e5, #d2e3e6)", minHeight: "100vh", color: "#333" }}>
      <style>{`
        .announcements-section {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 15px;
        }
        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: white;
        }
        .cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .card {
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          padding: 20px;
          max-height: 600px;
          overflow-y: auto;
        }
        .card h2 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #003366;
        }
        .card ul {
          list-style: none;
        }
        .announcement-item {
          background: linear-gradient(90deg, rgba(0, 50, 120, 0.05) 0%, rgba(0, 120, 200, 0.05) 100%);
          border-left: 6px solid #0056b3;
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s ease;
        }
        .announcement-item:hover {
          background: linear-gradient(90deg, rgba(0, 50, 120, 0.1) 0%, rgba(0, 120, 200, 0.1) 100%);
        }
        .announcements-nav {
          width: 100%;
          height: 50px;
          background: linear-gradient(135deg,#000046, #1cb5e0);
          display: flex;
          align-items: center;
          justify-content: center;
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
      <nav className="announcements-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 24 }}>
        <h1 className="section-title" style={{ margin: 0 }}>Announcements</h1>
        <button className="add-alert-btn" id="addAlertBtn" title="Add New Announcement" onClick={() => setShowModal(true)} style={{ marginLeft: 'auto' }}>+</button>
      </nav>

      {/* Modal for adding announcement */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddAnnouncement} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,50,120,0.18)', padding: 32, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h3 style={{ margin: 0, color: '#0056b3', fontWeight: 700 }}>Add New Announcement</h3>
            <input
              type="text"
              value={newAnnouncement}
              onChange={e => setNewAnnouncement(e.target.value)}
              placeholder="Enter announcement message..."
              style={{ fontSize: 16, padding: 10, borderRadius: 8, border: '1px solid #0056b3', marginBottom: 8 }}
              autoFocus
              required
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" style={{ background: '#eee', color: '#0056b3', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" style={{ background: '#0056b3', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
            </div>
          </form>
        </div>
      )}
      <section className="announcements-section">
        <div className="cards-container">
          <div className="card">
            <h2>Announcements Near You</h2>
            <ul>
              {nearYou.map((msg, i) => (
                <li className="announcement-item" key={i}>{msg}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2>All Announcements</h2>
            <ul>
              {allAnnouncements.map((msg, i) => (
                <li className="announcement-item" key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
