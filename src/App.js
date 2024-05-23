// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CrtOverlay from './components/CrtOverlay';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return (
    <Router>
      <div className="App">
        <CrtOverlay />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={token ? <h2>Welcome to the Chat App</h2> : <Login setToken={saveToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
