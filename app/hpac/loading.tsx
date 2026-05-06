export default function HpacLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-slate-200 rounded-lg mb-6"></div>
        
        {/* Header Skeleton */}
        <div className="space-y-4 mb-10">
          <div className="h-6 w-24 bg-emerald-100 rounded-full"></div>
          <div className="h-10 w-64 bg-slate-200 rounded-2xl"></div>
          <div className="h-4 w-96 bg-slate-200 rounded-lg"></div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6">
          <div className="h-64 bg-white rounded-[2rem] border border-slate-100 shadow-sm"></div>
          <div className="h-48 bg-slate-100/50 rounded-[2rem] border border-dashed border-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
