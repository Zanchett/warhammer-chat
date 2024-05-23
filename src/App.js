// src/App.js
import React from 'react';
import Login from './components/Login';
import CrtOverlay from './components/CrtOverlay';
import './App.css';

function App() {
  return (
    <div className="App">
      <CrtOverlay />
      <Login />
    </div>
  );
}

export default App;
