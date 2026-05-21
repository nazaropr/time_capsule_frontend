"use client";
import { Suspense } from "react";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <Suspense fallback={<div className="text-indigo-400 animate-pulse">Loading registration portal...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
