import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { createSnippet } from '../../services/snippetService';

const languages = ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'rust'];

const SnippetEditor = ({ onCreated }) => {
  const [snippet, setSnippet] = useState({
    title: '',
    language: 'javascript',
    code: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createSnippet(snippet);
      toast.success('Snippet saved');
      onCreated?.();
      setSnippet({ title: '', language: 'javascript', code: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating snippet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-4">
        <input
          type="text"
          name="title"
          value={snippet.title}
          onChange={handleChange}
          placeholder="Snippet title"
          className="flex-1 border p-2 rounded-md"
          required
        />
        <select
          name="language"
          value={snippet.language}
          onChange={handleChange}
          className="border p-2 rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <CodeEditor
        value={snippet.code}
        language={snippet.language}
        placeholder="Enter your code here"
        onChange={(evn) => setSnippet({ ...snippet, code: evn.target.value })}
        padding={12}
        style={{ fontSize: 14, borderRadius: 6, border: '1px solid #e5e7eb' }}
        className="dark:bg-gray-900 dark:text-gray-200"
      />
      <textarea
        name="description"
        value={snippet.description}
        onChange={handleChange}
        rows={3}
        placeholder="Description (optional)"
        className="w-full border p-2 rounded-md"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        {loading ? 'Saving...' : 'Save Snippet'}
      </button>
    </form>
  );
};

export default SnippetEditor;
