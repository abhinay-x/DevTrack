import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'gradient-bg text-white hover:opacity-90 focus:ring-primary shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-secondary text-white hover:bg-purple-600 focus:ring-secondary shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
    success: 'bg-success text-white hover:bg-green-600 focus:ring-success shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary transform hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary focus:ring-primary transform hover:scale-[1.02] active:scale-[0.98]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
