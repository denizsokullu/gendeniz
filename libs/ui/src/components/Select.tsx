import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`block w-full rounded-lg border bg-surface px-4 py-2 text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-background ${
            error
              ? 'border-error focus:border-error focus:ring-error'
              : 'border-border focus:border-primary-500 focus:ring-primary-500'
          } disabled:cursor-not-allowed disabled:bg-surface-elevated disabled:text-text-muted ${className} `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-text-muted">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
