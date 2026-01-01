import { useState, useEffect } from 'react';
import { fetchSnippets, createSnippet, updateSnippet, deleteSnippet } from '../services/snippetService';
import { Card, CardHeader, CardBody, Button, Input, Modal, Badge, ConfirmDialog } from '../components/ui';
import { Plus, Search, Copy, Edit, Trash2, Code2, LayoutGrid, List, X } from 'lucide-react';
import toast from 'react-hot-toast';

const languageColors = {
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  React: '#61DAFB',
  CSS: '#1572B6',
  'Node.js': '#339933',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  SQL: '#4479A1',
};

const languages = ['All', 'JavaScript', 'Python', 'React', 'CSS', 'Node.js', 'TypeScript', 'HTML', 'SQL'];

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const [formData, setFormData] = useState({
    title: '',
    language: 'JavaScript',
    code: '',
    description: '',
  });

  useEffect(() => {
    loadSnippets();
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, searchTerm, selectedLanguage]);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const data = await fetchSnippets();
      setSnippets(Array.isArray(data) ? data : data?.snippets || []);
    } catch (error) {
      toast.error('Failed to load snippets');
    } finally {
      setLoading(false);
    }
  };

  const filterSnippets = () => {
    let filtered = [...snippets];

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(s => s.language === selectedLanguage);
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredSnippets(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSnippet) {
        await updateSnippet(editingSnippet._id, formData);
        toast.success('Snippet updated successfully');
      } else {
        await createSnippet(formData);
        toast.success('Snippet created successfully');
      }
      setIsModalOpen(false);
      setEditingSnippet(null);
      setFormData({ title: '', language: 'JavaScript', code: '', description: '' });
      loadSnippets();
    } catch (error) {
      toast.error(editingSnippet ? 'Failed to update snippet' : 'Failed to create snippet');
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteSnippet(deleteConfirm.id);
      toast.success('Snippet deleted successfully');
      loadSnippets();
    } catch (error) {
      toast.error('Failed to delete snippet');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const openEditModal = (snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      language: snippet.language || 'JavaScript',
      code: snippet.code || '',
      description: snippet.description || '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-theme">
      {/* Header */}
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">Code Library</h1>
              <p className="text-secondary">{snippets.length} snippets saved</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-theme rounded-lg p-1 border-2 border-theme">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-card text-primary shadow-sm' : 'text-tertiary hover:text-primary'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-card text-primary shadow-sm' : 'text-tertiary hover:text-primary'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <Button
                onClick={() => {
                  setEditingSnippet(null);
                  setFormData({ title: '', language: 'JavaScript', code: '', description: '' });
                  setIsModalOpen(true);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                New Snippet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Language Filters */}
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedLanguage === lang
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-theme text-secondary hover:bg-hover border-2 border-theme'
              }`}
            >
              {lang !== 'All' && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: languageColors[lang] || '#6366F1' }}
                />
              )}
              {lang}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
          <input
            type="text"
            placeholder="Search by title, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Snippets Grid/List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-secondary mt-4">Loading snippets...</p>
          </div>
        ) : filteredSnippets.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredSnippets.map((snippet, index) => (
              <Card key={snippet._id || index} hover className={`animate-slideUp stagger-${Math.min(index + 1, 6)}`}>
                <CardBody className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      style={{
                        backgroundColor: `${languageColors[snippet.language] || '#6366F1'}20`,
                        color: languageColors[snippet.language] || '#6366F1',
                        borderColor: `${languageColors[snippet.language] || '#6366F1'}40`,
                      }}
                    >
                      {snippet.language || 'JavaScript'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(snippet.code)}
                        className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-primary transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(snippet)}
                        className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-info transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(snippet._id)}
                        className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-danger transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-primary mb-2">{snippet.title}</h3>

                  {/* Code Preview */}
                  <div className="bg-slate-900 rounded-lg p-4 mb-3 overflow-hidden">
                    <pre className="text-sm text-gray-300 font-mono line-clamp-4">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>

                  {/* Description */}
                  {snippet.description && (
                    <p className="text-secondary text-sm line-clamp-2">{snippet.description}</p>
                  )}

                  {/* Date */}
                  <div className="mt-3 pt-3 border-t border-theme text-xs text-tertiary">
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardBody className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-theme flex items-center justify-center">
                <Code2 className="w-10 h-10 text-tertiary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Your snippet library is empty</h3>
              <p className="text-secondary mb-6">
                {searchTerm || selectedLanguage !== 'All'
                  ? 'No snippets match your search'
                  : 'Save reusable code for quick access'}
              </p>
              {!searchTerm && selectedLanguage === 'All' && (
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Snippet
                </Button>
              )}
            </CardBody>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSnippet(null);
          setFormData({ title: '', language: 'JavaScript', code: '', description: '' });
        }}
        title={editingSnippet ? 'Edit Snippet' : 'New Snippet'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Title"
              name="title"
              placeholder="My useful function"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary cursor-pointer"
              >
                {languages.slice(1).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Code
            </label>
            <textarea
              placeholder="// Paste your code here..."
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 rounded-lg border-2 border-theme bg-slate-900 text-gray-300 font-mono text-sm focus:outline-none focus:border-primary resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Description (optional)
            </label>
            <textarea
              placeholder="What does this code do?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingSnippet(null);
                setFormData({ title: '', language: 'JavaScript', code: '', description: '' });
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingSnippet ? 'Update Snippet' : 'Save Snippet'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Snippet"
        message="Are you sure you want to delete this snippet? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Snippets;
