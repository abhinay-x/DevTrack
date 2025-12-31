import SnippetEditor from '../components/snippets/SnippetEditor';
import SnippetList from '../components/snippets/SnippetList';

const Snippets = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Code Snippets</h1>
      <SnippetEditor onCreated={() => window.location.reload()} />
      <SnippetList />
    </div>
  );
};

export default Snippets;
