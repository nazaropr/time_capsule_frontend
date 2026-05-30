"use client";

import { useActionState, useState } from "react";
import {
  updateProfileAction,
  updatePasswordAction,
  deleteAccountAction,
} from "@/app/(protected)/settings/actions";
import { User } from "@/types";

interface Props {
  user: User;
}

export default function SettingsForms({ user }: Props) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfileAction,
    {},
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    updatePasswordAction,
    {},
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePending, setDeletePending] = useState(false);

  const handleDelete = async () => {
    setDeletePending(true);
    await deleteAccountAction();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-12">
      <section className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Profile Information</h2>
          <p className="text-slate-400 mt-1 text-sm">
            Update your account's profile information and email address.
          </p>
        </div>

        <form action={profileAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Name
            </label>
            <input
              name="name"
              defaultValue={user.name}
              placeholder="Your name"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              placeholder="Your email address"
              className="input-field"
              required
            />
          </div>

          {profileState?.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {profileState.error}
            </div>
          )}
          {profileState?.success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {profileState.message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={profilePending}
              className="btn-primary w-full sm:w-auto px-8"
            >
              {profilePending ? "Saving..." : "Save Name & Email"}
            </button>
          </div>
        </form>
      </section>

      <section className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Update Password</h2>
          <p className="text-slate-400 mt-1 text-sm">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <form action={passwordAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Current Password
            </label>
            <input
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="Enter new password (min. 8 characters)"
              className="input-field"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="input-field"
              minLength={8}
              required
            />
          </div>

          {passwordState?.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {passwordState.error}
            </div>
          )}
          {passwordState?.success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {passwordState.message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={passwordPending}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-colors font-medium border-slate-700 w-full sm:w-auto"
            >
              {passwordPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </section>

      <section className="glass rounded-3xl p-6 md:p-8 border-red-500/20 bg-red-500/5">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>
          <p className="text-slate-400 mt-1 text-sm">
            Permanently delete your account and all of your time capsules.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-all border border-red-500/20 w-full sm:w-auto"
          >
            Delete Account
          </button>
        </div>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-2">
              Are you absolutely sure?
            </h3>
            <p className="text-slate-400 mb-6">
              This action cannot be undone. This will permanently delete your
              account, wipe out all your personal data, and destroy all your
              time capsules.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletePending}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition border border-slate-700 font-medium w-full sm:w-auto text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deletePending}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium w-full sm:w-auto text-sm disabled:opacity-50"
              >
                {deletePending ? "Deleting..." : "Yes, delete my account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
