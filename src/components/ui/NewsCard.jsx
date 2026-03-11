export default function NewsCard({ news }) {
  return (
    <div className="group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
          {news.category}
        </span>
        <span className="text-[10px] font-medium text-slate-500">{news.time}</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 leading-relaxed">
        {news.title}
      </h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-500 uppercase">{news.source}</span>
        <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
  );
}
