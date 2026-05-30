"use client";

import Link from "next/link";

export default function PublicCapsuleError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      <h2 className="text-3xl font-extrabold text-white mb-4">
        Access Denied
      </h2>

      <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
        This time capsule is either private, still locked, or doesn't exist. You don't have permission to view it right now.
      </p>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
