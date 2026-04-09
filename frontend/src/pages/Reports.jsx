import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const Reports = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState([]);

  const fetchReport = async () => {
    try {
      const res = await API.get(`/admin/reports?from=${from}&to=${to}`);
      setData(res.data);
    } catch { alert('Failed to fetch report'); }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Attendance Reports</h2>
        <div style={{ marginBottom: '20px' }}>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ padding: '8px', marginRight: '10px' }} />
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ padding: '8px', marginRight: '10px' }} />
          <button onClick={fetchReport}
            style={{ padding: '8px 16px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Get Report
          </button>
        </div>
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead><tr><th>Name</th><th>Date</th><th>Meal</th><th>Status</th></tr></thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i}><td>{r.name}</td><td>{r.date}</td><td>{r.meal_type}</td><td>{r.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;