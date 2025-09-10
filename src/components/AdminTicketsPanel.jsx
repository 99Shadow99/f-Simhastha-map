

import styles from './AdminDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faDownload, faClock, faWifi, faExclamationCircle, faCheckCircle, faHistory, faArrowUp, faChartPie, faChartBar, faExchangeAlt, faList } from '@fortawesome/free-solid-svg-icons';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COMPLAINTS_CONFIG = {
  complaintTypes: [
    'Guidance Issues',
    'Crowd Management',
    'Security Concerns',
    'Medical Help',
    'Cleanliness',
    'Lost & Found'
  ],
  places: [
    'Mangalnath Temple',
    'Ram Ghat',
    'Bade Ganeshji Ka Mandir',
    'Harsiddhi Temple',
    'Mahakaleshwar Temple',
    'Sandipani Ashram',
    'Vikram Kirti Mandir',
    'Kal Bhairav Temple',
    'Chintaman Ganesh Temple',
    'ISKCON Ujjain'
  ],
  chartColors: [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#fbbf24', '#22d3ee', '#6366f1', '#eab308'
  ],
  refreshInterval: 30000 // 30 seconds
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComplaints() {
  const complaints = [];
  for (let i = 1; i <= 500; i++) {
    const type = COMPLAINTS_CONFIG.complaintTypes[randomInt(0, COMPLAINTS_CONFIG.complaintTypes.length - 1)];
    const place = COMPLAINTS_CONFIG.places[randomInt(0, COMPLAINTS_CONFIG.places.length - 1)];
    const status = ['resolved', 'pending', 'urgent'][randomInt(0, 2)];
    complaints.push({
      id: i,
      type,
      place,
      status,
      date: new Date(Date.now() - randomInt(0, 86400000 * 7)),
      priority: status === 'urgent' ? 'high' : status === 'pending' ? 'medium' : 'low'
    });
  }
  return complaints;
}

function getCountsByType(complaints) {
  const counts = {};
  COMPLAINTS_CONFIG.complaintTypes.forEach(type => counts[type] = 0);
  complaints.forEach(c => counts[c.type]++);
  return counts;
}
function getCountsByPlace(complaints) {
  const counts = {};
  COMPLAINTS_CONFIG.places.forEach(place => counts[place] = 0);
  complaints.forEach(c => counts[c.place]++);
  return counts;
}
function getRecentComplaints(complaints, limit = 5) {
  return complaints.sort((a, b) => b.date - a.date).slice(0, limit);
}

export default function AdminTicketsPanel() {
  const [complaints, setComplaints] = useState(generateComplaints());
  useEffect(() => {
    const interval = setInterval(() => {
      setComplaints(generateComplaints());
    }, COMPLAINTS_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, []);

  // Metrics
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const metrics = [
    { icon: faExclamationCircle, label: 'Total Complaints', value: total },
    { icon: faCheckCircle, label: 'Resolved', value: resolved, subtitle: `${((resolved/total)*100).toFixed(1)}% resolution rate` },
    { icon: faClock, label: 'Pending', value: pending, subtitle: `${((pending/total)*100).toFixed(1)}% pending` },
    { logo: true }
  ];
  const categories = Object.entries(getCountsByType(complaints)).map(([name, count]) => ({ name, count }));
  const recent = getRecentComplaints(complaints);

  // Chart Data
  const donutData = {
    labels: COMPLAINTS_CONFIG.complaintTypes,
    datasets: [
      {
        data: COMPLAINTS_CONFIG.complaintTypes.map(type => getCountsByType(complaints)[type]),
        backgroundColor: COMPLAINTS_CONFIG.chartColors,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };
  const donutOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', usePointStyle: true, pointStyle: 'circle', padding: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ef4444',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    animation: { duration: 300, easing: 'easeInOutQuart' },
    maintainAspectRatio: false,
    responsive: true
  };
  const barData = {
    labels: COMPLAINTS_CONFIG.places,
    datasets: [
      {
        label: 'Complaints by Place',
        data: COMPLAINTS_CONFIG.places.map(place => getCountsByPlace(complaints)[place]),
        backgroundColor: COMPLAINTS_CONFIG.chartColors.slice(0, COMPLAINTS_CONFIG.places.length),
        borderColor: COMPLAINTS_CONFIG.chartColors.slice(0, COMPLAINTS_CONFIG.places.length),
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };
  const barOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ef4444',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        ticks: { color: '#cbd5e1', maxRotation: 45, minRotation: 45 },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    },
    animation: { duration: 300, easing: 'easeInOutQuart' },
    maintainAspectRatio: false,
    responsive: true
  };


  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={`${styles.header} ${styles['complaints-header']}`}> 
        <div className={styles['header-content']}>
          <div className={styles['title-section']}>
            <h1 className={styles.title} style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              UJJAIN SUPPORT COMPLAINTS
            </h1>
            <p className={styles.subtitle} style={{ color: '#e2e8f0', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              Real-time Complaints Monitoring & Analytics
            </p>
          </div>
          <div className={styles.controls}>
            <div className={styles['control-group']}>
              <button className={`${styles.btn} ${styles['btn-primary']}`} aria-label="Refresh data">
                <FontAwesomeIcon icon={faSyncAlt} /> Refresh
              </button>
              <button className={`${styles.btn} ${styles['btn-secondary']}`} aria-label="Export data">
                <FontAwesomeIcon icon={faDownload} /> Export
              </button>
            </div>
            <div className={styles['status-info']}>
              <div className={styles['refresh-time']}>
                <FontAwesomeIcon icon={faClock} /> Last refresh: --
              </div>
              <div className={styles['connection-status']}>
                <FontAwesomeIcon icon={faWifi} /> Connected
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Key Metrics Section */}
      <section className={styles['metrics-section']}>
        {metrics.map((m, i) => m.logo ? (
          <div className={`${styles['metric-card']} ${styles['logo-card']}`} key={i}>
            <img src="WhatsApp Image 2025-09-09 at 23.54.36_3aa1de83.jpg" alt="Mahakumbh Logo" className={styles['logo-image']} />
          </div>
        ) : (
          <div className={`${styles['metric-card']} ${styles.primary}`} key={i}>
            <div className={styles['metric-icon']}>
              <FontAwesomeIcon icon={m.icon} />
            </div>
            <div className={styles['metric-content']}>
              <h3>{m.label}</h3>
              <div className={styles['metric-value']}>{m.value}</div>
              {m.change && (
                <div className={styles['metric-change']}>
                  <FontAwesomeIcon icon={faArrowUp} /> <span>{m.change}</span>
                </div>
              )}
              {m.subtitle && <div className={styles['metric-subtitle']}>{m.subtitle}</div>}
            </div>
          </div>
        ))}
      </section>

      {/* Main Charts Section */}
      <section className={styles['dashboard-grid']}>
        <div className={styles['dashboard-left']}>
          {/* Complaints by Type Chart */}
          <section className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faChartPie} /> Complaints by Type</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Switch chart type">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
            </div>
            <div className={styles['chart-container']} style={{ minHeight: 250 }}>
              <Doughnut data={donutData} options={donutOptions} height={200} />
            </div>
          </section>
        </div>
        <div className={styles['dashboard-right']}>
          {/* Complaints by Place Chart */}
          <section className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faChartBar} /> Complaints by Place</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Switch chart type">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
            </div>
            <div className={styles['chart-container']} style={{ minHeight: 250 }}>
              <Bar data={barData} options={barOptions} height={200} />
            </div>
          </section>
        </div>
      </section>

      {/* Bottom Section */}
        <section className={styles['complaints-bottom']} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Complaint Types List - left */}
          <div className={styles['complaintTypes']} style={{ maxWidth: 340, minWidth: 260 }}>
            <h3 className={styles['complaintTypesTitle']}><FontAwesomeIcon icon={faList} /> Complaint Categories</h3>
            <ul className={styles['complaintTypeList']}>
              {categories.map((c, i) => (
                <li key={i} className={styles['complaintTypeItem']}>
                  <span className={styles['complaintTypeName']}>{c.name}</span>
                  <span className={styles['complaintTypeCount']}>{c.count}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Recent Complaints - right */}
          <div className={styles['chart-section']} style={{ flex: 1 }}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faHistory} /> Recent Activity</h3>
            </div>
            <div className={styles['table-container']}>
              <div className={styles['table-wrapper']}>
                <table className={styles['data-table']}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Place</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r, i) => (
                      <tr key={i}>
                        <td>{r.id}</td>
                        <td>{r.type}</td>
                        <td>{r.place}</td>
                        <td><span className={`${styles['status-badge']} ${styles[r.status.toLowerCase()]}`}>{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      {/* Loading Overlay */}
      <div className={styles['loading-overlay']}>
        <div className={styles['loading-spinner']}>
          <FontAwesomeIcon icon={faSyncAlt} spin />
          <p>Loading complaints data...</p>
        </div>
      </div>
    </div>
  );
}
