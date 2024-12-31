import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './EDashboard.css';
import axios from 'axios';

const EDashboard = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const [isClockOutDisabled, setIsClockOutDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/');
  };

  const handleClockIn = () => {
    const currentTime = new Date();
    const clockInTime = currentTime.toLocaleTimeString();
    const currentHour = currentTime.getHours();
    const status = currentHour < 10 ? 'Normal' : 'Late';
    const today = new Date().toLocaleDateString();

    const token = sessionStorage.getItem('token'); // Get token from sessionStorage

    // Sending data as request body, not as query params
    axios.post('http://localhost:5000/api/attendance/clockIn', {
      userEmail: userDetails.email,
      date: today,
      clockInTime,
      status
    }, {
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the token in headers
      }
    })
    .then(() => {
      setClockInTime(clockInTime);
      setIsClockedIn(true);
      setIsClockInDisabled(true);
      setIsClockOutDisabled(false);
    })
    .catch((err) => console.log('Error clocking in:', err));
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();

    const token = sessionStorage.getItem('token'); // Get token from sessionStorage

    // Sending data as request body, not as query params
    axios.put('http://localhost:5000/api/attendance/clockOut', {
      userEmail: userDetails.email,
      date: today,
      clockOutTime: currentTime,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the token in headers
      }
    })
    .then(() => {
      setIsClockedIn(false);
      setClockInTime(null);
      setIsClockInDisabled(false);
      setIsClockOutDisabled(true);
    })
    .catch((err) => console.log('Error clocking out:', err));
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:5000/api/auth/verify-token', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then((response) => {
      setUserDetails(response.data);
      const userEmail = response.data.email;
      const today = new Date().toLocaleDateString();

      axios.get(`http://localhost:5000/api/attendance/${userEmail}/${today}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          const attendance = res.data;
          if (attendance.clockInTime && attendance.clockOutTime) {
            setIsClockInDisabled(true);
            setIsClockOutDisabled(true);
          } else if (attendance.clockInTime && !attendance.clockOutTime) {
            setIsClockInDisabled(true);
            setIsClockOutDisabled(false);
          } else {
            setIsClockInDisabled(false);
            setIsClockOutDisabled(true);
          }
        }
      })
      .catch((err) => console.log('Error fetching attendance:', err));
    })
    .catch(() => {
      sessionStorage.removeItem('token');
      navigate('/');
    });
  }, [navigate]);

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
        <p className="dashboard-description">Here is your dashboard content.</p>
        {userDetails && (
          <div>
            <p>User: {userDetails.name}</p>
            <p>Role: {userDetails.role}</p>
          </div>
        )}
        <div className="attendance-buttons">
          <button
            disabled={isClockInDisabled}
            onClick={handleClockIn}
            className="clock-in-btn"
          >
            Clock In
          </button>
          <button
            disabled={isClockOutDisabled}
            onClick={handleClockOut}
            className="clock-out-btn"
          >
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default EDashboard;
