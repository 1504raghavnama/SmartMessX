import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [festivalMode, setFestivalMode] = useState(false);
  const [festivalName, setFestivalName] = useState('');

  useEffect(() => {
    API.get('/admin/students').then(r => setStudents(r.data)).catch(() => {});
    API.get('/admin/attendance/today').then(r => setTodayAttendance(r.data)).catch(() => {});
    API.get('/admin/predict').then(r => setPrediction(r.data)).catch(() => {});
    API.get('/admin/settings').then(r => {
      setFestivalMode(r.data.festival_mode === 'true');
      setFestivalName(r.data.festival_name || '');
    }).catch(() => {});
  }, []);

  const toggleFestival = async () => {
    try {
      await API.post('/admin/settings/festival', { festival_mode: !festivalMode, festival_name: festivalName });
      setFestivalMode(!festivalMode);
      toast.success('Festival mode updated!');
    } catch { toast.error('Failed'); }
  };

  const manualOverride = async (userId, status) => {
    try {
      await API.post('/admin/override', { user_id: userId, status, date: new Date().toISOString().split('T')[0], meal_type: 'lunch' });
      toast.success('Override applied!');
    } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Admin Dashboard</h2>

        <div style={{ marginBottom: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Festival Mode</h3>
          <input placeholder="Festival Name" value={festivalName} onChange={e => setFestivalName(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }} />
          <button onClick={toggleFestival}
            style={{ padding: '8px 16px', background: festivalMode ? '#f44336' : '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            {festivalMode ? 'Turn OFF Festival' : 'Turn ON Festival'}
          </button>
        </div>

        {prediction && (
          <div style={{ marginBottom: '20px', padding: '16px', background: '#e3f2fd', borderRadius: '8px' }}>
            <h3>Food Prediction Today</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>🍽️ {prediction.predicted_count} meals</p>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h3>Today's Attendance ({todayAttendance.length})</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead><tr><th>Name</th><th>Meal</th><th>Status</th></tr></thead>
            <tbody>
              {todayAttendance.map((a, i) => (
                <tr key={i}><td>{a.name}</td><td>{a.meal_type}</td><td>{a.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>All Students</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Override</th></tr></thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>
                  <td>
                    <button onClick={() => manualOverride(s.id, 'present')}
                      style={{ marginRight: '5px', padding: '4px 8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Present
                    </button>
                    <button onClick={() => manualOverride(s.id, 'absent')}
                      style={{ padding: '4px 8px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;