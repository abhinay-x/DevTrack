const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-info/10 text-info border-info/20',
    coding: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    learning: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    interview: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    project: 'bg-green-500/10 text-green-500 border-green-500/20',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${variants[variant]} ${sizes[size]} ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
