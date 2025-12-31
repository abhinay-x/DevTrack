import GoalForm from '../components/goals/GoalForm';
import GoalList from '../components/goals/GoalList';

const Goals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Learning Goals</h1>
      <GoalForm onCreated={() => window.location.reload()} />
      <GoalList />
    </div>
  );
};

export default Goals;
