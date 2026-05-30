import Link from "next/link";
import CapsuleList from "@/components/shared/CapsuleList";
import { Suspense } from "react";
import CapsuleListSkeleton from "@/components/skeletons/CapsuleListSkeleton";

export default async function DashboardPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome back, Explorer
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Your digital legacy is safe and waiting for its time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 md:mt-0">
          <Link
            href="/capsules/received"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20 active:scale-95 border border-slate-700"
          >
            <span className="mr-2 text-xl">📥</span>
            Received
          </Link>
          <Link
            href="/capsules/new"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Capsule
          </Link>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Capsules</h2>
        </div>
        <Suspense fallback={<CapsuleListSkeleton />}>
          <CapsuleList />
        </Suspense>
      </section>
    </div>
  );
}
