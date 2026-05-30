import Link from "next/link";
import { Suspense } from "react";
import CapsuleListSkeleton from "@/components/skeletons/CapsuleListSkeleton";
import { ReceivedList } from "@/components/shared/ReceivedCapsuleList";

export default async function ReceivedCapsulesPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Received Capsules
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Time capsules sent to your email by others.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all border border-slate-700 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </header>

      <section>
        <Suspense fallback={<CapsuleListSkeleton />}>
          <ReceivedList />
        </Suspense>
      </section>
    </div>
  );
}
