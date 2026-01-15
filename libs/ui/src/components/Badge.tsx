import { type HTMLAttributes, type ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantClasses = {
  default: 'bg-surface-overlay text-text-secondary',
  primary: 'bg-primary-500/20 text-primary-400',
  success: 'bg-success/20 text-green-400',
  warning: 'bg-warning/20 text-yellow-400',
  danger: 'bg-error/20 text-red-400',
  info: 'bg-info/20 text-blue-400',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
