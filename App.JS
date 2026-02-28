import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(2450); // MERN Backend data
  const [location, setLocation] = useState("Vijayawada");

  return (
    <div className="App">
      <header className="App-header">
        <h1>EcoWorkConnect Web</h1>
        <p>Location: <b>{location}</b></p>
      </header>

      <div className="dashboard-card">
        <h2>My Rewards</h2>
        <div className="points-display">
          <span>{points}</span>
          <p>Points Earned</p>
        </div>
        <button className="refresh-btn">Sync with MERN</button>
      </div>

      <div className="alert-section">
        <p style={{color: 'red'}}>⚠️ Solar Maintenance Due</p>
      </div>
    </div>
  );
}

export default App;