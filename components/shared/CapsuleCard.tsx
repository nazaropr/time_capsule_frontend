import { Capsule } from "@/types";
import Link from "next/link";

interface IProps {
  capsule: Capsule;
}

export default function CapsuleCard({ capsule }: IProps) {
  const isUnlocked = capsule.isUnlocked;
  const unlockDate = new Date(capsule.unlockAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/capsules/${capsule.id}`}
      className="group block rounded-2xl glass p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {isUnlocked ? "🔓" : "🔒"}
            </span>
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
              {capsule.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {unlockDate}
            </span>

            {capsule.recipients.length > 0 && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {capsule.recipients.length}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          {isUnlocked ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Locked
            </span>
          )}
        </div>
      </div>

      {capsule.isPublic && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Public capsule
          </span>
        </div>
      )}
    </Link>
  );
}
