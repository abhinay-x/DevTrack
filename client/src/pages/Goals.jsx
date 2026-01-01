import { useState, useEffect } from 'react';
import { fetchGoals, createGoal, updateGoal, deleteGoal, updateGoalStatus } from '../services/goalService';
import { Card, CardHeader, CardBody, Button, Input, Modal, Badge, ConfirmDialog } from '../components/ui';
import { Plus, Target, Trophy, Calendar, Edit, Trash2, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const [formData, setFormData] = useState({
    title: '',
    targetHours: '',
    currentHours: 0,
    deadline: '',
    category: 'Learning',
    description: '',
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await fetchGoals();
      setGoals(Array.isArray(data) ? data : data?.goals || []);
    } catch (error) {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGoal) {
        await updateGoal(editingGoal._id, formData);
        toast.success('Goal updated successfully');
      } else {
        await createGoal(formData);
        toast.success('Goal created successfully');
      }
      setIsModalOpen(false);
      setEditingGoal(null);
      setFormData({ title: '', targetHours: '', currentHours: 0, deadline: '', category: 'Learning', description: '' });
      loadGoals();
    } catch (error) {
      toast.error(editingGoal ? 'Failed to update goal' : 'Failed to create goal');
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteGoal(deleteConfirm.id);
      toast.success('Goal deleted successfully');
      loadGoals();
    } catch (error) {
      toast.error('Failed to delete goal');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const handleMarkComplete = async (goal) => {
    try {
      await updateGoalStatus(goal._id, 'Completed');
      toast.success('🎉 Goal achieved! Great job!');
      loadGoals();
    } catch (error) {
      toast.error('Failed to mark goal as complete');
    }
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetHours: goal.targetHours || '',
      currentHours: goal.currentHours || 0,
      deadline: goal.deadline ? goal.deadline.split('T')[0] : '',
      category: goal.category || 'Learning',
      description: goal.description || '',
    });
    setIsModalOpen(true);
  };

  const getProgress = (goal) => {
    if (!goal.targetHours || goal.targetHours === 0) return 0;
    return Math.min(100, Math.round(((goal.currentHours || 0) / goal.targetHours) * 100));
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getGoalStatus = (goal) => {
    const progress = getProgress(goal);
    const daysRemaining = getDaysRemaining(goal.deadline);
    
    if (goal.status === 'Completed') return 'completed';
    if (daysRemaining !== null && daysRemaining < 0) return 'overdue';
    if (daysRemaining !== null && daysRemaining <= 3) return 'urgent';
    if (progress >= 75) return 'on-track';
    if (progress >= 50) return 'progress';
    return 'behind';
  };

  const activeGoals = goals?.filter(g => g.status !== 'Completed') || [];
  const completedGoals = goals?.filter(g => g.status === 'Completed') || [];
  const overallProgress = activeGoals.length > 0 
    ? Math.round(activeGoals.reduce((sum, g) => sum + getProgress(g), 0) / activeGoals.length)
    : 0;

  return (
    <div className="min-h-screen bg-theme">
      {/* Header */}
      <div className="bg-card border-b-2 border-theme">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-1">My Goals</h1>
                <p className="text-secondary">Track your learning objectives</p>
              </div>

              {/* Progress Ring */}
              <div className="hidden sm:flex items-center gap-3 bg-primary/10 border-2 border-primary/20 rounded-2xl px-6 py-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-theme opacity-20"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-primary transition-all duration-1000"
                      strokeDasharray={`${overallProgress * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{overallProgress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-secondary">Overall</p>
                  <p className="text-sm font-semibold text-primary">Progress</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setEditingGoal(null);
                setFormData({ title: '', targetHours: '', currentHours: 0, deadline: '', category: 'Learning', description: '' });
                setIsModalOpen(true);
              }}
              className="animate-pulse"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Goals ({activeGoals.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGoals.map((goal, index) => {
                const status = getGoalStatus(goal);
                const progress = getProgress(goal);
                const daysRemaining = getDaysRemaining(goal.deadline);

                return (
                  <Card key={goal._id || index} hover className={`animate-slideUp stagger-${Math.min(index + 1, 6)}`}>
                    <CardBody className="p-6">
                      {/* Status Indicator */}
                      <div className={`h-1 rounded-full mb-4 ${
                        status === 'overdue' ? 'bg-danger' :
                        status === 'urgent' ? 'bg-warning' :
                        status === 'on-track' ? 'bg-success' :
                        'bg-primary'
                      }`} />

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-1">{goal.title}</h3>
                          <Badge variant="default" className="text-xs">
                            {goal.category || 'Learning'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(goal)}
                            className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-info transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(goal._id)}
                            className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-danger transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-secondary">Progress</span>
                          <span className="text-sm font-semibold text-primary">{progress}%</span>
                        </div>
                        <div className="h-2 bg-theme rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              status === 'overdue' ? 'bg-danger' :
                              status === 'urgent' ? 'bg-warning' :
                              status === 'on-track' ? 'bg-success' :
                              'bg-primary'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-secondary mt-1">
                          {goal.currentHours || 0} / {goal.targetHours} hours
                        </p>
                      </div>

                      {/* Deadline */}
                      {goal.deadline && (
                        <div className={`flex items-center gap-2 text-sm mb-4 ${
                          daysRemaining < 0 ? 'text-danger' :
                          daysRemaining <= 3 ? 'text-warning' :
                          'text-secondary'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>
                            {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` :
                             daysRemaining === 0 ? 'Due today' :
                             `${daysRemaining} days left`}
                          </span>
                        </div>
                      )}

                      {/* Mark Complete Button */}
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleMarkComplete(goal)}
                        className="w-full"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center gap-2 text-lg font-semibold text-primary mb-4 hover:text-secondary transition-colors"
            >
              {showCompleted ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              Completed Goals ({completedGoals.length})
            </button>
            
            {showCompleted && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideDown">
                {completedGoals.map((goal, index) => (
                  <Card key={goal._id || index} className="opacity-75">
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 text-success" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-primary mb-1">{goal.title}</h3>
                            <Badge variant="success" className="text-xs">Completed</Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(goal._id)}
                          className="p-2 rounded-lg hover:bg-theme text-tertiary hover:text-danger transition-colors"
                          title="Delete goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-secondary">
                        Completed on {new Date((goal.completedAt || goal.updatedAt)).toLocaleDateString()}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && goals.length === 0 && (
          <Card>
            <CardBody className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-theme flex items-center justify-center">
                <Target className="w-10 h-10 text-tertiary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">No active goals yet</h3>
              <p className="text-secondary mb-6">Set your first goal to start tracking progress</p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Create Goal
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGoal(null);
          setFormData({ title: '', targetHours: '', currentHours: 0, deadline: '', category: 'Learning', description: '' });
        }}
        title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Goal Title"
            name="title"
            placeholder="e.g., Learn TypeScript"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Hours"
              name="targetHours"
              type="number"
              placeholder="100"
              value={formData.targetHours}
              onChange={(e) => setFormData({ ...formData, targetHours: e.target.value })}
              required
            />
            <Input
              label="Current Hours"
              name="currentHours"
              type="number"
              placeholder="0"
              value={formData.currentHours}
              onChange={(e) => setFormData({ ...formData, currentHours: e.target.value })}
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-theme bg-card text-primary focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="Learning">Learning</option>
              <option value="Project">Project</option>
              <option value="Skill">Skill</option>
              <option value="Certification">Certification</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Description (optional)
            </label>
            <textarea
              placeholder="Describe your goal..."
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
                setEditingGoal(null);
                setFormData({ title: '', targetHours: '', currentHours: 0, deadline: '', category: 'Learning', description: '' });
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Goals;
