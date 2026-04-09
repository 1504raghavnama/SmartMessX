import React from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const QRCheckIn = ({ mealType }) => {
  const handleCheckIn = async () => {
    try {
      await API.post('/attendance/checkin', { meal_type: mealType });
      toast.success('Check-in successful ✅');
    } catch (err) {
      toast.error('Check-in failed ❌');
    }
  };

  return (
    <button
      onClick={handleCheckIn}
      style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
    >
      📷 Scan QR / Check In ({mealType})
    </button>
  );
};

export default QRCheckIn;