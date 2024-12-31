// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons
import './Navbar.css'; // Import the CSS file

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">Home</Link>
      </div>

      <div className="navbar-right">
        <button onClick={onLogout} className="navbar-button">
          Logout
        </button>

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span className="profile-text">Profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;