const ProgressBar = ({ value, color = 'indigo' }) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md h-3">
      <div
        className={`h-3 rounded-md bg-${color}-600`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
