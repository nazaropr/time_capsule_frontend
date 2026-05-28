"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

export default function Navbar() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
            >
              Time Capsule
            </Link>
          </div>

          <div className="hidden sm:flex space-x-8 items-center">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-indigo-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/capsules/new"
              className="text-sm font-medium hover:text-indigo-400 transition-colors"
            >
              New Capsule
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium hover:text-indigo-400 transition-colors"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all text-sm font-medium"
            >
              Logout
            </button>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
