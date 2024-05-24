// src/components/HackingGame.js
import React, { useState, useEffect } from 'react';
import './HackingGame.css';

const HackingGame = () => {
  const [gameState, setGameState] = useState('landing');
  const [screen, setScreen] = useState([]);
  const [sidebar, setSidebar] = useState(new Array(16).fill(''));
  const [attempts, setAttempts] = useState([1, 2, 3, 4]);
  const [number, setNumber] = useState(0);
  const [hacks, setHacks] = useState([]);
  const [words, setWords] = useState([]);
  const [secretWord, setSecretWord] = useState('');
  const [triesReset, setTriesReset] = useState([]);
  const [places, setPlaces] = useState([]);
  const [display, setDisplay] = useState('');

  const difficulty = 5;
  const lineLength = 12;
  const lines = 34;
  const characters = lineLength * lines;
  const margin = 2;

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/LawlietBlack/fallout-terminal/master/js/words.json')
      .then(response => response.json())
      .then(data => setWords(data[difficulty]))
      .catch(error => console.error('Error fetching words:', error));
  }, [difficulty]);

  const initializeGame = () => {
    if (!words || words.length === 0) return;

    const newSecretWord = words[random(0, words.length - 1)];
    setSecretWord(newSecretWord);

    const newPlaces = findPlaces(words, difficulty, characters, margin);
    setPlaces(newPlaces);

    const newDisplay = generateDisplay(newPlaces, difficulty, characters);
    setDisplay(newDisplay);

    const newScreen = renderScreen(newDisplay, lines, lineLength);
    setScreen(newScreen);

    setAttempts([1, 2, 3, 4]);
    setSidebar(new Array(16).fill(''));
    setNumber(0);

    setTimeout(() => {
      changeSelection(0);
      renderWords(newPlaces, difficulty);
      const newHacks = renderHacks(newScreen);
      setHacks(newHacks);
      setTriesReset(newHacks[random(0, newHacks.length - 1)]);
    }, 200);

    setGameState('playing');
  };

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const findPlaces = (words, difficulty, characters, margin) => {
    const places = [];
    const blacklist = [];
    words.forEach(word => {
      let placed = false;
      while (!placed && blacklist.length < characters * 0.8) {
        const place = Math.floor(Math.random() * (characters - difficulty));
        if (blacklist.indexOf(place) < 0) {
          places.push([place, word]);
          placed = true;
          for (let j = place - difficulty - margin; j <= place + margin + difficulty; j++) {
            blacklist.push(j);
          }
        }
      }
    });
    return places.sort((a, b) => a[0] - b[0]);
  };

  const generateDisplay = (places, difficulty, characters) => {
    let display = '';
    const newPlaces = [...places];
    for (let i = 0; i < characters; i++) {
      if (newPlaces.length > 0 && i === newPlaces[0][0]) {
        display += newPlaces[0][1];
        i += difficulty - 1;
        newPlaces.shift();
      } else {
        display += randomChar();
      }
    }
    return display;
  };

  const randomChar = () => {
    const fillers = '()<>[]{}=_-.@$/^&|,;:%"';
    return fillers[Math.floor(Math.random() * fillers.length)];
  };

  const renderScreen = (display, lines, lineLength) => {
    const screen = [];
    for (let i = 0; i < lines; i++) {
      screen.push(display.slice(0, lineLength));
      display = display.slice(lineLength);
    }
    return screen;
  };

  const renderWords = (places, difficulty) => {
    // Logic to render words
  };

  const renderHacks = (lines) => {
    // Logic to render hacks
  };

  const changeSelection = (num) => {
    // Logic to change selection
  };

  const printLine = (line) => {
    const newSidebar = [...sidebar];
    newSidebar.shift();
    newSidebar.push(line);
    setSidebar(newSidebar);
  };

  const hack = () => {
    // Logic to handle hacks
  };

  const removeBadWord = () => {
    // Logic to remove bad word
  };

  const getLikeness = (word, secretWord) => {
    // Logic to get likeness
  };

  const guess = () => {
    // Logic to handle guess
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked: Row ${rowIndex}, Cell ${cellIndex}`);
    setNumber(rowIndex * lineLength + cellIndex);
    changeSelection(rowIndex * lineLength + cellIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log('Key pressed:', e.keyCode);
      if ([13, 37, 38, 39, 40].indexOf(e.keyCode) >= 0) {
        e.preventDefault();
        if (gameState !== 'playing') {
          console.log('Initializing game...');
          initializeGame();
          return;
        }
      }
      // Logic to handle keydown events
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameState, number, hacks, attempts]);

  useEffect(() => {
    console.log('Screen:', screen);
    console.log('Words:', words);
  }, [screen, words]);

  return (
    <div id="terminal">
      <div className="landing-view" style={{ display: gameState === 'landing' ? 'block' : 'none' }}>
        <div id="terminal-head">
          <pre>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</pre>
          <br />
          <pre>Welcome to my Fallout Terminal</pre>
          <pre>Find the password to win.</pre>
          <br />
          <pre>Press Enter to start</pre>
          <button onClick={initializeGame}>Start Game</button>
        </div>
      </div>
      <div className="playing-view" style={{ display: gameState === 'playing' ? 'block' : 'none' }}>
        <div id="terminal-head">
          <pre>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</pre>
          <pre>!!! WARNING: LOCKOUT IMMINENT !!!</pre>
          <pre>ATTEMPTS REMAINING: <i>{attempts.map(attempt => '■ ')}</i></pre>
        </div>
        <div id="terminal-screen">
          <div id="terminal-left">
            {screen.slice(0, 17).map((line, rowIndex) => (
              <span key={rowIndex} className="code-line">
                <pre className="byte">0xF000 </pre>
                {line.split('').map((data, cellIndex) => (
                  <pre key={cellIndex} className="data" onClick={() => handleCellClick(rowIndex, cellIndex)}>{data}</pre>
                ))}
              </span>
            ))}
          </div>
          <div id="terminal-right">
            {screen.slice(17, 34).map((line, rowIndex) => (
              <span key={rowIndex} className="code-line">
                <pre className="byte">0xF000 </pre>
                {line.split('').map((data, cellIndex) => (
                  <pre key={cellIndex} className="data" onClick={() => handleCellClick(rowIndex + 17, cellIndex)}>{data}</pre>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div id="terminal-sidebar">
          <div id="terminal-history">
            {sidebar.map((line, index) => (
              <pre key={index}>
                <span className="cursor" style={{ display: line !== '' ? 'inline' : 'none' }}>&gt;</span>&nbsp;{line}
              </pre>
            ))}
          </div>
          <pre id="selection">&gt;</pre>
        </div>
      </div>
      <div className="game-over-view" style={{ display: gameState === 'game-over' ? 'block' : 'none' }}>
        <div id="terminal-head">
          <pre>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</pre>
          <br />
          <pre>Lockout.</pre>
          <pre>Press Enter to play again</pre>
          <button onClick={initializeGame}>Restart Game</button>
        </div>
      </div>
      <div className="game-win-view" style={{ display: gameState === 'game-win' ? 'block' : 'none' }}>
        <div id="terminal-head">
          <pre>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</pre>
          <br />
          <pre>Password Accepted.</pre>
          <pre>Press Enter to play again</pre>
          <button onClick={initializeGame}>Restart Game</button>
        </div>
      </div>
    </div>
  );
};

export default HackingGame;
