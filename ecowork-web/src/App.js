import React, { useState } from 'react';
import './App.css';

function App() {
  const [points] = useState(2450); 
  const [location] = useState("Vijayawada"); 

  return (
    <div className="App">
      <header className="App-header">
        <h1>EcoWorkConnect Web</h1>
        <p><b>{location}, AP</b> - Governorpet Area</p>
      </header>

      <div className="main-content">
        <div className="dashboard-card">
          <h3>GREEN REWARDS</h3>
          <div className="points-display">
            <span className="pts-number">{points}</span>
            <span className="pts-label">Pts</span>
          </div>
          <p className="tier-info">Eco-Warrior Tier. Next reward at 3,000 pts.</p>
          <button className="sync-btn">SYNC WITH NATIONAL PORTALS</button>
        </div>

        <div className="specialists-list">
          <h3>Solar Specialists Nearby</h3>
          <div className="expert-card">
            <div className="expert-header">
              <p className="name">Srinivas Rao</p>
              <p className="cert">Suryamitra Certified</p>
            </div>
            <p className="status">🟢 Status: On the way (12 Mins)</p>
            <button className="track-btn" onClick={() => alert('Opening Map...')}>TRACK EXPERT LIVE</button>
          </div>
        </div>

        <div className="alert-box">
          <p className="alert-title">⚠️ SOLAR MAINTENANCE DUE</p>
          <p className="alert-desc">Efficiency dropped by 12% due to dust.</p>
          <button className="schedule-btn">SCHEDULE CLEANING</button>
        </div>
      </div>
    </div>
  );
}

export default App;