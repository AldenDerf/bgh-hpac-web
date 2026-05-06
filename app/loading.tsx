export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Main Spinner */}
        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Pulsing Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 animate-pulse">
            <span className="text-white font-black text-[10px]">BGH</span>
          </div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-slate-900 font-black text-sm tracking-widest uppercase animate-pulse">
          Syncing Portal
        </p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
