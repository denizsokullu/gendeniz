import Papa from 'papaparse';

export interface ParsedData {
  headers: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  columnCount: number;
}

export interface ColumnStats {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'mixed';
  nullCount: number;
  uniqueCount: number;
  min?: number;
  max?: number;
  mean?: number;
}

export function parseCSV(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data as Record<string, unknown>[];
        const headers = results.meta.fields || [];

        resolve({
          headers,
          rows: data,
          rowCount: data.length,
          columnCount: headers.length,
        });
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      },
    });
  });
}

export function parseJSON(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);

        let rows: Record<string, unknown>[];

        if (Array.isArray(json)) {
          rows = json;
        } else if (typeof json === 'object' && json !== null) {
          // Handle nested data
          const possibleArrayKeys = Object.keys(json).filter((key) => Array.isArray(json[key]));
          const firstArrayKey = possibleArrayKeys[0];
          if (firstArrayKey !== undefined) {
            rows = json[firstArrayKey];
          } else {
            rows = [json];
          }
        } else {
          throw new Error('Invalid JSON format');
        }

        const headers = rows.length > 0 ? Object.keys(rows[0] as Record<string, unknown>) : [];

        resolve({
          headers,
          rows,
          rowCount: rows.length,
          columnCount: headers.length,
        });
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${(error as Error).message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

export function calculateColumnStats(data: ParsedData, columnName: string): ColumnStats {
  const values = data.rows.map((row) => row[columnName]);
  const nonNullValues = values.filter((v) => v !== null && v !== undefined && v !== '');
  const uniqueValues = new Set(nonNullValues);

  let type: ColumnStats['type'] = 'string';
  const types = new Set(nonNullValues.map((v) => typeof v));

  if (types.size === 1) {
    const singleType = types.values().next().value;
    if (singleType === 'number') type = 'number';
    else if (singleType === 'boolean') type = 'boolean';
  } else if (types.size > 1) {
    type = 'mixed';
  }

  const stats: ColumnStats = {
    name: columnName,
    type,
    nullCount: values.length - nonNullValues.length,
    uniqueCount: uniqueValues.size,
  };

  if (type === 'number') {
    const numbers = nonNullValues as number[];
    stats.min = Math.min(...numbers);
    stats.max = Math.max(...numbers);
    stats.mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  return stats;
}

export function sortData(
  data: Record<string, unknown>[],
  column: string,
  direction: 'asc' | 'desc'
): Record<string, unknown>[] {
  return [...data].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];

    if (aVal === null || aVal === undefined) return direction === 'asc' ? 1 : -1;
    if (bVal === null || bVal === undefined) return direction === 'asc' ? -1 : 1;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    return direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
}

export function filterData(
  data: Record<string, unknown>[],
  searchTerm: string
): Record<string, unknown>[] {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();

  return data.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(term))
  );
}
