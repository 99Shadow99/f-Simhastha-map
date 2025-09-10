import React, { useState } from 'react';
// Error boundary for Chart.js charts
class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: 'red', padding: '1rem'}}>Chart failed to load. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}
import styles from './AdminDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faSyncAlt, faDownload, faCog, faClock, faWifi, faUsers, faMapMarkerAlt, faChartLine, faChartBar, faExchangeAlt, faExpand, faLayerGroup, faMap, faChartPie, faTable, faArrowUp, faArrowDown, faTimes, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);
// Chart.js and React-Leaflet imports would go here for full integration
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  // ===== CONFIGURATION =====
  const CONFIG = {
    places: [
      "Mahakaleshwar Temple",
      "Kal Bhairav Temple",
      "Harsiddhi Temple",
      "Ram Ghat",
      "Bade Ganeshji Ka Mandir",
      "Chintaman Ganesh Temple",
      "Vikram Kirti Mandir",
      "Sandipani Ashram",
      "Mangalnath Temple",
      "ISKCON Ujjain"
    ],
    timeSlots: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    refreshInterval: 60000, // 1 minute
    animationDuration: 300,
    mapCenter: [23.18, 75.78],
    mapZoom: 13,
    maxUsers: 200,
    chartColors: [
      "#6366f1", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444",
      "#3b82f6", "#f97316", "#84cc16", "#ec4899", "#06b6d4"
    ]
  };
  // Demo bar chart data
  const barData = {
    labels: CONFIG.places,
    datasets: [
      {
        label: "Users",
        data: CONFIG.places.map(() => Math.floor(Math.random() * CONFIG.maxUsers)),
        backgroundColor: CONFIG.chartColors,
      },
    ],
  };
  // Demo doughnut chart data
  const doughnutData = {
    labels: CONFIG.places.slice(0, 5),
    datasets: [
      {
        label: "Breakdown",
        data: CONFIG.places.slice(0, 5).map(() => Math.floor(Math.random() * CONFIG.maxUsers)),
        backgroundColor: CONFIG.chartColors.slice(0, 5),
      },
    ],
  };
  // Demo state for modal and loading overlay
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Demo stats
  const stats = {
    users: 1200,
    locations: 10,
    peak: 1400,
    peakTime: '6 PM',
    tickets: 8,
    crowdZones: 14,
    alerts: 2
  };

  // Demo chart data
  const chartData = {
    labels: CONFIG.timeSlots,
    datasets: [
      {
        label: "Population",
        data: CONFIG.timeSlots.map(() => Math.floor(Math.random() * CONFIG.maxUsers)),
        fill: false,
        backgroundColor: CONFIG.chartColors[0],
        borderColor: CONFIG.chartColors[0],
        tension: 0.4,
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Population Analytics" }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // Demo map position
  const mapCenter = CONFIG.mapCenter;
  const mapZoom = CONFIG.mapZoom;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles['title-section']}>
            <h1 className={styles.title}>
              <FontAwesomeIcon icon={faLandmark} />
              UJJAIN MAHAKUMBH DASHBOARD
            </h1>
            <p className={styles.subtitle}>Real-time Monitoring & Analytics</p>
          </div>
          <div className={styles.controls}>
            <div className={styles['control-group']}>
              <button className={styles['btn'] + ' ' + styles['btn-primary']} aria-label="Refresh data">
                <FontAwesomeIcon icon={faSyncAlt} /> Refresh
              </button>
              <button className={styles['btn'] + ' ' + styles['btn-secondary']} aria-label="Export data">
                <FontAwesomeIcon icon={faDownload} /> Export
              </button>
              <button className={styles['btn'] + ' ' + styles['btn-secondary']} aria-label="Settings" onClick={() => setSettingsOpen(true)}>
                <FontAwesomeIcon icon={faCog} />
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
  {/* Removed old demo chart/map cards. Use advanced dashboard layout below. */}

      {/* Key Metrics Section */}
      <section className={styles['metrics-section']}>
        <div className={styles['metric-card'] + ' ' + styles['primary']}>
          <div className={styles['metric-icon']}><FontAwesomeIcon icon={faUsers} /></div>
          <div className={styles['metric-content']}>
            <h3>Active Users</h3>
            <div className={styles['metric-value']}>{stats.users}</div>
            <div className={styles['metric-change']}>
              <FontAwesomeIcon icon={faArrowUp} /> <span>+0%</span>
            </div>
          </div>
        </div>
        <div className={styles['metric-card']}>
          <div className={styles['metric-icon']}><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
          <div className={styles['metric-content']}>
            <h3>Active Locations</h3>
            <div className={styles['metric-value']}>{stats.locations}</div>
            <div className={styles['metric-subtitle']}>out of 10 places</div>
          </div>
        </div>
        <div className={styles['metric-card']}>
          <div className={styles['metric-icon']}><FontAwesomeIcon icon={faChartLine} /></div>
          <div className={styles['metric-content']}>
            <h3>Peak Activity</h3>
            <div className={styles['metric-value']}>{stats.peak}</div>
            <div className={styles['metric-subtitle']}>{stats.peakTime}</div>
          </div>
        </div>
        <div className={styles['metric-card'] + ' ' + styles['logo-card']}>
          <img src="WhatsApp Image 2025-09-09 at 23.54.36_3aa1de83.jpg" alt="Mahakumbh Logo" className={styles['logo-image']} />
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles['filter-section']}>
        <div className={styles['filter-group']}>
          <h3><FontAwesomeIcon icon={faExchangeAlt} /> Filter by Location</h3>
          <div className={styles['place-filters']}>
            <button className={styles['filter-btn'] + ' ' + styles['active']}>All Places</button>
            {/* Place filter buttons go here */}
          </div>
        </div>
        <div className={styles['filter-group']}>
          <h3><FontAwesomeIcon icon={faClock} /> Time Slots</h3>
          <div className={styles['time-filters']}>
            {/* Time filter buttons go here */}
          </div>
        </div>
        <div className={styles['filter-group']}>
          <h3><FontAwesomeIcon icon={faCalendarDays} /> Date Range</h3>
          <div className={styles['date-filters']}>
            <button className={styles['filter-btn'] + ' ' + styles['active']}>Today</button>
            <button className={styles['filter-btn']}>Yesterday</button>
            <button className={styles['filter-btn']}>This Week</button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className={styles['dashboard-grid']}>
        <div className={styles['dashboard-left']}>
          {/* Users by Place Chart */}
          <section className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faChartBar} /> Users by Place</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Switch chart type">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
                <button className={styles['chart-btn']} title="Fullscreen">
                  <FontAwesomeIcon icon={faExpand} />
                </button>
              </div>
            </div>
            <div className={styles['chart-container']}>
              <ChartErrorBoundary>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} key="bar-chart" />
              </ChartErrorBoundary>
            </div>
          </section>
          {/* Time Series Chart */}
          <section className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faChartLine} /> Activity Over Time</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Switch chart type">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
                <button className={styles['chart-btn']} title="Fullscreen">
                  <FontAwesomeIcon icon={faExpand} />
                </button>
              </div>
            </div>
            <div className={styles['chart-container']}>
              <ChartErrorBoundary>
                <Line data={chartData} options={chartOptions} key="line-chart" />
              </ChartErrorBoundary>
            </div>
          </section>
        </div>
        <div className={styles['dashboard-right']}>
          {/* Interactive Map */}
          <section className={styles['chart-section'] + ' ' + styles['map-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faMap} /> Live Activity Map</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Map layers">
                  <FontAwesomeIcon icon={faLayerGroup} />
                </button>
                <button className={styles['chart-btn']} title="Fullscreen">
                  <FontAwesomeIcon icon={faExpand} />
                </button>
              </div>
            </div>
            <div className={styles['map-container']}>
              <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "250px", width: "100%", borderRadius: "12px" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={mapCenter}>
                  <Popup>Admin Center</Popup>
                </Marker>
              </MapContainer>
              <div className={styles['map-legend']}>
                <div className={styles['legend-item']}>
                  <div className={styles['legend-color']} style={{ background: '#ff7f50' }}></div>
                  <span>Active Users</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Analytics Section */}
      <section className={styles['analytics-section']}>
        <div className={styles['analytics-grid']}>
          {/* Detailed Breakdown */}
          <div className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faChartPie} /> Detailed Breakdown</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Switch chart type">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
            </div>
            <div className={styles['chart-container']}>
              <ChartErrorBoundary>
                <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} key="doughnut-chart" />
              </ChartErrorBoundary>
            </div>
          </div>
          {/* Data Table */}
          <div className={styles['chart-section']}>
            <div className={styles['chart-header']}>
              <h3><FontAwesomeIcon icon={faTable} /> Detailed Data</h3>
              <div className={styles['chart-controls']}>
                <button className={styles['chart-btn']} title="Export table">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button className={styles['chart-btn']} title="Refresh table">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
            </div>
            <div className={styles['table-container']}>
              <div className={styles['table-wrapper']}>
                <table className={styles['data-table']}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Location</th>
                      <th>Active Users</th>
                      <th>Change</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONFIG.places.map((place, idx) => (
                      <tr key={place}>
                        <td>{idx + 1}</td>
                        <td>{place}</td>
                        <td>{Math.floor(Math.random() * 300) + 50}</td>
                        <td>{(Math.random() > 0.5 ? '+' : '-') + Math.floor(Math.random() * 20) + '%'}</td>
                        <td>{['Active', 'Peak', 'Low'][Math.floor(Math.random() * 3)]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Overlay */}
      {loading && (
        <div className={styles['loading-overlay'] + ' active'}>
          <div className={styles['loading-spinner']}>
            <FontAwesomeIcon icon={faSyncAlt} spin />
            <p>Loading data...</p>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <div className={styles['modal'] + ' active'} onClick={e => { if (e.target.className.includes('modal')) setSettingsOpen(false); }}>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <h3>Dashboard Settings</h3>
              <button className={styles['modal-close']} onClick={() => setSettingsOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles['modal-body']}>
              <div className={styles['setting-group']}>
                <label htmlFor="refreshInterval">Auto-refresh interval (seconds):</label>
                <select id="refreshInterval">
                  <option value="30">30 seconds</option>
                  <option value="60" selected>1 minute</option>
                  <option value="300">5 minutes</option>
                  <option value="0">Manual only</option>
                </select>
              </div>
              <div className={styles['setting-group']}>
                <label htmlFor="theme">Theme:</label>
                <select id="theme">
                  <option value="dark" selected>Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className={styles['setting-group']}>
                <label>
                  <input type="checkbox" id="animations" defaultChecked />
                  Enable animations
                </label>
              </div>
            </div>
            <div className={styles['modal-footer']}>
              <button className={styles['btn'] + ' ' + styles['btn-secondary']} onClick={() => setSettingsOpen(false)}>Cancel</button>
              <button className={styles['btn'] + ' ' + styles['btn-primary']}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
