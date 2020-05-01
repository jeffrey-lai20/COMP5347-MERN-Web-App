import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          COMP5347 Group 22's Assignment
        </p>
        <a
          className="App-link"
          href="https://www.wikipedia.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>
      </header>
    </div>
  );
}

export default App;
