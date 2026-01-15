import { Card, CardBody, Badge } from '@gendeniz/ui';

export interface QueryResultData {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  rowsAffected?: number;
}

interface QueryResultProps {
  result: QueryResultData;
}

export function QueryResult({ result }: QueryResultProps) {
  return (
    <Card className="border-l-4 border-l-primary-500">
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Query
              </Badge>
              <span className="text-xs text-gray-400">{result.timestamp.toLocaleTimeString()}</span>
            </div>
            {result.rowsAffected !== undefined && (
              <Badge variant="info" size="sm">
                {result.rowsAffected} rows
              </Badge>
            )}
          </div>

          <p className="text-sm italic text-gray-700">&ldquo;{result.query}&rdquo;</p>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="whitespace-pre-wrap text-sm text-gray-900">{result.response}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
