import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MERN Email App</Link>
      </div>
      
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span className="user-name">Welcome, {user?.name}</span>
            <Link to="/calendar" className="nav-link">Calendar</Link>
            <Link to="/emails" className="nav-link">Email List</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
