import { authService } from "@/services/authService";
import SettingsForms from "@/components/ui/SettingsForms";

export default async function SettingsPage() {
  const { data: user } = await authService.getMe();

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:items-start justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Account Settings
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your personal profile, security credentials, and account
            status.
          </p>
        </div>
      </header>

      <SettingsForms user={user} />
    </div>
  );
}
