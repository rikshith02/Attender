import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  
  // State to hold form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee'); // Default role
  const [errorMessage, setErrorMessage] = useState(''); // For displaying errors

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Create the user data object
    const userData = {
      name,
      email,
      password,
      role
    };

    try {
      // Send POST request to the backend to register the user
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // If registration is successful
      if (response.ok) {
        alert('Registration Successful');
        navigate('/'); // Redirect to login page after registration
      } else {
        // If there was an error, get the error message from the response
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred');
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setErrorMessage('An error occurred while registering');
    }
  };

  return (
    <div>
      <h2>Register Page</h2>

      {/* Error message display */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Select role */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Manager">Manager</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {/* Link to Login Page */}
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/')}>Login</button>
      </p>
    </div>
  );
}

export default Register;
