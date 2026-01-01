import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showClose = true 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />
      
      <div 
        className={`relative w-full ${sizes[size]} bg-card rounded-2xl shadow-2xl border-2 border-theme animate-scaleIn max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme">
            {title && (
              <h2 className="text-xl font-semibold text-primary">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-theme transition-colors duration-300 text-secondary hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
