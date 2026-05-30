export default function CapsuleDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      {/* Header Info */}
      <div className="glass rounded-3xl p-8 border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4 w-full">
          {/* Title */}
          <div className="h-10 bg-slate-800 rounded-xl w-3/4"></div>
          {/* Status badge */}
          <div className="h-6 bg-slate-800 rounded-full w-24"></div>
          {/* Dates & Owner */}
          <div className="flex gap-4">
            <div className="h-5 bg-slate-800 rounded-md w-32"></div>
            <div className="h-5 bg-slate-800 rounded-md w-40"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass rounded-3xl p-8 border-slate-700/50 min-h-[300px] flex flex-col items-center justify-center space-y-6">
        {/* Countdown pseudo-skeleton */}
        <div className="h-20 bg-slate-800 rounded-2xl w-full max-w-sm"></div>
        <div className="h-6 bg-slate-800 rounded-xl w-2/3"></div>
        <div className="h-6 bg-slate-800 rounded-xl w-1/2"></div>
      </div>

      {/* Recipients list dummy */}
      <div className="glass rounded-3xl p-8 border-slate-700/50">
        <div className="h-8 bg-slate-800 rounded-xl w-48 mb-6"></div>
        <div className="space-y-3">
          <div className="h-12 bg-slate-800 rounded-xl w-full"></div>
          <div className="h-12 bg-slate-800 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
