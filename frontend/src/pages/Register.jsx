import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { name, email, password });
      toast.success('Registered! Please login.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Toaster />
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '350px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <button onClick={handleRegister}
          style={{ width: '100%', padding: '10px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: '12px' }}>Already have account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Register;