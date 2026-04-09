import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px 20px', background: '#1a1a2e', color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <span style={{ fontWeight: 'bold', fontSize: '20px' }}>SmartMessX</span>
      {role === 'student' && <Link to="/student" style={{ color: 'white' }}>Dashboard</Link>}
      {role === 'admin' && <Link to="/admin" style={{ color: 'white' }}>Admin</Link>}
      {role === 'admin' && <Link to="/reports" style={{ color: 'white' }}>Reports</Link>}
      <button onClick={logout} style={{ marginLeft: 'auto', padding: '5px 15px', cursor: 'pointer' }}>Logout</button>
    </nav>
  );
};

export default Navbar;