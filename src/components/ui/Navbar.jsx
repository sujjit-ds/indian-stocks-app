'use client';

import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <nav className="glass-nav px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
          S
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-gradient">
          StockPulse <span className="text-sm font-normal text-slate-500 opacity-80">India</span>
        </span>
      </div>

      <div className="flex-1 max-w-md mx-12">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            placeholder="Search symbols like RELIANCE, TCS..."
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md transition-all placeholder:text-slate-500"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors">Markets</div>
        <div className="text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors">Portfolio</div>
        <button className="btn-primary">Sign In</button>
      </div>
    </nav>
  );
}
