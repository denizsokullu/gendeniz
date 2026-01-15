import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`block w-full rounded-lg border bg-surface transition-colors ${leftIcon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'} py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-background ${
              error
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-border focus:border-primary-500 focus:ring-primary-500'
            } disabled:cursor-not-allowed disabled:bg-surface-elevated disabled:text-text-muted ${className} `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-text-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
