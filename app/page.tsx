import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeCapsule | Send a message to the future",
  description:
    "Securely encrypt your memories, secrets, or predictions. Lock them away and guarantee they remain untouched until the exact moment you choose to unlock them.",
};

export const revalidate = 3600;

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <nav className="relative z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏳</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TimeCapsule
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-primary text-sm px-5 py-2.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-24 text-center flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
          Send a Message to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Your Future Self.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Securely encrypt your memories, secrets, or predictions. Lock them
          away and guarantee they remain untouched until the exact moment you
          choose to unlock them.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="btn-primary px-8 py-4 text-lg w-full sm:w-auto shadow-lg shadow-indigo-500/25"
          >
            Create Your First Capsule
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-xl glass text-white hover:bg-slate-800/50 transition-colors font-medium border border-slate-700 w-full sm:w-auto text-lg flex items-center justify-center"
          >
            Go to Dashboard &rarr;
          </Link>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8 text-left">
          <div className="glass p-8 rounded-3xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors group">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform border border-indigo-500/20">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Write & Attach
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Pour out your thoughts, wishes, or secrets. Attach them safely in
              a digital vessel built to last into the future.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/30 transition-colors group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform border border-purple-500/20">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Lock & Encrypt
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Set an exact unlock date. Until then, your capsule is securely
              encrypted and completely inaccessible.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform border border-emerald-500/20">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Experience & Share
            </h3>
            <p className="text-slate-400 leading-relaxed">
              When the time comes, open your capsule and relive the past. Add
              friends to notify them when it unlocks.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800 py-8 mt-auto text-center text-slate-500 text-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏳</span>
            <span className="font-semibold text-slate-300">TimeCapsule</span>
          </div>
          <p>© {new Date().getFullYear()} TimeCapsule. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}
