import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ 
  label, 
  error, 
  options = [], 
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
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 bg-card text-primary
            border-theme transition-all duration-300 appearance-none
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            cursor-pointer
            ${error ? 'border-danger focus:border-danger focus:ring-danger/20 animate-shake' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tertiary pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger animate-slideDown">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
