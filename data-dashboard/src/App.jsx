// Main layout based on your screenshot
// This is a base App.jsx file to mimic the style and layout with brewery data

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [minId, setMinId] = useState('');
  const [maxId, setMaxId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.openbrewerydb.org/breweries');
      const data = await res.json();
      setBreweries(data);
    };
    fetchData();
  }, []);

  const filtered = breweries
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => (typeFilter ? b.brewery_type === typeFilter : true))
    .filter((b) => (stateFilter ? b.state === stateFilter : true))
    .filter((b) => (minId ? parseInt(b.id) >= parseInt(minId) : true))
    .filter((b) => (maxId ? parseInt(b.id) <= parseInt(maxId) : true));

  const lowestBrewery = breweries.reduce((min, b) =>
    b.id < min.id ? b : min,
    breweries[0] || { name: 'N/A' }
  );

  const uniqueStates = Array.from(new Set(breweries.map(b => b.state))).sort();

  return (
    <div className="app bg-space text-white">
      <aside className="sidebar">
        <h1 className="logo">
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>🍺 BrewDash</a>
        </h1>
        <nav className="nav-box">
          <a className="nav-item" href="#dashboard">🏠 Dashboard</a>
          <a className="nav-item" href="#search">🔍 Search</a>
          <a className="nav-item" href="#about">ℹ️ About</a>
        </nav>
      </aside>

      <main className="dashboard">
        <div className="stats">
          <div className="stat-box" style={{ color: '#ffdd57' }}>{breweries.length} <span style={{ display: 'block', color: '#fff' }}>Total Breweries</span></div>
          <div className="stat-box" style={{ color: '#7fffd4' }}>{lowestBrewery?.name || 'N/A'} <span style={{ display: 'block', color: '#fff' }}>Lowest ID</span></div>
          <div className="stat-box" style={{ color: '#add8e6' }}>{uniqueStates.length} <span style={{ display: 'block', color: '#fff' }}>States</span></div>
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search brewery name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="micro">Micro</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
          </select>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">All States</option>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min ID"
            value={minId}
            onChange={(e) => setMinId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max ID"
            value={maxId}
            onChange={(e) => setMaxId(e.target.value)}
          />
        </div>

        <div className="table">
          <div className="table-header">
            <div>Date</div>
            <div>Name</div>
            <div>Type</div>
            <div>State</div>
          </div>
          {filtered.map((b) => (
            <div key={b.id} className="table-row">
              <div>{new Date().toISOString().split('T')[0]}</div>
              <div>{b.name}</div>
              <div>{b.brewery_type}</div>
              <div>{b.state}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;