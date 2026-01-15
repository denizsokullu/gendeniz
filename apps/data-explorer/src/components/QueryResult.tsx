import { Card, CardBody, Badge } from '@gendeniz/ui';

export interface QueryResultData {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  rowsAffected?: number;
  tokensUsed: number;
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
              <span className="text-xs text-text-muted">
                {result.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex gap-2">
              {result.rowsAffected !== undefined && (
                <Badge variant="info" size="sm">
                  {result.rowsAffected} rows
                </Badge>
              )}
              <Badge variant="info" size="sm">
                {result.tokensUsed} tokens
              </Badge>
            </div>
          </div>

          <p className="text-sm italic text-text-secondary">&ldquo;{result.query}&rdquo;</p>

          <div className="rounded-lg bg-surface-elevated p-4">
            <p className="whitespace-pre-wrap text-sm text-text-primary">{result.response}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
