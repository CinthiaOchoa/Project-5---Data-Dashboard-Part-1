// DetailView.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((res) => res.json())
      .then((data) => setBrewery(data));
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>Website: <a href={brewery.website_url} target="_blank" rel="noreferrer">{brewery.website_url}</a></p>
      <p>Phone: {brewery.phone}</p>
    </div>
  );
}
