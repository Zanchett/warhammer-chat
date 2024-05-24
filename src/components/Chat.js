// src/components/Chat.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './pipboy.css';
import HackingGame from './HackingGame';

const Chat = () => {
  const { user } = useContext(UserContext);
  const [isHackingGameActive, setHackingGameActive] = useState(false);

  const handleHackingClick = () => {
    setHackingGameActive(true);
  };

  const handleContactsClick = () => {
    setHackingGameActive(false);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="user-info-container">
          <div className="user-info-title">User Info</div>
          <div className="user-info-box">
            <div className="verified-text">Verified</div>
            <div className="username-text">{user ? user.username : 'Unknown'}</div>
            <div className="inquisition-text">Inquisition</div>
            <img src="/path/to/level.png" alt="Level" className="level-image" />
          </div>
        </div>
        <div className="levels">
          <div className="level-box">Lv. 1</div>
          <div className="level-box">Lv. 2</div>
          <div className="level-box">Lv. 3</div>
          <div className="level-box">Lv. 4</div>
          <div className="level-box">Lv. 5</div>
        </div>
      </div>
      <div className="main-content">
        <div className="header-buttons">
          <button className="button" onClick={handleContactsClick}>Contacts</button>
          <button className="button" onClick={handleHackingClick}>Hacking</button>
          <button className="button">Activity</button>
          <button className="button">File</button>
          <button className="button">Map</button>
        </div>
        <div className="terminal-box">
          {isHackingGameActive ? (
            <HackingGame />
          ) : (
            <div>
              <div className="terminal-header">root@Unknown:~$</div>
              <div className="chat-box">
                {/* Chat messages would go here */}
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type a message..." />
                <button className="button">Send</button>
              </div>
            </div>
          )}
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
