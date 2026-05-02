import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, UserCheck, Activity, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error logging out', e);
    }
  };

  const navItems = [
    { to: '/', icon: Activity, label: 'Capacity' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/approvals', icon: UserCheck, label: 'Queue' },
  ];

  return (
    <div className="bottom-nav glass-panel">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = currentPath === to;
        return (
          <button
            key={to}
            className={`nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => navigate(to)}
          >
            <Icon size={24} className="nav-icon" />
            <span>{label}</span>
            {isActive && <div className="active-indicator" />}
          </button>
        );
      })}

      <button
        className="nav-btn"
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
      >
        <LogOut size={24} className="nav-icon" style={{ color: '#fff' }} />
        <span style={{ color: '#fff' }}>Logout</span>
      </button>
    </div>
  );
}
