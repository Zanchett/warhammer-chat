// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './pipboy.css';
import logo from '../images/empire-logo.png';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      setToken(response.data.token);
      navigate('/animation'); // Navigate to the TerminalAnimation component
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Empire Logo" />
      </div>
      <h1 className="flicker">DATASLATE</h1>
      <p className="subtitle flicker">V231.231.2-1</p>
      <form className="login-form" onSubmit={handleLogin}>
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
        <div className="button-group">
          <button type="submit">LOGIN</button>
          <button type="button" onClick={() => navigate('/register')}>REGISTER</button>
        </div>
      </form>
      <a href="/password-recovery" className="password-recovery">Password Recovery</a>
    </div>
  );
};

export default Login;
