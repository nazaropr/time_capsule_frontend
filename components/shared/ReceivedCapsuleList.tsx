import { capsulesService } from "@/services/capsulesService";
import CapsuleCard from "@/components/shared/CapsuleCard";

export async function ReceivedList() {
  const capsules = await capsulesService.getReceived();

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
            <span className="text-2xl">📥</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No received capsules
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            You haven't received any time capsules yet. Share your email with
            friends so they can send you one!
          </p>
        </div>
      )}
    </>
  );
}
