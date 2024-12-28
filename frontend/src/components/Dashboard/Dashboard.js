import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login page if user is not logged in
  if (!user) {
    navigate('/'); // Redirect to login if user is not authenticated
    return null; // Prevent rendering the rest of the component if user is null
  }

  return (
    <div>
      <h2>Welcome to the Dashboard, {user.email}</h2>
      <button onClick={() => {
        logout();
        navigate('/'); // Redirect to login page after logging out
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
