import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import QRCheckIn from '../components/QRCheckIn';
import FestivalBanner from '../components/FestivalBanner';
import API from '../api/axios';
import { Toaster } from 'react-hot-toast';

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payment, setPayment] = useState(null);
  const [festival, setFestival] = useState('');
  const [leaveForm, setLeaveForm] = useState({ from_date: '', to_date: '', reason: '' });

  useEffect(() => {
    API.get('/attendance/history').then(r => setAttendance(r.data)).catch(() => {});
    API.get('/leaves/my').then(r => setLeaves(r.data)).catch(() => {});
    API.get('/payments/my').then(r => setPayment(r.data)).catch(() => {});
    API.get('/admin/settings').then(r => {
      if (r.data.festival_mode === 'true') setFestival(r.data.festival_name);
    }).catch(() => {});
  }, []);

  const applyLeave = async () => {
    try {
      await API.post('/leaves/apply', leaveForm);
      alert('Leave applied!');
    } catch { alert('Failed'); }
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <FestivalBanner festivalName={festival} />
      <div style={{ padding: '20px' }}>
        <h2>Student Dashboard</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Check In</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <QRCheckIn mealType="breakfast" />
            <QRCheckIn mealType="lunch" />
            <QRCheckIn mealType="dinner" />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Payment Status</h3>
          {payment ? (
            <p>Month: {payment.month} | Amount: ₹{payment.amount} | Status: <b>{payment.status}</b></p>
          ) : <p>Loading...</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Apply Leave</h3>
          <input type="date" value={leaveForm.from_date} onChange={e => setLeaveForm({ ...leaveForm, from_date: e.target.value })}
            style={{ marginRight: '10px', padding: '8px' }} />
          <input type="date" value={leaveForm.to_date} onChange={e => setLeaveForm({ ...leaveForm, to_date: e.target.value })}
            style={{ marginRight: '10px', padding: '8px' }} />
          <input placeholder="Reason" value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}
            style={{ marginRight: '10px', padding: '8px' }} />
          <button onClick={applyLeave} style={{ padding: '8px 16px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Apply
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>My Leaves</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead><tr><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr></thead>
            <tbody>
              {leaves.map((l, i) => (
                <tr key={i}><td>{l.from_date}</td><td>{l.to_date}</td><td>{l.reason}</td><td>{l.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Attendance History</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead><tr><th>Date</th><th>Meal</th><th>Status</th></tr></thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i}><td>{a.date}</td><td>{a.meal_type}</td><td>{a.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;