import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import BreweryCard from "./BreweryCard";

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchBreweries = async () => {
      const res = await fetch("https://api.openbrewerydb.org/v1/breweries");
      const data = await res.json();
      setBreweries(data);
    };

    fetchBreweries();
  }, []);

  const filtered = breweries
    .filter((b) => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((b) => (filter ? b.brewery_type === filter : true));

  // Summary Stats
  const total = breweries.length;
  const microCount = breweries.filter((b) => b.brewery_type === "micro").length;
  const states = new Set(breweries.map((b) => b.state));

  return (
    <div className="p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterDropdown filter={filter} setFilter={setFilter} />
      <div className="my-4">
        <p>Total Breweries: {total}</p>
        <p>Microbreweries: {microCount}</p>
        <p>States Represented: {states.size}</p>
      </div>
      {filtered.map((brewery) => (
        <BreweryCard key={brewery.id} brewery={brewery} />
      ))}
    </div>
  );
}

export default Dashboard;
