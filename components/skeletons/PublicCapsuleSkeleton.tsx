export default function PublicCapsuleSkeleton() {
  return (
    <div className="py-10 max-w-4xl mx-auto space-y-8 animate-pulse">
      {/* Header Info */}
      <div className="glass rounded-3xl p-8 border-indigo-500/10 flex flex-col items-center text-center gap-6">
        <div className="h-12 bg-slate-800 rounded-2xl w-2/3"></div>
        <div className="h-6 bg-slate-800 rounded-full w-32"></div>
      </div>

      {/* Main Content Area */}
      <div className="glass rounded-3xl p-8 border-slate-700/50 min-h-[300px] flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 bg-slate-800 rounded-full"></div>
        <div className="h-16 bg-slate-800 rounded-2xl w-full max-w-sm"></div>
        <div className="h-6 bg-slate-800 rounded-xl w-1/2"></div>
      </div>
    </div>
  );
}
