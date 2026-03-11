'use client';

import { useState, useMemo } from 'react';
import { MOCK_STOCKS, MOCK_NEWS } from '../lib/data';
import { StockCard } from '../components/ui/StockCard';
import { TickerTape } from '../components/ui/TickerTape';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = useMemo(() => {
    return MOCK_STOCKS.filter(stock => 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const tickerData = useMemo(() => {
    return MOCK_STOCKS.slice(0, 5).map(s => ({
      symbol: s.symbol,
      price: s.price,
      change: s.change,
      changePct: s.changePct
    }));
  }, []);

  return (
    <div className="dashboard-content animate-fade-up">
      <TickerTape tickers={tickerData} />
      
      <div className="dashboard-grid">
        <section className="market-section">
          <header className="section-header">
            <div>
              <h1 className="display-title">Market Overview</h1>
              <p className="subtitle">Real-time insights into major Indian indices and equities.</p>
            </div>
          </header>

          <div className="stock-grid">
            {filteredStocks.map(stock => (
              <StockCard 
                key={stock.symbol}
                ticker={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                changePct={stock.changePct}
                sparkline={stock.sparkline}
              />
            ))}
          </div>

          {filteredStocks.length === 0 && (
            <div className="empty-state">
              <p>No symbols found matching "{searchQuery}"</p>
            </div>
          )}
        </section>

        <aside className="news-sidebar">
          <h2 className="section-title">Latest Intelligence</h2>
          <div className="news-list">
            {MOCK_NEWS.map(news => (
              <article key={news.id} className="news-item">
                <div className="news-meta">
                  <span className="news-category">{news.category}</span>
                  <span className="news-time">{news.time}</span>
                </div>
                <h3 className="news-heading">{news.title}</h3>
                <span className="news-source">{news.source}</span>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <style jsx>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
        }

        .section-header {
          margin-bottom: 32px;
        }

        .display-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .stock-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .news-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .news-item {
          padding: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          transition: border-color 150ms ease;
        }

        .news-item:hover {
          border-color: var(--border-active);
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .news-category {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .news-time {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .news-heading {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .news-source {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .empty-state {
          padding: 80px 0;
          text-align: center;
          color: var(--text-muted);
          border: 1px dashed var(--border-subtle);
          border-radius: 24px;
        }

        @media (max-width: 1100px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .news-sidebar {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
