import type { ParsedData } from './dataParser';

const stockSymbols = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'AMZN',
  'META',
  'NVDA',
  'TSLA',
  'JPM',
  'V',
  'JNJ',
  'WMT',
  'PG',
  'UNH',
  'HD',
  'MA',
  'DIS',
  'PYPL',
  'BAC',
  'ADBE',
  'NFLX',
  'CMCSA',
  'XOM',
  'VZ',
  'INTC',
  'T',
  'PFE',
  'KO',
  'PEP',
  'MRK',
  'ABT',
  'CVX',
  'CSCO',
  'TMO',
  'ABBV',
  'CRM',
  'NKE',
  'AVGO',
  'ACN',
  'COST',
  'MDT',
];

const sectors = [
  'Technology',
  'Healthcare',
  'Finance',
  'Consumer',
  'Energy',
  'Communications',
  'Industrial',
  'Materials',
  'Utilities',
  'Real Estate',
];

const ratings = ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max));
}

function randomChoice<T>(arr: readonly T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index] as T;
}

function generateStockData(count: number): Record<string, unknown>[] {
  const data: Record<string, unknown>[] = [];
  const usedSymbols = new Set<string>();

  for (let i = 0; i < count; i++) {
    let symbol = randomChoice(stockSymbols);
    // Ensure unique symbols by appending suffix if needed
    if (usedSymbols.has(symbol)) {
      symbol = `${symbol}${i}`;
    }
    usedSymbols.add(symbol);

    const price = randomBetween(10, 500);
    const change = randomBetween(-15, 15);
    const volume = randomInt(100000, 50000000);
    const marketCap = randomBetween(1, 3000) * 1e9;
    const pe = randomBetween(5, 100);
    const dividend = Math.random() > 0.3 ? randomBetween(0, 5) : 0;
    const high52w = price * randomBetween(1.1, 1.5);
    const low52w = price * randomBetween(0.5, 0.9);

    data.push({
      Symbol: symbol,
      Company: `${symbol} Corporation`,
      Sector: randomChoice(sectors),
      Price: Number(price.toFixed(2)),
      Change: Number(change.toFixed(2)),
      'Change %': Number(((change / price) * 100).toFixed(2)),
      Volume: volume,
      'Market Cap': Number((marketCap / 1e9).toFixed(2)),
      'P/E Ratio': Number(pe.toFixed(2)),
      'Dividend %': Number(dividend.toFixed(2)),
      '52W High': Number(high52w.toFixed(2)),
      '52W Low': Number(low52w.toFixed(2)),
      Rating: randomChoice(ratings),
      'YTD Return': Number(randomBetween(-30, 50).toFixed(2)),
    });
  }

  return data;
}

export function generateSampleStockData(rowCount: number = 100): ParsedData {
  const rows = generateStockData(rowCount);
  const firstRow = rows[0];
  const headers = firstRow ? Object.keys(firstRow) : [];

  return {
    headers,
    rows,
    rowCount: rows.length,
    columnCount: headers.length,
  };
}

export async function simulateFileUpload(
  progressCallback?: (progress: number) => void
): Promise<ParsedData> {
  // Simulate upload/processing delay
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    progressCallback?.((i / steps) * 100);
  }

  return generateSampleStockData(150);
}
