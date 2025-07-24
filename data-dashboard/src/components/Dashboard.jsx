// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chart1 from './Charts/Chart1';
import Chart2 from './Charts/Chart2';
import './Dashboard.css';

export default function Dashboard({
  breweries,
  search,
  setSearch,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  page,
  setPage,
}) {
  const perPage = 7;
  const navigate = useNavigate();

  const states = Array.from(new Set(breweries.map((b) => b.state))).sort();
  const cities = selectedState
    ? Array.from(new Set(breweries.filter((b) => b.state === selectedState).map((b) => b.city))).sort()
    : [];
  const types = Array.from(new Set(breweries.map((b) => b.brewery_type))).sort();

  let filtered = breweries.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  if (selectedState) filtered = filtered.filter((b) => b.state === selectedState);
  if (selectedCity) filtered = filtered.filter((b) => b.city === selectedCity);
  if (selectedType) filtered = filtered.filter((b) => b.brewery_type === selectedType);

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayedBreweries = filtered.slice((page - 1) * perPage, page * perPage);
  const filteredStatesCount = new Set(filtered.map((b) => b.state)).size;

  return (
    <main className="dashboard">
      <section className="left-panel">
        <h1>Brewery Dashboard</h1>
        <div className="stats-info">
          Breweries — States: {filteredStatesCount} | Breweries: {filtered.length}
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search breweries by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
              setPage(1);
            }}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {selectedState && (
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="table">
          <div className="table-header">
            <div>Name</div>
            <div>Type</div>
            <div>City</div>
            <div>State</div>
          </div>
          {displayedBreweries.map((b) => (
            <div
              key={b.id}
              className="table-row clickable"
              onClick={() => navigate(`/details/${b.id}`)}
            >
              <div className="cell name">{b.name}</div>
              <div className="cell type">{b.brewery_type}</div>
              <div className="cell city">{b.city}</div>
              <div className="cell state">{b.state}</div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
          </div>
        )}
      </section>

      <section className="right-panel">
        <Chart1 breweries={filtered} />
        <Chart2 breweries={filtered} />
      </section>
    </main>
  );
}
