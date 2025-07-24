// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DetailView from './components/DetailView';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.openbrewerydb.org/v1/breweries?by_country=United_States&per_page=162');
      const data = await res.json();
      setBreweries(data);
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                breweries={breweries}
                search={search}
                setSearch={setSearch}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route path="/details/:id" element={<DetailView breweries={breweries} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
