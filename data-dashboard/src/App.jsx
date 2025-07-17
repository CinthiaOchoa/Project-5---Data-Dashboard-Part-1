import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 25;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=162');
      const data = await res.json();
      setBreweries(data);
    }
    fetchData();
  }, []);

  // Unique states, cities (filtered by state), and types
  const states = Array.from(new Set(breweries.map(b => b.state))).sort();

  const cities = selectedState
    ? Array.from(new Set(breweries.filter(b => b.state === selectedState).map(b => b.city))).sort()
    : [];

  const types = Array.from(new Set(breweries.map(b => b.brewery_type))).sort();

  // Filtering breweries by all filters
  let filtered = breweries.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedState) {
    filtered = filtered.filter(b => b.state === selectedState);
  }
  if (selectedCity) {
    filtered = filtered.filter(b => b.city === selectedCity);
  }
  if (selectedType) {
    filtered = filtered.filter(b => b.brewery_type === selectedType);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const displayedBreweries = filtered.slice((page - 1) * perPage, page * perPage);

  const filteredStatesCount = new Set(filtered.map(b => b.state)).size;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">🍺 BrewDash</h2>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#search">Search</a>
        </nav>
      </aside>

      <main className="dashboard">
        <h1>Brewery Dashboard</h1>

        <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Breweries — States: {filteredStatesCount} | Breweries: {filtered.length}
        </div>

        <div className="controls" style={{ gap: '1rem' }}>
          <input
            type="text"
            placeholder="Search breweries by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ flex: 1, minWidth: '200px' }}
          />

          <select
            value={selectedState}
            onChange={e => {
              setSelectedState(e.target.value);
              setSelectedCity('');
              setPage(1);
            }}
            style={{ minWidth: '150px' }}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {selectedState && (
            <select
              value={selectedCity}
              onChange={e => {
                setSelectedCity(e.target.value);
                setPage(1);
              }}
              style={{ minWidth: '150px' }}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}

          {/* Brewery type dropdown */}
          <select
            value={selectedType}
            onChange={e => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: '150px' }}
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="table">
          <div className="table-header">
            <div>Name</div><div>Type</div><div>City</div><div>State</div>
          </div>
          {displayedBreweries.map(b => (
            <div className="table-row" key={b.id}>
              <div>{b.name}</div>
              <div>{b.brewery_type}</div>
              <div>{b.city}</div>
              <div>{b.state}</div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
