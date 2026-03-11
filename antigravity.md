# Antigravity — Next.js Stock Application UI Guide

> A production-grade design & code system for a high-performance stock trading dashboard.
> Aesthetic direction: **Dark editorial + data-rich brutalism** — think Bloomberg Terminal meets Figma's design sensibility.

---

## Aesthetic Direction

**Theme**: Deep space dark. Monochromatic base with surgical neon accents. Data is the hero.  
**Tone**: Precision. Speed. Authority. Every pixel earns its place.  
**Memorable element**: Micro-animated ticker tape + glowing line charts on black glass cards.

---

## Typography

```css
/* Import in globals.css */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;     /* Headers, tickers, labels */
  --font-mono:    'JetBrains Mono', monospace; /* Prices, numbers, data */
}
```

- **Syne** — geometric, authoritative, slightly alien. Perfect for stock names and headers.
- **JetBrains Mono** — crisp monospace for all numerical data. Instantly legible at speed.

---

## Color System

```css
:root {
  /* Base */
  --bg-base:        #080b10;
  --bg-surface:     #0d1117;
  --bg-elevated:    #151b23;
  --bg-overlay:     #1c2430;

  /* Borders */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-active:  rgba(255, 255, 255, 0.20);

  /* Text */
  --text-primary:   #e8edf3;
  --text-secondary: #7d8fa3;
  --text-muted:     #3d4e62;

  /* Accent — Electric Teal */
  --accent:         #00d4aa;
  --accent-dim:     rgba(0, 212, 170, 0.12);
  --accent-glow:    rgba(0, 212, 170, 0.35);

  /* Semantic */
  --gain:           #00c97a;
  --gain-dim:       rgba(0, 201, 122, 0.12);
  --loss:           #ff4d6a;
  --loss-dim:       rgba(255, 77, 106, 0.12);
  --neutral:        #5b7fa6;

  /* Elevation shadows */
  --shadow-card:    0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3);
  --shadow-glow:    0 0 24px var(--accent-glow);
}
```

---

## Layout Architecture (`app/layout.tsx`)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Antigravity — Markets',
  description: 'Real-time stock intelligence platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-base antialiased">
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">
            <TopBar />
            <div className="page-body">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
```

```css
/* globals.css */
.app-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
  background: var(--bg-base);
}

.main-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-body {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--bg-overlay) transparent;
}
```

---

## Component Patterns

### Stock Card

```tsx
// components/StockCard.tsx
interface StockCardProps {
  ticker: string
  name: string
  price: number
  change: number
  changePct: number
  sparkline?: number[]
}

export function StockCard({ ticker, name, price, change, changePct, sparkline }: StockCardProps) {
  const isGain = change >= 0

  return (
    <article className={`stock-card ${isGain ? 'gain' : 'loss'}`}>
      <header className="card-header">
        <div>
          <span className="ticker">{ticker}</span>
          <span className="name">{name}</span>
        </div>
        <span className={`badge ${isGain ? 'badge-gain' : 'badge-loss'}`}>
          {isGain ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
        </span>
      </header>

      {sparkline && <Sparkline data={sparkline} gain={isGain} />}

      <footer className="card-footer">
        <span className="price">${price.toFixed(2)}</span>
        <span className={`change ${isGain ? 'text-gain' : 'text-loss'}`}>
          {isGain ? '+' : ''}{change.toFixed(2)}
        </span>
      </footer>
    </article>
  )
}
```

```css
/* Card base */
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

/* Typography within card */
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
}

.text-gain { color: var(--gain); }
.text-loss { color: var(--loss); }
```

### Badge

```css
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
```

---

## Sparkline Component

```tsx
// components/Sparkline.tsx
'use client'
import { useEffect, useRef } from 'react'

interface SparklineProps {
  data: number[]
  gain: boolean
  height?: number
}

export function Sparkline({ data, gain, height = 48 }: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length < 2) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.offsetWidth
    const h = height
    canvas.width = w
    canvas.height = h

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const pts = data.map((v, i) => ({
      x: (i / (data.length - 1)) * w,
      y: h - ((v - min) / range) * (h * 0.85) - h * 0.075,
    }))

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h)
    const color = gain ? '0, 201, 122' : '255, 77, 106'
    grad.addColorStop(0, `rgba(${color}, 0.25)`)
    grad.addColorStop(1, `rgba(${color}, 0)`)

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    ctx.lineTo(pts[pts.length - 1].x, h)
    ctx.lineTo(pts[0].x, h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    ctx.strokeStyle = gain ? 'var(--gain)' : 'var(--loss)'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [data, gain, height])

  return <canvas ref={canvasRef} className="sparkline" style={{ width: '100%', height }} />
}
```

---

## Ticker Tape (Animated)

```tsx
// components/TickerTape.tsx
export function TickerTape({ tickers }: { tickers: TickerItem[] }) {
  const doubled = [...tickers, ...tickers] // seamless loop

  return (
    <div className="ticker-tape" aria-live="off" aria-label="Live market ticker">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className={`ticker-item ${t.change >= 0 ? 'gain' : 'loss'}`}>
            <strong>{t.symbol}</strong>
            <span className="mono">${t.price.toFixed(2)}</span>
            <span>{t.change >= 0 ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

```css
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
```

---

## Data Grid / Watchlist Table

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.data-table thead th {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 10px 16px;
  text-align: right;
  border-bottom: 1px solid var(--border-subtle);
}

.data-table thead th:first-child { text-align: left; }

.data-table tbody tr {
  border-bottom: 1px solid var(--border-subtle);
  transition: background 150ms ease;
}

.data-table tbody tr:hover {
  background: var(--bg-elevated);
}

.data-table tbody td {
  padding: 12px 16px;
  color: var(--text-primary);
  text-align: right;
}

.data-table tbody td:first-child { text-align: left; }

/* Highlight on update */
@keyframes flash-gain {
  0%   { background: var(--gain-dim); }
  100% { background: transparent; }
}
@keyframes flash-loss {
  0%   { background: var(--loss-dim); }
  100% { background: transparent; }
}

.cell-updated-gain { animation: flash-gain 600ms ease-out; }
.cell-updated-loss { animation: flash-loss 600ms ease-out; }
```

---

## Glassmorphism Panel (Detail View)

```css
.glass-panel {
  background: rgba(13, 17, 23, 0.75);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
}

/* Accent ring variant */
.glass-panel.accent {
  border-color: var(--accent);
  box-shadow: var(--shadow-card), 0 0 32px var(--accent-glow);
}
```

---

## Button System

```css
/* Base */
.btn {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  border-radius: 8px;
  padding: 9px 18px;
  cursor: pointer;
  transition: all 150ms ease;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Primary */
.btn-primary {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
}
.btn-primary:hover {
  background: transparent;
  color: var(--accent);
  box-shadow: var(--shadow-glow);
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border-color: var(--border-default);
}
.btn-ghost:hover {
  border-color: var(--border-active);
  color: var(--text-primary);
  background: var(--bg-elevated);
}

/* Danger */
.btn-danger {
  background: var(--loss-dim);
  color: var(--loss);
  border-color: rgba(255, 77, 106, 0.3);
}
.btn-danger:hover {
  background: var(--loss);
  color: #fff;
}
```

---

## Animation Utilities

```css
/* Page entrance */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px var(--accent-glow); }
  50%       { box-shadow: 0 0 24px var(--accent-glow); }
}

.animate-fade-up {
  animation: fade-up 0.4s ease both;
}

/* Staggered children */
.stagger > * {
  animation: fade-up 0.4s ease both;
}
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 60ms; }
.stagger > *:nth-child(3) { animation-delay: 120ms; }
.stagger > *:nth-child(4) { animation-delay: 180ms; }
.stagger > *:nth-child(5) { animation-delay: 240ms; }
.stagger > *:nth-child(6) { animation-delay: 300ms; }
```

---

## Live Price Indicator

```tsx
// components/LiveDot.tsx
export function LiveDot() {
  return (
    <span className="live-dot" aria-label="Live data">
      <span className="live-dot-ping" />
      <span className="live-dot-core" />
    </span>
  )
}
```

```css
.live-dot {
  position: relative;
  display: inline-flex;
  width: 10px;
  height: 10px;
}

.live-dot-core {
  position: absolute;
  inset: 2px;
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
```

---

## Next.js Best Practices

### Server vs Client Components

```tsx
// Default: Server Component — no 'use client' needed
// app/page.tsx
import { getTopStocks } from '@/lib/data'
import { StockGrid } from '@/components/StockGrid'

export default async function DashboardPage() {
  const stocks = await getTopStocks()  // Runs on server, zero JS to client
  return <StockGrid initialData={stocks} />
}

// Client component only when needed (interactivity, hooks, browser APIs)
// components/StockGrid.tsx
'use client'
import { useState } from 'react'
```

### Data Fetching Patterns

```tsx
// lib/data.ts — Server-side fetch with caching
export async function getStockQuote(symbol: string) {
  const res = await fetch(`https://api.example.com/quote/${symbol}`, {
    next: { revalidate: 30 }, // ISR: revalidate every 30s
  })
  if (!res.ok) throw new Error(`Failed to fetch ${symbol}`)
  return res.json()
}

// For real-time: use route handlers + WebSocket/SSE
// app/api/stream/route.ts
export async function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        controller.enqueue(`data: ${JSON.stringify(getPriceUpdate())}\n\n`)
      }, 1000)
      req.signal.addEventListener('abort', () => clearInterval(interval))
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

### Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, providers)
│   ├── page.tsx            # Dashboard
│   ├── stocks/
│   │   └── [symbol]/
│   │       └── page.tsx    # Stock detail
│   └── api/
│       └── stream/route.ts # SSE price stream
├── components/
│   ├── ui/                 # Primitives (Button, Badge, Card)
│   ├── charts/             # Chart components
│   ├── StockCard.tsx
│   ├── TickerTape.tsx
│   └── Sparkline.tsx
├── lib/
│   ├── data.ts             # Server-side fetchers
│   ├── utils.ts            # Formatters, helpers
│   └── types.ts            # Shared TypeScript types
├── hooks/
│   └── useLivePrices.ts    # SSE hook
└── styles/
    └── globals.css
```

### TypeScript Types

```ts
// lib/types.ts
export interface StockQuote {
  symbol: string
  name: string
  price: number
  open: number
  high: number
  low: number
  volume: number
  change: number
  changePct: number
  marketCap: number
  pe: number | null
  lastUpdated: string
}

export interface WatchlistItem {
  symbol: string
  addedAt: string
  notes?: string
}

export type SortField = 'price' | 'changePct' | 'marketCap' | 'volume'
export type SortDirection = 'asc' | 'desc'
```

### Performance

```tsx
// Virtualize large lists
import { useVirtualizer } from '@tanstack/react-virtual'

// Debounce search
import { useDeferredValue } from 'react'
const deferredQuery = useDeferredValue(searchQuery)

// Optimize images
import Image from 'next/image'
// Use next/image for all stock logos

// Memoize expensive computations
const sortedStocks = useMemo(
  () => [...stocks].sort((a, b) => a[sortField] - b[sortField]),
  [stocks, sortField]
)
```

---

## Accessibility

```css
/* Focus visible — never remove, just style it */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ticker-track        { animation: none; }
  .animate-fade-up     { animation: none; }
  .live-dot-ping       { animation: none; }
  *                    { transition-duration: 0ms !important; }
}
```

```tsx
// Always label interactive regions
<table aria-label="Watchlist — sorted by change percentage">
<section aria-labelledby="portfolio-heading">
<button aria-pressed={isWatching} aria-label={`Watch ${symbol}`}>
```

---

## `tailwind.config.ts` Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:     '#080b10',
        surface:  '#0d1117',
        elevated: '#151b23',
        accent:   '#00d4aa',
        gain:     '#00c97a',
        loss:     '#ff4d6a',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up':  'fade-up 0.4s ease both',
        'ping-slow': 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
} satisfies Config
```

---

## Checklist

- [ ] `next/font` used for zero-layout-shift font loading  
- [ ] All server data fetching uses `fetch` with `next: { revalidate }` or `cache: 'no-store'`  
- [ ] Real-time price updates via SSE (not polling)  
- [ ] Semantic HTML: `<article>`, `<section>`, `<table>`, `<header>`, `<footer>`  
- [ ] `aria-live="polite"` on price cells that update  
- [ ] `prefers-reduced-motion` respected  
- [ ] Focus styles never removed — only restyled  
- [ ] `useMemo`/`useCallback` on sorted/filtered lists  
- [ ] Virtual list rendering for watchlists > 50 items  
- [ ] Error boundaries on all data-fetching components  
- [ ] Loading skeletons (not spinners) for async states  
- [ ] TypeScript strict mode enabled  
- [ ] `.env.local` for all API keys — never hardcoded