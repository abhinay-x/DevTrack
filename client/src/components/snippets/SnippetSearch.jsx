import { useState } from 'react';

const SnippetSearch = ({ onSearch }) => {
  const [q, setQ] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border p-2 rounded-md"
        placeholder="Search snippets..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SnippetSearch;
