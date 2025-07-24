import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🍺 BrewDash</h2>
      <nav>
        <Link to="/">📊 Dashboard</Link>
        <Link to="/search">🔍 Search</Link>
        <Link to="/about">ℹ️ About</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
