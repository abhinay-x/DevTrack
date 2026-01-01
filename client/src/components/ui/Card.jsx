import { forwardRef } from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  animate = false,
  ...props 
}) => {
  const baseStyles = 'bg-card rounded-xl border-2 border-theme shadow-sm overflow-hidden';
  
  const hoverStyles = hover 
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30' 
    : '';
  
  const animateStyles = animate ? 'animate-slideUp' : '';
  
  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${animateStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-theme ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-theme bg-theme/50 ${className}`}>
    {children}
  </div>
);

export default Card;
