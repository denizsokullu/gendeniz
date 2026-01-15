import { Table, TableHeader, TableBody, TableRow, TableCell } from '@gendeniz/ui';

interface DataTableProps {
  headers: string[];
  rows: Record<string, unknown>[];
  visibleColumns: Set<string>;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

export function DataTable({
  headers,
  rows,
  visibleColumns,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps) {
  const visibleHeaders = headers.filter((h) => visibleColumns.has(h));

  if (rows.length === 0) {
    return <div className="py-12 text-center text-gray-500">No data to display</div>;
  }

  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          {visibleHeaders.map((header) => (
            <TableCell
              key={header}
              isHeader
              sortable
              sortDirection={sortColumn === header ? sortDirection : null}
              onSort={() => onSort(header)}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {visibleHeaders.map((header) => (
              <TableCell key={header}>{formatCellValue(row[header])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '—';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
