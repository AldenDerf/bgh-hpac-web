export default function AdminLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-slate-200 rounded-lg mb-6"></div>
        
        {/* Header Skeleton */}
        <div className="space-y-4 mb-10">
          <div className="h-6 w-24 bg-blue-100 rounded-full"></div>
          <div className="h-10 w-64 bg-slate-200 rounded-2xl"></div>
          <div className="h-4 w-96 bg-slate-200 rounded-lg"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 rounded-3xl"></div>
        </div>

        {/* Table/Card Skeleton */}
        <div className="h-96 bg-white rounded-[2rem] border border-slate-100 shadow-sm"></div>
      </div>
    </div>
  );
}
