export default function CapsuleListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <CapsuleCardSkeleton key={i} />
      ))}
    </div>
  );
}

function CapsuleCardSkeleton() {
  return (
    <div className="rounded-2xl glass p-5 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-slate-700/60" />
            <div className="h-5 w-48 rounded-lg bg-slate-700/60" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-28 rounded-md bg-slate-800/80" />
            <div className="h-4 w-12 rounded-md bg-slate-800/80" />
          </div>
        </div>

        <div className="h-6 w-16 rounded-lg bg-slate-700/40" />
      </div>
    </div>
  );
}
