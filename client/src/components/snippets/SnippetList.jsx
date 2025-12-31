import { useEffect, useState } from 'react';
import { fetchSnippets } from '../../services/snippetService';
import SnippetCard from './SnippetCard';
import SnippetSearch from './SnippetSearch';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (params = {}) => {
    setLoading(true);
    const { data } = await fetchSnippets(params);
    setSnippets(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <SnippetSearch onSearch={(q) => load({ q })} />
      {loading ? (
        <p>Loading...</p>
      ) : snippets.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No snippets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets.map((snip) => (
            <SnippetCard key={snip._id} snippet={snip} onDeleted={() => load()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetList;
