'use client';

import Sparkline from './Sparkline';
import GlassContainer from './GlassContainer';

export default function StockCard({ stock, isFavorite, onToggleFavorite }) {
  const isPositive = stock.change >= 0;

  return (
    <GlassContainer className="flex flex-col gap-4 group cursor-pointer border-transparent hover:border-blue-500/30">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">{stock.sector}</span>
          <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">{stock.symbol}</span>
          <span className="text-sm text-slate-400 truncate max-w-[140px]">{stock.name}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(stock.id);
          }}
          className={`p-2 rounded-full transition-all ${isFavorite ? 'text-red-500 bg-red-500/10' : 'text-slate-500 hover:bg-white/5'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <div className="text-2xl font-bold tracking-tight">₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}%
          </div>
        </div>
        <div className="pb-1">
          <Sparkline color={isPositive ? '#10b981' : '#ef4444'} />
        </div>
      </div>
      
      <div className="mt-2 pt-4 border-t border-white/5 flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
        <div>Vol: <span className="text-slate-300">{stock.volume}</span></div>
        <div>Sector: <span className="text-slate-300">{stock.sector}</span></div>
      </div>
    </GlassContainer>
  );
}
