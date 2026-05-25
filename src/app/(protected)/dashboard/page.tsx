import Link from "next/link";
import { capsulesService } from "@/services/capsulesService";

export default async function DashboardPage() {
  const capsules = await capsulesService.getAll();
  // console.log(capsules.data);
  // console.log(capsules.headers);
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
        {/*<Link*/}
        {/*  href="/capsules/new"*/}
        {/*  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"*/}
        {/*>*/}
        {/*  <svg*/}
        {/*    className="w-5 h-5 mr-2"*/}
        {/*    fill="none"*/}
        {/*    stroke="currentColor"*/}
        {/*    viewBox="0 0 24 24"*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      strokeLinecap="round"*/}
        {/*      strokeLinejoin="round"*/}
        {/*      strokeWidth="2"*/}
        {/*      d="M12 4v16m8-8H4"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*  Create New Capsule*/}
        {/*</Link>*/}
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Capsules</h2>
          {/*<Link*/}
          {/*  href="/capsules"*/}
          {/*  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"*/}
          {/*>*/}
          {/*  View all →*/}
          {/*</Link>*/}
          <ul>
            {/*{capsules.data.map((capsule) => (*/}
            {/*  <li>{capsule.title}</li>*/}
            {/*))}*/}
          </ul>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-slate-800 p-12 text-center bg-slate-900/20 backdrop-blur-sm">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No capsules found
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            You haven&apos;t created any time capsules yet. Start preserving
            your memories today.
          </p>
        </div>
      </section>
    </div>
  );
}
