import EditCapsuleForm from "@/components/ui/EditCapsuleForm";
import { capsulesService } from "@/services/capsulesService";
import { authService } from "@/services/authService";
import { redirect } from "next/navigation";

export default async function EditCapsulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: capsule } = await capsulesService.getByIdEdit(id);
  const { data: user } = await authService.getMe();

  if (capsule.owner !== user.id) {
    redirect(`/capsules/${id}`);
  }

  if (capsule.isUnlocked) {
    redirect(`/capsules/${id}`);
  }

  return <EditCapsuleForm capsule={capsule} />;
}
