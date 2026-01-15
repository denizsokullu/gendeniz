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
            className={`peer h-6 w-11 rounded-full bg-surface-overlay after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-text-primary after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-primary-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 peer-focus:ring-offset-background peer-disabled:cursor-not-allowed peer-disabled:opacity-50`}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
            {description && <p className="text-sm text-text-muted">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
