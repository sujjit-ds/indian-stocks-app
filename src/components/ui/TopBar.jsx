'use client'

export function TopBar() {
  return (
    <header className="topbar">
      <div className="search-container">
        <span className="search-icon">⌕</span>
        <input 
          type="text" 
          placeholder="Search symbols like RELIA" 
          className="search-input"
        />
      </div>

      <div className="topbar-actions">
        <div className="status-indicator">
          <span className="live-dot">
            <span className="live-dot-ping" />
            <span className="live-dot-core" />
          </span>
          <span className="status-text">LIVE MARKET</span>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          height: 64px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          max-width: 480px;
        }

        .search-icon {
          color: var(--text-muted);
          font-size: 1.2rem;
        }

        .search-input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 0.85rem;
          width: 100%;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--gain);
        }

        .live-dot {
          position: relative;
          display: inline-flex;
          width: 8px;
          height: 8px;
        }

        .live-dot-core {
          position: absolute;
          inset: 0;
          background: var(--gain);
          border-radius: 50%;
        }

        .live-dot-ping {
          position: absolute;
          inset: 0;
          background: var(--gain);
          border-radius: 50%;
          opacity: 0.4;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.4; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </header>
  )
}
