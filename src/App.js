// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import CrtOverlay from './components/CrtOverlay';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return (
    <div className="App">
      <CrtOverlay />
      {token ? <h2>Welcome to the Chat App</h2> : <Login setToken={saveToken} />}
    </div>
  );
}

export default App;
