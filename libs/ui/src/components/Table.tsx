import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type Ref,
} from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
}

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  isHeader?: boolean;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, striped = false, className = '', ...props }, ref) => {
    return (
      <div className="overflow-x-auto rounded-lg border border-border">
        <table
          ref={ref}
          className={`min-w-full divide-y divide-border ${striped ? 'table-striped' : ''} ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <thead ref={ref} className={`bg-surface-elevated ${className}`} {...props}>
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <tbody ref={ref} className={`divide-y divide-border bg-surface ${className}`} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, isSelected = false, className = '', ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`transition-colors hover:bg-surface-elevated ${isSelected ? 'bg-primary-500/10' : ''} ${className} `}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      isHeader = false,
      sortable = false,
      sortDirection,
      onSort,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'px-6 py-4 text-sm';

    if (isHeader) {
      return (
        <th
          ref={ref as Ref<HTMLTableCellElement>}
          className={`${baseClasses} text-left font-semibold text-text-primary ${sortable ? 'cursor-pointer select-none hover:bg-surface-overlay' : ''} ${className}`}
          onClick={sortable ? onSort : undefined}
          {...(props as ThHTMLAttributes<HTMLTableCellElement>)}
        >
          <div className="flex items-center gap-2">
            {children}
            {sortable && (
              <span className="text-text-muted">
                {sortDirection === 'asc' && (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                )}
                {sortDirection === 'desc' && (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {!sortDirection && (
                  <svg
                    className="h-4 w-4 opacity-50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l4-4 4 4M16 15l-4 4-4-4"
                    />
                  </svg>
                )}
              </span>
            )}
          </div>
        </th>
      );
    }

    return (
      <td ref={ref} className={`${baseClasses} text-text-secondary ${className}`} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
