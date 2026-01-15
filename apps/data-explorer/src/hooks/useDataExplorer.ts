import { useState, useMemo, useCallback } from 'react';
import {
  type ParsedData,
  type ColumnStats,
  parseCSV,
  parseJSON,
  calculateColumnStats,
  sortData,
  filterData,
} from '../utils/dataParser';
import { simulateFileUpload } from '../utils/sampleData';
import type { QueryResultData } from '../components/QueryResult';

// Mock response generator - in a real app, this would call an LLM API
function generateMockResponse(
  prompt: string,
  data: ParsedData
): { text: string; rowCount?: number } {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('top') && lowerPrompt.includes('market cap')) {
    const sorted = [...data.rows].sort(
      (a, b) => (Number(b['Market Cap']) || 0) - (Number(a['Market Cap']) || 0)
    );
    const top5 = sorted.slice(0, 5);
    const list = top5
      .map((row, i) => `${i + 1}. ${row['Symbol']} - $${row['Market Cap']}B`)
      .join('\n');
    return {
      text: `Here are the top 5 stocks by market capitalization:\n\n${list}\n\nThese companies represent the largest market valuations in the dataset.`,
      rowCount: 5,
    };
  }

  if (lowerPrompt.includes('positive') && lowerPrompt.includes('ytd')) {
    const positive = data.rows.filter((row) => Number(row['YTD Return']) > 0);
    return {
      text: `Found ${positive.length} stocks with positive YTD returns.\n\nThe top performers include stocks across various sectors. Consider reviewing the Technology and Healthcare sectors for strong performers.`,
      rowCount: positive.length,
    };
  }

  if (lowerPrompt.includes('technology') || lowerPrompt.includes('tech')) {
    const techStocks = data.rows.filter((row) => row['Sector'] === 'Technology');
    return {
      text: `The Technology sector contains ${techStocks.length} stocks in this dataset.\n\nKey observations:\n- Average P/E ratio tends to be higher than other sectors\n- Generally higher YTD returns\n- Mixed dividend yields`,
      rowCount: techStocks.length,
    };
  }

  if (lowerPrompt.includes('p/e') || lowerPrompt.includes('pe ratio')) {
    const highPE = data.rows.filter((row) => Number(row['P/E Ratio']) > 50);
    return {
      text: `Found ${highPE.length} stocks with P/E ratios above 50.\n\nHigh P/E ratios can indicate growth expectations but also potential overvaluation. Consider comparing with sector averages for better context.`,
      rowCount: highPE.length,
    };
  }

  if (
    lowerPrompt.includes('graph') ||
    lowerPrompt.includes('chart') ||
    lowerPrompt.includes('volume')
  ) {
    return {
      text: `[Chart generation placeholder]\n\nTo visualize this data, I would generate a bar chart or line graph showing the requested metrics. In a production environment, this would render an interactive chart using a library like Recharts or Chart.js.\n\nThe data is available for visualization - this feature would require integration with a charting library.`,
      rowCount: data.rows.length,
    };
  }

  // Default response
  return {
    text: `I analyzed your query: "${prompt}"\n\nBased on the dataset with ${data.rowCount} rows and ${data.columnCount} columns, I can help you explore:\n- Stock performance metrics\n- Sector comparisons\n- Market cap rankings\n- P/E ratio analysis\n\nTry asking more specific questions about the data.`,
    rowCount: data.rowCount,
  };
}

interface UseDataExplorerReturn {
  data: ParsedData | null;
  isLoading: boolean;
  loadingProgress: number;
  error: string | null;
  searchTerm: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  visibleColumns: Set<string>;
  currentPage: number;
  pageSize: number;
  filteredData: Record<string, unknown>[];
  paginatedData: Record<string, unknown>[];
  totalPages: number;
  columnStats: Map<string, ColumnStats>;
  queryResults: QueryResultData[];
  isQuerying: boolean;
  handleFileUpload: (file: File) => Promise<void>;
  loadSampleData: () => Promise<void>;
  handleQuery: (prompt: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  toggleSort: (column: string) => void;
  toggleColumnVisibility: (column: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetData: () => void;
}

export function useDataExplorer(): UseDataExplorerReturn {
  const [data, setData] = useState<ParsedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [queryResults, setQueryResults] = useState<QueryResultData[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      let parsedData: ParsedData;

      if (file.name.endsWith('.csv')) {
        parsedData = await parseCSV(file);
      } else if (file.name.endsWith('.json')) {
        parsedData = await parseJSON(file);
      } else {
        throw new Error('Unsupported file format. Please upload a CSV or JSON file.');
      }

      setData(parsedData);
      setVisibleColumns(new Set(parsedData.headers));
      setSortColumn(null);
      setSortDirection('asc');
      setSearchTerm('');
      setCurrentPage(1);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  }, []);

  const loadSampleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLoadingProgress(0);

    try {
      const parsedData = await simulateFileUpload((progress) => {
        setLoadingProgress(progress);
      });

      setData(parsedData);
      setVisibleColumns(new Set(parsedData.headers));
      setSortColumn(null);
      setSortDirection('asc');
      setSearchTerm('');
      setCurrentPage(1);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  }, []);

  const handleQuery = useCallback(
    async (prompt: string) => {
      if (!data) return;

      setIsQuerying(true);

      // Simulate LLM processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

      // Generate a mock response based on the query
      // In a real app, this would call an LLM API
      const response = generateMockResponse(prompt, data);

      const result: QueryResultData = {
        id: Date.now().toString(),
        query: prompt,
        response: response.text,
        timestamp: new Date(),
        rowsAffected: response.rowCount,
      };

      setQueryResults((prev) => [result, ...prev]);
      setIsQuerying(false);
    },
    [data]
  );

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result = filterData(data.rows, searchTerm);

    if (sortColumn) {
      result = sortData(result, sortColumn, sortDirection);
    }

    return result;
  }, [data, searchTerm, sortColumn, sortDirection]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / pageSize);
  }, [filteredData.length, pageSize]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const columnStats = useMemo(() => {
    if (!data) return new Map<string, ColumnStats>();

    const stats = new Map<string, ColumnStats>();
    for (const header of data.headers) {
      stats.set(header, calculateColumnStats(data, header));
    }
    return stats;
  }, [data]);

  const toggleSort = useCallback((column: string) => {
    setSortColumn((prevColumn) => {
      if (prevColumn === column) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        return column;
      }
      setSortDirection('asc');
      return column;
    });
  }, []);

  const toggleColumnVisibility = useCallback((column: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(column)) {
        next.delete(column);
      } else {
        next.add(column);
      }
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    setData(null);
    setError(null);
    setSearchTerm('');
    setSortColumn(null);
    setSortDirection('asc');
    setVisibleColumns(new Set());
    setCurrentPage(1);
  }, []);

  return {
    data,
    isLoading,
    loadingProgress,
    error,
    searchTerm,
    sortColumn,
    sortDirection,
    visibleColumns,
    currentPage,
    pageSize,
    filteredData,
    paginatedData,
    totalPages,
    columnStats,
    queryResults,
    isQuerying,
    handleFileUpload,
    loadSampleData,
    handleQuery,
    setSearchTerm,
    toggleSort,
    toggleColumnVisibility,
    setCurrentPage,
    setPageSize,
    resetData,
  };
}
