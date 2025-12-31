import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { deleteSnippet } from '../../services/snippetService';
import { useState } from 'react';

const SnippetCard = ({ snippet, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    toast.success('Code copied to clipboard');
    navigator.clipboard.writeText(snippet.code);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this snippet?')) return;
    setLoading(true);
    await deleteSnippet(snippet._id);
    toast.success('Snippet deleted');
    onDeleted?.();
  };

  return (
    <div className="border rounded-md p-4 shadow-sm flex flex-col gap-2 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white">{snippet.title}</h3>
        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
          {snippet.language}
        </span>
      </div>
      <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded-md overflow-x-auto max-h-40 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: snippet.code }} />
      <div className="flex justify-end gap-2">
        <button onClick={handleCopy} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <Copy size={16} />
        </button>
        <button disabled={loading} onClick={handleDelete} className="text-red-600 hover:text-red-800">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;
