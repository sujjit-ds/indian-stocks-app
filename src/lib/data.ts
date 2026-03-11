import { StockQuote, NewsItem } from './types';

export const MOCK_STOCKS: StockQuote[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2945.50, change: 35.10, changePct: 1.20, sector: 'Energy', volume: '1.2M', sparkline: [2900, 2910, 2905, 2920, 2930, 2945] },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.30, change: -20.50, changePct: -0.50, sector: 'IT Services', volume: '0.8M', sparkline: [4150, 4140, 4160, 4130, 4125, 4120] },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1450.15, change: 11.60, changePct: 0.80, sector: 'Banking', volume: '4.5M', sparkline: [1430, 1435, 1440, 1442, 1445, 1450] },
  { symbol: 'INFY', name: 'Infosys', price: 1620.45, change: 33.20, changePct: 2.10, sector: 'IT Services', volume: '2.1M', sparkline: [1580, 1590, 1600, 1610, 1615, 1620] },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1085.90, change: -13.20, changePct: -1.20, sector: 'Banking', volume: '3.2M', sparkline: [1100, 1095, 1090, 1092, 1088, 1085] },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2380.00, change: 7.14, changePct: 0.30, sector: 'FMCG', volume: '0.5M', sparkline: [2370, 2375, 2372, 2378, 2379, 2380] },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1210.60, change: 40.95, changePct: 3.50, sector: 'Telecom', volume: '1.8M', sparkline: [1160, 1170, 1185, 1195, 1205, 1210] },
  { symbol: 'SBIN', name: 'State Bank of India', price: 760.25, change: 0.76, changePct: 0.10, sector: 'Banking', volume: '12M', sparkline: [758, 759, 760, 759, 760, 760.25] },
  { symbol: 'LTIM', name: 'LTIMindtree', price: 5240.00, change: -129.00, changePct: -2.40, sector: 'IT Services', volume: '0.3M', sparkline: [5380, 5350, 5320, 5290, 5260, 5240] },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 3150.00, change: 155.80, changePct: 5.20, sector: 'Conglomerate', volume: '2.5M', sparkline: [2980, 3020, 3050, 3100, 3120, 3150] },
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 1, title: "Nifty 50 touches all-time high as auto stocks rally", source: "Economic Times", time: "2h ago", category: "Market" },
  { id: 2, title: "Reliance to invest $10B in new energy projects", source: "Mint", time: "4h ago", category: "Corporate" },
  { id: 3, title: "RBI keeps repo rates unchanged for the fifth time", source: "Financial Express", time: "6h ago", category: "Policy" },
  { id: 4, title: "TCS beats market estimates with strong Q3 results", source: "CNBC TV18", time: "1d ago", category: "Earnings" }
];
