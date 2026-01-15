import { forwardRef, type InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, valueFormatter, className = '', id, value, ...props }, ref) => {
    const sliderId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const displayValue = valueFormatter ? valueFormatter(Number(value)) : String(value);

    return (
      <div className="w-full">
        <div className="mb-1 flex items-center justify-between">
          {label && (
            <label htmlFor={sliderId} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-medium text-primary-600">{displayValue}</span>
          )}
        </div>
        <input
          ref={ref}
          id={sliderId}
          type="range"
          value={value}
          className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
