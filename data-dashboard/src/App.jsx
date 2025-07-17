

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [minId, setMinId] = useState('');
  const [maxId, setMaxId] = useState('');

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/breweries');
        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBreweries();
  }, []);

  const filteredBreweries = breweries.filter((brewery) => {
    return (
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!stateFilter || brewery.state.toLowerCase() === stateFilter.toLowerCase()) &&
      (!minId || brewery.id >= parseInt(minId)) &&
      (!maxId || brewery.id <= parseInt(maxId))
    );
  });

  const uniqueStates = [...new Set(breweries.map(b => b.state))].sort();

  const totalBreweries = breweries.length;
  const lowestId = breweries.reduce((min, b) => (b.id < min ? b.id : min), breweries[0]?.id || 0);
  const statesCount = uniqueStates.length;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-item clickable">📊 <a href="#dashboard">Dashboard</a></div>
        <div className="sidebar-item clickable">🍺 <a href="#breweries">Brewery List</a></div>
        <div className="sidebar-item clickable">📘 <a href="#about">About</a></div>
      </aside>
      <main className="dashboard">
        <h1 className="header">Brewery Dashboard</h1>

        <div className="stats-row">
          <div className="stat-card">Total Breweries <span>{totalBreweries || 'N/A'}</span></div>
          <div className="stat-card">Lowest ID <span>{lowestId}</span></div>
          <div className="stat-card">States <span>{statesCount}</span></div>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">Filter by State</option>
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

        <div className="brewery-list">
          {filteredBreweries.slice(0, 10).map((brewery) => (
            <div key={brewery.id} className="brewery-card">
              <h3>{brewery.name}</h3>
              <p>{brewery.city}, {brewery.state}</p>
              <p>Type: {brewery.brewery_type}</p>
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
