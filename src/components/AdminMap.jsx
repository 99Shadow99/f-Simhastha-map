import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMapEvents } from 'react-leaflet';

export default function AdminMap() {
  const [status, setStatus] = useState('');
  const [count, setCount] = useState(1);
  const [population, setPopulation] = useState([]);
  const center = [23.1821, 75.7890];

  // Fetch current dummy set from backend
  const fetchPopulation = async () => {
    try {
      const res = await fetch('/api/population/dummy');
      const data = await res.json();
      setPopulation(data);
    } catch {
      setPopulation([]);
    }
  };

  useEffect(() => {
    fetchPopulation();
    const interval = setInterval(fetchPopulation, 5000);
    return () => clearInterval(interval);
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const newCount = Number(prompt('Enter population count:', count));
        if (!newCount || isNaN(newCount)) return;
        setCount(newCount);
        // Update the current dummy set (edit on backend)
        fetch('/api/population/dummy/sets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idx: Math.floor(Date.now() / 30000) % 6,
            data: [
              ...population.filter(p => !(Math.abs(p.lat-lat)<1e-5 && Math.abs(p.lng-lng)<1e-5)),
              { lat, lng, count: newCount }
            ]
          })
        })
          .then(res => res.json())
          .then(() => {
            setStatus('✅ Population updated');
            fetchPopulation();
          })
          .catch(() => setStatus('❌ Network error'));
      }
    });
    return null;
  }

  const handleClearAll = async () => {
    try {
      await fetch('/api/population/dummy/sets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idx: Math.floor(Date.now() / 30000) % 6,
          data: []
        })
      });
      setStatus('✅ All population cleared');
      fetchPopulation();
    } catch {
      setStatus('❌ Failed to clear');
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', minHeight: 500, margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={handleClearAll} style={{ padding: '8px 22px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>Clear All</button>
        <span style={{ background: '#fff', color: '#333', padding: '4px 10px', borderRadius: 6, fontSize: '0.98rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>Click map to add a population circle</span>
      </div>
      <MapContainer center={center} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {population.map((p, idx) => {
          // All circles red
          let fillColor = '#ef4444'; // red
          let outline = '#b91c1c'; // dark red
          let radius = Math.max(40, p.count * 3);
          return (
            <Circle
              key={idx}
              center={[p.lat, p.lng]}
              radius={radius}
              pathOptions={{ color: outline, fillColor: fillColor, fillOpacity: 0.5, weight: 2 }}
            >
              <Popup>Population: {p.count}</Popup>
            </Circle>
          );
        })}
      </MapContainer>
      {status && <div style={{ position: 'absolute', top: 60, left: 10, color: status.startsWith('✅') ? 'green' : 'red', background: '#fff', padding: '6px 16px', borderRadius: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>{status}</div>}
    </div>
  );
}
