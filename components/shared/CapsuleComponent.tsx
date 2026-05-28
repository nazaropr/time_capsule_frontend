"use client";
import { CapsuleWithContent } from "@/types";
import CountDownTimer from "@/components/shared/CountdownTimer";
import { useTransition } from "react";
import { deleteCapsule } from "@/app/(protected)/capsules/actions";
import Link from "next/link";

interface IProps {
  capsule: CapsuleWithContent;
  currentUserId: string;
}

export default function CapsuleComponent({ capsule, currentUserId }: IProps) {
  const [isPending, startTransition] = useTransition();

  const isOwner = capsule.owner === currentUserId;

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this capsule? This action cannot be undone.",
      )
    ) {
      startTransition(async () => {
        await deleteCapsule(capsule.id);
      });
    }
  };

  const unlockDate = new Date(capsule.unlockAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{capsule.isUnlocked ? "🔓" : "🔒"}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white break-words">
              {capsule.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
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
            {capsule.isPublic && (
              <span className="flex items-center gap-1.5 text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded text-xs font-medium border border-indigo-500/20">
                Public
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all border border-slate-700 text-sm"
          >
            ← Back to Dashboard
          </Link>
          {isOwner && !capsule.isUnlocked && (
            <Link
              href={`/capsules/${capsule.id}/edit`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium hover:bg-indigo-500/20 transition-all border border-indigo-500/20 text-sm"
            >
              Edit
            </Link>
          )}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-all border border-red-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

        {capsule.isUnlocked ? (
          <div className="relative">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 border-b border-slate-800 pb-4">
              Capsule Content
            </h3>
            <div className="prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-headings:text-white">
              {/* Using pre for basic text rendering, would use a markdown parser here normally */}
              <pre className="font-sans whitespace-pre-wrap text-lg leading-relaxed bg-transparent p-0 m-0 border-0 text-slate-300">
                {capsule.content}
              </pre>
            </div>

            {capsule.recipients.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-800/50">
                <h4 className="text-sm font-medium text-slate-400 mb-3">
                  Delivered to:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {capsule.recipients.map((recipient, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50"
                    >
                      {recipient.email}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative text-center py-10 text-slate-300 space-y-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                Time stands still
              </h3>
              <p className="text-slate-400">
                This capsule is securely locked. Its contents will be revealed
                exactly at the chosen time.
              </p>
            </div>

            <div className="py-6">
              <CountDownTimer unlockAt={capsule.unlockAt} />
            </div>

            {capsule.recipients.length > 0 && (
              <div className="max-w-lg mx-auto pt-8 border-t border-slate-800/50 text-left">
                <h4 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
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
                  Recipients waiting
                </h4>
                <div className="flex flex-wrap gap-2">
                  {capsule.recipients.map((recipient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-slate-800/80 text-slate-300 border border-slate-700 shadow-sm"
                    >
                      {recipient.email}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
