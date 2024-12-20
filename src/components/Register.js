// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './pipboy.css';
import logo from '../images/empire-logo.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, password });
      setSuccess('Registration successful! Please log in.');
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo">
          <img src={logo} alt="Empire Logo" />
        </div>
        <div className="form-content">
          <h1 className="flicker">ENLIST</h1>
          <p className="subtitle flicker">Generate your empire ID</p>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form className="login-form" onSubmit={handleRegister}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="EMPIRE ID"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
            />
            <button type="submit">REGISTER</button>
          </form>
          <a href="/" className="back-to-login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
