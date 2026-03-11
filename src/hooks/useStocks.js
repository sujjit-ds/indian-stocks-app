'use client';

import { useState, useEffect, useMemo } from 'react';
import { MOCK_STOCKS } from '../data/mockStocks';

export const useStocks = (searchQuery = '') => {
  const [stocks, setStocks] = useState(MOCK_STOCKS);

  // Simulate real-time price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks => 
        currentStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 5,
          change: stock.change + (Math.random() - 0.5) * 0.1
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stocks, searchQuery]);

  return { stocks: filteredStocks };
};
