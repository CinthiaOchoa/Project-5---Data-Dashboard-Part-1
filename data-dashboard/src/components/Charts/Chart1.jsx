// Chart1.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart1({ breweries }) {
  const typeData = Object.entries(
    breweries.reduce((acc, b) => {
      acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, count]) => ({ type, count }));

  return (
    <div className="chart-container">
      <h2>Breweries by Type</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={typeData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
