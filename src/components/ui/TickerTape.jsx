'use client'

export function TickerTape({ tickers }) {
  const doubled = [...tickers, ...tickers] // seamless loop

  return (
    <div className="ticker-tape" aria-live="off" aria-label="Live market ticker">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className={`ticker-item ${t.change >= 0 ? 'gain' : 'loss'}`}>
            <strong>{t.symbol}</strong>
            <span className="mono">₹{t.price.toFixed(2)}</span>
            <span>{t.change >= 0 ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker-tape {
          width: 100%;
          overflow: hidden;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border-subtle);
          padding: 8px 0;
        }

        .ticker-track {
          display: flex;
          gap: 48px;
          width: max-content;
          animation: scroll-ticker 40s linear infinite;
        }

        .ticker-tape:hover .ticker-track {
          animation-play-state: paused;
        }

        @keyframes scroll-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .ticker-item {
          display: flex;
          gap: 8px;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          white-space: nowrap;
          color: var(--text-secondary);
        }

        .ticker-item strong {
          font-family: var(--font-display);
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.8rem;
        }

        .ticker-item.gain span:last-child { color: var(--gain); }
        .ticker-item.loss span:last-child { color: var(--loss); }
      `}</style>
    </div>
  )
}
