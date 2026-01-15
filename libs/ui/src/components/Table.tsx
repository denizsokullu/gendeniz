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
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table
          ref={ref}
          className={`min-w-full divide-y divide-gray-200 ${striped ? 'table-striped' : ''} ${className}`}
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
      <thead ref={ref} className={`bg-gray-50 ${className}`} {...props}>
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <tbody ref={ref} className={`divide-y divide-gray-200 bg-white ${className}`} {...props}>
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
        className={`transition-colors hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''} ${className} `}
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
          className={`${baseClasses} text-left font-semibold text-gray-900 ${sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''} ${className}`}
          onClick={sortable ? onSort : undefined}
          {...(props as ThHTMLAttributes<HTMLTableCellElement>)}
        >
          <div className="flex items-center gap-2">
            {children}
            {sortable && (
              <span className="text-gray-400">
                {sortDirection === 'asc' && '↑'}
                {sortDirection === 'desc' && '↓'}
                {!sortDirection && '↕'}
              </span>
            )}
          </div>
        </th>
      );
    }

    return (
      <td ref={ref} className={`${baseClasses} text-gray-700 ${className}`} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
