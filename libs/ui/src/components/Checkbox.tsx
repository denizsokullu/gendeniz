import { forwardRef, type InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={className}>
        <label htmlFor={checkboxId} className="inline-flex cursor-pointer items-start">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`mt-0.5 h-4 w-4 rounded border-border bg-surface text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-error' : ''} `}
            {...props}
          />
          {(label || description) && (
            <div className="ml-2">
              {label && (
                <span
                  className={`text-sm font-medium ${error ? 'text-error' : 'text-text-primary'}`}
                >
                  {label}
                </span>
              )}
              {description && <p className="text-sm text-text-muted">{description}</p>}
            </div>
          )}
        </label>
        {error && <p className="ml-6 mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
