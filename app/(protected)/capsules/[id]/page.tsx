import CapsuleComponent from "@/components/shared/CapsuleComponent";
import { capsulesService } from "@/services/capsulesService";
import { authService } from "@/services/authService";

export default async function CapsulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await capsulesService.getById(id);
  const user = await authService.getMe();
  return (
    <>
      <CapsuleComponent capsule={data} currentUserId={user.data.id} />
    </>
  );
}
