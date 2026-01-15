import { useState, useCallback, type KeyboardEvent } from 'react';
import { Button, Card, CardBody, Badge } from '@gendeniz/ui';

interface DataPromptProps {
  onQuery: (prompt: string) => void;
  isLoading?: boolean;
}

const sampleQueries = [
  'Show me the top 5 stocks by market cap',
  'Which stocks have positive YTD returns?',
  'Compare technology sector stocks',
  'Find stocks with high P/E ratios',
];

export function DataPrompt({ onQuery, isLoading }: DataPromptProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = useCallback(() => {
    if (prompt.trim() && !isLoading) {
      onQuery(prompt);
      setPrompt('');
    }
  }, [prompt, onQuery, isLoading]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ask about your data
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a natural language query to explore your data... (Cmd/Ctrl + Enter to submit)"
              disabled={isLoading}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="mr-2 text-xs text-gray-500">Try:</span>
              {sampleQueries.map((query) => (
                <Badge
                  key={query}
                  variant="default"
                  size="sm"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => setPrompt(query)}
                >
                  {query}
                </Badge>
              ))}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              isLoading={isLoading}
            >
              Analyze
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
