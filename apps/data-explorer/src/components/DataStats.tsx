import { Card, CardHeader, CardBody, Badge } from '@gendeniz/ui';
import type { ColumnStats } from '../utils/dataParser';

interface DataStatsProps {
  rowCount: number;
  columnCount: number;
  filteredCount: number;
  columnStats: Map<string, ColumnStats>;
}

export function DataStats({ rowCount, columnCount, filteredCount, columnStats }: DataStatsProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-gray-900">Dataset Statistics</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="Total Rows" value={rowCount} />
          <StatBox label="Columns" value={columnCount} />
          <StatBox label="Filtered Rows" value={filteredCount} />
        </div>

        {columnStats.size > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">Column Details</h4>
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {Array.from(columnStats.entries()).map(([name, stats]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="max-w-[150px] truncate font-medium text-gray-900">{name}</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      size="sm"
                      variant={
                        stats.type === 'number'
                          ? 'info'
                          : stats.type === 'boolean'
                            ? 'warning'
                            : 'default'
                      }
                    >
                      {stats.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{stats.uniqueCount} unique</span>
                    {stats.nullCount > 0 && (
                      <span className="text-xs text-red-500">{stats.nullCount} null</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center">
      <p className="text-2xl font-bold text-primary-600">{value.toLocaleString()}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}
