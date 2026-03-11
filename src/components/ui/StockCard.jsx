'use client'
import { Sparkline } from '../charts/Sparkline'

export function StockCard({ ticker, name, price, change, changePct, sparkline }) {
  const isGain = change >= 0

  return (
    <article className={`stock-card ${isGain ? 'gain' : 'loss'}`}>
      <header className="card-header">
        <div className="ticker-info">
          <span className="ticker">{ticker}</span>
          <span className="name">{name}</span>
        </div>
        <span className={`badge ${isGain ? 'badge-gain' : 'badge-loss'}`}>
          {isGain ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
        </span>
      </header>

      {sparkline && (
        <div className="sparkline-container">
          <Sparkline data={sparkline} gain={isGain} />
        </div>
      )}

      <footer className="card-footer">
        <span className="price">₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        <span className={`change ${isGain ? 'text-gain' : 'text-loss'}`}>
          {isGain ? '+' : ''}{change.toFixed(2)}
        </span>
      </footer>

      <style jsx>{`
        .stock-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--shadow-card);
          cursor: pointer;
          transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stock-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--border-subtle);
          transition: background 200ms ease;
        }

        .stock-card.gain::before { background: var(--gain); box-shadow: 0 0 12px var(--gain); }
        .stock-card.loss::before { background: var(--loss); box-shadow: 0 0 12px var(--loss); }

        .stock-card:hover {
          border-color: var(--border-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-card), 0 16px 48px rgba(0,0,0,0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .ticker-info {
          display: flex;
          flex-direction: column;
        }

        .ticker {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }

        .name {
          display: block;
          font-size: 0.72rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }

        .badge-gain {
          color: var(--gain);
          background: var(--gain-dim);
          border: 1px solid rgba(0, 201, 122, 0.2);
        }

        .badge-loss {
          color: var(--loss);
          background: var(--loss-dim);
          border: 1px solid rgba(255, 77, 106, 0.2);
        }

        .sparkline-container {
          margin: 8px 0;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: auto;
        }

        .price {
          font-family: var(--font-mono);
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .change {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .text-gain { color: var(--gain); }
        .text-loss { color: var(--loss); }
      `}</style>
    </article>
  )
}
