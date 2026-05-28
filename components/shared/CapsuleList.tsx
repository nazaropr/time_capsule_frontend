import { capsulesService } from "@/services/capsulesService";
import CapsuleCard from "@/components/shared/CapsuleCard";

export default async function CapsuleList() {
  const capsules = await capsulesService.getAll();

  return (
    <>
      {capsules.data.length > 0 ? (
        <div className="grid gap-4">
          {capsules.data.map((capsule) => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))}
        </div>
      ) : (
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
      )}
    </>
  );
}
