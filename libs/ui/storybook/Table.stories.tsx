import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../src/components/Table';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Role</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Role</TableCell>
          <TableCell isHeader>Status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'active' ? 'success' : 'default'} size="sm">
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelectedRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Role</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row, index) => (
          <TableRow key={row.id} isSelected={index === 1}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

const SortableTableDemo = () => {
  const [sortColumn, setSortColumn] = useState<string | null>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') setSortColumn(null);
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    const aVal = a[sortColumn as keyof typeof a];
    const bVal = b[sortColumn as keyof typeof b];
    if (sortDirection === 'asc') return aVal < bVal ? -1 : 1;
    return aVal > bVal ? -1 : 1;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell
            isHeader
            sortable
            sortDirection={sortColumn === 'name' ? sortDirection : null}
            onSort={() => handleSort('name')}
          >
            Name
          </TableCell>
          <TableCell
            isHeader
            sortable
            sortDirection={sortColumn === 'email' ? sortDirection : null}
            onSort={() => handleSort('email')}
          >
            Email
          </TableCell>
          <TableCell
            isHeader
            sortable
            sortDirection={sortColumn === 'role' ? sortDirection : null}
            onSort={() => handleSort('role')}
          >
            Role
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const Sortable: Story = {
  render: () => <SortableTableDemo />,
};
