const colors = {
  primary: 'bg-indigo-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  danger: 'bg-red-600',
};

const StatsCard = ({ title, value, icon: Icon, variant = 'primary' }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-md shadow-sm dark:border-gray-700">
      <div className={`p-3 rounded-md text-white ${colors[variant]}`}>
        {Icon && <Icon size={20} />}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
