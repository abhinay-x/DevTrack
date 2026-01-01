import { useState, useEffect } from 'react';
import { fetchLogs, createLog, updateLog, deleteLog } from '../services/logService';
import { Card, CardHeader, CardBody, Button, Input, Badge, Modal, ConfirmDialog } from '../components/ui';
import { Plus, Search, Filter, Edit, Trash2, Clock, Calendar, Code, Book, Briefcase, Rocket, X } from 'lucide-react';
import toast from 'react-hot-toast';

const categoryIcons = {
  Coding: Code,
  Learning: Book,
  Interview: Briefcase,
  Project: Rocket,
};

const categoryColors = {
  Coding: 'coding',
  Learning: 'learning',
  Interview: 'interview',
  Project: 'project',
};

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const [formData, setFormData] = useState({
    title: '',
    category: 'Coding',
    duration: '',
    date: new Date().toISOString(),
    notes: '',
  });

  const filters = ['All', 'Coding', 'Learning', 'Interview', 'Project'];
  const sortOptions = ['Recent', 'Oldest', 'Duration (High-Low)', 'Duration (Low-High)'];

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterAndSortLogs();
  }, [logs, searchTerm, selectedFilter, sortBy]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await fetchLogs();
      setLogs(Array.isArray(data) ? data : data?.logs || []);
    } catch (error) {
      toast.error('Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortLogs = () => {
    let filtered = [...logs];

    // Filter by category
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(log => log.category === selectedFilter);
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.notes && log.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case 'Recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'Oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'Duration (High-Low)':
        filtered.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        break;
      case 'Duration (Low-High)':
        filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
    }

    setFilteredLogs(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLog) {
        await updateLog(editingLog._id, formData);
        toast.success('Log updated successfully');
      } else {
        await createLog(formData);
        toast.success('Log created successfully');
      }
      setIsModalOpen(false);
      setEditingLog(null);
      setFormData({ title: '', category: 'Coding', duration: '', date: new Date().toISOString(), notes: '' });
      loadLogs();
    } catch (error) {
      toast.error(editingLog ? 'Failed to update log' : 'Failed to create log');
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteLog(deleteConfirm.id);
      toast.success('Log deleted successfully');
      loadLogs();
    } catch (error) {
      toast.error('Failed to delete log');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const openEditModal = (log) => {
    setEditingLog(log);
    setFormData({
      title: log.title,
      category: log.category || 'Coding',
      duration: log.duration || '',
      date: log.date || new Date().toISOString(),
      notes: log.notes || '',
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
              <h1 className="text-3xl font-bold text-primary mb-1">Activity Logs</h1>
              <p className="text-secondary">Track your daily progress and activities</p>
            </div>
            <Button
              onClick={() => {
                setEditingLog(null);
                setFormData({ title: '', category: 'Coding', duration: '', notes: '' });
                setIsModalOpen(true);
              }}
              className="animate-float"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Log
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardBody className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'gradient-bg text-white shadow-lg'
                        : 'bg-theme text-secondary hover:bg-hover border-2 border-theme'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex-1 lg:max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                <input
                  type="text"
                  placeholder="Search logs by title or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    Sort by: {option}
                  </option>
                ))}
              </select>
            </div>
          </CardBody>
        </Card>

        {/* Logs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-secondary mt-4">Loading logs...</p>
          </div>
        ) : filteredLogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLogs.map((log, index) => {
              const CategoryIcon = categoryIcons[log.category] || Code;
              return (
                <Card key={log._id || index} hover className={`animate-slideUp stagger-${Math.min(index + 1, 6)}`}>
                  <CardBody className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant={categoryColors[log.category] || 'default'}>
                        {log.category || 'Coding'}
                      </Badge>
                      <div className="flex items-center gap-2 text-secondary">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{Math.round(log.duration)} min</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-primary mb-2">{log.title}</h3>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-tertiary text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(log.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>

                    {/* Notes Preview */}
                    {log.notes && (
                      <p className="text-secondary text-sm line-clamp-2 mb-4">
                        {log.notes}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-theme">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5 text-tertiary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(log)}
                          className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-info transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(log._id)}
                          className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-danger transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardBody className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-theme flex items-center justify-center">
                <Clock className="w-10 h-10 text-tertiary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">No logs found</h3>
              <p className="text-secondary mb-6">
                {searchTerm || selectedFilter !== 'All'
                  ? 'Try adjusting your filters or search term'
                  : 'Start tracking your progress today!'}
              </p>
              {!searchTerm && selectedFilter === 'All' && (
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Log
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
          setEditingLog(null);
          setFormData({ title: '', category: 'Coding', duration: '', date: new Date().toISOString(), notes: '' });
        }}
        title={editingLog ? 'Edit Log' : 'Add New Log'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            name="title"
            placeholder="What did you work on?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary cursor-pointer"
              >
                {filters.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Duration (minutes)"
              name="duration"
              type="number"
              placeholder="30"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={formData.date ? formData.date.split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Notes
            </label>
            <textarea
              placeholder="Add any notes or details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingLog(null);
                setFormData({ title: '', category: 'Coding', duration: '', notes: '' });
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingLog ? 'Update Log' : 'Save Log'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Log"
        message="Are you sure you want to delete this log? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Logs;
