import { capsulesService } from "@/services/capsulesService";
import CapsuleComponent from "@/components/shared/CapsuleComponent";
import { authService } from "@/services/authService";

export default async function PublicCapsulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: capsule } = await capsulesService.getBySlug(slug);

  let currentUserId = "";
  try {
    const userRes = await authService.getMe();
    currentUserId = userRes?.data?.id || "";
  } catch {}

  return (
    <div className="py-10">
      <CapsuleComponent capsule={capsule} currentUserId={currentUserId} />
    </div>
  );
}
