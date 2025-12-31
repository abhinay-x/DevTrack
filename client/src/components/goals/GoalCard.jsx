import ProgressBar from './ProgressBar';

const GoalCard = ({ goal }) => {
  const percent = goal.targetHours ? (goal.currentHours / goal.targetHours) * 100 : 0;
  return (
    <div className="border rounded-md p-4 shadow-sm dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{goal.title}</h3>
        <span className="text-sm text-gray-600 dark:text-gray-300">{goal.status}</span>
      </div>
      <ProgressBar value={percent} />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {goal.currentHours} / {goal.targetHours} hrs
      </p>
    </div>
  );
};

export default GoalCard;
