import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EDashboard from './components/Dashboard/EDashboard';
import TDashboard from './components/Dashboard/TDashboard';
import MDashboard from './components/Dashboard/MDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edashboard" element={<EDashboard />} />
          <Route path="/Tdashboard" element={<TDashboard />} />
          <Route path="/mdashboard" element={<MDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
