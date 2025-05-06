import { useState } from 'react';
import API from '../api';

export default function SearchForm({ setResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await API.get(`/search/media?q=${query}`);
      setResults(res.data.results || []);
    } catch (err) {
      alert('Search failed.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        className="p-2 border rounded w-full mb-2"
        placeholder="Search media..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Search
      </button>
    </form>
  );
}
