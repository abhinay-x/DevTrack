import { useEffect, useState } from 'react';
import { fetchGoals } from '../../services/goalService';
import GoalCard from './GoalCard';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await fetchGoals();
    setGoals(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading goals...</p>;

  if (goals.length === 0)
    return <p className="text-gray-500 dark:text-gray-400">No goals found.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((g) => (
        <GoalCard key={g._id} goal={g} />
      ))}
    </div>
  );
};

export default GoalList;
