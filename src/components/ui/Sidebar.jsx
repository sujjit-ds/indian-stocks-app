'use client'

export function Sidebar() {
  const menuItems = [
    { icon: 'S', label: 'StockPulse India', primary: true },
    { icon: 'M', label: 'Markets' },
    { icon: 'P', label: 'Portfolio' },
    { icon: 'W', label: 'Watchlist' },
    { icon: 'N', label: 'News' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot" />
        <span className="brand-text">ANTIGRAVITY</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, i) => (
          <button key={i} className={`nav-item ${item.primary ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
          Sign In
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          background: var(--bg-surface);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px 32px;
        }

        .brand-dot {
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 2px;
          box-shadow: 0 0 12px var(--accent-glow);
        }

        .brand-text {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 150ms ease;
          text-align: left;
        }

        .nav-item:hover {
          background: var(--bg-elevated);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: var(--accent-dim);
          color: var(--accent);
        }

        .nav-icon {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.75rem;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid currentColor;
          border-radius: 4px;
        }

        .nav-label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
        }

        .sidebar-footer {
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }

        /* Re-using button styles from spec */
        .btn-ghost {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          border-radius: 8px;
          padding: 9px 18px;
          cursor: pointer;
          transition: all 150ms ease;
          border: 1px solid var(--border-default);
          background: transparent;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-ghost:hover {
          border-color: var(--border-active);
          color: var(--text-primary);
          background: var(--bg-elevated);
        }
      `}</style>
    </aside>
  )
}
