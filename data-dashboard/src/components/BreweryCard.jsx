import { Link } from 'react-router-dom';

export default function BreweryCard({ brewery }) {
  return (
    <Link to={`/details/${brewery.id}`}>
      <div className="border p-3 rounded-lg hover:shadow-md">
        <h3 className="text-lg font-semibold">{brewery.name}</h3>
        <p>{brewery.city}, {brewery.state}</p>
        <p>{brewery.brewery_type}</p>
      </div>
    </Link>
  );
}
