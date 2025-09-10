

import React from "react";

export default function HelpPanel() {
  return (
    <div style={{ background: "linear-gradient(180deg, #0099ff, #00c6ff)", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        .support-header {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: linear-gradient(135deg,#000046, #1cb5e0);
          color: #fff;
          position: sticky;
          top: 0;
          z-index: 999;
        }
        .support-header h2 {
          margin: 0;
          font-size: 24px;
        }
        .support-container {
          display: flex;
          gap: 20px;
          padding: 20px;
          flex-wrap: wrap;
          margin-bottom: 0;
        }
        .support-column {
          flex: 1;
          min-width: 300px;
          background: #fff;
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .support-column h3 {
          margin-top: 0;
          color: #0056b3;
        }
        .support-column ul {
          list-style: none;
          padding: 0;
        }
        .support-column ul li {
          background-color: #f0f8ff;
          padding: 8px;
          margin-bottom: 8px;
          border-radius: 6px;
          font-size: 14px;
        }
        .support-message-card {
          max-width: 700px;
          margin: 24px auto 16px auto;
          background: linear-gradient(135deg,#000046, #1cb5e0);
          border-radius: 22px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
          padding: 32px 24px 24px 24px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .support-message-card h3 {
          margin-top: 0;
          color: #fff;
          margin-bottom: 22px;
          text-align: center;
          letter-spacing: 1px;
        }
        .support-message-card form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row {
          display: flex;
          gap: 12px;
        }
        .form-row input {
          flex: 1;
          margin-bottom: 0;
        }
        .support-message-card textarea {
          resize: vertical;
          min-height: 80px;
          font-size: 15px;
          margin-bottom: 0;
        }
        .support-message-card button {
          background-color: #1cb5e0;
          color: #fff;
          border: none;
          padding: 14px 0;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
        .support-message-card button:hover {
          background-color: #000046;
        }   
                    
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(180deg, #0099ff, #00c6ff);
          }

          /* Sticky Header */
          .support-header {
            display: flex;
              <div className="support-column">
                <h3>Helpline Numbers</h3>
                <ul>
                  <li>🚑 Medical Emergency: <strong>108</strong></li>
                  <li>🚔 Police Helpline: <strong>100</strong></li>
                  <li>🧒 Lost & Found Helpdesk: <strong>1800-123-456</strong></li>
                </ul>
              </div>
              {/* Support Emails */}
              <div className="support-column">
                <h3>Support Emails</h3>
                <ul>
                  <li>📧 General Support: <a href="mailto:support@mahakumbh.in">support@mahakumbh.in</a></li>
                  <li>📧 Safety & Security: <a href="mailto:safety@mahakumbh.in">safety@mahakumbh.in</a></li>
                  <li>📧 Medical Assistance: <a href="mailto:medical@mahakumbh.in">medical@mahakumbh.in</a></li>
                </ul>
              </div>
            margin-bottom: 0;
          }

          /* Columns */
          .support-column {
            flex: 1;
            min-width: 300px;
            background: #fff;
            padding: 15px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }

          .support-column h3 {
            margin-top: 0;
            color: #0056b3;
          }

          /* List Styles */
          .support-column ul {
            list-style: none;
            padding: 0;
          }

          .support-column ul li {
            background-color: #f0f8ff;
            padding: 8px;
            margin-bottom: 8px;
            border-radius: 6px;
            font-size: 14px;
          }
          
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          .support-message-card {
            padding: 14px 4px 12px 4px;
            margin: 16px 4px 8px 4px;
          }
        }
      `}</style>
      {/* Sticky Header */}
      <header className="support-header">
        <h2>🆘 Help & Support</h2>
      </header>
      {/* Main Container */}
      <div className="support-container">
        {/* Helpline Numbers */}
        <div className="support-column">
          <h3>Helpline Numbers</h3>
          <ul>
            <li>🚑 Medical Emergency: <strong>108</strong></li>
            <li>🚔 Police Helpline: <strong>100</strong></li>
            <li>🧒 Lost & Found Helpdesk: <strong>1800-123-456</strong></li>
            <li>🚌 Transport Enquiry: <strong>1800-111-222</strong></li>
            <li>🛠️ Disaster Management: <strong>1070</strong></li>
          </ul>
        </div>
        {/* Support Emails */}
        <div className="support-column">
          <h3>Support Emails</h3>
          <ul>
            <li>📧 General Support: <a href="mailto:support@mahakumbh.in">support@mahakumbh.in</a></li>
            <li>📧 Safety & Security: <a href="mailto:safety@mahakumbh.in">safety@mahakumbh.in</a></li>
            <li>📧 Medical Assistance: <a href="mailto:medical@mahakumbh.in">medical@mahakumbh.in</a></li>
            <li>📧 Lost & Found: <a href="mailto:lostfound@mahakumbh.in">lostfound@mahakumbh.in</a></li>
            <li>📧 Transport Help: <a href="mailto:transport@mahakumbh.in">transport@mahakumbh.in</a></li>
          </ul>
        </div>
      </div>
      <div className="support-message-card" style={{ marginTop: 8, marginBottom: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '16px 12px 12px 12px' }}>
        <h3 style={{ fontSize: 18, marginBottom: 14 }}>Send us a Message</h3>
        <form id="messageForm" onSubmit={e => { e.preventDefault(); alert('Message sent! (demo)'); }}>
          <div className="form-row">
            <input type="text" placeholder="Your Name" required style={{ background: '#f7fbff', color: '#222', border: '1.5px solid #b6d4e9', fontSize: 15, padding: '8px 10px' }} />
            <input type="email" placeholder="Your Email" required style={{ background: '#f7fbff', color: '#222', border: '1.5px solid #b6d4e9', fontSize: 15, padding: '8px 10px' }} />
          </div>
          <textarea placeholder="Type your message..." rows={2} required style={{ background: '#f7fbff', color: '#222', border: '1.5px solid #b6d4e9', fontSize: 15, padding: '8px 10px', minHeight: 36 }} />
          <button type="submit" style={{ background: '#1cb5e0', color: '#fff', fontWeight: 'bold', fontSize: 15, borderRadius: 8, marginTop: 8, width: '100%', boxShadow: '0 2px 8px #1cb5e033', padding: '10px 0' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
