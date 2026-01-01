import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  label, 
  error, 
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
      <textarea
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-lg border-2 bg-card text-primary
          border-theme transition-all duration-300 resize-none
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          placeholder:text-tertiary
          ${error ? 'border-danger focus:border-danger focus:ring-danger/20 animate-shake' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger animate-slideDown">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
