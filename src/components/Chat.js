import React, { useEffect, useState } from 'react';
import './pipboy.css';

const Chat = ({ user = { username: 'Unknown', title: 'Inquisition' } }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Add socket event listeners for receiving messages
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // Emit the message to the server
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="user-info-box">
          <div className="levels">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="level-box">Lv. {i + 1}</div>
            ))}
          </div>
          <div className="user-info">
            <div className="user-info-title">User Info</div>
            <div className="user-info-text">Verified</div>
            <div className="user-info-text">{user.username}</div>
            <div className="user-info-text">{user.title}</div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="header-buttons">
          <button>Contacts</button>
          <button>Mission</button>
          <button>Activity</button>
          <button>File</button>
          <button>Map</button>
        </div>
        <div className="terminal-box">
          <div className="terminal-header">root@{user.username}:-$</div>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">{msg}</div>
            ))}
          </div>
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
