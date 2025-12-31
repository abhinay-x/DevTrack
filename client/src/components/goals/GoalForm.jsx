import { useState } from 'react';
import { createGoal } from '../../services/goalService';

const GoalForm = ({ onCreated }) => {
  const [form, setForm] = useState({ title: '', targetHours: 10, deadline: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createGoal(form);
    onCreated?.();
    setForm({ title: '', targetHours: 10, deadline: '' });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Goal title"
        required
        className="w-full border p-2 rounded-md"
      />
      <input
        type="number"
        name="targetHours"
        value={form.targetHours}
        onChange={handleChange}
        placeholder="Target hours"
        className="w-full border p-2 rounded-md"
      />
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
        {loading ? 'Saving...' : 'Save Goal'}
      </button>
    </form>
  );
};

export default GoalForm;
