export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  sector: string;
  volume: string;
  sparkline?: number[];
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
}

export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
}
