function FilterDropdown({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-2 m-2 w-full"
    >
      <option value="">All Types</option>
      <option value="micro">Micro</option>
      <option value="regional">Regional</option>
      <option value="brewpub">Brewpub</option>
    </select>
  );
}

export default FilterDropdown;
