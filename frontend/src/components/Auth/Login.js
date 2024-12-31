import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, role } = response.data;

      // Save the token and role in sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);

      notifySuccess('Login Successful');

      // Redirect based on the user role
      if (role === 'Employee') {
        navigate('/edashboard');
      } else if (role === 'TeamLead') {
        navigate('/tdashboard');
      } else if (role === 'Manager') {
        navigate('/mdashboard');
      } else {
        // If role is not valid, notify the user
        notifyError('Invalid role, access denied.');
      }
    } catch (err) {
      if (err.response) {
        notifyError(`Backend Error: ${err.response.data.message || err.response.data.error}`);
      } else {
        notifyError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')}>Register</button>
      </p>

      <ToastContainer />
    </div>
  );
}

export default Login;
