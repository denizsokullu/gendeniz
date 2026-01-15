import { forwardRef, type InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, className = '', id, checked, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <label htmlFor={toggleId} className={`inline-flex cursor-pointer items-center ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
