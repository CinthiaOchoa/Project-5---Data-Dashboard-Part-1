// Chart2.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart2({ breweries }) {
  const stateData = Object.entries(
    breweries.reduce((acc, b) => {
      acc[b.state] = (acc[b.state] || 0) + 1;
      return acc;
    }, {})
  ).map(([state, count]) => ({ state, count }));

  return (
    <div className="chart-container">
      <h2>Breweries by State</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stateData.slice(0, 10)}>
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
