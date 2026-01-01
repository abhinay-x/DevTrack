import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1.5 transition-all duration-300">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-tertiary group-focus-within:text-primary transition-colors duration-300" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 bg-card text-primary
            border-theme transition-all duration-300
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            placeholder:text-tertiary
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-danger focus:border-danger focus:ring-danger/20 animate-shake' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger animate-slideDown">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
