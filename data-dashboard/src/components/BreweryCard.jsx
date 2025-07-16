function BreweryCard({ brewery }) {
  return (
    <div className="border p-4 m-2 rounded shadow">
      <h2 className="font-bold text-lg">{brewery.name}</h2>
      <p>{brewery.city}, {brewery.state}</p>
      <p>Type: {brewery.brewery_type}</p>
    </div>
  );
}

export default BreweryCard;
