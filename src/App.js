// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import TerminalAnimation from './components/TerminalAnimation';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [token, setToken] = useState('');

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/animation" element={<TerminalAnimation />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
