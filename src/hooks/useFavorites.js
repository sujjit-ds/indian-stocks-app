'use client';

import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('stock-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (stockId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(stockId)
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId];
      
      localStorage.setItem('stock-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (stockId) => favorites.includes(stockId);

  return { favorites, toggleFavorite, isFavorite };
};
