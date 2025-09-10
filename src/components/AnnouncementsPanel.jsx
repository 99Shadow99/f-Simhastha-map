

import React from "react";

const nearYou = [
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

const allAnnouncements = [
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

export default function AnnouncementsPanel() {
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
          color: #002147;
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
      `}</style>
      <nav className="announcements-nav">
        <h1 className="section-title">Announcements</h1>
      </nav>
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
